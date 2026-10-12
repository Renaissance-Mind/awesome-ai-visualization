#!/usr/bin/env python3
"""Build eight localized activity pages, vector figures and linked README sections.

Reads the existing fixed monthly/category snapshot. Requires matplotlib and a
font covering the selected languages (Arial Unicode MS is used on this Mac).
The website and SVGs share one translation file, category order and palette.
"""

import argparse
import html
import json
import math
import re
import shutil
import warnings
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.ticker import FuncFormatter, MaxNLocator


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "repository-activity"
PUBLIC = ROOT / "public" / "activity"
BASE_URL = "https://awesome-ai-visualization.renaissancemind.ai/activity"
PALETTE = ["#0099ff", "#ff944d", "#52bf80", "#e369af", "#9b75de", "#24b6b4"]
START_MARKER = "<!-- repository-activity:start -->"
END_MARKER = "<!-- repository-activity:end -->"
EXPECTED_CATEGORIES = ["presentation-tools", "data-dashboard", "doc-to-knowledge", "meta-index",
                       "codebase-map", "rendering-primitive", "diagram-generation", "video-generation",
                       "infographic-report", "research-report", "paper-visualization", "literature-map"]


def format_number(value, locale):
    text = f"{int(value):,}"
    return text.replace(",", "." if locale in ("es", "tr") else "\u00a0" if locale == "ru" else ",")


def figure(path, locale, copy, summary, monthly, metric):
    matplotlib.rcParams.update({"font.family": copy["font"], "svg.fonttype": "path",
                               "svg.hashsalt": f"activity-{locale}-{metric}", "hatch.linewidth": .7,
                               "axes.unicode_minus": False})
    warnings.filterwarnings("error", message="Glyph .* missing from .*font")
    fig = plt.figure(figsize=(12, 6.5), facecolor="white")
    axis = fig.add_axes([.085, .15, .90, .50])
    title = copy["commitsTitle"] if metric == "commits" else copy["createdTitle"]
    unit = copy["commitsUnit"] if metric == "commits" else copy["createdUnit"]
    snapshot = datetime.fromisoformat(summary["cutoff"]).astimezone(ZoneInfo(summary["timezone"]))
    subtitle = f"{copy['asOf']}: {snapshot:%Y-%m-%d %H:%M} UTC+8 · {copy['coverage']}: {summary['covered_repos']} / 850"
    fig.text(.075, .963, title, fontsize=22, color="#111723", va="top")
    fig.text(.075, .907, subtitle, fontsize=11.5, color="#606b7e", va="top")
    handles = [Patch(facecolor=PALETTE[i % 6], edgecolor="white", linewidth=0,
                     hatch="///" if i >= 6 else None, label=label)
               for i, label in enumerate(copy["categories"])]
    legend = fig.legend(handles=handles, loc="upper left", bbox_to_anchor=(.075, .853),
                        ncol=3, frameon=False, fontsize=11.5, handlelength=1.0,
                        columnspacing=1.7, handletextpad=.55, labelspacing=.7, borderaxespad=0)
    bottoms = [0] * len(monthly)
    for i, category in enumerate(summary["categories"]):
        values = [row[metric][category["id"]] for row in monthly]
        bars = axis.bar(range(len(monthly)), values, bottom=bottoms, width=.88,
                        color=PALETTE[i % 6], edgecolor="white", linewidth=0,
                        hatch="///" if i >= 6 else None, zorder=3)
        if monthly[-1]["partial_month"]:
            bars[-1].set_alpha(.4)
        bottoms = [a + b for a, b in zip(bottoms, values)]
    axis.set_xlim(-.6, len(monthly) - .4)
    upper = max(bottoms) * 1.15
    step = 10000 if metric == "commits" else 20
    axis.set_ylim(0, math.ceil(upper / step) * step)
    axis.yaxis.set_major_locator(MaxNLocator(nbins=5, integer=True))
    axis.yaxis.set_major_formatter(FuncFormatter(lambda value, _: format_number(value, locale)))
    ticks = list(range(0, len(monthly), 6))
    if ticks[-1] != len(monthly) - 1:
        ticks.append(len(monthly) - 1)
    axis.set_xticks(ticks, [monthly[i]["month"] for i in ticks])
    axis.tick_params(axis="both", labelsize=11.5, length=0, pad=9, colors="#111723")
    axis.grid(axis="y", color="#dfe5ec", linewidth=.6, zorder=0)
    for spine in axis.spines.values():
        spine.set_color("#dfe5ec")
        spine.set_linewidth(.65)
    axis.text(0, 1.04, unit, transform=axis.transAxes, fontsize=11.5, color="#111723")
    axis.set_xlabel(copy["month"], fontsize=11.5, labelpad=14, color="#111723")
    peak = max(range(len(monthly)), key=bottoms.__getitem__)
    axis.annotate(f"{monthly[peak]['month']} · {format_number(bottoms[peak], locale)}",
                  xy=(peak, bottoms[peak]), xytext=(-3 if peak > len(monthly) - 8 else 3, 7),
                  textcoords="offset points", ha="right" if peak > len(monthly) - 8 else "left",
                  fontsize=11.5, color="#111723")
    footer = f"{copy['total']}: {format_number(sum(bottoms), locale)} · 2024-01 — 2026-10 · {copy['partial']}"
    fig.text(.075, .038, footer, fontsize=11.5, color="#606b7e")
    fig.canvas.draw()
    renderer = fig.canvas.get_renderer()
    canvas = fig.bbox
    for artist in [legend, *legend.get_texts(), *fig.texts]:
        bounds = artist.get_window_extent(renderer)
        if bounds.x0 < canvas.x0 or bounds.x1 > canvas.x1 or bounds.y0 < canvas.y0 or bounds.y1 > canvas.y1:
            raise ValueError(f"Clipped figure text in {locale}/{metric}: {artist}")
    fig.savefig(path, format="svg", metadata={"Date": None, "Title": title, "Description": copy["methods"]})
    path.write_text("\n".join(line.rstrip() for line in path.read_text().splitlines()) + "\n")
    plt.close(fig)


