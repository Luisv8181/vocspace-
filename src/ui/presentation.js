import { routeResources } from "../domain/solution-matcher.js";
export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const MECHANISMS = {
  digital: { label: "Digital / software", line: "digital" },
  environmental: { label: "Environmental", line: "environmental" },
  organizational: { label: "Process / policy", line: "organizational" },
  physical: { label: "Physical / ergonomic", line: "physical" },
  "assistive-tech": { label: "Assistive technology", line: "assistive" }
};

const EFFORT = {
  low: { label: "Low effort", stops: 1 },
  medium: { label: "Moderate effort", stops: 2 },
  high: { label: "High / specialised", stops: 3 }
};

// Analyzer output and pattern data use kebab-case slugs; display them as words.
function humanize(value = "") {
  const text = String(value);
  return /^[a-z0-9]+(-[a-z0-9]+)+$/.test(text) ? text.replaceAll("-", " ") : text;
}

export function getMechanism(type = "") {
  return MECHANISMS[String(type).toLowerCase()] || { label: type || "Other", line: "other" };
}

export function caseCode(id = "") {
  const match = String(id).match(/(\d+)$/);
  return match ? match[1] : "—";
}

function renderEffort(difficulty = "medium") {
  const effort = EFFORT[String(difficulty).toLowerCase()] || EFFORT.medium;
  const stops = [1, 2, 3]
    .map((n) => `<span class="stop ${n <= effort.stops ? "is-filled" : ""}"></span>`)
    .join("");
  return `<span class="effort"><span class="effort-stops" aria-hidden="true">${stops}</span>${escapeHtml(effort.label)}</span>`;
}

export function renderStationHeading({ number, label, id, title, desc = "" }) {
  return `
    <header class="station-head">
      <span class="station-node" aria-hidden="true">${escapeHtml(number)}</span>
      <p class="station-label">${escapeHtml(label)}</p>
      <h2 id="${escapeHtml(id)}">${escapeHtml(title)}</h2>
      ${desc ? `<p class="station-desc">${desc}</p>` : ""}
    </header>
  `;
}

export function renderOptions(options = [], selectedIds = []) {
  if (!options || options.length === 0) {
    return `<p class="empty-state">No options yet. Choose a case or describe a barrier at station 01.</p>`;
  }

  return `<ol class="option-lines">${options.map((option, index) => {
    const selected = selectedIds.includes(option.id);
    const mech = getMechanism(option.type);
    const titleId = `opt-title-${escapeHtml(option.id)}`;
    const tradeoffs = (option.tradeoffs || []).length
      ? `<div class="option-tradeoffs"><h4 class="mini-label">Trade-offs</h4><ul>${option.tradeoffs.map((t) => `<li>${escapeHtml(humanize(t))}</li>`).join("")}</ul></div>`
      : "";
    const basis = (option.evidence || []).length
      ? `<p class="footnote"><span class="mini-label">Basis</span> ${option.evidence.map(escapeHtml).join("; ")}</p>`
      : "";

    return `
      <li class="option-line line-${mech.line} ${selected ? "is-selected" : ""}" id="card-${escapeHtml(option.id)}">
        <div class="option-meta">
          <span class="option-code">${String(index + 1).padStart(2, "0")}</span>
          <span class="mech-label">${escapeHtml(mech.label)}</span>
          ${renderEffort(option.implementationDifficulty)}
        </div>
        <h3 class="option-title" id="${titleId}">${escapeHtml(option.name)}</h3>
        <p class="option-mechanism">${escapeHtml(option.mechanism || "")}</p>
        ${option.rationale ? `<p class="option-rationale"><span class="mini-label">Why it helps</span> ${escapeHtml(option.rationale)}</p>` : ""}
        ${tradeoffs}
        ${basis}
        <label class="route-toggle">
          <input type="checkbox" name="selectedSolution" value="${escapeHtml(option.id)}" aria-describedby="${titleId}" ${selected ? "checked" : ""}>
          <span>Add to route</span>
        </label>
      </li>
    `;
  }).join("")}</ol>`;
}

export function renderRouteSummary(model) {
  const stops = [
    ["Goal", model.participationGoal],
    ["Task", model.task],
    ["Context", model.context],
    ["Barrier", model.barrier]
  ];
  return `
    <ol class="route-summary">
      ${stops.map(([label, value]) => `
        <li class="summary-stop">
          <span class="mini-label">${label}</span>
          <span class="summary-text">${escapeHtml(value || "Not specified yet")}</span>
        </li>
      `).join("")}
      <li class="summary-stop is-terminus">
        <span class="mini-label">Functional need</span>
        <span class="summary-need">${escapeHtml(model.functionalNeed || "Not specified yet")}</span>
      </li>
    </ol>
    <dl class="summary-extras">
      <div><dt class="mini-label">Strengths</dt><dd>${escapeHtml((model.strengths || []).join("; ") || "None listed")}</dd></div>
      <div><dt class="mini-label">Constraints</dt><dd>${escapeHtml((model.constraints || []).join("; ") || "None listed")}</dd></div>
    </dl>
  `;
}

