export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getTypeBadge(type = "option") {
  const map = {
    digital: { label: "Digital / Software", color: "badge-blue" },
    environmental: { label: "Environmental", color: "badge-green" },
    organizational: { label: "Process / Policy", color: "badge-purple" },
    physical: { label: "Physical / Ergonomic", color: "badge-amber" },
    "assistive-tech": { label: "Assistive Tech", color: "badge-teal" }
  };
  const badge = map[type.toLowerCase()] || { label: type, color: "badge-gray" };
  return `<span class="badge ${badge.color}">${escapeHtml(badge.label)}</span>`;
}

export function getDifficultyBadge(difficulty = "medium") {
  const map = {
    low: { label: "Low Effort", color: "diff-low" },
    medium: { label: "Moderate Effort", color: "diff-med" },
    high: { label: "High / Specialized", color: "diff-high" }
  };
  const diff = map[difficulty.toLowerCase()] || { label: difficulty, color: "diff-med" };
  return `<span class="diff-tag ${diff.color}">${escapeHtml(diff.label)}</span>`;
}

export function renderOptions(options = [], selectedIds = []) {
  if (!options || options.length === 0) {
    return `<p class="empty-state">No solution pathways generated yet. Select or describe a barrier above.</p>`;
  }

  return options.map((option) => {
    const isChecked = selectedIds.includes(option.id) ? "checked" : "";
    const evidenceList = (option.evidence && option.evidence.length > 0)
      ? `<div class="card-evidence"><strong>Evidence & Standards:</strong> ${option.evidence.map((e) => `<span class="pill-mini">${escapeHtml(e)}</span>`).join(" ")}</div>`
      : "";

    const tradeoffsList = (option.tradeoffs && option.tradeoffs.length > 0)
      ? `<div class="card-tradeoffs"><strong>Tradeoffs & Risks:</strong> <ul>${option.tradeoffs.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul></div>`
      : "";

    return `
      <article class="solution-card ${isChecked ? 'is-selected' : ''}" id="card-${escapeHtml(option.id)}">
        <div class="card-header">
          ${getTypeBadge(option.type)}
          ${getDifficultyBadge(option.implementationDifficulty)}
        </div>
        <h3 class="card-title">${escapeHtml(option.name)}</h3>
        <p class="card-mechanism"><strong>Mechanism:</strong> ${escapeHtml(option.mechanism || "")}</p>
        <p class="card-rationale"><strong>Why it helps:</strong> ${escapeHtml(option.rationale || "")}</p>
        ${tradeoffsList}
        ${evidenceList}
        <label class="select-option-box">
          <input type="checkbox" name="selectedSolution" value="${escapeHtml(option.id)}" ${isChecked}>
          <span class="checkbox-label">Select this pathway for Action Plan & Compiler</span>
        </label>
      </article>
    `;
  }).join("");
}

export function renderClarifyingQuestions(questions = []) {
  if (!questions || questions.length === 0) return "";
  return `
    <div class="clarifying-box" role="region" aria-label="Clarifying Questions">
      <div class="clarifying-header">
        <span class="clarifying-icon" aria-hidden="true">💡</span>
        <h4>Clarifying Questions to Sharpen Context</h4>
      </div>
      <p class="clarifying-desc">These targeted inquiry prompts help isolate the exact barrier mechanism from medical labels:</p>
      <ul class="clarifying-list">
        ${questions.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}
      </ul>
    </div>
  `;
}

