import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { origin, request } from "./lib/publication.mjs";

const read = async path => JSON.parse(await readFile(path, "utf8"));
const remote = await (await request(origin + "/release.json")).json();
const expected = process.argv.includes("--live") ? remote : await read("dist/release.json");
const manifest = await read("src/data/search-manifest.generated.json");
const activity = await read("data/repository-activity/category-summary.json");
assert.equal(remote.schemaVersion, 1);
assert.equal(remote.commit, execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), "Live release must match the published source commit.");
assert.equal(remote.searchVersion, manifest.version);
assert.equal(remote.projects, manifest.total);
assert.equal(remote.activityCutoff, activity.cutoff);
assert.deepEqual(remote, expected, "Published release metadata differs from the reviewed build.");
assert(Object.keys(remote.files).length >= 30, "Release asset inventory is incomplete.");
for (const [path, hash] of Object.entries(expected.files)) {
  assert(path.startsWith("/") && !path.startsWith("//") && !path.includes(".."));
  const url = path.endsWith("/index.html") ? path.slice(0, -10) : path;
  const bytes = await (await request(origin + url)).arrayBuffer();
  assert.equal(createHash("sha256").update(new Uint8Array(bytes)).digest("hex"), hash, `Deployed bytes differ: ${path}`);
}
const signals = await (await request(origin + "/api/repository-signals")).json();
const sourceSignals = await read("data/repository-signals/summary.json");
assert.equal(signals.scope, "catalog");
assert(signals.records.length > 0);
assert(Date.parse(signals.cutoff) >= Date.parse(sourceSignals.cutoff), "Live activity signals lag the committed snapshot.");
assert(Date.now() - Date.parse(signals.cutoff) < 72 * 3600000, "Repository signals are older than 72 hours.");
console.log(JSON.stringify({ status: "verified", commit: remote.commit, projects: remote.projects,
  searchVersion: remote.searchVersion, activityCutoff: remote.activityCutoff,
  assets: Object.keys(remote.files).length, signalsCutoff: signals.cutoff }));
