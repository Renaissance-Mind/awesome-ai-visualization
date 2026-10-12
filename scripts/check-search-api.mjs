import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const origin = process.argv[2] ?? "https://awesome-ai-visualization.renaissancemind.ai";
const manifest = JSON.parse(await readFile("src/data/search-manifest.generated.json", "utf8"));
const status = await (await fetch(origin + "/api/search/status")).json();
assert.equal(status.version, manifest.version);
assert.equal(status.projects, manifest.total);
const post = body => fetch(origin + "/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const response = await post({ q: "Graphify" });
assert.equal(response.status, 200);
const result = await response.json();
assert.equal(result.names[0], "Graphify");
assert.equal(new Set(result.names).size, result.names.length);
assert(!JSON.stringify(result).includes("score"));
assert.deepEqual((await (await post({ q: "Graphify" })).json()).names, result.names);

const filters = { q: "把数据表格转成交互式图表和仪表盘", source: "数据/表格", output: "图表/仪表盘", form: "MCP Server" };
const filteredResponse = await post(filters);
assert.equal(filteredResponse.status, 200);
const filtered = await filteredResponse.json();
assert(filtered.names.length > 0);
for (const name of filtered.names) {
  const entry = manifest.entries.find(entry => entry.name === name);
  assert(entry.sourceTypes.includes(filters.source) && entry.outputForms.includes(filters.output) && entry.toolForms.includes(filters.form), "Every result must satisfy all selected filters.");
}
assert.deepEqual((await (await post({ q: "Graphify", form: "not-a-catalog-form" })).json()).names, []);

const invalid = [
  [() => fetch(origin + "/api/search"), 400],
  [() => post({ q: "a".repeat(501) }), 400],
  [() => post({ q: 123 }), 400],
  [() => post(["Graphify"]), 400],
  [() => fetch(origin + "/api/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" }), 400],
  [() => fetch(origin + "/api/search", { method: "POST", body: "Graphify" }), 415],
  [() => fetch(origin + "/api/search", { method: "PUT" }), 405],
  [() => fetch(origin + "/api/search?q=Graphify", { headers: { Origin: "https://example.com" } }), 403],
  [() => post({ q: "a".repeat(9000) }), 413],
];
for (const [request, expected] of invalid) assert.equal((await request()).status, expected);

const local = await readFile("public" + manifest.vectorPath);
const remoteResponse = await fetch(origin + manifest.vectorPath);
assert.equal(remoteResponse.status, 200);
const remote = new Uint8Array(await remoteResponse.arrayBuffer());
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
assert.equal(hash(remote), hash(local));
const report = { origin, version: manifest.version, projects: manifest.total, filteredResults: filtered.names.length, validationCases: invalid.length, vectorAssetSha256: hash(local), completedAt: new Date().toISOString() };
await writeFile(".wrangler/catalog-search/api-validation.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
