import { syntheticCases } from "../data/synthetic-cases.js";
import { accommodationPatterns } from "../data/accommodation-patterns.js";
import { resourceCategories } from "../data/resources.js";
import { analyzeBarrierInput } from "../domain/barrier-analyzer.js";
import { compileSolutionArtifacts } from "../domain/solution-compiler.js";
import { matchAccommodationPatterns, hasSufficientContext } from "../domain/solution-matcher.js";
import { sourceCatalog } from "../data/source-catalog.js";
import {
  escapeHtml,
  caseCode,
  renderStationHeading,
  renderOptions,
  renderMatchedPatterns,
  renderRouteSummary,
  renderClarifyingQuestions,
  renderCompiledArtifacts,
  renderResourceOptions,
  renderPatterns
} from "./presentation.js";

function readPref(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function writePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preferences still apply for this session.
  }
}

const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const prefersContrast = window.matchMedia?.("(prefers-contrast: more)").matches;

const state = {
  currentCaseId: syntheticCases[0].id,
  isCustomMode: false,
  customDraft: {
    title: "Custom Barrier Analysis",
    participationGoal: "",
    task: "",
    context: "",
    barrier: "",
    functionalNeed: "",
    strengths: [],
    constraints: []
  },
  customAnalysis: null,
  selectedSolutionIds: [],
  compiledArtifacts: null,
  metaOptions: {
    workerName: "",
    recipientName: "",
    jobTitle: "",
    trialDays: 30
  },
  activeTab: "letter",
  theme: readPref("vocspace-theme", prefersContrast ? "high-contrast" : prefersDark ? "dark" : "light"),
  fontSize: readPref("vocspace-font-size", "normal")
};

const STATIONS = [
  { number: "01", label: "Barrier", href: "#station-barrier" },
  { number: "02", label: "Need", href: "#station-need" },
  { number: "03", label: "Options", href: "#station-options" },
  { number: "04", label: "Connect", href: "#station-connect" },
  { number: "05", label: "Plan", href: "#station-plan" }
];

const CHAIN = ["Barrier", "Functional need", "Options", "Solution", "Connection", "Implementation", "Validation"];

const root = document.querySelector("#app");
let stationObserver = null;

function applyPreferences() {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.setAttribute("data-font-size", state.fontSize);
}

function getCurrentModel() {
  if (state.isCustomMode) {
    const draft = state.customDraft;
    const analysis = state.customAnalysis;
    return {
      id: "custom-case",
      title: "Your own barrier",
      participationGoal: draft.participationGoal || analysis?.participationGoal || "",
      task: draft.task || analysis?.task || "",
      context: draft.context || analysis?.context || "",
      barrier: draft.barrier || analysis?.barrier || "",
      functionalNeed: draft.functionalNeed || analysis?.functionalNeed || "",
      strengths: draft.strengths || [],
      constraints: draft.constraints || [],
      solutions: analysis?.candidateSolutions || []
    };
  }
  return syntheticCases.find((c) => c.id === state.currentCaseId) || syntheticCases[0];
}

function routeResourceIds(model) {
  const solutions = model.solutions || [];
  const onRoute = solutions.filter((s) => state.selectedSolutionIds.includes(s.id));
  return [...new Set(onRoute.flatMap((s) => s.resourceCategories || []))];
}

function announce(message) {
  const region = document.querySelector("#route-status");
  if (region) region.textContent = message;
}

function selectionText() {
  const n = state.selectedSolutionIds.length;
  return n === 0 ? "No options on your route yet" : `${n} option${n === 1 ? "" : "s"} on your route`;
}

function renderRankedPatterns(model) {
  if (!hasSufficientContext(model)) {
    return '<p class="notice" role="status">More context needed for ranked matching. Describe the functional need or barrier and one more detail about the task or environment.</p>';
  }
  const matches = matchAccommodationPatterns(model, accommodationPatterns, { limit: 5 });
  if (!matches.length) {
    return '<p class="notice" role="status">No clear pattern match found. Add context, try different wording, or review the pattern library manually. Do not treat unrelated results as recommendations.</p>';
  }
  return renderMatchedPatterns(matches, resourceCategories, sourceCatalog);
}

