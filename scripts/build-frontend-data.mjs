import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();
const catalogPath = path.join(root, "data/catalog.yml");
const researchPath = path.join(root, "data/tool-research.yml");
const outputPath = path.join(root, "src/data/catalog.generated.json");

const catalog = YAML.parse(await readFile(catalogPath, "utf8"));
const research = YAML.parse(await readFile(researchPath, "utf8"));
const researchByName = new Map((research.entries ?? []).map((entry) => [entry.name, entry]));

const uniqueLinks = (links) => {
  const seen = new Set();
  return links.filter((link) => {
    if (!link?.url || seen.has(link.url)) {
      return false;
    }
    seen.add(link.url);
    return true;
  });
};

const uniqueAssets = (assets) => {
  const seen = new Set();
  return assets.filter((asset) => {
    if (!asset?.url || seen.has(asset.url)) {
      return false;
    }
    seen.add(asset.url);
    return true;
  });
};

const buildEffectAssets = (researchEntry) =>
  uniqueAssets(researchEntry?.official_effect_assets ?? [])
    .map((asset) => ({
      kind: asset.kind,
      title: asset.title,
      url: asset.url,
      thumbnailUrl: asset.thumbnail_url ?? null,
      source: asset.source,
    }))
    .slice(0, 12);

const entries = catalog.entries.map((entry) => {
  const researchEntry = researchByName.get(entry.name);

  return {
    name: entry.name,
    url: entry.url,
    primaryUrl: researchEntry?.primary_url ?? entry.url ?? null,
    homepage: entry.homepage ?? null,
    category: entry.category,
    surface: entry.surface,
    dependencies: entry.dependencies ?? [],
    stars: entry.stars ?? null,
    license: entry.license ?? null,
    updated: entry.updated ?? null,
    note: entry.note ?? "",
    sourceTypes: entry.source_types ?? [],
    toolForms: entry.tool_forms ?? [],
    outputForms: entry.output_forms ?? [],
    catalogSection: entry.catalog_section,
    readmeGroup: entry.readme_group,
    docs: (researchEntry?.official_docs ?? []).slice(0, 8),
    examples: uniqueLinks(researchEntry?.official_examples ?? []).slice(0, 12),
    effectAssets: buildEffectAssets(researchEntry),
    docsCount: researchEntry?.official_docs?.length ?? 0,
    examplesCount: researchEntry?.official_examples?.length ?? 0,
    effectAssetsCount: researchEntry?.official_effect_assets?.length ?? 0,
  };
});

const countValues = (values) =>
  values.reduce((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});

const countTags = (key) => countValues(entries.flatMap((entry) => entry[key]));

const payload = {
  generatedAt: research.generated_at,
  lastResearched: catalog.last_researched,
  sourceCatalog: research.source_catalog,
  summary: {
    total: entries.length,
    openSource: entries.filter((entry) => entry.toolForms.includes("开源应用/框架")).length,
    saas: entries.filter((entry) => entry.toolForms.includes("产品/SaaS")).length,
    modelApi: entries.filter((entry) => entry.dependencies.includes("模型 API")).length,
    examples: research.summary?.official_examples ?? 0,
    effectAssets: research.summary?.official_effect_assets ?? 0,
    docs: research.summary?.official_docs ?? 0,
  },
  facets: {
    sourceTypes: countTags("sourceTypes"),
    toolForms: countTags("toolForms"),
    outputForms: countTags("outputForms"),
    dependencies: countTags("dependencies"),
    categories: countValues(entries.map((entry) => entry.category)),
    groups: countValues(entries.map((entry) => entry.readmeGroup)),
  },
  entries,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
