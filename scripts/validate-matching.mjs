import { syntheticCases } from "../src/data/synthetic-cases.js";
import { accommodationPatterns } from "../src/data/accommodation-patterns.js";
import { resourceCategories } from "../src/data/resources.js";
import { matchAccommodationPatterns, routeResources } from "../src/domain/solution-matcher.js";

let failed = false;
function assert(condition, message) {
  if (!condition) { failed = true; console.error("FAIL:", message); }
}

const cases = [
  { id: "cognitive", model: { functionalNeed: "Reduce cognitive load and information density", barrier: "Too much visual information and frequent interruptions", task: "Complete documentation", context: "busy office", constraints: [] }, expected: "AP-001" },
  { id: "web", model: { functionalNeed: "Maintain orientation and navigation", barrier: "Loses place on a complex website form", task: "Complete online form", context: "public website", constraints: [] }, expected: "AP-003" },
  { id: "grip", model: { functionalNeed: "Reduce sustained grip effort", barrier: "Difficulty holding a tool handle", task: "Use handheld tool", context: "work task", constraints: [] }, expected: "AP-004" },
  { id: "communication", model: { functionalNeed: "Support understanding and expression", barrier: "Communication is difficult across language modes", task: "Understand spoken instructions", context: "service interaction", constraints: [] }, expected: "AP-005" }
];

for (const testCase of cases) {
  const ranked = matchAccommodationPatterns(testCase.model, accommodationPatterns, { limit: 3 });
  assert(ranked.length > 0, testCase.id + " returns options");
  assert(ranked[0].pattern.id === testCase.expected, testCase.id + " ranks expected pattern first; got " + ranked[0]?.pattern.id);
  assert(Array.isArray(ranked[0].reasons) && ranked[0].reasons.length > 0, testCase.id + " exposes rationale");
}

const grip = accommodationPatterns.find((pattern) => pattern.id === "AP-004");
assert(routeResources(grip, resourceCategories).some((item) => item.id === "assistive-technology"), "physical solution routes to assistive technology");
assert(routeResources(accommodationPatterns.find((p) => p.id === "AP-003"), resourceCategories).some((item) => item.id === "techa11y"), "web orientation routes to TechA11y");

if (failed) process.exit(1);
console.log(`Solution matching tests passed for ${cases.length} scenarios and resource routing checks.`);