function renderPrefGroup(label, name, current, choices) {
  return `
    <div class="pref-group" role="group" aria-label="${label}">
      <span class="pref-label" aria-hidden="true">${label}</span>
      ${choices.map(([value, text]) => `
        <button type="button" class="pref-btn" id="pref-${name}-${value}" data-pref="${name}" data-value="${value}" aria-pressed="${current === value}">${text}</button>
      `).join("")}
    </div>
  `;
}

function renderField({ id, name, label, value, hint, required = false, multiline = false, rows = 2, placeholder = "", wide = false }) {
  const hintId = `${id}-hint`;
  const common = `id="${id}" name="${name}" aria-describedby="${hintId}" ${required ? "required" : ""} placeholder="${escapeHtml(placeholder)}"`;
  return `
    <div class="field ${wide ? "field-wide" : ""}">
      <label for="${id}">${label}${required ? "" : ` <span class="optional">optional</span>`}</label>
      <span class="field-hint" id="${hintId}">${hint}</span>
      ${multiline
        ? `<textarea ${common} rows="${rows}">${escapeHtml(value)}</textarea>`
        : `<input type="text" ${common} value="${escapeHtml(value)}">`}
    </div>
  `;
}

function render() {
  if (!root) return;
  const focusedId = document.activeElement?.id;
  applyPreferences();

  const model = getCurrentModel();
  const solutions = model.solutions || [];
  const questions = state.isCustomMode && state.customAnalysis ? state.customAnalysis.clarifyingQuestions : [];

  root.innerHTML = `
    <header class="signage" role="banner">
      <div class="signage-inner">
        <a class="wordmark" href="#main">
          <span class="wordmark-glyph" aria-hidden="true"></span>VocSpace
        </a>
        <nav class="route-strip" aria-label="Route">
          <ol>
            ${STATIONS.map((s) => `
              <li><a href="${s.href}" data-station="${s.href.slice(1)}"><span class="strip-num" aria-hidden="true">${s.number}</span>${s.label}</a></li>
            `).join("")}
            <li class="strip-appendix"><a href="#station-patterns" data-station="station-patterns">Patterns</a></li>
          </ol>
        </nav>
        <div class="prefs">
          ${renderPrefGroup("Theme", "theme", state.theme, [["light", "Light"], ["dark", "Dark"], ["high-contrast", "High contrast"]])}
          ${renderPrefGroup("Text", "font", state.fontSize, [["normal", "Standard"], ["large", "Large"]])}
        </div>
      </div>
    </header>

    <main class="page" id="main" tabindex="-1">
      <section class="intro" aria-labelledby="intro-title">
        <p class="kicker">Accessibility and accommodation intelligence</p>
        <h1 id="intro-title">Begin with the barrier.</h1>
        <p class="intro-lede">
          Most systems start with a diagnosis and work backwards to a device. VocSpace starts with what someone is trying to do
          and what gets in the way, then lays out more than one route forward.
        </p>
        <ol class="chain" aria-label="The VocSpace model">
          ${CHAIN.map((c) => `<li>${c}</li>`).join("")}
        </ol>
        <p class="notice notice-privacy">
          <strong>No diagnosis needed.</strong> VocSpace reasons about tasks and barriers, not medical labels.
          Everything you type stays in this browser tab. The cases below are synthetic.
        </p>
      </section>

      <div class="line">
        <section class="station" id="station-barrier" aria-labelledby="barrier-title">
          ${renderStationHeading({ number: "01", label: "Barrier", id: "barrier-title", title: "What gets in the way?", desc: "Start from a synthetic case, or describe a barrier of your own." })}

          <fieldset class="case-picker">
            <legend>Starting point</legend>
            <ul class="case-list">
              ${syntheticCases.map((c) => `
                <li>
                  <input type="radio" name="case" id="case-${escapeHtml(c.id)}" value="${escapeHtml(c.id)}" ${!state.isCustomMode && c.id === state.currentCaseId ? "checked" : ""}>
                  <label for="case-${escapeHtml(c.id)}"><span class="case-code">${caseCode(c.id)}</span>${escapeHtml(c.title)}</label>
                </li>
              `).join("")}
              <li class="case-own">
                <input type="radio" name="case" id="case-custom" value="custom" ${state.isCustomMode ? "checked" : ""}>
                <label for="case-custom"><span class="case-code">+</span>Describe your own barrier</label>
              </li>
            </ul>
          </fieldset>

          <form id="barrier-form" class="barrier-form">
            <div class="field-grid">
              ${renderField({ id: "goal", name: "goal", label: "Participation goal", value: model.participationGoal, hint: "The activity or responsibility the person is trying to carry out.", required: true, wide: true, placeholder: "Complete administrative reports independently" })}
              ${renderField({ id: "task", name: "task", label: "Task", value: model.task, hint: "The concrete action where difficulty shows up.", required: true, placeholder: "Review spreadsheets for several hours" })}
              ${renderField({ id: "context", name: "context", label: "Context", value: model.context, hint: "Physical, social, digital or procedural conditions.", required: true, placeholder: "Open-plan office, fluorescent lighting" })}
              ${renderField({ id: "barrier", name: "barrier", label: "Barrier", value: model.barrier, hint: "What gets in the way, described as friction, not as a condition.", required: true, multiline: true, rows: 3, wide: true })}
              ${renderField({ id: "need", name: "need", label: "Functional need", value: model.functionalNeed, hint: state.isCustomMode ? "Leave blank and VocSpace will propose one." : "The capability or condition that would remove the friction.", multiline: true, wide: true, required: !state.isCustomMode })}
              ${renderField({ id: "strengths", name: "strengths", label: "Strengths", value: (model.strengths || []).join("; "), hint: "Separate with semicolons." })}
              ${renderField({ id: "constraints", name: "constraints", label: "Constraints", value: (model.constraints || []).join("; "), hint: "Separate with semicolons." })}
            </div>
            <button type="submit" class="btn btn-primary" id="analyze-btn">
              ${state.isCustomMode ? "Analyse barrier and find options" : "Update the route"}
            </button>
          </form>
        </section>

        <section class="station" id="station-need" aria-labelledby="need-title">
          ${renderStationHeading({ number: "02", label: "Functional need", id: "need-title", title: "The route so far", desc: "The barrier, reframed as a need that options can be measured against." })}
          ${renderRouteSummary(model)}
          ${renderClarifyingQuestions(questions)}
        </section>

        <section class="station" id="station-options" aria-labelledby="options-title">
          ${renderStationHeading({ number: "03", label: "Options", id: "options-title", title: "Compare routes forward", desc: "Each option is coloured by mechanism. Add one or more to your route." })}
          <ul class="legend" aria-label="Mechanism colours">
            <li class="line-digital">Digital</li>
            <li class="line-environmental">Environmental</li>
            <li class="line-organizational">Process / policy</li>
            <li class="line-physical">Physical</li>
            <li class="line-assistive">Assistive tech</li>
          </ul>
          ${renderOptions(solutions, state.selectedSolutionIds)}
          <h3 id="ranked-patterns-heading">Ranked pattern matches</h3>
          <p>Patterns are ranked using transparent keyword and context matching. These are candidate ideas, not probabilities or guaranteed recommendations. Matched terms and reasons are shown for each.</p>
          <div id="matched-solutions" class="solution-grid">${renderRankedPatterns(model)}</div>
          <div class="route-bar">
            <p id="route-count">${selectionText()}</p>
            <button type="button" class="btn btn-primary" id="trigger-compile-btn" ${solutions.length === 0 ? "disabled" : ""}>Build the plan</button>
          </div>
        </section>

        <section class="station" id="station-connect" aria-labelledby="connect-title">
          ${renderStationHeading({ number: "04", label: "Connection", id: "connect-title", title: "Who can help", desc: "Resources are matched by capability to the options on your route." })}
          <div id="resource-root">${renderResourceOptions(resourceCategories, routeResourceIds(model))}</div>
        </section>

        <section class="station" id="station-plan" aria-labelledby="plan-title">
          ${renderStationHeading({ number: "05", label: "Implementation and validation", id: "plan-title", title: "The plan", desc: "Four drafts generated from your route: a request letter, a technical spec, a checklist and a validation protocol. A person reviews each before use." })}
          <form class="plan-details" id="plan-details">
            <fieldset>
              <legend>Details for the drafts <span class="optional">optional</span></legend>
              <div class="field-grid field-grid-4">
                <div class="field"><label for="meta-worker">Person's name</label><input type="text" id="meta-worker" value="${escapeHtml(state.metaOptions.workerName)}" autocomplete="off"></div>
                <div class="field"><label for="meta-recipient">Recipient</label><input type="text" id="meta-recipient" value="${escapeHtml(state.metaOptions.recipientName)}" autocomplete="off"></div>
                <div class="field"><label for="meta-job">Role</label><input type="text" id="meta-job" value="${escapeHtml(state.metaOptions.jobTitle)}" autocomplete="off"></div>
                <div class="field"><label for="meta-days">Trial length (days)</label><input type="number" id="meta-days" min="7" max="180" value="${state.metaOptions.trialDays}"></div>
              </div>
            </fieldset>
            <button type="submit" class="btn btn-secondary" id="refresh-compile-btn" ${solutions.length === 0 ? "disabled" : ""}>
              ${state.compiledArtifacts ? "Rebuild with these details" : "Build the plan"}
            </button>
          </form>
          <div id="compiler-output-root">
            ${state.compiledArtifacts
              ? renderCompiledArtifacts(state.compiledArtifacts, state.activeTab)
              : `<p class="empty-state">No plan yet. Add options to your route at station 03, then build the plan. With none chosen, the first two options are used.</p>`}
          </div>
        </section>
      </div>

      <section class="appendix" id="station-patterns" aria-labelledby="patterns-title">
        <p class="station-label">Appendix</p>
        <h2 id="patterns-title">Accommodation pattern catalogue</h2>
        <p class="station-desc">${accommodationPatterns.length} reusable patterns indexed by functional need. Draft synthesis means VocSpace wrote it and no external source has reviewed it yet.</p>
        ${renderPatterns(accommodationPatterns)}
      </section>
    </main>

    <footer class="colophon" role="contentinfo">
      <p><strong>VocSpace</strong> · Barrier-first. Human judgment stays central. No tracking; runs locally.</p>
      <p>A research prototype, not a clinical, legal or safety determination.</p>
    </footer>

    <p class="visually-hidden" role="status" aria-live="polite" id="route-status"></p>
  `;

  attachEventHandlers();
  observeStations();

  if (focusedId) document.getElementById(focusedId)?.focus();
}

