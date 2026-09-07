# DIXIOS — Implementation Documentation Pack

This repository is intentionally documentation-first.

The purpose of this pack is to stop rebuilding solved problems from scratch. For every visual subsystem in the target Dixios homepage, the docs below identify:

1. the closest reusable implementation already available;
2. the official documentation or source repository;
3. the license/reuse status when it can be verified;
4. what should be reused vs. what must remain custom Dixios art direction;
5. the recommended implementation order;
6. the QA/performance constraints.

> **Important:** these files are a curated technical dossier and link index. They do **not** mirror or republish third-party documentation. Always consult the linked original source before adoption, especially for licensing and version-specific APIs.

## Documentation map

| File | Purpose |
|---|---|
| [`docs/00-REUSE-ATLAS.md`](docs/00-REUSE-ATLAS.md) | Master inventory: every target feature mapped to existing reusable code/assets |
| [`docs/01-HERO-CITY.md`](docs/01-HERO-CITY.md) | Current Hero art + technical direction: approved copy, neutral metropolitan city, human/technology convergence, reusable 3D assets and performance strategy |
| [`docs/02-SYSTEM-STACK.md`](docs/02-SYSTEM-STACK.md) | “Un sistema para mejores decisiones”: 3D stack, SVG map/network layers, GSAP |
| [`docs/03-CAPABILITIES-GRAPHIC-SYSTEM.md`](docs/03-CAPABILITIES-GRAPHIC-SYSTEM.md) | Five capabilities, original line/dot/grid language and lightweight references |
| [`docs/04-MEXICO-TERRITORY.md`](docs/04-MEXICO-TERRITORY.md) | Real Mexico geometry, dot-density rendering, SVG masks, map motion |
| [`docs/05-PUBLICATIONS-NAV-FOOTER.md`](docs/05-PUBLICATIONS-NAV-FOOTER.md) | Editorial grid, navbar and footer reusable foundations |
| [`docs/06-MOTION-QA-PERFORMANCE.md`](docs/06-MOTION-QA-PERFORMANCE.md) | GSAP, visual regression with Playwright/Pixelmatch, Three performance and cleanup |
| [`docs/07-ASSETS-LICENSES.md`](docs/07-ASSETS-LICENSES.md) | Asset sources and license notes: Quaternius, Kenney, third-party repos |
| [`docs/08-ENVIRONMENT-GITHUB-PAGES.md`](docs/08-ENVIRONMENT-GITHUB-PAGES.md) | Recommended Astro/R3F environment and GitHub Pages deployment constraints |
| [`docs/09-SITE-STRUCTURE-5-SECTIONS.md`](docs/09-SITE-STRUCTURE-5-SECTIONS.md) | Current five-section site structure and content hierarchy |
| [`docs/10-CAPABILITIES-VISUAL-RESOURCE-LIBRARY.md`](docs/10-CAPABILITIES-VISUAL-RESOURCE-LIBRARY.md) | Curated embeddable visual resources for the five capabilities; explicitly excludes full-page templates |
| [`docs/11-ASCII-TEXTMODE-VISUAL-SYSTEM.md`](docs/11-ASCII-TEXTMODE-VISUAL-SYSTEM.md) | FIGLET + animated ASCII/textmode research, export strategy and capability concepts |
| [`docs/12-MILESTONE-HERO-CITY-V1.md`](docs/12-MILESTONE-HERO-CITY-V1.md) | Single-execution implementation task for Hero City V1: project foundation → 3D city → motion → responsive → performance → deterministic visual QA |
| [`docs/SOURCES.md`](docs/SOURCES.md) | Flat source index of all primary documentation/demo URLs |

## Target architecture

The reference page should **not** be rebuilt from one monolithic framework.

Recommended split:

- **Astro** — static shell, layout, typography, editorial content.
- **React Three Fiber / Three.js** — hero city only, as an isolated island.
- **Drei** — prebuilt Three/R3F helpers: instancing/merging, asset helpers, performance utilities.
- **meshline** — thick controllable infrastructure routes only when it beats simpler geometry.
- **react-postprocessing** — restrained selective bloom when it materially improves the hero.
- **GSAP + ScrollTrigger** — narrative scroll choreography for later sections where justified.
- **SVG** — system layers, decorative Dixios motifs, map clipping/masks.
- **@webrek/mx-geo** — real Mexico/state/municipality geometry if later required.
- **Motion/Magic UI snippets** — only as reusable implementation patterns, never as borrowed visual identity.
- **ECharts / React Flow / selected embeddable components** — service-specific visual primitives when they beat custom-from-zero work.
- **FIGLET + textmode.js / ASCII Motion** — ASCII/textmode art direction, preferably exported to SVG/WebM when live rendering is unnecessary.
- **Playwright + Pixelmatch** — deterministic visual regression loop.

## Core rule

Before coding any subsystem from zero, answer:

> **Does 60–90% of this already exist as a reusable demo, component, asset pack, or open-source project?**

If yes: run it locally first, verify license, isolate the reusable primitive, then adapt it to Dixios.

## Reuse levels

- **R0** — visual inspiration only.
- **R1** — inspect technique/pattern; reconstruct ourselves.
- **R2** — directly reusable snippet/component.
- **R3** — reusable scene, component block or asset.
- **R4** — complete clonable/runnable demo or project.

## Immediate execution priority

**Current implementation task:** `docs/12-MILESTONE-HERO-CITY-V1.md`.

Do not proceed to Servicios until Hero City V1 is independently presentation-worthy and passes its visual/performance/QA gates.

## Immediate high-value sources

1. Hero City V1 milestone — single executable definition of done for the first screen.
2. Quaternius/Kenney/Poly Haven — avoid hand-building generic city geometry and human-scale assets.
3. pmndrs/examples + Drei — reusable R3F engineering patterns and performance abstractions.
4. glTF Transform — optimize every adopted GLB/glTF before production.
5. Capability visual resource library — exact embeddable visual objects instead of complete website templates.
6. FIGLET + textmode.js + ASCII Motion — strong experimental graphic language with lightweight export routes.
7. Playwright visual comparisons — avoid subjective “looks close” iteration.

See the individual files for exact URLs and adoption notes.
