# Showroom — what these tools actually produce

A static, dependency-free **visual showroom** for the catalog in this
repository. Instead of a directory of links, it shows the *real output* of
each tool inline — README screenshots, product `og:image` shots, and live
homepage captures — in a justified photo gallery. Click any tool to open a
detail view with **Input → Output**, the capability, dependencies, and links.

Tools without a usable screenshot get a generated typographic "poster plate"
in their field colour, so the gallery stays complete and cohesive.

## View it

```sh
python3 -m http.server -d site 8088   # then open http://127.0.0.1:8088
```

It also opens straight from disk (`open site/index.html`), though a server
is recommended so the preview images load over HTTP.

## Files

| File | Role |
| --- | --- |
| `index.html` | Page shell (hero, marquee, field nav, showcase, lightbox). |
| `styles.css` | Editorial gallery theme. |
| `app.js` | Gallery render, search, field filter, lightbox, deep-links. |
| `data.js` | **Generated** `window.ATLAS_DATA` (catalog + input/output + previews). |
| `previews.json` | **Generated** manifest: tool → preview image. |
| `assets/previews/` | **Generated** compressed preview images. |

## Regenerate

```sh
# 1. gather preview imagery (network + headless Chrome; slow)
python3 scripts/gather_previews.py            # all tools
python3 scripts/gather_previews.py --missing  # only tools lacking a preview
python3 scripts/gather_previews.py --names "GitDiagram,Gamma"   # specific tools

# 2. rebuild the page data from catalog + previews
python3 scripts/build_site.py
```

### Curating imagery

`gather_previews.py` rejects logos, badges, banners, and ads, and prefers
landscape content screenshots. To override its picks:

- `scripts/preview_blacklist.txt` — image source substrings to never use.
- `scripts/preview_overrides.json` — `{"tool-id": ["https://…image.png"]}`
  to force a specific image (wins over auto-selection).

After editing either, re-run `gather_previews.py --names …` for the affected
tools, then `build_site.py`.

## Design notes

- Input-forward: the catalog's structured `source_types` / `output_forms`
  drive every **Input → Output** line; the note is the capability text.
- Justified photo rows (varied widths, uniform height) — no card grid, no
  pill chrome. Editorial text nav, hairline detail panels.
- Warm ivory paper, Fraunces / Inter / JetBrains Mono, soft gradient field.
- Deep-linkable: `index.html#tool-<id>` opens that tool's detail view.
- Respects `prefers-reduced-motion`.

## Deploy on GitHub Pages

Fully static. Point Pages at the `/site` folder (or copy `site/` to `/docs`).
