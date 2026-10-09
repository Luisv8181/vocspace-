import { syntheticCases } from "../data/synthetic-cases.js";
import { accommodationPatterns } from "../data/accommodation-patterns.js";
import { resourceCategories } from "../data/resources.js";
import { createActionPlan } from "../domain/action-plan.js";
import { matchAccommodationPatterns, hasSufficientContext } from "../domain/solution-matcher.js";
import { escapeHtml, renderOptions, renderResourceOptions, renderMatchedPatterns } from "./presentation.js";

const root = document.querySelector("#app");
const solutionSection = (options) => `
  <section class="panel" aria-labelledby="solution-title">
    <h2 id="solution-title">2. Compare solution pathways</h2>
    <p>No single option is presumed correct. Compare mechanisms, tradeoffs, and implementation needs.</p>
    <div class="solution-grid">${renderOptions(options)}</div>
    <button id="build-plan" type="button">Build an action plan from selected options</button>
    <div id="action-plan" aria-live="polite"></div>
  </section>
`;

function renderCase(caseId = syntheticCases[0]?.id, customModel = null) {
  const item = syntheticCases.find((candidate) => candidate.id === caseId) || syntheticCases[0];
  if (!root || !item) return;
  const model = customModel || item;

  root.innerHTML = `
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">VOCSPACE · V0.1 PROTOTYPE</p>
      <h1 id="page-title">Turn barriers into possibilities.</h1>
      <p>Start with a person's goal and what gets in the way. Explore options before choosing a solution.</p>
      <p class="notice"><strong>Prototype:</strong> This demo is not a legal, medical, or individualized professional determination. Do not enter names, private case details, or other sensitive information. Text stays in this browser session and is not sent to a backend by this prototype.</p>
    </section>

    <section class="panel" aria-labelledby="input-title">
      <h2 id="input-title">1. Describe or explore a barrier</h2>
      <label for="case-select">Start with a synthetic example</label>
      <select id="case-select">
        <option value="custom" ${customModel ? "selected" : ""}>Describe a barrier (local draft)</option>
        ${syntheticCases.map((candidate) => `<option value="${escapeHtml(candidate.id)}" ${!customModel && candidate.id === item.id ? "selected" : ""}>${escapeHtml(candidate.title)}</option>`).join("")}
      </select>
      <form id="barrier-form">
        <p class="helper">Use general, non-identifying language. This prototype does not save your entry or send it to a service.</p>
        <div class="form-grid">
          <div><label for="goal">Participation goal</label><textarea id="goal" name="goal" rows="2" required>${escapeHtml(model.participationGoal)}</textarea></div>
          <div><label for="task">Task</label><textarea id="task" name="task" rows="2" required>${escapeHtml(model.task)}</textarea></div>
          <div><label for="context">Environment / context</label><textarea id="context" name="context" rows="2" required>${escapeHtml(model.context)}</textarea></div>
          <div><label for="barrier">What gets in the way?</label><textarea id="barrier" name="barrier" rows="3" required>${escapeHtml(model.barrier)}</textarea></div>
          <div><label for="need">What functional support might help?</label><textarea id="need" name="need" rows="2" required>${escapeHtml(model.functionalNeed)}</textarea></div>
          <div><label for="strengths">Strengths / strategies already working</label><textarea id="strengths" name="strengths" rows="2">${escapeHtml(model.strengths.join("; "))}</textarea></div>
          <div><label for="constraints">Constraints to consider</label><textarea id="constraints" name="constraints" rows="2">${escapeHtml(model.constraints.join("; "))}</textarea></div>
        </div>
        <button type="submit">Update functional model</button>
      </form>
      <div id="functional-model-output" class="model-output" aria-live="polite">
        <h3>Functional model</h3>
        <dl class="functional-model">
          <dt>Goal</dt><dd>${escapeHtml(model.participationGoal)}</dd>
          <dt>Task</dt><dd>${escapeHtml(model.task)}</dd>
          <dt>Context</dt><dd>${escapeHtml(model.context)}</dd>
          <dt>Barrier</dt><dd>${escapeHtml(model.barrier)}</dd>
          <dt>Functional need</dt><dd>${escapeHtml(model.functionalNeed)}</dd>
          <dt>Strengths</dt><dd>${escapeHtml(model.strengths.join("; ") || "Not specified")}</dd>
          <dt>Constraints</dt><dd>${escapeHtml(model.constraints.join("; ") || "Not specified")}</dd>
        </dl>
      </div>
    </section>

    <section class="panel" aria-labelledby="solution-title">
      <h2 id="solution-title">2. Compare solution pathways</h2>
      <p>Patterns are ranked using transparent keyword/context matching. These are candidate ideas, not probabilities or guaranteed recommendations.</p>
      <div id="matched-solutions" class="solution-grid"></div>
      <h3 id="case-options-heading">Existing case options</h3>
      <p id="case-options-description">These are case-specific illustrative options, separate from pattern matching. For a custom barrier, use the ranked patterns below and do not assume these options apply.</p>
      <p id="custom-options-note" hidden>Custom barrier mode: preset case options are hidden because they have not been tailored to this model.</p>
      <div class="solution-grid" id="case-options">${renderOptions(item.solutions)}</div>
      <button id="build-plan" type="button">Build an action plan from selected options</button>
      <div id="action-plan" aria-live="polite"></div>
    </section>

    <section class="panel" aria-labelledby="pattern-title">
      <h2 id="pattern-title">3. Accommodation pattern library</h2>
      <p>These are original VocSpace concepts marked as drafts. They are not yet evidence-validated recommendations.</p>
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
      <p>Resources are categorized by capabilities. Verified links and source records are a follow-up requirement before production launch.</p>
      <ul class="resource-list">${renderResourceOptions(resourceCategories)}</ul>
    </section>

    <footer><p>VocSpace explores accessibility and vocational innovation. This prototype runs without a backend and uses synthetic examples by default.</p></footer>
  `;

  const matchedRoot = document.querySelector("#matched-solutions");
  const initialMatches = matchAccommodationPatterns(model, accommodationPatterns, { limit: 5 });
  if (matchedRoot) {
    matchedRoot.innerHTML = hasSufficientContext(model)
      ? (initialMatches.length ? renderMatchedPatterns(initialMatches, resourceCategories) : '<p class="notice" role="status">No clear pattern match yet. Try adding task details, describing the barrier in different words, or review the pattern library manually.</p>')
      : '<p class="notice" role="status">More context needed. Describe at least the functional need or barrier and one more detail about the task or environment.</p>';
  }

  const caseOptionsRoot = document.querySelector("#case-options");
  const caseOptionsHeading = document.querySelector("#case-options-heading");
  const caseOptionsDescription = document.querySelector("#case-options-description");
  const customOptionsNote = document.querySelector("#custom-options-note");
  if (caseOptionsRoot) caseOptionsRoot.hidden = Boolean(customModel);
  if (caseOptionsHeading) caseOptionsHeading.hidden = Boolean(customModel);
  if (caseOptionsDescription) caseOptionsDescription.hidden = Boolean(customModel);
  if (customOptionsNote) customOptionsNote.hidden = !customModel;

  document.querySelector("#case-select")?.addEventListener("change", (event) => {
    if (event.target.value === "custom") renderCase(syntheticCases[0].id, {
      ...syntheticCases[0],
      participationGoal: "", task: "", context: "", barrier: "", functionalNeed: "", strengths: [], constraints: []
    });
    else renderCase(event.target.value);
  });

  document.querySelector("#barrier-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const draft = {
      ...item,
      participationGoal: String(form.get("goal") || "").trim(),
      task: String(form.get("task") || "").trim(),
      context: String(form.get("context") || "").trim(),
      barrier: String(form.get("barrier") || "").trim(),
      functionalNeed: String(form.get("need") || "").trim(),
      strengths: String(form.get("strengths") || "").split(";").map((v) => v.trim()).filter(Boolean),
      constraints: String(form.get("constraints") || "").split(";").map((v) => v.trim()).filter(Boolean)
    };
    const output = document.querySelector("#functional-model-output");
    if (output) output.innerHTML = `
      <h3>Updated functional model</h3>
      <dl class="functional-model">
        <dt>Goal</dt><dd>${escapeHtml(draft.participationGoal)}</dd>
        <dt>Task</dt><dd>${escapeHtml(draft.task)}</dd>
        <dt>Context</dt><dd>${escapeHtml(draft.context)}</dd>
        <dt>Barrier</dt><dd>${escapeHtml(draft.barrier)}</dd>
        <dt>Functional need</dt><dd>${escapeHtml(draft.functionalNeed)}</dd>
        <dt>Strengths</dt><dd>${escapeHtml(draft.strengths.join("; ") || "Not specified")}</dd>
        <dt>Constraints</dt><dd>${escapeHtml(draft.constraints.join("; ") || "Not specified")}</dd>
      </dl>
      <p role="status">Functional model updated in this page. Ranked patterns below are refreshed from your current task, context, barrier, and functional need.</p>
    `;
    const matchesRoot = document.querySelector("#matched-solutions");
    const revisedMatches = matchAccommodationPatterns(draft, accommodationPatterns, { limit: 5 });
    if (matchesRoot) {
      matchesRoot.innerHTML = hasSufficientContext(draft)
        ? (revisedMatches.length ? renderMatchedPatterns(revisedMatches, resourceCategories) : '<p class="notice" role="status">No clear pattern match yet. Add more context or review the pattern library manually.</p>')
        : '<p class="notice" role="status">More context needed. Describe the functional need or barrier and one more detail about the task or environment.</p>';
    }
    const caseOptionsRoot = document.querySelector("#case-options");
    if (caseOptionsRoot) caseOptionsRoot.hidden = Boolean(customModel);
    const caseOptionsHeading = document.querySelector("#case-options-heading");
    const caseOptionsDescription = document.querySelector("#case-options-description");
    const customOptionsNote = document.querySelector("#custom-options-note");
    if (caseOptionsRoot) caseOptionsRoot.hidden = Boolean(customModel);
    if (caseOptionsHeading) caseOptionsHeading.hidden = Boolean(customModel);
    if (caseOptionsDescription) caseOptionsDescription.hidden = Boolean(customModel);
    if (customOptionsNote) customOptionsNote.hidden = !customModel;

  });

  document.querySelector("#build-plan")?.addEventListener("click", () => {
    const selectedIds = Array.from(document.querySelectorAll('input[name="selectedSolution"]:checked')).map((input) => input.value);
    const selectedCaseOptions = item.solutions.filter((solution) => selectedIds.includes(solution.id));
    const selectedPatternIds = Array.from(document.querySelectorAll('input[name="selectedPattern"]:checked')).map((input) => input.value);
    const latestModel = {
      participationGoal: document.querySelector("#goal")?.value?.trim() || model.participationGoal,
      task: document.querySelector("#task")?.value?.trim() || model.task,
      context: document.querySelector("#context")?.value?.trim() || model.context,
      barrier: document.querySelector("#barrier")?.value?.trim() || model.barrier,
      functionalNeed: document.querySelector("#need")?.value?.trim() || model.functionalNeed,
      constraints: (document.querySelector("#constraints")?.value || "").split(";").map((value) => value.trim()).filter(Boolean)
    };
    const matchedSolutions = matchAccommodationPatterns(latestModel, accommodationPatterns, { limit: 10 })
      .filter((match) => selectedPatternIds.includes(match.pattern.id))
      .map((match) => ({
        id: match.pattern.id,
        name: match.pattern.title,
        patternId: match.pattern.id,
        rationale: match.reasons.join(" "),
        implementationDifficulty: "to be assessed",
        tradeoffs: match.pattern.tradeoffs,
        implementationStep: `Review fit and constraints for ${match.pattern.title}, decide who needs to be involved, and agree on a test.`
      }));
    const selected = [...selectedCaseOptions, ...matchedSolutions];
    const plan = createActionPlan(selected, {
      title: "Draft accommodation action plan",
      participationGoal: latestModel.participationGoal,
      functionalNeed: latestModel.functionalNeed
    });
    const planRoot = document.querySelector("#action-plan");
    if (!planRoot) return;
    if (!selected.length) {
      planRoot.innerHTML = "<p role=\"status\">Select one or more case options or matched patterns to build a draft action plan.</p>";
      return;
    }
    planRoot.innerHTML = `
      <h3>${escapeHtml(plan.title)}</h3>
      <p><strong>Participation goal:</strong> ${escapeHtml(plan.participationGoal)}</p>
      <p><strong>Functional need:</strong> ${escapeHtml(plan.functionalNeed)}</p>
      <ol>${plan.implementationSteps.map((step) => `<li>${escapeHtml(step.step)} <span class="muted">Owner: ${escapeHtml(step.owner)} · ${escapeHtml(step.status)}</span></li>`).join("")}</ol>
      <h4>Validation</h4>
      <p><strong>Question:</strong> ${escapeHtml(plan.validation.question)}</p>
      <p><strong>Measures:</strong> ${escapeHtml(plan.validation.measures.join(", "))}</p>
      <p><strong>Baseline:</strong> Record the starting condition before making the change.</p>
      <ul>${plan.cautions.map((caution) => `<li>${escapeHtml(caution)}</li>`).join("")}</ul>
    `;
  });
}

renderCase();