function observeStations() {
  stationObserver?.disconnect();
  if (!("IntersectionObserver" in window)) return;
  const links = [...document.querySelectorAll(".route-strip a")];
  stationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        if (a.dataset.station === entry.target.id) a.setAttribute("aria-current", "step");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll(".station, .appendix").forEach((s) => stationObserver.observe(s));
}

function resetRoute() {
  state.selectedSolutionIds = [];
  state.compiledArtifacts = null;
}

function runCompiler() {
  const model = getCurrentModel();
  const solutions = model.solutions || [];
  const selected = solutions.filter((s) => state.selectedSolutionIds.includes(s.id));
  const effective = selected.length > 0 ? selected : solutions.slice(0, 2);
  if (effective.length === 0) return;

  state.metaOptions.workerName = document.querySelector("#meta-worker")?.value ?? state.metaOptions.workerName;
  state.metaOptions.recipientName = document.querySelector("#meta-recipient")?.value ?? state.metaOptions.recipientName;
  state.metaOptions.jobTitle = document.querySelector("#meta-job")?.value ?? state.metaOptions.jobTitle;
  state.metaOptions.trialDays = Number(document.querySelector("#meta-days")?.value || state.metaOptions.trialDays);

  state.compiledArtifacts = compileSolutionArtifacts(model, effective, state.metaOptions).artifacts;

  const output = document.querySelector("#compiler-output-root");
  if (!output) return;
  output.innerHTML = renderCompiledArtifacts(state.compiledArtifacts, state.activeTab);
  const refresh = document.querySelector("#refresh-compile-btn");
  if (refresh) refresh.textContent = "Rebuild with these details";
  attachDocumentHandlers();

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.querySelector("#station-plan")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  document.querySelector(`#tab-btn-${state.activeTab}`)?.focus({ preventScroll: true });
  announce(`Plan built from ${effective.length} option${effective.length === 1 ? "" : "s"}. Four drafts are ready.`);
}

