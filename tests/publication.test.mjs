import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { activityDue, retry, command } from "../scripts/lib/publication.mjs";

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