export function renderClarifyingQuestions(questions = []) {
  if (!questions || questions.length === 0) return "";
  return `
    <section class="notice notice-questions" aria-labelledby="questions-title">
      <h3 id="questions-title" class="notice-title">Questions that sharpen the route</h3>
      <p>Ask these to pin down the barrier mechanism without relying on medical labels.</p>
      <ol class="question-list">
        ${questions.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}
      </ol>
    </section>
  `;
}

const ARTIFACT_TABS = [
  {
    key: "letter",
    field: "requestLetter",
    tab: "Request letter",
    title: "Accommodation request letter",
    desc: "Frames functional limitations without exposing diagnostic records. Review before sending; this is a draft, not legal advice.",
    filename: "accommodation-request.txt"
  },
  {
    key: "techspec",
    field: "technicalSpec",
    tab: "Technical spec",
    title: "Technical specification and coding-agent prompt",
    desc: "Paste into a coding agent or hand to an engineering team. States WCAG 2.2 acceptance criteria.",
    filename: "technical-spec-prompt.md"
  },
  {
    key: "checklist",
    field: "implementationChecklist",
    tab: "Checklist",
    title: "Implementation and safety checklist",
    desc: "Phased steps: interactive agreement, procurement, IT vetting, safety boundary review.",
    filename: "implementation-checklist.md"
  },
  {
    key: "outcome",
    field: "outcomeProtocol",
    tab: "Validation",
    title: "Outcome validation protocol",
    desc: "How to tell whether the route worked: task completion, fatigue, secondary barriers.",
    filename: "outcome-validation-protocol.md"
  }
];

export function renderCompiledArtifacts(artifacts, activeKey = "letter") {
  if (!artifacts) return "";
  const active = ARTIFACT_TABS.some((t) => t.key === activeKey) ? activeKey : "letter";

  return `
    <div class="document">
      <div class="doc-tabs" role="tablist" aria-label="Compiled documents">
        ${ARTIFACT_TABS.map((t, i) => `
          <button type="button" class="tab-btn" role="tab" id="tab-btn-${t.key}" data-tab="${t.key}"
            aria-controls="tab-${t.key}" aria-selected="${t.key === active}" tabindex="${t.key === active ? "0" : "-1"}">
            <span class="tab-num" aria-hidden="true">${i + 1}</span>${t.tab}
          </button>
        `).join("")}
      </div>
      ${ARTIFACT_TABS.map((t) => `
        <div class="tab-panel" id="tab-${t.key}" role="tabpanel" aria-labelledby="tab-btn-${t.key}" tabindex="0" ${t.key === active ? "" : "hidden"}>
          <div class="doc-head">
            <div>
              <h3 class="doc-title">${t.title}</h3>
              <p class="doc-desc">${t.desc}</p>
            </div>
            <div class="doc-actions">
              <button type="button" class="btn btn-quiet copy-btn" data-target="content-${t.key}">Copy</button>
              <button type="button" class="btn btn-quiet download-btn" data-target="content-${t.key}" data-filename="${t.filename}">Download</button>
            </div>
          </div>
          <pre class="doc-body"><code id="content-${t.key}">${escapeHtml(artifacts[t.field])}</code></pre>
        </div>
      `).join("")}
    </div>
  `;
}

