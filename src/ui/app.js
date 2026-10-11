import { syntheticCases } from "../data/synthetic-cases.js";
import { accommodationPatterns } from "../data/accommodation-patterns.js";
import { resourceCategories } from "../data/resources.js";
import { analyzeBarrierInput } from "../domain/barrier-analyzer.js";
import { compileSolutionArtifacts } from "../domain/solution-compiler.js";
import {
  escapeHtml,
  renderOptions,
  renderClarifyingQuestions,
  renderCompiledArtifacts,
  renderResourceOptions,
  renderPatterns
} from "./presentation.js";

// Application State
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
  filterCategory: "all",
  activeTab: "tab-letter",
  theme: localStorage.getItem("vocspace-theme") || "light",
  fontSize: localStorage.getItem("vocspace-font-size") || "normal"
};

const root = document.querySelector("#app");

function applyPreferences() {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.setAttribute("data-font-size", state.fontSize);
}

function getCurrentModel() {
  if (state.isCustomMode) {
    if (state.customAnalysis) {
      return {
        id: "custom-case",
        title: state.customDraft.title || "Custom Workplace Scenario",
        participationGoal: state.customDraft.participationGoal || state.customAnalysis.participationGoal,
        task: state.customDraft.task || state.customAnalysis.task,
        context: state.customDraft.context || state.customAnalysis.context,
        barrier: state.customDraft.barrier || state.customAnalysis.barrier,
        functionalNeed: state.customDraft.functionalNeed || state.customAnalysis.functionalNeed,
        strengths: state.customDraft.strengths || [],
        constraints: state.customDraft.constraints || [],
        solutions: state.customAnalysis.candidateSolutions || []
      };
    }
    return {
      id: "custom-case",
      title: "Custom Barrier Analysis",
      participationGoal: state.customDraft.participationGoal,
      task: state.customDraft.task,
      context: state.customDraft.context,
      barrier: state.customDraft.barrier,
      functionalNeed: state.customDraft.functionalNeed,
      strengths: state.customDraft.strengths,
      constraints: state.customDraft.constraints,
      solutions: []
    };
  }
  return syntheticCases.find((c) => c.id === state.currentCaseId) || syntheticCases[0];
}

