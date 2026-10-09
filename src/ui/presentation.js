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

export function renderResourceOptions(resources = []) {
  return resources.map((resource) => `
    <li>
      <strong>${escapeHtml(resource.name)}</strong>
      <span>${escapeHtml(resource.capability)}</span>
    </li>
  `).join("");
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
