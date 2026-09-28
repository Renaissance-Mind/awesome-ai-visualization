import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const root = process.cwd();
const scratch = mkdtempSync(join(tmpdir(), "visualization-frontend-check-"));
try {
  execFileSync(process.execPath, [
    resolve("node_modules/typescript/lib/tsc.js"), "src/lib/discovery.ts",
    "--outDir", scratch, "--module", "commonjs", "--target", "ES2022",
    "--lib", "ES2024,DOM", "--skipLibCheck", "--strict",
  ], { cwd: root, stdio: "pipe" });
  const require = createRequire(import.meta.url);
  const { filterCatalog, paginate, topicFor, topics, buildHref, videoEmbed, previewAssets } = require(join(scratch, "lib/discovery.js"));
  const { featuredNames, localPreviews } = require(join(scratch, "data/editorial.js"));
  const { entries } = JSON.parse(readFileSync("src/data/catalog.generated.json", "utf8"));
  const all = filterCatalog(entries, new URLSearchParams());
  assert.equal(all.length, entries.length, "The complete catalog must remain accessible.");
  assert.deepEqual(all.slice(0, 6).map(e => e.name), featuredNames);
  assert.deepEqual(filterCatalog(entries, new URLSearchParams({ q: "GrApHiFy" })).map(e => e.name), ["Graphify"]);
  assert(filterCatalog(entries, new URLSearchParams({ q: "科学图解" })).some(e => e.name === "PaperBanana"));
  assert(filterCatalog(entries, new URLSearchParams({ q: "Graphify graph" })).some(e => e.name === "Graphify"));
  assert.equal(filterCatalog(entries, new URLSearchParams({ q: "no-matching-tool-893746" })).length, 0);
  const covered = topics.filter(t => t.key !== "all").flatMap(t => {
    const result = filterCatalog(entries, new URLSearchParams({ topic: t.key }));
    assert(result.every(e => topicFor(e) === t.key));
    return result.map(e => e.name);
  });
  assert.equal(new Set(covered).size, entries.length, "Every canonical entry needs a browsing direction.");
  const result = filterCatalog(entries, new URLSearchParams({ form: "Agent Skill", source: "代码库" }));
  assert(result.length > 0);
  assert(result.every(e => e.toolForms.includes("Agent Skill") && e.sourceTypes.includes("代码库")));
  assert.equal(filterCatalog(entries, new URLSearchParams({ form: "does-not-exist" })).length, 0);
  const pageNames = [];
  const first = paginate(all, null, null);
  for (let page = 1; page <= first.totalPages; page++) pageNames.push(...paginate(all, String(page), null).items.map(e => e.name));
  assert.deepEqual(pageNames, all.map(e => e.name), "Paging must not lose or repeat entries.");
  assert.equal(paginate(all, "-8", null).page, 1);
  assert.equal(paginate(all, "99999", null).page, first.totalPages);
  assert.equal(paginate([], "9", "24").page, 1);
  assert.equal(paginate([], "9", "24").totalPages, 1);
  assert.equal(paginate(all, "2", "not-a-size").pageSize, 6);
  const params = new URLSearchParams({ q: "代码 & 文档", page: "2", source: "代码库" });
  const href = buildHref(params, { tool: "Graphify" });
  const detailParams = new URLSearchParams(href.slice(1));
  assert.equal(detailParams.get("q"), "代码 & 文档");
  assert.equal(detailParams.get("page"), "2");
  const returnParams = new URLSearchParams(buildHref(detailParams, { tool: null }).slice(1));
  assert.equal(returnParams.toString(), params.toString(), "Detail return must retain all list state.");
  assert.equal(buildHref(new URLSearchParams(), {}), "/");
  assert.equal(videoEmbed("https://youtu.be/3ndlwt0Wi3c"), "https://www.youtube-nocookie.com/embed/3ndlwt0Wi3c");
  assert.equal(videoEmbed("https://youtube.com.evil.example/watch?v=3ndlwt0Wi3c"), null);
  assert.equal(videoEmbed("not a url"), null);
  for (const [name, preview] of Object.entries(localPreviews)) {
    assert(entries.some(e => e.name === name));
    assert(existsSync(join(root, "public", preview.path)), "Local preview must ship with the production build.");
  }
  assert.equal(previewAssets(entries.find(e => e.name === "Data Formulator")).length, 0);
  console.log("Frontend checks passed: " + entries.length + " real entries, complete category coverage, search, combined filters, pagination, detail round-trip, previews and video origins.");
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
