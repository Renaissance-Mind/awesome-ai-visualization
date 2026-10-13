"""Exercise label boundaries and snapshot retention; no mocked GitHub API."""

import json
import sys
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from collect_repository_signals import deduplicate, growth, label_record, publish


def record(**changes):
    return {"id": "stable-id", "status": "ok", "catalog_repo": "owner/repo",
            "catalog_aliases": ["owner/repo"], "entries": ["Example"],
            "observed_at": "2026-10-13T00:00:00Z", "stars": 100, "forks": 10,
            "archived": False, "default_branch": "main",
            "commits": {"7": 1, "30": 2, "60": 4, "90": 6}, **changes}


class RepositorySignalsTests(unittest.TestCase):
    def test_initial_collection_has_no_growth_claim(self):
        value = label_record(record(), {})
        self.assertEqual(value["tags"], ["updated_7d", "sustained_activity"])
        self.assertEqual(value["growth"], {"7d": None, "30d": None})

    def test_sustained_requires_all_three_periods(self):
        value = label_record(record(commits={"7": 0, "30": 2, "60": 3, "90": 20}), {})
        self.assertEqual(value["tags"], ["updated_30d"])

    def test_archived_and_unavailable_are_not_inferred_active(self):
        self.assertEqual(label_record(record(archived=True), {})["tags"], ["archived"])
        self.assertEqual(label_record({"status": "unavailable"}, {})["tags"], ["unavailable"])
        self.assertEqual(label_record(record(default_branch=None), {})["tags"], ["empty"])

    def test_quiet_window_is_not_a_quality_judgment(self):
        value = label_record(record(commits={"7": 0, "30": 0, "60": 0, "90": 0}), {})
        self.assertEqual(value["tags"], ["quiet_90d"])

    def test_baseline_uses_stable_id_and_nearest_date(self):
        history = {"stable-id": [
            {"observed_at": "2026-10-05T00:00:00Z", "stars": 80, "forks": 8},
            {"observed_at": "2026-10-06T00:00:00Z", "stars": 90, "forks": 9},
            {"observed_at": "2026-10-12T00:00:00Z", "stars": 99, "forks": 10},
        ]}
        change = growth(record(catalog_repo="new-owner/new-name"), history, 7)
        self.assertEqual(change["baseline_at"], "2026-10-06T00:00:00Z")
        self.assertEqual(change["stars_delta"], 10)
        self.assertEqual(change["forks_delta"], 1)
        self.assertIsNone(growth(record(), history, 30))

    def test_growth_thresholds_and_star_losses(self):
        history = {"stable-id": [{"observed_at": "2026-10-06T00:00:00Z",
                                  "stars": 100, "forks": 10}]}
        self.assertNotIn("stars_growing_7d", label_record(record(stars=109), history)["tags"])
        self.assertIn("stars_growing_7d", label_record(record(stars=110), history)["tags"])
        self.assertIn("stars_fast_growth_7d", label_record(record(stars=150), history)["tags"])
        value = label_record(record(stars=90), history)
        self.assertEqual(value["growth"]["7d"]["stars_delta"], -10)
        self.assertNotIn("stars_growing_7d", value["tags"])

    def test_aliases_count_once(self):
        rows = deduplicate([record(), record(catalog_repo="old/repo", entries=["Alias"])])
        self.assertEqual(len(rows), 1)
        self.assertEqual(set(rows[0]["entries"]), {"Example", "Alias"})
        self.assertEqual(set(rows[0]["catalog_aliases"]), {"owner/repo", "old/repo"})

    def test_daily_rerun_preserves_first_baseline_and_recovers_missing(self):
        cutoff = datetime(2026, 10, 13, tzinfo=timezone.utc)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            publish(output, [record()], cutoff, "fingerprint", "catalog")
            publish(output, [record(stars=120), record(id="recovered-id")], cutoff,
                    "fingerprint", "catalog")
            daily = json.loads((output / "history/2026-10-13.json").read_text())
            self.assertEqual(len(daily["records"]), 2)
            baseline = next(row for row in daily["records"] if row["id"] == "stable-id")
            self.assertEqual(baseline["stars"], 100)
            latest = json.loads((output / "latest.json").read_text())
            self.assertEqual(latest["records"][0]["stars"], 120)
            self.assertEqual(latest["records"][0]["star_history"], [{"observed_at": "2026-10-13T00:00:00Z", "stars": 120}])


if __name__ == "__main__":
    unittest.main()
