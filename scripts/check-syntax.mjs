import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const roots = ["src", "scripts"];
const files = [];

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(m?js)$/.test(entry.name)) files.push(path);
  }
}

for (const root of roots) await collect(root);
files.push("index.html");
let failed = false;

for (const file of files.filter((path) => path.endsWith(".js") || path.endsWith(".mjs"))) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    failed = true;
    console.error(`Syntax check failed: ${file}`);
    console.error(result.stderr || result.stdout);
  }
}

if (failed) process.exit(1);
console.log(`Syntax check passed for ${files.filter((path) => /\.(m?js)$/.test(path)).length} JavaScript files.`);
