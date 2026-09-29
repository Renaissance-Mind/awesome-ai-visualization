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
  const { filterCatalog, catalogWindow, CATALOG_BATCH_SIZE, githubRepository, topicFor, topics, buildHref, videoEmbed, previewAssets } = require(join(scratch, "lib/discovery.js"));
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
  assert.equal(githubRepository("https://github.com/nexu-io/open-design"), "nexu-io/open-design");
  assert.equal(githubRepository("https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/slides/SKILL.md?plain=1"), "nextlevelbuilder/ui-ux-pro-max-skill");
  assert.equal(githubRepository("https://github.com/Graphify-Labs/graphify.git/"), "Graphify-Labs/graphify");
  assert.equal(githubRepository("https://gamma.app/"), null);
  assert.equal(githubRepository("https://github.com.evil.example/a/b"), null);
  assert.equal(githubRepository("https://github.com/topics/agent-skills"), null);
  assert.equal(githubRepository("https://github.com/nexu-io"), null);
  assert.equal(githubRepository("not a url"), null);
  assert.equal(CATALOG_BATCH_SIZE, 20);
  const first = catalogWindow(all, null);
  const second = catalogWindow(all, "2");
  assert.equal(first.items.length, 20);
  assert.equal(second.items.length, 40);
  assert.deepEqual(second.items.slice(0, 20), first.items, "Appending must preserve existing rows.");
  const loadedNames = [];
  for (let batch = 1; batch <= Math.ceil(all.length / 20); batch++) {
    const visible = catalogWindow(all, String(batch));
    loadedNames.push(...visible.items.slice((batch - 1) * 20).map(e => e.name));
    assert.equal(visible.hasMore, visible.items.length < all.length);
  }
  assert.deepEqual(loadedNames, all.map(e => e.name), "Incremental loading must not lose or repeat entries.");
  assert.equal(catalogWindow(all, "-8").items.length, 20);
  assert.equal(catalogWindow(all, "Infinity").items.length, 20);
  assert.equal(catalogWindow(all, "not-a-batch").items.length, 20);
  assert.equal(catalogWindow(all, "2.9").items.length, 40);
  assert.equal(catalogWindow(all, "99999").items.length, all.length);
  assert.equal(catalogWindow(all, "99999").hasMore, false);
  assert.equal(catalogWindow([], "9").items.length, 0);
  assert.equal(catalogWindow([], "9").hasMore, false);
  const filtered = catalogWindow(result, null);
  assert.equal(filtered.items.length, Math.min(20, result.length));
  assert.equal(catalogWindow(result, "9999").items.length, result.length);
  const resetParams = new URLSearchParams(buildHref(new URLSearchParams({ page: "3", size: "24" }), { topic: "create", page: null }).slice(1));
  assert.equal(catalogWindow(filterCatalog(entries, resetParams), resetParams.get("page")).items.length, 20);
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
  console.log("Frontend checks passed: " + entries.length + " real entries, complete category coverage, search, combined filters, 20-entry incremental loading, detail round-trip, repository badges, previews and video origins.");
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
