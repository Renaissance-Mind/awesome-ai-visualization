import { readFile, writeFile } from "node:fs/promises";
import { cloudflare, runAI } from "./lib/cloudflare.mjs";
import { createHash } from "node:crypto";
import YAML from "yaml";
import { PROFILE_SCHEMA, projectFacts, searchDocument } from "./lib/project-facts.mjs";

const embeddingsOnly = process.argv.includes("--embeddings-only");
let data;
if (embeddingsOnly) {
  const catalog = JSON.parse(await readFile("src/data/catalog.generated.json", "utf8"));
  const profiles = JSON.parse(await readFile("data/project-profiles.json", "utf8"));
  const canonical = YAML.parse(await readFile("data/catalog.yml", "utf8"));
  const research = YAML.parse(await readFile("data/tool-research.yml", "utf8"));
  const byName = new Map(research.entries.map(entry => [entry.name, entry]));
  const hashes = new Map(canonical.entries.map(entry => [entry.name, createHash("sha256").update(JSON.stringify({ schemaVersion: PROFILE_SCHEMA, facts: projectFacts(entry, byName.get(entry.name)) })).digest("hex")]));
  const config = await readFile("src/lib/search-config.ts", "utf8");
  data = {
    model: config.match(/SEARCH_MODEL = "([^"]+)"/)[1],
    dimensions: Number(config.match(/SEARCH_DIMENSIONS = (\d+)/)[1]),
    documents: catalog.entries.filter(entry => profiles.entries[entry.name]?.sourceHash === hashes.get(entry.name)).map(entry => searchDocument(entry, profiles.entries[entry.name])),
  };
} else data = JSON.parse(await readFile(".wrangler/catalog-search/documents.json", "utf8"));
const indexName = "awesome-ai-catalog-qwen3";
const checkpointPath = ".wrangler/catalog-search/embeddings.json";
let checkpoint = { model: data.model, dimensions: data.dimensions, entries: {} };
try { checkpoint = JSON.parse(await readFile(checkpointPath, "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; }
if (checkpoint.model !== data.model || checkpoint.dimensions !== data.dimensions) checkpoint = { model: data.model, dimensions: data.dimensions, entries: {} };

// The exact versioned asset is reusable in a fresh maintenance worktree.
// Its version already binds all document hashes, filters, model and instruction.
if (!embeddingsOnly) {
  let bytes;
  try { bytes = await readFile("public" + data.vectorPath); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (bytes) {
    const values = new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
    if (values.length !== data.documents.length * data.dimensions) throw new Error("Invalid stored vector asset size.");
    data.documents.forEach((doc, index) => {
      const vector = Array.from(values.subarray(index * data.dimensions, (index + 1) * data.dimensions));
      if (!vector.every(Number.isFinite) || Math.abs(Math.hypot(...vector) - 1) > 0.001) throw new Error("Invalid stored vector asset values.");
      checkpoint.entries[doc.id] = { contentHash: doc.contentHash, values: vector };
    });
    await writeFile(checkpointPath, JSON.stringify(checkpoint) + "\n");
  }
}

const pending = data.documents.filter(doc => checkpoint.entries[doc.id]?.contentHash !== doc.contentHash);
for (let start = 0; start < pending.length; start += 16) {
  const batch = pending.slice(start, start + 16);
  const result = await runAI(data.model, { documents: batch.map(doc => doc.text) });
  if (result.shape?.[0] !== batch.length || result.shape?.[1] !== data.dimensions) throw new Error("Unexpected embedding shape.");
  for (let index = 0; index < batch.length; index++) {
    const vector = result.data[index];
    if (vector.length !== data.dimensions || !vector.every(Number.isFinite)) throw new Error("Invalid embedding for " + batch[index].name);
    const norm = Math.hypot(...vector);
    if (norm < 0.001) throw new Error("Zero embedding for " + batch[index].name);
    checkpoint.entries[batch[index].id] = { contentHash: batch[index].contentHash, values: vector.map(value => value / norm) };
  }
  await writeFile(checkpointPath, JSON.stringify(checkpoint) + "\n");
  console.log(`Embeddings: ${Math.min(start + 16, pending.length)}/${pending.length} updated.`);
}

if (embeddingsOnly) {
  console.log(`Precomputed ${data.documents.length} validated documents. No index namespace or deployment was changed.`);
} else {
const vectors = data.documents.map((doc, index) => ({
  id: data.entries[index].id, namespace: data.version,
  values: checkpoint.entries[doc.id].values,
}));
const flat = new Float32Array(vectors.flatMap(vector => vector.values));
await writeFile("public" + data.vectorPath, Buffer.from(flat.buffer));
// Versioned vector IDs keep the live index valid until the matching site is deployed.
let lastMutation;
for (let start = 0; start < vectors.length; start += 100) {
  const form = new FormData();
  form.append("vectors", new Blob([vectors.slice(start, start + 100).map(vector => JSON.stringify(vector)).join("\n") + "\n"], { type: "application/x-ndjson" }), "vectors.ndjson");
  lastMutation = await cloudflare(`/vectorize/v2/indexes/${indexName}/upsert`, { method: "POST", body: form });
  console.log(`Vectorize: ${Math.min(start + 100, vectors.length)}/${vectors.length} submitted.`);
}
await writeFile(".wrangler/catalog-search/sync.json", JSON.stringify({ indexName, version: data.version, total: vectors.length, lastMutation, completedAt: new Date().toISOString() }, null, 2) + "\n");
console.log("Verify remote indexing before deploying version " + data.version + ".");
}
