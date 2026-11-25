import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { activityDue, retry, command, acquirePublicationLock, planSearchRetention } from "../scripts/lib/publication.mjs";

test("monthly refresh follows Shanghai month boundaries, including year rollover", () => {
  assert.equal(activityDue("2026-10-01T00:00:00Z", new Date("2026-10-31T15:59:59Z")), false);
  assert.equal(activityDue("2026-10-31T15:59:59Z", new Date("2026-10-31T16:00:00Z")), true);
  assert.equal(activityDue("2026-12-31T15:59:59Z", new Date("2026-12-31T16:00:00Z")), true);
});

test("a real failed subprocess resumes at the failed stage and stops after success", async () => {
  const folder = await mkdtemp(join(tmpdir(), "publication-retry-test-"));
  const file = join(folder, "attempts");
  try {
    await retry("subprocess", attempt => command(process.execPath, ["--input-type=module", "-e",
      "import {appendFileSync} from 'node:fs'; appendFileSync(process.argv[1], process.argv[2]); process.exit(Number(process.argv[2]) < 2 ? 1 : 0)", file, String(attempt)]), [0, 0, 0]);
    assert.equal(await readFile(file, "utf8"), "012");
  } finally { await rm(folder, { recursive: true }); }
});

test("permanent command failure exhausts a bounded retry budget", async () => {
  let attempts = 0;
  await assert.rejects(retry("permanent", () => {
    attempts++;
    return command(process.execPath, ["-e", "process.exit(7)"]);
  }, [0, 0]), /failed \(7\)/);
  assert.equal(attempts, 3);
});

test("retention keeps the full live catalog and separates retired IDs from another publication's staging", () => {
  const current = "1111111111111111", previous = "2222222222222222", staged = "3333333333333333";
  const id = (version, digit) => version + "-" + digit.repeat(24);
  const entries = [{ id: id(current, "a") }, { id: id(current, "b") }];
  const manifest = { version: current, total: 2, entries };
  const history = new Set([previous, current]);
  const remote = new Set([...entries.map(x => x.id), id(previous, "a"), id(staged, "a"), id(current, "c")]);
  assert.deepEqual(planSearchRetention(manifest, remote, history), {
    retired: [id(previous, "a")], unrecognized: [id(staged, "a"), id(current, "c")],
  });
  assert.deepEqual(planSearchRetention(manifest, new Set(entries.map(x => x.id)), history), { retired: [], unrecognized: [] });
  remote.delete(entries[0].id);
  assert.throws(() => planSearchRetention(manifest, remote, history), /current catalog vector is missing/);
  assert.throws(() => planSearchRetention({ ...manifest, entries: [entries[1], entries[1]] }, remote, history), /unique set/);
});

test("publication and cleanup share exclusive access until the current owner finishes", async () => {
  const state = await mkdtemp(join(tmpdir(), "catalog-publication-lock-"));
  try {
    const first = await acquirePublicationLock(state);
    assert.equal(await acquirePublicationLock(state), null);
    await first.release();
    const next = await acquirePublicationLock(state);
    assert.ok(next);
    await next.release();
  } finally { await rm(state, { recursive: true, force: true }); }
});
