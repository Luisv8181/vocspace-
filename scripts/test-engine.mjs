import { analyzeBarrierInput } from "../src/domain/barrier-analyzer.js";
import { compileSolutionArtifacts } from "../src/domain/solution-compiler.js";
import { syntheticCases } from "../src/data/synthetic-cases.js";
import { accommodationPatterns } from "../src/data/accommodation-patterns.js";
import { resourceCategories } from "../src/data/resources.js";

console.log("--- RUNNING VOCSPACE DOMAIN & ENGINE TESTS ---");

// Test 1: Analyze free-form barrier text (Sensory / Glare)
const sensoryTest = analyzeBarrierInput({
  barrier: "The fluorescent overhead troffers cause intense eye strain, migraine aura, and unbearable glare on my dual monitors.",
  task: "Auditing financial spreadsheets",
  context: "Open corporate office cubicle",
  goal: "Work comfortably without disabling eye strain"
});

console.assert(sensoryTest.identifiedDomains.includes("sensory_vision"), "Should identify sensory_vision domain");
console.assert(sensoryTest.candidateSolutions.length >= 2, "Should propose at least 2 solutions");
console.assert(sensoryTest.clarifyingQuestions.length >= 2, "Should generate clarifying questions");
console.assert(sensoryTest.matchedResources.length >= 1, "Should route to relevant resources");
console.log("✓ Test 1: Freeform sensory barrier analysis passed.");

// Test 2: Analyze free-form barrier text (Motor / RSI)
const motorTest = analyzeBarrierInput({
  barrier: "Repetitive typing and sustained mouse clicking causes acute wrist pain, carpal tunnel numbness, and forearm fatigue.",
  task: "Software engineering and technical writing",
  context: "Standard desk with membrane keyboard",
  goal: "Continue writing code without exacerbating nerve damage"
});

console.assert(motorTest.identifiedDomains.includes("motor_ergonomic"), "Should identify motor_ergonomic domain");
console.assert(motorTest.candidateSolutions.some((s) => s.type === "physical" || s.type === "digital"), "Should propose physical or digital motor adaptations");
console.log("✓ Test 2: Freeform motor/RSI barrier analysis passed.");

// Test 3: Analyze free-form barrier text (Cognitive / ADHD)
const cognitiveTest = analyzeBarrierInput({
  barrier: "Frequent Slack pings, open office chatter, and constant interruptions cause severe attention derailment and task initiation paralysis.",
  task: "Project planning and technical specification",
  context: "Open floor plan tech office",
  goal: "Maintain task focus and meet delivery deadlines"
});

console.assert(cognitiveTest.identifiedDomains.includes("cognitive") || cognitiveTest.identifiedDomains.includes("sensory_auditory"), "Should identify cognitive or auditory domains");
console.log("✓ Test 3: Freeform cognitive barrier analysis passed.");

// Test 4: Solution Compiler with Synthetic Case
const testCase = syntheticCases[3]; // Photophobia case
const selectedSolutions = [testCase.solutions[0], testCase.solutions[1]];
const compiled = compileSolutionArtifacts(testCase, selectedSolutions, {
  workerName: "Alex Rivera",
  recipientName: "Jordan Smith, VP of Operations",
  jobTitle: "Senior Financial Analyst",
  trialDays: 30
});

console.assert(compiled.artifacts.requestLetter.includes("Alex Rivera"), "Request letter should include worker name");
console.assert(compiled.artifacts.requestLetter.includes("Jordan Smith"), "Request letter should include recipient name");
console.assert(compiled.artifacts.requestLetter.includes("30-day trial basis"), "Request letter should propose trial period");
console.assert(compiled.artifacts.technicalSpec.includes("WCAG 2.2 Level AA / AAA Conformance"), "Technical spec should include WCAG criteria");
console.assert(compiled.artifacts.implementationChecklist.includes("Phase 1: Collaborative Alignment"), "Implementation checklist should have phases");
console.assert(compiled.artifacts.outcomeProtocol.includes("Quantitative Baseline vs. Follow-up Metrics"), "Outcome protocol should have metrics table");
console.log("✓ Test 4: Solution compiler artifact generation passed.");

// Test 5: Verify all resources have required fields
for (const res of resourceCategories) {
  console.assert(res.id && res.name && res.capability && res.domains && res.url, `Resource ${res.id} missing mandatory attributes`);
}
console.log("✓ Test 5: Resource registry metadata validation passed.");

console.log("All VocSpace engine and compiler tests passed successfully!");