function attachEventHandlers() {
  document.querySelectorAll(".pref-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { pref, value } = btn.dataset;
      if (pref === "theme") {
        state.theme = value;
        writePref("vocspace-theme", value);
      } else {
        state.fontSize = value;
        writePref("vocspace-font-size", value);
      }
      render();
    });
  });

  document.querySelectorAll('input[name="case"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      resetRoute();
      if (radio.value === "custom") {
        state.isCustomMode = true;
        if (!state.customAnalysis) {
          state.customAnalysis = analyzeBarrierInput({
            barrier: "Frequent interruptions and dense interfaces make it hard to stay on task.",
            task: "Administrative reporting and communication",
            context: "Open office environment",
            goal: "Complete daily assignments on schedule"
          });
          Object.assign(state.customDraft, {
            participationGoal: state.customAnalysis.participationGoal,
            task: state.customAnalysis.task,
            context: state.customAnalysis.context,
            barrier: state.customAnalysis.barrier,
            functionalNeed: state.customAnalysis.functionalNeed
          });
        }
      } else {
        state.isCustomMode = false;
        state.currentCaseId = radio.value;
      }
      render();
      announce(`Starting point changed to ${getCurrentModel().title}. Route cleared.`);
    });
  });

  document.querySelector("#barrier-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = (key) => String(form.get(key) || "").trim();
    const list = (key) => text(key).split(";").map((s) => s.trim()).filter(Boolean);
    const fields = {
      participationGoal: text("goal"),
      task: text("task"),
      context: text("context"),
      barrier: text("barrier"),
      functionalNeed: text("need"),
      strengths: list("strengths"),
      constraints: list("constraints")
    };

    if (state.isCustomMode) {
      state.customAnalysis = analyzeBarrierInput({
        barrier: fields.barrier,
        task: fields.task,
        context: fields.context,
        goal: fields.participationGoal,
        strengths: fields.strengths,
        constraints: fields.constraints
      });
      if (fields.functionalNeed) state.customAnalysis.functionalNeed = fields.functionalNeed;
      state.customDraft = { title: "Custom Scenario", ...fields, functionalNeed: state.customAnalysis.functionalNeed };
      resetRoute();
      render();
      announce(`Analysis complete. ${state.customAnalysis.candidateSolutions.length} options found.`);
    } else {
      const current = syntheticCases.find((c) => c.id === state.currentCaseId);
      if (current) Object.assign(current, fields);
      render();
      announce("Route updated.");
    }
  });

  document.querySelectorAll('input[name="selectedSolution"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = checkbox.value;
      state.selectedSolutionIds = checkbox.checked
        ? [...new Set([...state.selectedSolutionIds, id])]
        : state.selectedSolutionIds.filter((s) => s !== id);

      document.querySelector(`#card-${CSS.escape(id)}`)?.classList.toggle("is-selected", checkbox.checked);
      const count = document.querySelector("#route-count");
      if (count) count.textContent = selectionText();
      const resources = document.querySelector("#resource-root");
      if (resources) resources.innerHTML = renderResourceOptions(resourceCategories, routeResourceIds(getCurrentModel()));
      announce(selectionText());
    });
  });

  document.querySelector("#trigger-compile-btn")?.addEventListener("click", runCompiler);
  document.querySelector("#plan-details")?.addEventListener("submit", (e) => {
    e.preventDefault();
    runCompiler();
  });

  attachDocumentHandlers();
}

