import { readFile, writeFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const read = async path => JSON.parse(await readFile(path, "utf8"));
const manifest = await read("src/data/search-manifest.generated.json");
const activity = await read("data/repository-activity/category-summary.json");
const locales = await read("data/repository-activity/locales.json");
const html = await readFile("dist/index.html", "utf8");
const files = new Set(["/index.html", manifest.vectorPath,
  ...Array.from(html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g), match => match[1]),
  ...(await readdir("dist/assets")).filter(file => /\.(js|css)$/.test(file)).map(file => "/assets/" + file),
  "/activity/activity.js", "/activity/activity.css", "/activity/vendor/d3.v7.min.js", "/activity/category-monthly.csv",
  ...Object.keys(locales).flatMap(locale => ["index.html", "commits.svg", "repos-created.svg"].map(file => `/activity/${locale}/${file}`)),
]);
// The catalog check already verifies every preview. Include one real shipped preview in the release audit.
const preview = (await readdir("dist/catalog-previews")).find(file => /\.(png|jpe?g|webp|svg)$/i.test(file));
if (!preview) throw new Error("No catalog preview shipped.");
files.add("/catalog-previews/" + preview);
const hashes = {};
for (const path of files) hashes[path] = createHash("sha256").update(await readFile("dist" + path)).digest("hex");
const release = {
  schemaVersion: 1,
  commit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  searchVersion: manifest.version, projects: manifest.total, activityCutoff: activity.cutoff,
  builtAt: new Date().toISOString(), files: hashes,
};
await writeFile("dist/release.json", JSON.stringify(release, null, 2) + "\n");
console.log(`Prepared release ${release.commit}: ${release.projects} projects, ${files.size} audited assets.`);
