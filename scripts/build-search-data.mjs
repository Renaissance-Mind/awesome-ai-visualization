import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import YAML from "yaml";
import { PROFILE_SCHEMA, projectFacts, searchDocument } from "./lib/project-facts.mjs";

const catalog = JSON.parse(await readFile("src/data/catalog.generated.json", "utf8"));
const profiles = JSON.parse(await readFile("data/project-profiles.json", "utf8"));
const canonical = YAML.parse(await readFile("data/catalog.yml", "utf8"));
const research = YAML.parse(await readFile("data/tool-research.yml", "utf8"));
const researchByName = new Map(research.entries.map(entry => [entry.name, entry]));
const expectedHashes = new Map(canonical.entries.map(entry => [entry.name, createHash("sha256").update(JSON.stringify({ schemaVersion: PROFILE_SCHEMA, facts: projectFacts(entry, researchByName.get(entry.name)) })).digest("hex")]));
const config = await readFile("src/lib/search-config.ts", "utf8");
const topicRules = (await readFile("src/lib/discovery.ts", "utf8")).match(/export function topicFor[\s\S]*?\n}/)?.[0];
const editorialRules = await readFile("src/data/editorial.ts", "utf8");
const model = config.match(/SEARCH_MODEL = "([^"]+)"/)[1];
const instruction = config.match(/SEARCH_INSTRUCTION = "([^"]+)"/)[1];
const dimensions = Number(config.match(/SEARCH_DIMENSIONS = (\d+)/)[1]);
const hash = value => createHash("sha256").update(value).digest("hex");
const documents = catalog.entries.map(entry => {
  const profile = profiles.entries[entry.name];
  if (!profile || profile.sourceHash !== expectedHashes.get(entry.name) || profile.url !== entry.url || profile.originalDescription !== entry.note
      || [[profile.input, entry.sourceTypes], [profile.output, entry.outputForms], [profile.form, entry.toolForms], [profile.requirements, entry.dependencies]].some(([a, b]) => JSON.stringify(a) !== JSON.stringify(b))) {
    throw new Error(`Missing or stale project explanation: ${entry.name}. Run npm run generate:profiles.`);
  }
  return searchDocument(entry, profile);
});
const filters = catalog.entries.map(({ category, catalogSection, readmeGroup }) => ({ category, catalogSection, readmeGroup }));
const version = hash(JSON.stringify({ model, instruction, dimensions, documents, filters, topicRules, editorialRules })).slice(0, 16);
const manifest = { model, instruction, dimensions, version, total: documents.length, vectorPath: `/search-index/${version}.f32`, entries: documents.map(({ id, name }, index) => {
  const { category, catalogSection, readmeGroup, sourceTypes, toolForms, outputForms, dependencies } = catalog.entries[index];
  return { id: `${version}-${id}`, name, category, catalogSection, readmeGroup, sourceTypes, toolForms, outputForms, dependencies };
}) };
await mkdir(".wrangler/catalog-search", { recursive: true });
await mkdir("public/search-index", { recursive: true });
await writeFile(".wrangler/catalog-search/documents.json", JSON.stringify({ ...manifest, documents }, null, 2) + "\n");
await writeFile("src/data/search-manifest.generated.json", JSON.stringify(manifest, null, 2) + "\n");
await writeFile("src/data/project-profiles.generated.json", JSON.stringify(Object.fromEntries(catalog.entries.map(entry => {
  const { explanation, useCases } = profiles.entries[entry.name];
  return [entry.name, { explanation, useCases }];
}))) + "\n");
await writeFile("src/data/project-summaries.generated.json", JSON.stringify(Object.fromEntries(catalog.entries.map(entry => [entry.name, profiles.entries[entry.name].summary]))) + "\n");
console.log(`Search documents: ${documents.length}; version ${version}; ${dimensions} dimensions.`);
