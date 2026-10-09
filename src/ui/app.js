import { syntheticCases } from "../data/synthetic-cases.js";
import { accommodationPatterns } from "../data/accommodation-patterns.js";
import { resourceCategories } from "../data/resources.js";
import { createActionPlan } from "../domain/action-plan.js";
import { escapeHtml, renderOptions, renderResourceOptions } from "./presentation.js";

const root = document.querySelector("#app");

function renderCase(caseId = syntheticCases[0]?.id) {
  const item = syntheticCases.find((candidate) => candidate.id === caseId) || syntheticCases[0];
  if (!root || !item) return;

  root.innerHTML = `
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">VOCSPACE · SYNTHETIC DEMO</p>
      <h1 id="page-title">Turn barriers into possibilities.</h1>
      <p>Describe what someone is trying to do, understand the barrier, and compare possible paths forward.</p>
      <p class="notice"><strong>Prototype:</strong> These are illustrative options, not legal, medical, or individualized professional determinations. Use synthetic examples only.</p>
    </section>

    <section class="panel" aria-labelledby="case-title">
      <h2 id="case-title">1. Explore a barrier</h2>
      <label for="case-select">Choose a synthetic case</label>
      <select id="case-select">
        ${syntheticCases.map((candidate) => `<option value="${escapeHtml(candidate.id)}" ${candidate.id === item.id ? "selected" : ""}>${escapeHtml(candidate.title)}</option>`).join("")}
      </select>
      <dl class="functional-model">
        <dt>Participation goal</dt><dd>${escapeHtml(item.participationGoal)}</dd>
        <dt>Task</dt><dd>${escapeHtml(item.task)}</dd>
        <dt>Context</dt><dd>${escapeHtml(item.context)}</dd>
        <dt>Barrier</dt><dd>${escapeHtml(item.barrier)}</dd>
        <dt>Functional need</dt><dd>${escapeHtml(item.functionalNeed)}</dd>
        <dt>Strengths</dt><dd>${escapeHtml(item.strengths.join("; "))}</dd>
        <dt>Constraints</dt><dd>${escapeHtml(item.constraints.join("; "))}</dd>
      </dl>
    </section>

    <section class="panel" aria-labelledby="solution-title">
      <h2 id="solution-title">2. Compare solution pathways</h2>
      <p>No single option is presumed correct. Compare possible mechanisms, tradeoffs, and implementation needs.</p>
      <div class="solution-grid">${renderOptions(item.solutions)}</div>
      <button id="build-plan" type="button">Build an action plan from selected options</button>
      <div id="action-plan" aria-live="polite"></div>
    </section>

    <section class="panel" aria-labelledby="pattern-title">
      <h2 id="pattern-title">3. Browse accommodation patterns</h2>
      <p>These initial patterns are original VocSpace synthesis, marked draft and not yet evidence-validated.</p>
      <ul class="pattern-list">
        ${accommodationPatterns.map((pattern) => `
          <li><h3>${escapeHtml(pattern.id)} · ${escapeHtml(pattern.title)}</h3>
          <p><strong>Functional need:</strong> ${escapeHtml(pattern.functionalNeed)}</p>
          <p><strong>Mechanism:</strong> ${escapeHtml(pattern.mechanism)}</p>
          <p><strong>Review status:</strong> ${escapeHtml(pattern.reviewStatus)}</p></li>
        `).join("")}
      </ul>
    </section>

    <section class="panel" aria-labelledby="resource-title">
      <h2 id="resource-title">4. Resource ecosystem</h2>
      <p>Route by capability. Resource links and source records should be reviewed before user-facing launch.</p>
      <ul class="resource-list">${renderResourceOptions(resourceCategories)}</ul>
    </section>

    <footer>
      <p>VocSpace is an open-source exploration of accessibility and vocational innovation. This demo uses synthetic data only.</p>
    </footer>
  `;

  document.querySelector("#case-select")?.addEventListener("change", (event) => renderCase(event.target.value));
  document.querySelector("#build-plan")?.addEventListener("click", () => {
    const selectedIds = Array.from(document.querySelectorAll('input[name="selectedSolution"]:checked')).map((input) => input.value);
    const selected = item.solutions.filter((solution) => selectedIds.includes(solution.id));
    const plan = createActionPlan(selected);
    const planRoot = document.querySelector("#action-plan");
    if (!planRoot) return;
    if (!selected.length) {
      planRoot.innerHTML = "<p role=\"status\">Select one or more options to build a draft action plan.</p>";
      return;
    }
    planRoot.innerHTML = `
      <h3>Draft action plan</h3>
      <ol>${plan.implementationSteps.map((step) => `<li>${escapeHtml(step.step)}</li>`).join("")}</ol>
      <p><strong>Validation question:</strong> ${escapeHtml(plan.validationQuestion)}</p>
      <p><strong>Outcome to measure:</strong> ${escapeHtml(plan.outcomeMeasure)}</p>
      <p>This plan is a starting point for discussion and testing, not a guarantee of effectiveness.</p>
    `;
  });
}

renderCase();
