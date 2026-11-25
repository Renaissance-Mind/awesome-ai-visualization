import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { accountId, cloudflare } from "./lib/cloudflare.mjs";
import { origin, planSearchRetention, request, retry } from "./lib/publication.mjs";

const dryRun = process.argv.includes("--dry-run");
assert(process.argv.slice(2).every(arg => arg === "--dry-run"), "Usage: prune-search-index.mjs [--dry-run]");
const config = JSON.parse(await readFile("wrangler.jsonc", "utf8"));
const manifest = JSON.parse(await readFile("src/data/search-manifest.generated.json", "utf8"));
assert.equal(accountId, config.account_id, "The cleanup targets the production catalog account.");
const indexName = config.vectorize.find(binding => binding.binding === "VECTORIZE").index_name;
const index = "/vectorize/v2/indexes/" + encodeURIComponent(indexName);
const worker = "/workers/scripts/" + encodeURIComponent(config.name);
const deleteBatchSize = 100;
const readCloudflare = path => retry("Read catalog state", () => cloudflare(path), [2000, 5000]);

async function activeDeployment() {
  const { deployments } = await readCloudflare(worker + "/deployments");
  const latest = deployments[0];
  assert(latest?.id && latest.versions.length === 1 && latest.versions[0].percentage === 100,
    "Wait for one production Worker version to serve all traffic before retiring vectors.");
  return latest.id;
}

async function indexedIds() {
  const ids = new Set();
  const cursors = new Set();
  let cursor;
  let total;
  do {
    const params = new URLSearchParams({ count: "1000" });
    if (cursor) params.set("cursor", cursor);
    const page = await readCloudflare(index + "/list?" + params);
    total ??= page.totalCount;
    assert.equal(page.totalCount, total, "Vector inventory changed while listing; retry.");
    assert.equal(page.count, page.vectors.length);
    for (const { id } of page.vectors) {
      assert(typeof id === "string" && !ids.has(id), "Invalid or repeated vector ID.");
      ids.add(id);
    }
    if (!page.isTruncated) break;
    cursor = page.nextCursor;
    assert(cursor && !cursors.has(cursor), "Invalid Vectorize pagination cursor.");
    cursors.add(cursor);
  } while (true);
  assert.equal(ids.size, total, "Incomplete Vectorize inventory.");
  return ids;
}

const deployment = await activeDeployment();
const [release, live, settings] = await Promise.all([
  request(origin + "/release.json").then(r => r.json()),
  request(origin + "/api/search/status").then(r => r.json()),
  readCloudflare(worker + "/settings"),
]);
assert(settings.bindings.some(b => b.type === "vectorize" && b.name === "VECTORIZE" && b.index_name === indexName));
assert.match(release.commit, /^[0-9a-f]{40}$/);
assert.equal(release.searchVersion, manifest.version);
assert.equal(release.projects, manifest.total);
assert.equal(live.version, manifest.version);
assert.equal(live.projects, manifest.total);
assert.equal(live.model, manifest.model);
assert.equal(live.dimensions, manifest.dimensions);
const committed = JSON.parse(execFileSync("git", ["show", release.commit + ":src/data/search-manifest.generated.json"], { encoding: "utf8" }));
assert.deepEqual(committed, manifest, "Local search manifest differs from the deployed commit.");
// A concurrent publisher can already have staged its next namespace.
// Only retire versions in the ancestry of the release actually serving traffic.
const assets = execFileSync("git", ["log", "--format=", "--name-only", "--diff-filter=A", release.commit, "--", "public/search-index"], { encoding: "utf8" });
const publishedVersions = new Set([...assets.matchAll(/^public\/search-index\/([0-9a-f]{16})\.f32$/gm)].map(match => match[1]));
assert(publishedVersions.has(manifest.version), "The live vector asset is absent from release history.");
const guardDeployment = async () => assert.equal(await activeDeployment(), deployment, "Production deployment changed; retry with the current release.");

const { retired, unrecognized } = planSearchRetention(manifest, await indexedIds(), publishedVersions);
await guardDeployment();
console.log(JSON.stringify({ dryRun, index: indexName, version: live.version, keep: manifest.total, retire: retired.length, unrecognized: unrecognized.length }));
if (!dryRun) {
  assert.equal(unrecognized.length, 0, "Unrecognized or concurrently staged vectors are present; retry after publication.");
  for (let offset = 0; offset < retired.length; offset += deleteBatchSize) {
    const ids = retired.slice(offset, offset + deleteBatchSize);
    await retry("Submit retired vector IDs", async () => {
      await guardDeployment();
      const result = await cloudflare(index + "/delete_by_ids", { method: "POST", body: { ids } });
      assert(result?.mutationId, "Vectorize did not acknowledge the deletion batch.");
    }, [2000, 5000]);
    const submitted = offset + ids.length;
    if (submitted % 1000 === 0 || submitted === retired.length) console.log(`Submitted ${submitted}/${retired.length} retired IDs.`);
  }
  const deadline = Date.now() + 10 * 60_000;
  let lastCount;
  for (;;) {
    await guardDeployment();
    const info = await readCloudflare(index + "/info");
    assert.equal(info.dimensions, manifest.dimensions);
    if (info.vectorCount === manifest.total) break;
    if (Date.now() >= deadline) throw new Error(`Vectorize still reports ${info.vectorCount} vectors; retry cleanup to resume.`);
    if (info.vectorCount !== lastCount) console.log(`Waiting for Vectorize: ${info.vectorCount} vectors indexed, target ${manifest.total}.`);
    lastCount = info.vectorCount;
    await delay(10000);
  }
  if (retired.length > 0) {
    await retry("Verify live vector IDs", async () => {
      const remaining = planSearchRetention(manifest, await indexedIds(), publishedVersions);
      assert.equal(remaining.retired.length + remaining.unrecognized.length, 0, "Other vectors remain in the index.");
    }, [3000, 10000, 20000]);
  }
  await guardDeployment();
  console.log(`Verified ${manifest.total} live vectors, ${manifest.total * manifest.dimensions} stored dimensions and no historical vectors.`);
}