function render() {
  if (!root) return;
  applyPreferences();

  const currentModel = getCurrentModel();
  const solutions = currentModel.solutions || [];
  const clarifyingQuestions = state.isCustomMode && state.customAnalysis 
    ? state.customAnalysis.clarifyingQuestions 
    : [];

  root.innerHTML = `
    <!-- Top Access & Theme Bar -->
    <header class="app-header" role="banner">
      <div class="header-inner">
        <div class="brand">
          <span class="brand-logo" aria-hidden="true">◬</span>
          <div>
            <span class="brand-title">VocSpace</span>
            <span class="brand-subtitle">Accessibility & Accommodation Intelligence</span>
          </div>
        </div>
        <nav class="quick-nav" aria-label="Main Navigation">
          <a href="#intake-surface" class="nav-link">1. Barrier Intake</a>
          <a href="#solutions-surface" class="nav-link">2. Pathways</a>
          <a href="#compiler-surface" class="nav-link">3. Solution Compiler</a>
          <a href="#resources-surface" class="nav-link">4. Resources</a>
          <a href="#patterns-surface" class="nav-link">5. Patterns</a>
        </nav>
        <div class="a11y-controls" aria-label="Accessibility settings">
          <button id="theme-toggle" class="ctrl-btn" type="button" aria-label="Toggle Theme: ${state.theme}">
            ${state.theme === "dark" ? "☀️ Light" : state.theme === "high-contrast" ? "🌓 Standard" : "🌙 Dark"}
          </button>
          <button id="contrast-toggle" class="ctrl-btn" type="button" aria-label="Toggle High Contrast">
            ${state.theme === "high-contrast" ? "Regular Contrast" : "⚡ High Contrast"}
          </button>
          <button id="font-toggle" class="ctrl-btn" type="button" aria-label="Toggle Font Size: ${state.fontSize}">
            ${state.fontSize === "large" ? "A- Font" : "A+ Font"}
          </button>
        </div>
      </div>
    </header>

    <!-- Hero / Principles Statement -->
    <section class="hero" aria-labelledby="hero-title">
      <p class="eyebrow">VOCSPACE · OPEN ACCESSIBILITY & ACCOMMODATION INTELLIGENCE</p>
      <h1 id="hero-title">From Barriers to Possibilities.</h1>
      <p class="hero-tagline">
        Most systems start with a diagnosis. VocSpace begins with the <strong>barrier</strong>.
        We disentangle what a person is trying to achieve from environmental friction, compare multiple evidence-based pathways, and compile legally sound implementation artifacts.
      </p>
      <div class="notice" role="note">
        <strong>Privacy & Clinical Boundary:</strong> VocSpace does not require medical diagnoses, disability labels, or private health records. All reasoning operates on functional barriers and tasks. All draft text stays in your local browser session.
      </div>
    </section>

    <!-- SURFACE 1: BARRIER EXPLORER & INTAKE STUDIO -->
    <section class="panel" id="intake-surface" aria-labelledby="intake-title">
      <div class="panel-header">
        <div>
          <span class="panel-step">Step 1</span>
          <h2 id="intake-title">Barrier Intake & Functional Reframing</h2>
          <p class="panel-desc">Select a vetted synthetic scenario or describe any workplace, educational, or digital barrier.</p>
        </div>
      </div>

      <!-- Mode Selector -->
      <div class="intake-mode-bar" role="radiogroup" aria-label="Intake source mode">
        <button type="button" class="mode-tab ${!state.isCustomMode ? 'active' : ''}" id="mode-curated">
          📁 Curated Synthetic Cases (${syntheticCases.length})
        </button>
        <button type="button" class="mode-tab ${state.isCustomMode ? 'active' : ''}" id="mode-custom">
          ✨ Describe Any Barrier (Dynamic Analysis)
        </button>
      </div>

      ${!state.isCustomMode ? `
        <!-- Curated Case Picker -->
        <div class="case-selection-box">
          <label for="case-select">Select a Curated Synthetic Scenario:</label>
          <select id="case-select" class="styled-select">
            ${syntheticCases.map((c) => `
              <option value="${escapeHtml(c.id)}" ${c.id === currentModel.id ? "selected" : ""}>
                ${escapeHtml(c.title)} (${escapeHtml(c.id)})
              </option>
            `).join("")}
          </select>
        </div>
      ` : `
        <div class="custom-prompt-banner">
          <p>💡 <strong>Free-Form Barrier Intelligence:</strong> Enter a barrier below. VocSpace will analyze domain keywords, extract an objective functional need, suggest clarifying questions, and match accommodation patterns from our knowledge base.</p>
        </div>
      `}

      <!-- Barrier Intake Form -->
      <form id="barrier-form" class="barrier-form">
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="goal">Participation Goal <span class="req">*</span></label>
            <input type="text" id="goal" name="goal" required value="${escapeHtml(currentModel.participationGoal)}" placeholder="e.g. Complete administrative reports and data auditing independently.">
            <span class="field-hint">What meaningful activity or responsibility is the person trying to accomplish?</span>
          </div>

          <div class="form-group">
            <label for="task">Specific Task Blocked <span class="req">*</span></label>
            <input type="text" id="task" name="task" required value="${escapeHtml(currentModel.task)}" placeholder="e.g. Review spreadsheets on dual monitors for 6 continuous hours.">
            <span class="field-hint">The concrete action or duty where difficulty is encountered.</span>
          </div>

          <div class="form-group">
            <label for="context">Environment & Context <span class="req">*</span></label>
            <input type="text" id="context" name="context" required value="${escapeHtml(currentModel.context)}" placeholder="e.g. Open-plan corporate cubicle with fluorescent overhead troffers.">
            <span class="field-hint">Physical, social, digital, or procedural operating conditions.</span>
          </div>

          <div class="form-group full-width">
            <label for="barrier">Observed Barrier / Friction <span class="req">*</span></label>
            <textarea id="barrier" name="barrier" rows="3" required placeholder="Describe what gets in the way without using diagnostic or medical labels...">${escapeHtml(currentModel.barrier)}</textarea>
            <span class="field-hint">Focus on environmental friction and observed difficulty, not medical conditions.</span>
          </div>

          <div class="form-group full-width">
            <label for="need">Functional Need (Reframed Support Requirement) <span class="req">*</span></label>
            <textarea id="need" name="need" rows="2" required placeholder="What functional capability or accommodation would eliminate the friction?">${escapeHtml(currentModel.functionalNeed)}</textarea>
            <span class="field-hint">What capability, adaptation, or condition enables successful task execution?</span>
          </div>

          <div class="form-group">
            <label for="strengths">Existing Strengths & Strategies</label>
            <input type="text" id="strengths" name="strengths" value="${escapeHtml((currentModel.strengths || []).join("; "))}" placeholder="e.g. Strong data skills; uses written checklists">
            <span class="field-hint">Strategies or conditions under which the person already thrives.</span>
          </div>

          <div class="form-group">
            <label for="constraints">Operational Constraints</label>
            <input type="text" id="constraints" name="constraints" value="${escapeHtml((currentModel.constraints || []).join("; "))}" placeholder="e.g. Must preserve coworker comfort; strict data security">
            <span class="field-hint">Workplace or technical boundaries that must be respected.</span>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" id="analyze-btn">
            ${state.isCustomMode ? "🔍 Run Barrier Intelligence & Match Pathways" : "🔄 Update Functional Model"}
          </button>
        </div>
      </form>

      ${renderClarifyingQuestions(clarifyingQuestions)}

      <!-- Functional Model Decomposition Summary -->
      <div class="model-summary-box" aria-live="polite">
        <div class="summary-top">
          <span class="status-indicator" aria-hidden="true">●</span>
          <h3>Active Functional Model</h3>
        </div>
        <dl class="functional-model-grid">
          <dt>Goal:</dt>
          <dd>${escapeHtml(currentModel.participationGoal || "Not specified")}</dd>
          <dt>Task:</dt>
          <dd>${escapeHtml(currentModel.task || "Not specified")}</dd>
          <dt>Context:</dt>
          <dd>${escapeHtml(currentModel.context || "Not specified")}</dd>
          <dt>Barrier:</dt>
          <dd>${escapeHtml(currentModel.barrier || "Not specified")}</dd>
          <dt>Functional Need:</dt>
          <dd class="highlight-need">${escapeHtml(currentModel.functionalNeed || "Not specified")}</dd>
          <dt>Strengths:</dt>
          <dd>${escapeHtml((currentModel.strengths || []).join("; ") || "None listed")}</dd>
          <dt>Constraints:</dt>
          <dd>${escapeHtml((currentModel.constraints || []).join("; ") || "None listed")}</dd>
        </dl>
      </div>
    </section>

    <!-- SURFACE 2: MULTI-PATHWAY SOLUTION MATRIX -->
    <section class="panel" id="solutions-surface" aria-labelledby="solutions-title">
      <div class="panel-header">
        <div>
          <span class="panel-step">Step 2</span>
          <h2 id="solutions-title">Compare Solution Pathways</h2>
          <p class="panel-desc">
            VocSpace presents multiple intervention mechanisms (Digital, Environmental, Process, Physical).
            Compare tradeoffs and select one or more pathways to compile actionable artifacts.
          </p>
        </div>
      </div>

      <div class="selection-action-bar">
        <span class="selection-counter" id="selection-counter">
          <strong>${state.selectedSolutionIds.length}</strong> option(s) selected for action plan
        </span>
        <button type="button" class="btn-action" id="trigger-compile-btn" ${solutions.length === 0 ? 'disabled' : ''}>
          ⚙️ Compile Solution Artifacts & Action Plan
        </button>
      </div>

      <div class="solution-grid" id="solutions-container">
        ${renderOptions(solutions, state.selectedSolutionIds)}
      </div>
    </section>

    <!-- SURFACE 3: THE SOLUTION COMPILER STUDIO (PHASE 4) -->
    <section class="panel" id="compiler-surface" aria-labelledby="compiler-title">
      <div class="panel-header">
        <div>
          <span class="panel-step">Step 3</span>
          <h2 id="compiler-title">Solution Compiler Studio</h2>
          <p class="panel-desc">
            Turns selected pathways into four production-ready artifacts: an ADA request letter, an AI coding prompt, an implementation checklist, and a longitudinal outcome protocol.
          </p>
        </div>
      </div>

      <!-- Optional Metadata Configuration for Customization -->
      <div class="compiler-meta-config">
        <h4>Customize Compiled Artifacts (Optional)</h4>
        <div class="meta-grid">
          <div class="meta-field">
            <label for="meta-worker">Worker / Student Name:</label>
            <input type="text" id="meta-worker" value="${escapeHtml(state.metaOptions.workerName)}" placeholder="e.g. Alex Rivera">
          </div>
          <div class="meta-field">
            <label for="meta-recipient">Recipient / HR / Supervisor:</label>
            <input type="text" id="meta-recipient" value="${escapeHtml(state.metaOptions.recipientName)}" placeholder="e.g. Jordan Smith (HR)">
          </div>
          <div class="meta-field">
            <label for="meta-job">Role / Job Title:</label>
            <input type="text" id="meta-job" value="${escapeHtml(state.metaOptions.jobTitle)}" placeholder="e.g. Senior Financial Analyst">
          </div>
          <div class="meta-field">
            <label for="meta-days">Trial Duration (Days):</label>
            <input type="number" id="meta-days" min="7" max="180" value="${state.metaOptions.trialDays}">
          </div>
        </div>
        <button type="button" class="btn-secondary" id="refresh-compile-btn">🔄 Re-compile Artifacts with Details</button>
      </div>

      <div id="compiler-output-root">
        ${state.compiledArtifacts ? renderCompiledArtifacts(state.compiledArtifacts) : `
          <div class="compiler-placeholder">
            <p>Select one or more solution pathways above and click <strong>"Compile Solution Artifacts"</strong> to generate your documents.</p>
          </div>
        `}
      </div>
    </section>

    <!-- SURFACE 4: RESOURCE ROUTER & ECOSYSTEM -->
    <section class="panel" id="resources-surface" aria-labelledby="resources-title">
      <div class="panel-header">
        <div>
          <span class="panel-step">Surface 4</span>
          <h2 id="resources-title">Resource Routing Ecosystem</h2>
          <p class="panel-desc">
            VocSpace routes cases based on structured capabilities rather than arbitrary directories.
          </p>
        </div>
      </div>
      <ul class="resource-grid">
        ${renderResourceOptions(resourceCategories)}
      </ul>
    </section>

    <!-- SURFACE 5: ACCOMMODATION PATTERN LIBRARY (FOUNDRY) -->
    <section class="panel" id="patterns-surface" aria-labelledby="patterns-title">
      <div class="panel-header">
        <div>
          <span class="panel-step">Surface 5</span>
          <h2 id="patterns-title">Accommodation Pattern Library (${accommodationPatterns.length} Patterns)</h2>
          <p class="panel-desc">
            Modular accommodation primitives indexed by functional need, context, mechanism, and verification ideas.
          </p>
        </div>
      </div>
      <div class="pattern-grid">
        ${renderPatterns(accommodationPatterns)}
      </div>
    </section>

    <!-- Footer -->
    <footer class="app-footer" role="contentinfo">
      <div class="footer-inner">
        <p><strong>VocSpace:</strong> From Barriers to Possibilities. Designed with human judgment, privacy by design, and accessibility by default.</p>
        <p>Zero tracking · Offline capable · Local-first execution</p>
      </div>
    </footer>
  `;

  attachEventHandlers();
}