def update_readme(path, locale, copy):
    images = []
    for filename, key, anchor in [("commits.svg", "commitsTitle", "commits"),
                                  ("repos-created.svg", "createdTitle", "repos-created")]:
        images.append(f"[![{copy[key]}](public/activity/{locale}/{filename})]({BASE_URL}/{locale}/#{anchor})")
    section = f"{START_MARKER}\n## {copy['section']}\n\n{copy['intro']}\n\n" + "\n\n".join(images) + f"\n{END_MARKER}\n\n"
    text = path.read_text()
    if START_MARKER in text:
        text = re.sub(re.escape(START_MARKER) + r".*?" + re.escape(END_MARKER) + r"\n*",
                      lambda _: section, text, flags=re.S)
    else:
        marker = "## Latest Refresh"
        if text.count(marker) != 1:
            raise ValueError(f"Cannot locate README chart insertion point in {path}")
        text = text.replace(marker, section + marker, 1)
    path.write_text(text)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skip-readmes", action="store_true")
    args = parser.parse_args()
    monthly = json.loads((DATA / "category-monthly.json").read_text())
    summary = json.loads((DATA / "category-summary.json").read_text())
    locales = json.loads((DATA / "locales.json").read_text())
    assert [category["id"] for category in summary["categories"]] == EXPECTED_CATEGORIES
    assert len(monthly) == 34 and sum(sum(row["commits"].values()) for row in monthly) == summary["commits"]
    assert sum(sum(row["repos_created"].values()) for row in monthly) == summary["repos_created"]
    PUBLIC.mkdir(parents=True, exist_ok=True)
    template = (ROOT / "scripts" / "templates" / "repository-activity-page.html").read_text()
    snapshot = datetime.fromisoformat(summary["cutoff"]).astimezone(ZoneInfo(summary["timezone"]))
    for locale, copy in locales.items():
        assert len(copy["categories"]) == len(EXPECTED_CATEGORIES)
        folder = PUBLIC / locale
        folder.mkdir(exist_ok=True)
        for filename, metric in [("commits.svg", "commits"), ("repos-created.svg", "repos_created")]:
            figure(folder / filename, locale, copy, summary, monthly, metric)
        categories = [{**category, "label": copy["categories"][i]} for i, category in enumerate(summary["categories"])]
        payload = {"monthly": monthly, "categories": categories, "copy": copy, "locale": locale}
        replacements = {
            "LANG": locale, "TITLE": copy["title"], "INTRO": copy["intro"],
            "CATALOG_URL": "/?lang=en" if locale == "en" else "/?lang=zh" if locale == "zh-CN" else "/",
            "LANGUAGE": copy["language"], "CATALOG": copy["catalog"], "FILTER_HINT": copy["filterHint"],
            "COMMITS_TITLE": copy["commitsTitle"], "CREATED_TITLE": copy["createdTitle"],
            "SVG": copy["svg"], "DATA": copy["data"], "METHODS": copy["methods"],
            "COMMITS_TOTAL": f"{copy['total']}: {format_number(summary['commits'], locale)}",
            "CREATED_TOTAL": f"{copy['total']}: {format_number(summary['repos_created'], locale)}",
            "SNAPSHOT": f"{copy['asOf']}: {snapshot:%Y-%m-%d %H:%M} UTC+8 · {copy['coverage']}: {summary['covered_repos']} / 850 · {copy['partial']}",
        }
        page = template
        for key, value in replacements.items():
            page = page.replace(f"__{key}__", html.escape(value, quote=True))
        alternates = "\n".join(f'<link rel="alternate" hreflang="{lang}" href="{BASE_URL}/{lang}/">' for lang in locales)
        options = "".join(f'<option value="{lang}"' + (' selected' if lang == locale else '') + f'>{html.escape(other["name"])}</option>' for lang, other in locales.items())
        page = page.replace("__ALTERNATES__", alternates).replace("__LANGUAGE_OPTIONS__", options)
        page = page.replace("__DATA_JSON__", json.dumps(payload, ensure_ascii=False).replace("<", "\\u003c"))
        if re.search(r"__[A-Z_]+__", page):
            raise ValueError(f"Unreplaced website placeholder in {locale}")
        (folder / "index.html").write_text(page)
        if not args.skip_readmes:
            update_readme(ROOT / copy["readme"], locale, copy)
        print(f"Published assets: {locale}, 2 SVGs + interactive page", flush=True)
    for extension in ["css", "js"]:
        shutil.copyfile(ROOT / "scripts" / "templates" / f"repository-activity-page.{extension}", PUBLIC / f"activity.{extension}")
    shutil.copyfile(DATA / "category-monthly.csv", PUBLIC / "category-monthly.csv")
    (PUBLIC / "index.html").write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=en/"><a href="en/">Repository activity</a></html>\n')


if __name__ == "__main__":
    main()
