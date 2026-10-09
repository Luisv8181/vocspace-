export function createActionPlan(selectedSolutions = [], context = {}) {
  const solutions = selectedSolutions.map((entry) => entry.solution || entry);
  return {
    title: context.title || "Draft accommodation action plan",
    participationGoal: context.participationGoal || "",
    functionalNeed: context.functionalNeed || "",
    selectedSolutions: solutions.map((solution) => ({
      id: solution.id,
      name: solution.name,
      rationale: solution.rationale || "",
      patternId: solution.patternId || null,
      implementationDifficulty: solution.implementationDifficulty || "to be assessed",
      tradeoffs: Array.isArray(solution.tradeoffs) ? solution.tradeoffs : []
    })),
    implementationSteps: solutions.map((solution, index) => ({
      order: index + 1,
      solutionId: solution.id,
      step: solution.implementationStep || `Define how “${solution.name}” can be implemented in the target context.`,
      owner: "To be determined with the person and relevant stakeholders",
      status: "not-started"
    })),
    validation: {
      question: "Did the intervention improve participation without creating a new barrier?",
      measures: ["task completion", "time or effort", "errors or recovery", "person-reported fit"],
      baselineNeeded: true,
      reviewDate: null
    },
    cautions: [
      "This plan is a draft for discussion, not a legal or clinical determination.",
      "Verify applicability, evidence, implementation constraints, and risks before acting."
    ]
  };
}