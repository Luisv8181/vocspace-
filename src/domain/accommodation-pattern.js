export const provenanceClasses = [
  "source-supported",
  "vocspace-synthesis",
  "ai-generated-hypothesis",
  "professional-judgment",
  "test-result"
];

export const accommodationPatternSchema = {
  required: [
    "id",
    "title",
    "functionalNeed",
    "contexts",
    "mechanism",
    "candidateApproaches",
    "tradeoffs",
    "validationIdeas",
    "provenance",
    "reviewStatus"
  ]
};

export function validateAccommodationPattern(pattern) {
  const missing = accommodationPatternSchema.required.filter((key) => !(key in pattern));
  const validProvenance = pattern.provenance &&
    Array.isArray(pattern.provenance.classes) &&
    pattern.provenance.classes.every((item) => provenanceClasses.includes(item));
  if (!validProvenance) missing.push("provenance.classes");
  return { valid: missing.length === 0, missing };
}
