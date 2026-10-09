import { matchAccommodationPatterns, routeResources } from "../domain/solution-matcher.js";

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
      <p>${escapeHtml(option.mechanism || option.rationale || "")}</p>
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

export function renderMatchedPatterns(matches = [], resources = []) {
  return matches.map(({ pattern, confidence, reasons, matchedTerms }) => {
    const routed = routeResources(pattern, resources);
    const sourceLabel = (pattern.provenance?.classes || []).map((item) => item.replaceAll("-", " ")).join(", ");
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

export function renderResourceOptions(resources = []) {
  return resources.map((resource) => `
    <li>
      <strong>${escapeHtml(resource.name)}</strong>
      <span>${escapeHtml(resource.capability)}</span>
    </li>
  `).join("");
}
