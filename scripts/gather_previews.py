#!/usr/bin/env python3
"""Gather real preview imagery for each catalog tool so the site can show
what each product actually produces (output), not just link out.

Sources, in priority order:
  - GitHub repos:   content images embedded in the README (author-curated
                    screenshots of real outputs), resolved to raw URLs.
  - Product sites:  og:image / twitter:image marketing shot, else a live
                    headless-Chrome homepage screenshot.

Downloads, compresses (via `sips`), and writes site/assets/previews/*.jpg
plus site/previews.json (manifest: tool id -> [{file, source, w, h}]).

Usage:
  python3 scripts/gather_previews.py             # all tools
  python3 scripts/gather_previews.py --only 12   # first N (for testing)
  python3 scripts/gather_previews.py --names GitDiagram,Gamma
"""
from __future__ import annotations
import argparse, json, re, ssl, subprocess, sys, urllib.request, urllib.parse
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "data" / "catalog.yml"
OUTDIR = ROOT / "site" / "assets" / "previews"
MANIFEST = ROOT / "site" / "previews.json"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

BAD = re.compile(r"(logo|favicon|icon|badge|shield|star-history|sponsor|qr[-_.]|wechat|"
                 r"contributor|made[-_]with|avatar|stars?\b|\.svg$|placeholder|mascot|"
                 r"octocat|arxiv|banner|promo|newsletter|discord|/social|twitter|"
                 r"buy[-_]|donate|coffee|profile|headshot|emoji|sticker)", re.I)
GOOD = re.compile(r"(demo|example|output|result|screenshot|preview|overview|showcase|hero|"
                  r"feature|ui|home|app|dashboard|poster|diagram|figure|workflow|sample|"
                  r"generated|slide|deck|map|chart|cover|teaser|pipeline|arch)", re.I)
IMG_EXT = re.compile(r"\.(png|jpe?g|webp|gif)(\?|$)", re.I)

MIN_W = 520          # final compressed width floor
MIN_RATIO = 1.15     # prefer landscape; logos/mascots are ~1.0
MAX_RATIO = 3.4      # reject thin banners

OVERRIDES = ROOT / "scripts" / "preview_overrides.json"   # tid -> [image urls]
BLACKLIST = ROOT / "scripts" / "preview_blacklist.txt"    # one source url substring per line


def fetch_text(url: str, timeout=20) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=timeout, context=CTX).read().decode("utf-8", "ignore")


def fetch_bytes(url: str, timeout=30, cap=14_000_000) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": url})
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
        data = r.read(cap + 1)
    return None if len(data) > cap else data


def gh_parts(url: str):
    m = re.match(r"https?://github\.com/([^/]+)/([^/]+)", url)
    if not m:
        return None
    owner, repo = m.group(1), m.group(2).replace(".git", "")
    return owner, repo


def raw_readme_candidates(owner, repo):
    for branch in ("HEAD", "main", "master"):
        url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md"
        try:
            md = fetch_text(url)
            if md:
                return md, branch
        except Exception:
            continue
    return None, None


def resolve_img(src, owner, repo, branch):
    src = src.strip().split(" ")[0].strip('"\'')
    if src.startswith("http"):
        # normalise github blob -> raw
        src = src.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
        return src
    if src.startswith("//"):
        return "https:" + src
    src = re.sub(r"^\./", "", src).lstrip("/")
    return f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{urllib.parse.quote(src)}"


def readme_images(url):
    parts = gh_parts(url)
    if not parts:
        return []
    owner, repo = parts
    md, branch = raw_readme_candidates(owner, repo)
    if not md:
        return []
    raw = re.findall(r"!\[[^\]]*\]\(([^)\s]+)", md) + re.findall(r"<img[^>]+src=[\"']([^\"']+)", md)
    out, seen = [], set()
    for i, s in enumerate(raw):
        if not IMG_EXT.search(s) or BAD.search(s):
            continue
        full = resolve_img(s, owner, repo, branch)
        if full in seen:
            continue
        seen.add(full)
        score = (10 if GOOD.search(s) else 0) - i * 0.1 - (3 if s.lower().endswith(".gif") else 0)
        out.append((score, full))
    out.sort(key=lambda x: -x[0])
    return [u for _, u in out]


def og_image(homepage):
    try:
        html = fetch_text(homepage, timeout=18)
    except Exception:
        return None
    for pat in (r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)',
                r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)',
                r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image'):
        m = re.search(pat, html, re.I)
        if m:
            u = m.group(1)
            if u.startswith("//"):
                u = "https:" + u
            elif u.startswith("/"):
                p = urllib.parse.urlparse(homepage)
                u = f"{p.scheme}://{p.netloc}{u}"
            if IMG_EXT.search(u) or "image" in u:
                return u
    return None


