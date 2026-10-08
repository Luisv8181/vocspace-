export const barrierCaseSchema = {
  required: [
    "id",
    "title",
    "participationGoal",
    "task",
    "context",
    "barrier",
    "functionalNeed",
    "strengths",
    "constraints",
    "solutions"
  ]
};

export function validateBarrierCase(item) {
  const missing = barrierCaseSchema.required.filter((key) => !(key in item));
  return { valid: missing.length === 0, missing };
}
