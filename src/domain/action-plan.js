import { compileSolutionArtifacts } from "./solution-compiler.js";

export function createActionPlan(selectedSolutions = [], barrierCase = null, options = {}) {
  const basePlan = {
    selectedSolutions,
    implementationSteps: selectedSolutions.map((solution) => ({
      solutionId: solution.id,
      step: `Define how “${solution.name}” will be implemented in the target context.`
    })),
    validationQuestion: "Did the intervention improve participation without creating a new barrier?",
    outcomeMeasure: "Compare task completion, effort, errors, and user-reported fit before and after implementation."
  };

  if (barrierCase) {
    basePlan.compiledArtifacts = compileSolutionArtifacts(barrierCase, selectedSolutions, options);
  }

  return basePlan;
}
