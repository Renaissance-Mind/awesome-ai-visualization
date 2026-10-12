import assert from "node:assert/strict";
import ts from "typescript";
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
  const { filterCatalog, catalogWindow, CATALOG_BATCH_SIZE, githubRepository, topicFor, topics, groupNames, sortOptions, filterFields, descriptionFor, galleryAssets, buildHref, videoEmbed, previewAssets } = require(join(scratch, "lib/discovery.js"));
  const { featuredNames, localPreviews } = require(join(scratch, "data/editorial.js"));
  const { entries } = JSON.parse(readFileSync("src/data/catalog.generated.json", "utf8"));
  const { englishMessages, localeFrom, localizedHref, translate, toolCount } = require(join(scratch, "lib/i18n.js"));
  const { localizedLabel } = require(join(scratch, "lib/labels.js"));
  const translations = JSON.parse(readFileSync("data/catalog.zh-CN.json", "utf8"));
  for (const entry of entries) {
    assert.equal(translations.entries[entry.name].source, entry.note, "Chinese copy must match the current source.");
    assert.equal(translations.entries[entry.name].zh, entry.noteZh);
    assert(/[\u4e00-\u9fff]/.test(entry.noteZh), entry.name + " needs a Chinese description.");
    assert(!/ZXTERM|ZXQ\d/.test(entry.noteZh), "No translation boundary markers may reach the site.");
    assert(/[\u4e00-\u9fff]/.test(descriptionFor(entry, "zh").summary));
    assert(!/[\u4e00-\u9fff]/.test(descriptionFor(entry, "en").summary));
    for (const value of [...entry.sourceTypes, ...entry.toolForms, ...entry.outputForms, ...entry.dependencies]) {
      assert(!/[\u4e00-\u9fff]/.test(localizedLabel(value, "en")), "Missing English taxonomy label: " + value);
    }
  }
  const labels = [...topics.flatMap(t => [t.label,t.title,t.intro]), ...Object.values(groupNames), ...sortOptions.map(x=>x.label), ...filterFields.map(x=>x.label)];
  for (const label of labels) assert(englishMessages[label], "Missing English UI label: " + label);
  for (const [key,value] of Object.entries(englishMessages)) {
    assert(!/[\u4e00-\u9fff]/.test(value), "English message contains Chinese: " + key);
    const parameters = s => [...s.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort();
    assert.deepEqual(parameters(value), parameters(key), "Translation must preserve interpolation parameters.");
  }
  for (const path of ["src/App.tsx","src/components/RepositoryBadge.tsx"]) {
    const source=ts.createSourceFile(path,readFileSync(path,"utf8"),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    const visit=node=>{
      if (ts.isJsxText(node)) assert(!/[\u4e00-\u9fff]/.test(node.text), "Untranslated UI text: " + node.text);
      if (ts.isCallExpression(node)&&node.expression.getText(source)==="t"&&ts.isStringLiteral(node.arguments[0])) {
        assert(englishMessages[node.arguments[0].text], "Missing translation: "+node.arguments[0].text);
      }
      ts.forEachChild(node,visit);
    };
    visit(source);
  }
  assert.equal(localeFrom(new URLSearchParams()),"zh");
  assert.equal(localeFrom(new URLSearchParams({lang:"en"})),"en");
  assert.equal(localeFrom(new URLSearchParams({lang:"other"})),"zh");
  const switched=new URLSearchParams(localizedHref("?q=Graphify&page=2&tool=Graphify","en").split("?")[1]);
  assert.equal(switched.get("lang"),"en");
  assert.equal(switched.get("page"),"2");
  assert.equal(switched.get("tool"),"Graphify");
  assert.equal(switched.get("q"),"Graphify");
  assert.equal(localizedHref("/","en"),"/?lang=en");
  assert.equal(localizedHref("?view=guides&lang=zh","en"),"/?view=guides&lang=zh");
  assert.equal(localizedHref("?tool=Graphify#examples","en"),"/?tool=Graphify&lang=en#examples");
  assert.equal(translate("en","已显示 {shown} / {total} 个工具",{shown:20,total:894}),"Showing 20 of 894 tools");
  assert.equal(toolCount("en",1),"1 tool");
  assert.equal(toolCount("zh",1),"1 个工具");
  const crossLanguageSearch = filterCatalog(entries, new URLSearchParams({ q: "亿行", lang: "en" }));
  assert(crossLanguageSearch.some(entry => entry.name === "FlexViz"), "English pages must also find Chinese descriptions.");
  assert.deepEqual(crossLanguageSearch.map(entry=>entry.name), filterCatalog(entries, new URLSearchParams({q:"亿行",lang:"zh"})).map(entry=>entry.name));
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
  console.log("Frontend checks passed: " + entries.length + " real entries, complete category coverage, search, combined filters, 20-entry incremental loading, detail round-trip, repository badges, bilingual UI/content/URLs, previews and video origins.");
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