function activateTab(btn, { focus = true } = {}) {
  const key = btn.dataset.tab;
  state.activeTab = key;
  document.querySelectorAll(".doc-tabs .tab-btn").forEach((b) => {
    const isActive = b === btn;
    b.setAttribute("aria-selected", String(isActive));
    b.tabIndex = isActive ? 0 : -1;
  });
  document.querySelectorAll(".document .tab-panel").forEach((panel) => {
    panel.hidden = panel.id !== `tab-${key}`;
  });
  if (focus) btn.focus();
}

function attachDocumentHandlers() {
  const tabs = [...document.querySelectorAll(".doc-tabs .tab-btn")];
  tabs.forEach((btn, i) => {
    btn.addEventListener("click", () => activateTab(btn));
    btn.addEventListener("keydown", (e) => {
      const moves = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in moves)) return;
      e.preventDefault();
      activateTab(tabs[(moves[e.key] + tabs.length) % tabs.length]);
    });
  });

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = document.getElementById(btn.dataset.target);
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code.textContent || "");
        btn.textContent = "Copied";
        announce("Copied to clipboard.");
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        btn.textContent = "Selected — press Ctrl+C";
        announce("Text selected. Press Control C or Command C to copy.");
      }
      setTimeout(() => { btn.textContent = "Copy"; }, 2500);
    });
  });

  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = document.getElementById(btn.dataset.target);
      if (!code) return;
      const blob = new Blob([code.textContent || ""], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = btn.dataset.filename || "vocspace-artifact.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  });
}

render();
