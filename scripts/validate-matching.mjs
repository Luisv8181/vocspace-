import test from "node:test";
import assert from "node:assert/strict";
import { syntheticCases } from "../src/data/synthetic-cases.js";
import { accommodationPatterns } from "../src/data/accommodation-patterns.js";
import { resourceCategories } from "../src/data/resources.js";
import { matchAccommodationPatterns, routeResources, hasSufficientContext } from "../src/domain/solution-matcher.js";
import { createActionPlan } from "../src/domain/action-plan.js";

test("synthetic cognitive-load case ranks information reduction first", () => {
  const model = syntheticCases[0];
  const ranked = matchAccommodationPatterns(model, accommodationPatterns);
  assert.equal(ranked[0].pattern.id, "AP-001");
  assert.ok(ranked[0].reasons.length > 0);
});

test("website navigation case ranks website orientation first", () => {
  const model = syntheticCases.find((item) => item.id === "case-web-navigation-002");
  const ranked = matchAccommodationPatterns(model, accommodationPatterns);
  assert.equal(ranked[0].pattern.id, "AP-003");
});

test("grip case ranks the physical grip pattern first", () => {
  const model = syntheticCases.find((item) => item.id === "case-tool-grip-003");
  const ranked = matchAccommodationPatterns(model, accommodationPatterns);
  assert.equal(ranked[0].pattern.id, "AP-004");
});

test("results are limited and expose transparent explanations", () => {
  const ranked = matchAccommodationPatterns(syntheticCases[0], accommodationPatterns, { limit: 2 });
  assert.equal(ranked.length, 2);
  assert.ok(ranked.every((item) => item.confidence && item.reasons.length && Array.isArray(item.matchedTerms)));
});

test("resource routing follows pattern capability", () => {
  const webPattern = accommodationPatterns.find((p) => p.id === "AP-003");
  const ids = routeResources(webPattern, resourceCategories).map((resource) => resource.id);
  assert.ok(ids.includes("techa11y"));
  assert.ok(ids.includes("developer-coding-agent"));
});

test("action plan preserves selected pattern rationale and baseline measures", () => {
  const pattern = accommodationPatterns.find((item) => item.id === "AP-003");
  const plan = createActionPlan([{
    id: pattern.id,
    name: pattern.title,
    patternId: pattern.id,
    rationale: "Matched website orientation terms.",
    implementationStep: "Review page structure and test keyboard navigation.",
    tradeoffs: pattern.tradeoffs
  }], { participationGoal: "Complete a form", functionalNeed: pattern.functionalNeed });
  assert.equal(plan.selectedSolutions[0].patternId, "AP-003");
  assert.equal(plan.selectedSolutions[0].rationale, "Matched website orientation terms.");
  assert.equal(plan.validation.baselineNeeded, true);
  assert.ok(plan.validation.measures.includes("task completion"));
});

test("custom barrier with grip-related need ranks grip pattern first", () => {
  const model = {
    participationGoal: "Use a tool with less effort",
    functionalNeed: "Reduce sustained grip effort",
    barrier: "Difficulty holding a tool handle",
    task: "Use handheld tool",
    context: "work task",
    constraints: ["low-cost"]
  };
  assert.equal(matchAccommodationPatterns(model, accommodationPatterns)[0].pattern.id, "AP-004");
});


test("under-specified input requests more context instead of ranking", () => {
  const model = { functionalNeed: "", barrier: "", task: "", context: "", constraints: [] };
  assert.equal(hasSufficientContext(model), false);
  assert.deepEqual(matchAccommodationPatterns(model, accommodationPatterns), []);
});

test("unrelated input produces no misleading ranked result", () => {
  const model = {
    functionalNeed: "I want to learn astronomy",
    barrier: "My telescope manual is missing a page",
    task: "Identify constellations for a hobby project",
    context: "personal hobby at home",
    constraints: []
  };
  const ranked = matchAccommodationPatterns(model, accommodationPatterns);
  assert.deepEqual(ranked, []);
});

test("communication support ranks communication-access pattern first", () => {
  const model = {
    functionalNeed: "Support understanding and expression",
    barrier: "Communication is difficult across language modes",
    task: "Understand spoken instructions",
    context: "service interaction",
    constraints: []
  };
  assert.equal(matchAccommodationPatterns(model, accommodationPatterns)[0].pattern.id, "AP-005");
});