def screenshot(url, dest):
    try:
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                        "--no-sandbox", "--force-device-scale-factor=1",
                        "--window-size=1280,860", f"--screenshot={dest}",
                        "--virtual-time-budget=6000", url],
                       timeout=45, capture_output=True)
        return dest.exists() and dest.stat().st_size > 8000
    except Exception:
        return False


def compress(src: Path, dst: Path, maxw=1200):
    """Resize + re-encode to JPEG via macOS sips. Returns (w,h) or None."""
    try:
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "78",
                        "-Z", str(maxw), str(src), "--out", str(dst)],
                       check=True, capture_output=True, timeout=40)
        out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(dst)],
                             capture_output=True, text=True)
        w = re.search(r"pixelWidth:\s*(\d+)", out.stdout)
        h = re.search(r"pixelHeight:\s*(\d+)", out.stdout)
        return (int(w.group(1)), int(h.group(1))) if w and h else (maxw, 0)
    except Exception:
        return None


def load_aux():
    ov = json.loads(OVERRIDES.read_text()) if OVERRIDES.exists() else {}
    bl = [l.strip() for l in BLACKLIST.read_text().splitlines()] if BLACKLIST.exists() else []
    bl = [b for b in bl if b and not b.startswith("#")]
    return ov, bl


def process(entry, idx, overrides, blacklist):
    name = entry["name"]
    tid = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    url = entry.get("url", "")
    homepage = entry.get("homepage")
    is_gh = "github.com" in url
    results = []
    tmp = OUTDIR / f"_tmp_{tid}"
    for old in OUTDIR.glob(f"{tid}-*.jpg"):      # clear stale picks on re-run
        old.unlink(missing_ok=True)

    candidates = []  # (kind, url-or-None for screenshot)
    for u in overrides.get(tid, []):              # manual picks win
        candidates.append(("override", u))
    if is_gh:
        for u in readme_images(url)[:5]:
            candidates.append(("readme", u))
        site = homepage if homepage and "github.com" not in homepage else None
        if site:
            og = og_image(site)
            if og:
                candidates.append(("og", og))
    else:
        site = homepage or url
        og = og_image(site)
        if og:
            candidates.append(("og", og))
        candidates.append(("shot", site))  # always allow a live capture fallback

    got = 0
    MAXPER = 1   # one strong hero per tool keeps the gallery clean
    for n, (kind, src) in enumerate(candidates):
        if kind != "override" and (BAD.search(src) or any(b in src for b in blacklist)):
            continue   # reject logo/brand/ad sources across all kinds
        if got >= MAXPER:
            break
        dst = OUTDIR / f"{tid}-{got+1}.jpg"
        try:
            if kind == "shot":
                shot = tmp.with_suffix(".png")
                if not screenshot(src, shot):
                    continue
                dim = compress(shot, dst); shot.unlink(missing_ok=True)
                ref = src
            else:
                data = fetch_bytes(src)
                if not data or len(data) < 6000:
                    continue
                tmp.write_bytes(data)
                dim = compress(tmp, dst); tmp.unlink(missing_ok=True)
                ref = src
            ok = dim and dim[1] > 80 and dst.stat().st_size > 6000
            if ok and kind not in ("override", "shot"):   # quality gate for auto picks
                ratio = dim[0] / dim[1]
                if dim[0] < MIN_W or ratio < MIN_RATIO or ratio > MAX_RATIO:
                    ok = False
            if ok:
                results.append({"file": f"assets/previews/{dst.name}", "source": ref,
                                "kind": kind, "w": dim[0], "h": dim[1]})
                got += 1
            else:
                dst.unlink(missing_ok=True)
        except Exception as e:
            print(f"    ! {kind} {src[:60]}: {e}")
            continue
    tag = "✓" if results else "·"
    print(f"  [{idx:>3}] {tag} {name[:34]:<34} {len(results)} img  ({'gh' if is_gh else 'web'})")
    return tid, results


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", type=int)
    ap.add_argument("--names")
    ap.add_argument("--missing", action="store_true", help="only tools absent from the manifest")
    args = ap.parse_args()

    OUTDIR.mkdir(parents=True, exist_ok=True)
    entries = yaml.safe_load(CATALOG.read_text())["entries"]
    manifest = {}
    if MANIFEST.exists():
        manifest = json.loads(MANIFEST.read_text())

    if args.names:
        want = {n.strip().lower() for n in args.names.split(",")}
        entries = [e for e in entries if e["name"].lower() in want]
    if args.missing:
        entries = [e for e in entries
                   if re.sub(r"[^a-z0-9]+", "-", e["name"].lower()).strip("-") not in manifest]
    if args.only:
        entries = entries[:args.only]

    overrides, blacklist = load_aux()

    for i, e in enumerate(entries, 1):
        tid, res = process(e, i, overrides, blacklist)
        if res:
            manifest[tid] = res
        else:
            manifest.pop(tid, None)   # cleared -> falls back to a plate
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=1))
    covered = sum(1 for v in manifest.values() if v)
    print(f"\nManifest: {covered} tools with imagery -> {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
