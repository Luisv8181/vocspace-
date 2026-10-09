export const provenanceClasses = [
  "source-supported",
  "vocspace-synthesis",
  "ai-generated-hypothesis",
  "professional-judgment",
  "test-result"
];

export const accommodationPatternSchema = {
  required: [
    "id", "title", "functionalNeed", "contexts", "mechanism",
    "candidateApproaches", "tradeoffs", "validationIdeas", "provenance", "reviewStatus"
  ]
};

export function validateAccommodationPattern(pattern) {
  const errors = accommodationPatternSchema.required.filter((key) => !(key in pattern));
  for (const key of ["contexts", "candidateApproaches", "tradeoffs", "validationIdeas"]) {
    if (key in pattern && !Array.isArray(pattern[key])) errors.push(`${key} must be an array`);
  }
  const validProvenance = pattern.provenance &&
    Array.isArray(pattern.provenance.classes) &&
    pattern.provenance.classes.length > 0 &&
    pattern.provenance.classes.every((item) => provenanceClasses.includes(item));
  if (!validProvenance) errors.push("provenance.classes");
  if (pattern.reviewStatus === "source-reviewed" &&
      (!Array.isArray(pattern.provenance?.sourceIds) || pattern.provenance.sourceIds.length === 0)) {
    errors.push("source-reviewed patterns require provenance.sourceIds");
  }
  return { valid: errors.length === 0, missing: errors };
}
