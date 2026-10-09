import { syntheticCases } from "../src/data/synthetic-cases.js";
import { accommodationPatterns } from "../src/data/accommodation-patterns.js";
import { validateBarrierCase } from "../src/domain/barrier-case.js";
import { validateAccommodationPattern } from "../src/domain/accommodation-pattern.js";

let failed = false;

for (const item of syntheticCases) {
  const result = validateBarrierCase(item);
  if (!result.valid) {
    failed = true;
    console.error(`Invalid case ${item.id}: missing ${result.missing.join(", ")}`);
  }
  if (!Array.isArray(item.solutions) || item.solutions.length < 2) {
    failed = true;
    console.error(`Case ${item.id} needs at least two solution options.`);
  }
}

for (const pattern of accommodationPatterns) {
  const result = validateAccommodationPattern(pattern);
  if (!result.valid) {
    failed = true;
    console.error(`Invalid pattern ${pattern.id}: missing ${result.missing.join(", ")}`);
  }
}

if (failed) process.exit(1);

console.log(`Validated ${syntheticCases.length} synthetic cases and ${accommodationPatterns.length} accommodation patterns.`);