function renderResourceRow(resource) {
  return `
    <li class="directory-row">
      <div class="directory-name">
        <h4>${escapeHtml(resource.name)}</h4>
        ${resource.url ? `<a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">Visit<span class="visually-hidden"> ${escapeHtml(resource.name)} (opens in a new tab)</span> <span aria-hidden="true">↗</span></a>` : ""}
      </div>
      <p class="directory-cap">${escapeHtml(resource.capability)}</p>
      ${resource.evidenceNotes ? `<p class="footnote">${escapeHtml(resource.evidenceNotes)}</p>` : ""}
      <p class="tag-line">${(resource.domains || []).map(escapeHtml).join(" · ")}</p>
    </li>
  `;
}

export function renderResourceOptions(resources = [], matchedIds = []) {
  const matched = resources.filter((r) => matchedIds.includes(r.id));
  const others = resources.filter((r) => !matchedIds.includes(r.id));
  return `
    ${matched.length ? `
      <h3 class="group-label">On this route <span class="count">${matched.length}</span></h3>
      <ul class="directory">${matched.map(renderResourceRow).join("")}</ul>
    ` : ""}
    <details class="more" ${matched.length ? "" : "open"}>
      <summary>${matched.length ? "Other resources" : "All resources"} <span class="count">${others.length}</span></summary>
      <ul class="directory">${others.map(renderResourceRow).join("")}</ul>
    </details>
  `;
}

export function renderPatterns(patterns = []) {
  return `<ul class="catalogue">${patterns.map((pattern) => {
    const reviewed = pattern.reviewStatus === "source-reviewed";
    return `
      <li>
        <details class="catalogue-row">
          <summary>
            <span class="pattern-code">${escapeHtml(pattern.id)}</span>
            <span class="pattern-title">${escapeHtml(pattern.title)}</span>
            <span class="stamp ${reviewed ? "stamp-reviewed" : "stamp-draft"}">${reviewed ? "Source-reviewed" : "Draft synthesis"}</span>
          </summary>
          <div class="pattern-body">
            <p><span class="mini-label">Functional need</span> ${escapeHtml(pattern.functionalNeed)}</p>
            <p><span class="mini-label">Mechanism</span> ${escapeHtml(pattern.mechanism)}</p>
            <p><span class="mini-label">Approaches</span> ${pattern.candidateApproaches.map((a) => escapeHtml(humanize(a))).join(" · ")}</p>
            <div><h4 class="mini-label">Trade-offs</h4><ul>${pattern.tradeoffs.map((t) => `<li>${escapeHtml(humanize(t))}</li>`).join("")}</ul></div>
            ${pattern.safetyBoundary ? `<p class="notice notice-safety"><strong>Safety boundary.</strong> ${escapeHtml(pattern.safetyBoundary)}</p>` : ""}
            ${pattern.provenance?.notes ? `<p class="footnote"><span class="mini-label">Provenance</span> ${escapeHtml(pattern.provenance.notes)}</p>` : ""}
          </div>
        </details>
      </li>
    `;
  }).join("")}</ul>`;
}

export function renderMatchedPatterns(matches = [], resources = [], sources = []) {
  return matches.map(({ pattern, confidence, reasons, matchedTerms }) => {
    const routed = routeResources(pattern, resources);
    const sourceLabel = (pattern.provenance?.classes || []).map((item) => item.replaceAll("-", " ")).join(", ");
    const linkedSources = (pattern.provenance?.sourceIds || [])
      .map((sourceId) => sources.find((source) => source.id === sourceId))
      .filter(Boolean);
    return `
      <article class="solution-card match-card">
        <p class="eyebrow">${escapeHtml(pattern.id)} · ${escapeHtml(confidence)}</p>
        <h3>${escapeHtml(pattern.title)}</h3>
        <p>${escapeHtml(pattern.mechanism)}</p>
        <p><strong>Functional need:</strong> ${escapeHtml(pattern.functionalNeed)}</p>
        <p><strong>Why it surfaced:</strong> ${escapeHtml(reasons.join(" "))}</p>
        <p><strong>Matched terms:</strong> ${escapeHtml(matchedTerms.join(", ") || "No direct term overlap")}</p>
        <p><strong>Tradeoffs:</strong> ${escapeHtml(pattern.tradeoffs.join("; "))}</p>
        <p><strong>Provenance:</strong> ${escapeHtml(sourceLabel || "unknown")} · <strong>Status:</strong> ${escapeHtml(pattern.reviewStatus)}</p>
        <p><strong>Source discovery links:</strong> ${linkedSources.length ? linkedSources.map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>`).join("; ") : "No source mapped"}.</p>
        <p><strong>Source limitations:</strong> ${escapeHtml(linkedSources.map((source) => source.limitations.join("; ")).join(" | ") || "No source mapping is currently attached.")}</p>
        <p><strong>Validation ideas:</strong> ${escapeHtml(pattern.validationIdeas.join("; "))}</p>
        <p><strong>Resource pathways:</strong> ${escapeHtml(routed.map((resource) => resource.name).join(", ") || "Needs resource review")}</p>
        <label class="select-option">
          <input type="checkbox" name="selectedPattern" value="${escapeHtml(pattern.id)}">
          Include this pattern in the draft plan
        </label>
      </article>
    `;
  }).join("");
}

export function renderSourceCatalog(sources = []) {
  return sources.map((source) => `
    <li>
      <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} (opens source)</a>
      <p><strong>Publisher:</strong> ${escapeHtml(source.publisher)} · <strong>Review:</strong> ${escapeHtml(source.reviewStatus)}</p>
      <p><strong>May inform:</strong> ${escapeHtml(source.supports.join("; "))}</p>
      <p><strong>Limitations:</strong> ${escapeHtml(source.limitations.join("; "))}</p>
      <p class="muted">This is a source-discovery record, not a completed evidence review. Read the source directly before using it to support a specific claim.</p>
    </li>
  `).join("");
}