test("a physical tool context does not rank digital patterns above grip support", () => {
  const model = {
    functionalNeed: "Reduce grip effort while using a tool",
    barrier: "The tool handle is too narrow to hold comfortably",
    task: "Hold and operate a hand tool",
    context: "physical work task",
    constraints: ["low cost"]
  };
  const ranked = matchAccommodationPatterns(model, accommodationPatterns);
  assert.equal(ranked[0].pattern.id, "AP-004");
  assert.ok(ranked[0].hasMeaningfulMatch);
});

test("pattern results do not claim source review for draft synthesis", () => {
  const ranked = matchAccommodationPatterns(syntheticCases[0], accommodationPatterns);
  assert.ok(ranked.every((result) =>
    result.pattern.reviewStatus !== "draft" ||
    result.pattern.provenance.classes.includes("vocspace-synthesis")
  ));
});

test("task resumption matches interruptions and next-action language", () => {
  const model = {
    functionalNeed: "Help me resume my task after interruptions",
    barrier: "I lose my place and forget the next action",
    task: "Return to multi-step documentation work",
    context: "office work",
    constraints: []
  };
  assert.equal(matchAccommodationPatterns(model, accommodationPatterns)[0].pattern.id, "AP-002");
});


const regressionScenarios = [
  {
    name: "visual clutter and notifications",
    model: { functionalNeed: "Reduce visual clutter and maintain focus", barrier: "Notifications compete with task attention", task: "Complete office documentation", context: "busy office", constraints: [] },
    expected: "AP-001"
  },
  {
    name: "task resumption after interruptions",
    model: { functionalNeed: "Resume the right step and remember the next action after interruptions", barrier: "Loses place during multi-step work", task: "Return to documentation", context: "office work", constraints: [] },
    expected: "AP-002"
  },
  {
    name: "online form navigation",
    model: { functionalNeed: "Maintain navigation through an online form", barrier: "Loses location and progress in a portal", task: "Complete public service application", context: "website", constraints: [] },
    expected: "AP-003"
  },
  {
    name: "grip force on a hand tool",
    model: { functionalNeed: "Reduce grip force while holding a tool", barrier: "Handle is difficult to grasp", task: "Operate hand tool", context: "physical work task", constraints: [] },
    expected: "AP-004"
  },
  {
    name: "captions and language access",
    model: { functionalNeed: "Understand instructions using captions and translated text", barrier: "Spoken information is difficult to understand", task: "Communicate during service interaction", context: "service setting", constraints: [] },
    expected: "AP-005"
  },
  {
    name: "office attention without private office",
    model: { functionalNeed: "Reduce competing visual and auditory stimuli", barrier: "Open office distractions interrupt attention", task: "Sustain focus while writing", context: "workplace", constraints: [] },
    expected: "AP-001"
  },
  {
    name: "keep place in multi-step portal",
    model: { functionalNeed: "Maintain orientation and next steps", barrier: "Loses place while navigating an online form", task: "Submit a portal application", context: "public website", constraints: [] },
    expected: "AP-003"
  },
  {
    name: "remember task after a call",
    model: { functionalNeed: "Resume task and remember next action", barrier: "Forgets where the task stopped after a phone interruption", task: "Complete multi-step work", context: "workplace", constraints: [] },
    expected: "AP-002"
  },
  {
    name: "repeated grasping causes effort",
    model: { functionalNeed: "Reduce sustained grip effort", barrier: "Tool handle is hard to hold repeatedly", task: "Use a handheld tool", context: "low-risk task", constraints: [] },
    expected: "AP-004"
  },
  {
    name: "written transcript for spoken instructions",
    model: { functionalNeed: "Support understanding of spoken instructions", barrier: "Important communication is hard to follow in real time", task: "Review captions and transcript", context: "service interaction", constraints: [] },
    expected: "AP-005"
  }
];

for (const scenario of regressionScenarios) {
  test("regression: " + scenario.name, () => {
    const ranked = matchAccommodationPatterns(scenario.model, accommodationPatterns, { limit: 5 });
    assert.ok(ranked.length > 0, "expected one or more relevant options");
    assert.equal(ranked[0].pattern.id, scenario.expected);
    assert.ok(ranked[0].hasMeaningfulMatch);
  });
}
