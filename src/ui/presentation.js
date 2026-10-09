export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderOptions(options = []) {
  return options.map((option) => `
    <article class="solution-card">
      <p class="eyebrow">${escapeHtml(option.type || "option")}</p>
      <h3>${escapeHtml(option.name)}</h3>
      <p>${escapeHtml(option.mechanism || "")}</p>
      <p><strong>Why it may help:</strong> ${escapeHtml(option.rationale || "")}</p>
      <p><strong>Implementation:</strong> ${escapeHtml(option.implementationDifficulty || "to be assessed")}</p>
      <p><strong>Tradeoffs:</strong> ${escapeHtml((option.tradeoffs || []).join("; "))}</p>
      <label class="select-option">
        <input type="checkbox" name="selectedSolution" value="${escapeHtml(option.id)}">
        Include in action plan
      </label>
    </article>
  `).join("");
}

export function renderResourceOptions(resources = []) {
  return resources.map((resource) => `
    <li>
      <strong>${escapeHtml(resource.name)}</strong>
      <span>${escapeHtml(resource.capability)}</span>
    </li>
  `).join("");
}
