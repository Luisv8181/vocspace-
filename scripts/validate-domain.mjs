import { readFile } from "node:fs/promises";
import { barrierCaseSchema, validateBarrierCase } from "../src/domain/barrier-case.js";

const moduleSource = await import("../src/data/synthetic-cases.js?cachebust=" + Date.now());
const cases = moduleSource.syntheticCases;
let failed = false;

for (const item of cases) {
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

if (failed) process.exit(1);

console.log(`Validated ${cases.length} synthetic barrier cases.`);
