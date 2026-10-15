// Run from any checkout. All generated edits happen in an isolated worktree.
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile, rename, rm, mkdtemp, symlink } from "node:fs/promises";
import { resolve, join } from "node:path";
import { tmpdir } from "node:os";
import { origin, retry, command, activityDue } from "./lib/publication.mjs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const common = git("rev-parse", "--path-format=absolute", "--git-common-dir");
const stateDir = join(common, "publication");
await mkdir(stateDir, { recursive: true });
const lock = join(stateDir, "lock");
try { await mkdir(lock); }
catch (error) {
  if (error.code !== "EEXIST") throw error;
  // Never take over a live run. A crashed run can be resumed by the next heartbeat.
  const owner = JSON.parse(await readFile(join(lock, "owner.json"), "utf8"));
  try { process.kill(owner.pid, 0); console.log("Publication already running."); process.exit(0); }
  catch (error) { if (error.code !== "ESRCH") throw error; }
  await rm(lock, { recursive: true });
  await mkdir(lock);
}
await writeFile(join(lock, "owner.json"), JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }));
let previous = {};
try { previous = JSON.parse(await readFile(join(stateDir, "status.json"), "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; }
const status = { startedAt: new Date().toISOString(), status: "running", phase: "fetch", worktree: null,
  lastSuccessfulCommit: previous.lastSuccessfulCommit ?? null,
  lastNotification: previous.lastNotification ?? null };
const notification = message => {
  status.notify = message !== status.lastNotification;
  status.lastNotification = message;
};
const save = async () => {
  await writeFile(join(stateDir, "status.json.tmp"), JSON.stringify(status, null, 2) + "\n");
  await rename(join(stateDir, "status.json.tmp"), join(stateDir, "status.json"));
};
let cwd;
const run = (program, args) => command(program, args, { cwd });
const step = async (name, operation, waits) => {
  status.phase = name; await save(); console.log(`\nPublication: ${name}`);
  return retry(name, operation, waits);
};
const npm = script => run("npm", ["run", script]);
const localGit = (...args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

try {
  await step("fetch", () => command("git", ["fetch", "origin"]));
  const head = git("rev-parse", "origin/main");
  status.commit = head;
  const summary = JSON.parse(git("show", "origin/main:data/repository-activity/category-summary.json"));
  const monthly = process.argv.includes("--refresh-activity") || activityDue(summary.cutoff);
  const parent = await mkdtemp(join(tmpdir(), "awesome-publication-"));
  cwd = join(parent, "checkout"); status.worktree = cwd; await save();
  await command("git", ["worktree", "add", "--detach", cwd, head]);
  // Cache only generated embeddings and public commit histories, never credentials.
  for (const [relative, cache] of [[".wrangler/catalog-search", "search-cache"], [".cache/repository-activity", "history-cache"]]) {
    const destination = join(stateDir, cache);
    await mkdir(destination, { recursive: true });
    await mkdir(resolve(cwd, relative, ".."), { recursive: true });
    await symlink(destination, join(cwd, relative));
  }

  // Re-run a failed daily collector at most twice per run ID. The collector also retries transient failures internally.
  const runs = JSON.parse(execFileSync("gh", ["run", "list", "--workflow", "repository-signals.yml", "--limit", "1",
    "--json", "databaseId,status,conclusion,url"], { cwd, encoding: "utf8" }));
  const collector = runs[0];
  status.collector = collector;
  status.collectorRetries = previous.collector?.databaseId === collector?.databaseId ? (previous.collectorRetries ?? 0) : 0;
  if (collector?.status === "completed" && ["failure", "timed_out", "cancelled"].includes(collector.conclusion)) {
    if (status.collectorRetries < 2) {
      await run("gh", ["run", "rerun", String(collector.databaseId), "--failed"]);
      status.collectorRetries++;
    }
    status.collectorWarning = `Daily collector ${collector.conclusion}: ${collector.url}; retries ${status.collectorRetries}/2`;
    console.warn(status.collectorWarning);
  }
  await step("dependencies", () => run("npm", ["ci"]));
  let live;
  await step("read live release", async () => {
    const response = await fetch(origin + "/release.json", { headers: { "User-Agent": "AwesomeAI-PublicationCheck/1.0" }, signal: AbortSignal.timeout(30000) });
    if (response.status === 404 || (response.ok && response.headers.get("content-type")?.includes("text/html"))) return;
    if (!response.ok) throw new Error(`Release metadata returned HTTP ${response.status}`);
    live = await response.json();
  });
  let needsPublish = monthly || live?.commit !== head;
  if (!needsPublish) {
    try {
      await step("live assets and freshness", () => run("node", ["scripts/check-publication.mjs", "--live"]));
      await step("live search", () => npm("check:search-api"));
      status.status = ["failed", "attention"].includes(previous.status) ? "recovered" : "unchanged";
    } catch (error) {
      console.warn(`Live verification failed; rebuilding the current source: ${error.message}`);
      needsPublish = true;
    }
  }
  if (needsPublish) {
    if (monthly) {
      await step("monthly collection", attempt => run("python3", ["scripts/collect_repository_activity.py", "--workers", "8", ...(attempt === 0 ? ["--refresh"] : [])]));
      await step("monthly grouping", () => run("python3", ["scripts/build_repository_activity_categories.py", ".cache/activity-integration/categories.html"]), []);
      await step("monthly charts", () => run("python3", ["scripts/publish_repository_activity.py"]), []);
    }
    await step("project explanations", () => npm("generate:profiles"));
    await step("search synchronization", () => npm("sync:search"));
    await step("index readiness", () => npm("check:search"), [15000, 30000, 60000, 60000, 60000]);
    await step("activity checks", () => run("node", ["scripts/check-repository-activity.mjs"]), []);
    await step("frontend checks", () => npm("check:frontend"), []);
    await step("build", () => npm("build"), []);
    await run("git", ["diff", "--check"]);
    await run("git", ["add", "data/project-profiles.json", "src/data", "public/search-index", "data/repository-activity", "public/activity",
      "README.md", "README.zh-CN.md", "README.zh-TW.md", "README.ja.md", "README.ko.md", "README.es.md", "README.tr.md", "README.ru.md"]);
    if (localGit("diff", "--cached", "--name-only")) {
      await run("git", ["commit", "-m", monthly ? "chore(data): refresh monthly repository activity" : "chore(data): refresh publication artifacts"]);
      // A concurrent source update rejects this push. Preserve this worktree; the next run starts from fresh main.
      await step("push artifacts", () => run("git", ["push", "origin", "HEAD:main"]));
    }
    await step("source freshness", async () => {
      await run("git", ["fetch", "origin"]);
      if (localGit("rev-parse", "HEAD") !== localGit("rev-parse", "origin/main")) throw new Error("main changed during preparation; retry from the new source on the next run.");
    }, []);
    await run("node", ["scripts/prepare-release.mjs"]);
    await step("deploy", () => run("npx", ["--yes", "wrangler@4.143.0", "deploy"]));
    // Verification failures retry without issuing another deployment.
    await step("published assets and freshness", () => run("node", ["scripts/check-publication.mjs"]), [15000, 30000, 60000]);
    await step("published search", () => npm("check:search-api"));
    status.status = "published";
  }
  status.commit = localGit("rev-parse", "HEAD");
  status.completedAt = new Date().toISOString(); status.phase = "complete";
  status.lastSuccessfulCommit = status.commit;
  if (status.collectorWarning) status.status = "attention";
  notification(status.collectorWarning ? `collector:${collector.databaseId}:${collector.conclusion}` : `healthy:${status.commit}`);
  if (status.status === "unchanged" && !["failed", "attention"].includes(previous.status)) status.notify = false;
  await save();
  await command("git", ["worktree", "remove", cwd]);
  await rm(parent, { recursive: true });
  console.log("PUBLICATION_RESULT " + JSON.stringify(status));
} catch (error) {
  status.status = "failed"; status.error = error.message; status.completedAt = new Date().toISOString();
  notification(`failed:${status.phase}:${status.error}`);
  await save();
  console.error("PUBLICATION_FAILURE " + JSON.stringify(status));
  process.exitCode = 1;
} finally {
  await rm(lock, { recursive: true });
}
