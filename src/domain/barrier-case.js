export const barrierCaseSchema = {
  required: [
    "id", "title", "participationGoal", "task", "context", "barrier",
    "functionalNeed", "strengths", "constraints", "solutions"
  ]
};

export function validateBarrierCase(item) {
  const missing = barrierCaseSchema.required.filter((key) => !(key in item));
  const errors = [...missing];
  for (const key of ["strengths", "constraints", "solutions"]) {
    if (key in item && !Array.isArray(item[key])) errors.push(`${key} must be an array`);
  }
  if (Array.isArray(item.solutions)) {
    for (const solution of item.solutions) {
      for (const key of ["id", "name", "type", "mechanism", "rationale", "tradeoffs"]) {
        if (!(key in solution)) errors.push(`solution missing ${key}`);
      }
      if ("tradeoffs" in solution && !Array.isArray(solution.tradeoffs)) {
        errors.push("solution tradeoffs must be an array");
      }
    }
  }
  return { valid: errors.length === 0, missing: errors };
}
