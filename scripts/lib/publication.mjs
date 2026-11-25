import { execFileSync, spawn } from "node:child_process";
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import assert from "node:assert/strict";

export const origin = "https://awesome-ai-visualization.renaissancemind.ai";
export const shanghaiMonth = date => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit",
}).format(date);
export const activityDue = (cutoff, now = new Date()) => shanghaiMonth(new Date(cutoff)) !== shanghaiMonth(now);

export async function acquirePublicationLock(stateDir) {
  if (!stateDir) {
    const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { encoding: "utf8" }).trim();
    stateDir = join(common, "publication");
  }
  await mkdir(stateDir, { recursive: true });
  const lock = join(stateDir, "lock");
  const ownerFile = join(lock, "owner.json");
  try { await mkdir(lock); }
  catch (error) {
    if (error.code !== "EEXIST") throw error;
    let owner;
    try { owner = JSON.parse(await readFile(ownerFile, "utf8")); }
    catch (error) {
      if (error.code !== "ENOENT") throw error;
      // An owner publishes its record immediately after creating the directory.
      if (Date.now() - (await stat(lock)).mtimeMs < 60000) return null;
    }
    if (owner) {
      try { process.kill(owner.pid, 0); return null; }
      catch (error) { if (error.code !== "ESRCH") throw error; }
    }
    await rm(lock, { recursive: true });
    await mkdir(lock);
  }
  await writeFile(ownerFile + ".tmp", JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }));
  await rename(ownerFile + ".tmp", ownerFile);
  return { stateDir, release: () => rm(lock, { recursive: true }) };
}

export function planSearchRetention(manifest, indexedIds, publishedVersions) {
  assert.match(manifest.version, /^[0-9a-f]{16}$/);
  const current = new Set(manifest.entries.map(entry => entry.id));
  assert(manifest.total > 0 && current.size === manifest.total && manifest.entries.length === manifest.total,
    "The current catalog must contain a complete, unique set of vector IDs.");
  for (const id of current) {
    assert(id.startsWith(manifest.version + "-") && indexedIds.has(id), "A current catalog vector is missing or has a different version.");
  }
  const retired = [];
  const unrecognized = [];
  for (const id of indexedIds) {
    if (current.has(id)) continue;
    const match = /^([0-9a-f]{16})-[0-9a-f]{24}$/.exec(id);
    if (match && match[1] !== manifest.version && publishedVersions.has(match[1])) retired.push(id);
    else unrecognized.push(id);
  }
  return { retired, unrecognized };
}

export async function retry(label, operation, waits = [10000, 30000]) {
  for (let attempt = 0; ; attempt++) {
    try { return await operation(attempt); }
    catch (error) {
      if (attempt >= waits.length) throw error;
      console.warn(`${label} failed; retry ${attempt + 1}/${waits.length} in ${waits[attempt] / 1000}s: ${error.message}`);
      await delay(waits[attempt]);
    }
  }
}

export function command(program, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args, { stdio: "inherit", ...options });
    child.on("error", reject);
    child.on("exit", (code, signal) => code === 0 ? resolve() : reject(new Error(`${program} ${args[0] ?? ""} failed (${signal ?? code})`)));
  });
}

export async function request(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "AwesomeAI-PublicationCheck/1.0", "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response;
}