export function renderCompiledArtifacts(artifacts, options = {}) {
  if (!artifacts) return "";

  return `
    <div class="compiler-workbench" id="compiler-workbench">
      <div class="compiler-toolbar">
        <div class="artifact-tabs" role="tablist" aria-label="Compiled Artifacts">
          <button class="tab-btn active" role="tab" aria-selected="true" data-tab="tab-letter" id="tab-btn-letter">
            ✉️ Accommodation Request Letter
          </button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="tab-techspec" id="tab-btn-techspec">
            💻 AI Coding Agent / Tech Spec
          </button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="tab-checklist" id="tab-btn-checklist">
            📋 Implementation Checklist
          </button>
          <button class="tab-btn" role="tab" aria-selected="false" data-tab="tab-outcome" id="tab-btn-outcome">
            📊 Outcome & Validation Rubric
          </button>
        </div>
      </div>

      <!-- Tab 1: Request Letter -->
      <div class="tab-panel active" id="tab-letter" role="tabpanel" aria-labelledby="tab-btn-letter">
        <div class="tab-panel-header">
          <div>
            <h4>Formal Accommodation Request Letter</h4>
            <p class="panel-subtitle">ADA Title I / JAN compliant language framing functional limitations without exposing private diagnostic records.</p>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn-secondary copy-btn" data-target="content-letter">📋 Copy Letter</button>
            <button type="button" class="btn-secondary download-btn" data-target="content-letter" data-filename="accommodation-request.txt">💾 Download</button>
          </div>
        </div>
        <pre class="artifact-pre"><code id="content-letter">${escapeHtml(artifacts.requestLetter)}</code></pre>
      </div>

      <!-- Tab 2: Technical Spec -->
      <div class="tab-panel" id="tab-techspec" role="tabpanel" aria-labelledby="tab-btn-techspec" hidden>
        <div class="tab-panel-header">
          <div>
            <h4>Technical Specification & AI Coding Agent Prompt</h4>
            <p class="panel-subtitle">Ready to paste into Claude, GPT-4, Antigravity, or assign to software engineering teams. Enforces WCAG 2.2 AA/AAA.</p>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn-secondary copy-btn" data-target="content-techspec">📋 Copy Prompt</button>
            <button type="button" class="btn-secondary download-btn" data-target="content-techspec" data-filename="technical-spec-prompt.md">💾 Download</button>
          </div>
        </div>
        <pre class="artifact-pre"><code id="content-techspec">${escapeHtml(artifacts.technicalSpec)}</code></pre>
      </div>

      <!-- Tab 3: Implementation Checklist -->
      <div class="tab-panel" id="tab-checklist" role="tabpanel" aria-labelledby="tab-btn-checklist" hidden>
        <div class="tab-panel-header">
          <div>
            <h4>Workplace Implementation & Safety Checklist</h4>
            <p class="panel-subtitle">Phased execution roadmap spanning interactive agreement, procurement, IT security vetting, and safety boundary review.</p>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn-secondary copy-btn" data-target="content-checklist">📋 Copy Checklist</button>
            <button type="button" class="btn-secondary download-btn" data-target="content-checklist" data-filename="implementation-checklist.md">💾 Download</button>
          </div>
        </div>
        <pre class="artifact-pre"><code id="content-checklist">${escapeHtml(artifacts.implementationChecklist)}</code></pre>
      </div>

      <!-- Tab 4: Outcome Protocol -->
      <div class="tab-panel" id="tab-outcome" role="tabpanel" aria-labelledby="tab-btn-outcome" hidden>
        <div class="tab-panel-header">
          <div>
            <h4>Longitudinal Outcome Validation Protocol</h4>
            <p class="panel-subtitle">VocSpace outcome learning rubric measuring task completion rate, cognitive fatigue, and secondary barrier emergence.</p>
          </div>
          <div class="action-buttons">
            <button type="button" class="btn-secondary copy-btn" data-target="content-outcome">📋 Copy Protocol</button>
            <button type="button" class="btn-secondary download-btn" data-target="content-outcome" data-filename="outcome-validation-protocol.md">💾 Download</button>
          </div>
        </div>
        <pre class="artifact-pre"><code id="content-outcome">${escapeHtml(artifacts.outcomeProtocol)}</code></pre>
      </div>
    </div>
  `;
}

export function renderResourceOptions(resources = []) {
  return resources.map((resource) => `
    <li class="resource-card">
      <div class="resource-top">
        <h4 class="resource-name">${escapeHtml(resource.name)}</h4>
        ${resource.url ? `<a href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">Visit Resource ↗</a>` : ""}
      </div>
      <p class="resource-cap">${escapeHtml(resource.capability)}</p>
      ${resource.evidenceNotes ? `<p class="resource-notes"><em>${escapeHtml(resource.evidenceNotes)}</em></p>` : ""}
      <div class="resource-tags">
        ${(resource.domains || []).map((dom) => `<span class="pill-mini">${escapeHtml(dom)}</span>`).join(" ")}
      </div>
    </li>
  `).join("");
}

export function renderPatterns(patterns = []) {
  return patterns.map((pattern) => `
    <article class="pattern-card">
      <div class="pattern-header">
        <span class="pattern-id">${escapeHtml(pattern.id)}</span>
        <span class="pattern-status ${pattern.reviewStatus === 'source-reviewed' ? 'status-reviewed' : 'status-draft'}">${escapeHtml(pattern.reviewStatus)}</span>
      </div>
      <h3 class="pattern-title">${escapeHtml(pattern.title)}</h3>
      <p><strong>Functional Need:</strong> ${escapeHtml(pattern.functionalNeed)}</p>
      <p><strong>Mechanism:</strong> ${escapeHtml(pattern.mechanism)}</p>
      <div class="pattern-approaches">
        <strong>Approaches:</strong>
        <div class="tag-row">${pattern.candidateApproaches.map((app) => `<span class="approach-tag">${escapeHtml(app)}</span>`).join(" ")}</div>
      </div>
      <div class="pattern-tradeoffs">
        <strong>Tradeoffs:</strong>
        <ul>${pattern.tradeoffs.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
      </div>
      ${pattern.safetyBoundary ? `<div class="safety-warning">⚠️ <strong>Safety Boundary:</strong> ${escapeHtml(pattern.safetyBoundary)}</div>` : ""}
    </article>
  `).join("");
}
