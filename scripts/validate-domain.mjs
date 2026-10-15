import { syntheticCases } from "../src/data/synthetic-cases.js";
import { accommodationPatterns } from "../src/data/accommodation-patterns.js";
import { sourceCatalog } from "../src/data/source-catalog.js";
import { validateBarrierCase } from "../src/domain/barrier-case.js";
import { validateAccommodationPattern } from "../src/domain/accommodation-pattern.js";
import { spawnSync } from "node:child_process";

let failed = false;

for (const item of syntheticCases) {
  const result = validateBarrierCase(item);
  if (!result.valid) {
    failed = true;
    console.error(`Invalid case ${item.id}: ${result.missing.join(", ")}`);
  }
  if (!Array.isArray(item.solutions) || item.solutions.length < 2) {
    failed = true;
    console.error(`Case ${item.id} needs at least two solution options.`);
  }
}

const knownSourceIds = new Set(sourceCatalog.map((source) => source.id));
for (const source of sourceCatalog) {
  if (!source.id || !source.title || !source.publisher || !String(source.url || "").startsWith("https://")) {
    failed = true;
    console.error(`Invalid source catalog record: ${source.id || "unknown"}`);
  }
}

for (const pattern of accommodationPatterns) {
  for (const sourceId of pattern.provenance?.sourceIds || []) {
    if (!knownSourceIds.has(sourceId)) {
      failed = true;
      console.error(`Pattern ${pattern.id} references unknown source ID ${sourceId}`);
    }
  }
  
  const result = validateAccommodationPattern(pattern);
  if (!result.valid) {
    failed = true;
    console.error(`Invalid pattern ${pattern.id}: ${result.missing.join(", ")}`);
  }
}

if (failed) process.exit(1);
console.log(`Validated ${syntheticCases.length} synthetic cases and ${accommodationPatterns.length} accommodation patterns.`);

const testResult = spawnSync(process.execPath, ["scripts/validate-matching.mjs"], { stdio: "inherit" });
if (testResult.status !== 0) process.exit(testResult.status || 1);
