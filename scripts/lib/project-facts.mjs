import { createHash } from "node:crypto";

export const PROFILE_SCHEMA = 2;

export function projectFacts(entry, source) {
  return {
    name: entry.name, url: entry.url, homepage: entry.homepage ?? null,
    description: entry.note, input: entry.source_types, output: entry.output_forms,
    form: entry.tool_forms, requirements: entry.dependencies,
    category: entry.category, license: entry.license ?? null,
    officialDescriptions: source?.fetched_sources?.filter(item => item.status === 200 && item.description).map(item => item.description) ?? [],
  };
}

export function searchDocument(entry, profile) {
  const hash = text => createHash("sha256").update(text).digest("hex");
  const text = [
    `Project: ${entry.name}`, profile.summary, profile.explanation,
    `Use cases: ${profile.useCases.join("；")}`,
    `Original description: ${entry.note}`,
    `Input materials: ${entry.sourceTypes.join("、")}`,
    `Output artifacts: ${entry.outputForms.join("、")}`,
    `Tool form: ${entry.toolForms.join("、")}`,
    `Requirements: ${entry.dependencies.join("、")}`,
  ].join("\n");
  return { id: hash(entry.url + "\n" + entry.name).slice(0, 24), name: entry.name, url: entry.url, text, contentHash: hash(text) };
}