function attachEventHandlers() {
  // Theme & Contrast Toggles
  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("vocspace-theme", state.theme);
    render();
  });

  document.querySelector("#contrast-toggle")?.addEventListener("click", () => {
    state.theme = state.theme === "high-contrast" ? "light" : "high-contrast";
    localStorage.setItem("vocspace-theme", state.theme);
    render();
  });

  document.querySelector("#font-toggle")?.addEventListener("click", () => {
    state.fontSize = state.fontSize === "large" ? "normal" : "large";
    localStorage.setItem("vocspace-font-size", state.fontSize);
    render();
  });

  // Mode Selection
  document.querySelector("#mode-curated")?.addEventListener("click", () => {
    state.isCustomMode = false;
    state.selectedSolutionIds = [];
    state.compiledArtifacts = null;
    render();
  });

  document.querySelector("#mode-custom")?.addEventListener("click", () => {
    state.isCustomMode = true;
    state.selectedSolutionIds = [];
    state.compiledArtifacts = null;
    if (!state.customAnalysis) {
      // Run initial analysis with empty or default prompt
      state.customAnalysis = analyzeBarrierInput({
        barrier: state.customDraft.barrier || "Excessive interruptions and dense interfaces cause task derailment.",
        task: state.customDraft.task || "Administrative reporting and communication",
        context: state.customDraft.context || "Open office environment",
        goal: state.customDraft.participationGoal || "Complete daily assignments on schedule"
      });
      state.customDraft.barrier = state.customAnalysis.barrier;
      state.customDraft.functionalNeed = state.customAnalysis.functionalNeed;
      state.customDraft.task = state.customAnalysis.task;
      state.customDraft.context = state.customAnalysis.context;
      state.customDraft.participationGoal = state.customAnalysis.participationGoal;
    }
    render();
  });

  // Case Select Dropdown
  document.querySelector("#case-select")?.addEventListener("change", (e) => {
    state.currentCaseId = e.target.value;
    state.selectedSolutionIds = [];
    state.compiledArtifacts = null;
    render();
  });

  // Barrier Form Submit (Update or Analyze)
  document.querySelector("#barrier-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const goal = String(form.get("goal") || "").trim();
    const task = String(form.get("task") || "").trim();
    const context = String(form.get("context") || "").trim();
    const barrier = String(form.get("barrier") || "").trim();
    const need = String(form.get("need") || "").trim();
    const strengths = String(form.get("strengths") || "").split(";").map((s) => s.trim()).filter(Boolean);
    const constraints = String(form.get("constraints") || "").split(";").map((s) => s.trim()).filter(Boolean);

    if (state.isCustomMode) {
      state.customDraft = {
        title: "Custom Scenario",
        participationGoal: goal,
        task,
        context,
        barrier,
        functionalNeed: need,
        strengths,
        constraints
      };
      state.customAnalysis = analyzeBarrierInput({
        barrier,
        task,
        context,
        goal,
        strengths,
        constraints
      });
      if (need) {
        state.customAnalysis.functionalNeed = need;
      }
      state.selectedSolutionIds = [];
      state.compiledArtifacts = null;
      render();
    } else {
      const current = syntheticCases.find((c) => c.id === state.currentCaseId);
      if (current) {
        current.participationGoal = goal;
        current.task = task;
        current.context = context;
        current.barrier = barrier;
        current.functionalNeed = need;
        current.strengths = strengths;
        current.constraints = constraints;
      }
      render();
    }
  });

  // Checkbox Solution Selection
  document.querySelectorAll('input[name="selectedSolution"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const solId = e.target.value;
      if (e.target.checked) {
        if (!state.selectedSolutionIds.includes(solId)) {
          state.selectedSolutionIds.push(solId);
        }
      } else {
        state.selectedSolutionIds = state.selectedSolutionIds.filter((id) => id !== solId);
      }
      const counter = document.querySelector("#selection-counter");
      if (counter) {
        counter.innerHTML = `<strong>${state.selectedSolutionIds.length}</strong> option(s) selected for action plan`;
      }
      const card = document.querySelector(`#card-${solId}`);
      if (card) {
        card.classList.toggle("is-selected", e.target.checked);
      }
    });
  });

  // Solution Compiler Trigger
  function runCompiler() {
    const model = getCurrentModel();
    const selected = (model.solutions || []).filter((s) => state.selectedSolutionIds.includes(s.id));
    const effectiveSolutions = selected.length > 0 ? selected : (model.solutions || []).slice(0, 2);

    state.metaOptions.workerName = document.querySelector("#meta-worker")?.value || state.metaOptions.workerName;
    state.metaOptions.recipientName = document.querySelector("#meta-recipient")?.value || state.metaOptions.recipientName;
    state.metaOptions.jobTitle = document.querySelector("#meta-job")?.value || state.metaOptions.jobTitle;
    state.metaOptions.trialDays = Number(document.querySelector("#meta-days")?.value || state.metaOptions.trialDays);

    const compiled = compileSolutionArtifacts(model, effectiveSolutions, state.metaOptions);
    state.compiledArtifacts = compiled.artifacts;

    const outputRoot = document.querySelector("#compiler-output-root");
    if (outputRoot) {
      outputRoot.innerHTML = renderCompiledArtifacts(state.compiledArtifacts);
      attachCompilerTabHandlers();
      document.querySelector("#compiler-surface")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  document.querySelector("#trigger-compile-btn")?.addEventListener("click", runCompiler);
  document.querySelector("#refresh-compile-btn")?.addEventListener("click", runCompiler);

  attachCompilerTabHandlers();
}

function attachCompilerTabHandlers() {
  // Tabs switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = e.currentTarget.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.remove("active");
        panel.hidden = true;
      });

      e.currentTarget.classList.add("active");
      e.currentTarget.setAttribute("aria-selected", "true");
      const targetPanel = document.querySelector(`#${tabId}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.hidden = false;
      }
    });
  });

  // Copy Buttons
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const targetId = e.currentTarget.getAttribute("data-target");
      const codeElem = document.querySelector(`#${targetId}`);
      if (codeElem) {
        try {
          await navigator.clipboard.writeText(codeElem.textContent || "");
          const origText = e.currentTarget.textContent;
          e.currentTarget.textContent = "✅ Copied!";
          setTimeout(() => { e.currentTarget.textContent = origText; }, 2000);
        } catch {
          // Fallback selection
          const range = document.createRange();
          range.selectNode(codeElem);
          window.getSelection()?.removeAllRanges();
          window.getSelection()?.addRange(range);
          alert("Text selected. Press Ctrl+C or Cmd+C to copy.");
        }
      }
    });
  });

  // Download Buttons
  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("data-target");
      const filename = e.currentTarget.getAttribute("data-filename") || "vocspace-artifact.txt";
      const codeElem = document.querySelector(`#${targetId}`);
      if (codeElem) {
        const blob = new Blob([codeElem.textContent || ""], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  });
}

// Initial render
render();
