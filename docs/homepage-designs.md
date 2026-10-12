# Homepage design previews

The React application has a landing page at `/`, a catalog at `?view=catalog`,
and project readers at `?tool=PROJECT_NAME`. All three use the same `Header`.
The header contains Home, Catalog, a native language dropdown and an accessible
GitHub icon link. The former guides page is removed; old `?view=guides` links
open the catalog. Existing filter and project URLs continue to work.

Three working visual directions are available for design review:

| Preview | URL | Direction |
| --- | --- | --- |
| A · Atlas | `/?design=atlas` | Warm paper, serif typography, a flowing information map |
| B · Cosmos | `/?design=cosmos` | Dark green, luminous lines, a central knowledge constellation |
| C · Studio | `/?design=studio` | Vermilion, pale green, printed geometric cutouts |

Atlas is the provisional default. The floating design controls are a review
surface for selecting a direction. They appear only on the landing page.
`lang=zh` and `lang=en` switch the landing page and shared navigation copy.
Existing catalog descriptions and project profiles retain their source language.
Language and design parameters survive internal navigation, including opening
links in another tab.

The narrative connects information sources, AI tools and outputs for people:
project purpose, an interactive input → tool → output example, real project
previews and catalog entry points. Counts come from the generated catalog.
PaperBanana, Graphify and Open Design examples use existing local project
previews and link to their real project readers.

Motion includes flowing SVG signals, breathing rings, floating points,
scroll reveals, pointer response and a moving type ribbon. The motion control
pauses repeating animations; system reduced-motion preferences disable motion.
Layout adapts to narrow screens and supports keyboard navigation.
