import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { cloudflare, runAI } from "./lib/cloudflare.mjs";

const manifest = JSON.parse(await readFile("src/data/search-manifest.generated.json", "utf8"));
const profiles = JSON.parse(await readFile("data/project-profiles.json", "utf8"));
const raw = await readFile("public" + manifest.vectorPath);
const vectors = new Float32Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));
assert.equal(vectors.length, manifest.total * manifest.dimensions);
assert.equal(new Set(manifest.entries.map(entry => entry.id)).size, manifest.total);
for (let index = 0; index < manifest.total; index++) {
  const values = vectors.subarray(index * manifest.dimensions, (index + 1) * manifest.dimensions);
  assert(values.every(Number.isFinite));
  assert(Math.abs(Math.hypot(...values) - 1) < 0.001);
  const entry = manifest.entries[index];
  assert(profiles.entries[entry.name]?.sources.length > 0);
  assert(profiles.entries[entry.name]?.explanation);
}

const indexPath = "/vectorize/v2/indexes/awesome-ai-catalog-qwen3";
// Confirm every versioned ID, not just the total count of all namespaces.
for (let start = 0; start < manifest.total; start += 20) {
  const ids = manifest.entries.slice(start, start + 20).map(entry => entry.id);
  const stored = await cloudflare(indexPath + "/get_by_ids", { method: "POST", body: { ids } });
  assert.equal(stored.length, ids.length, `Index is still processing IDs ${start}–${start + ids.length}.`);
  const returned = new Set(stored.map(vector => vector.id));
  assert(ids.every(id => returned.has(id)));
}

const cases = [
  { query: "Graphify", relevant: ["Graphify"] },
  { query: "把代码库和文档转换成可以探索的知识图谱", relevant: ["Graphify", "Archify"] },
  // These specialized tools explicitly describe table-to-interactive-dashboard
  // workflows in the source catalog, alongside general data exploration apps.
  { query: "根据数据表格制作可交互的图表和仪表盘", relevant: ["Vizboard", "chart-dashboard", "mcp-charts", "Data Formulator", "WrenAI"] },
  { query: "把科研论文转成可编辑的演示文稿", relevant: ["Paper2Any", "Presenton", "PaperToSlides"] },
  { query: "从研究方法和图注生成科学图解", relevant: ["PaperBanana", "Academic Figures"] },
  { query: "将PDF转换成Markdown，保留文档结构", relevant: ["Marker", "Docling", "MinerU"] },
];
const byId = new Map(manifest.entries.map(entry => [entry.id, entry.name]));
const evaluation = [];
for (const example of cases) {
  const embedding = await runAI(manifest.model, { queries: [example.query], instruction: manifest.instruction });
  const result = await cloudflare(indexPath + "/query", { method: "POST", body: { vector: embedding.data[0], topK: 10, namespace: manifest.version, returnMetadata: "none" } });
  const names = result.matches.map(match => byId.get(match.id));
  const passed = names.some(name => example.relevant.includes(name));
  evaluation.push({ query: example.query, top10: names, passed });
  console.log(JSON.stringify(evaluation.at(-1)));
}
await writeFile(".wrangler/catalog-search/evaluation.json", JSON.stringify({ version: manifest.version, createdAt: new Date().toISOString(), cases: evaluation }, null, 2) + "\n");
assert(evaluation.every(example => example.passed), "Inspect real search quality before deploying.");
console.log(`Validated ${manifest.total} profiles and indexed vectors; ${evaluation.length} real retrieval cases passed.`);
