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
| [`docs/01-HERO-CITY.md`](docs/01-HERO-CITY.md) | Hero city: Three.js/R3F, SynthCity, pmndrs, Drei, roads, bloom, labels, GLTF assets |
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
| [`docs/SOURCES.md`](docs/SOURCES.md) | Flat source index of all primary documentation/demo URLs |

## Target architecture

The reference page should **not** be rebuilt from one monolithic framework.

Recommended split:

- **Astro** — static shell, layout, typography, editorial content.
- **React Three Fiber / Three.js** — hero city only, as an isolated island.
- **Drei** — prebuilt Three/R3F helpers: HTML annotations, instancing/merging, etc.
- **meshline** — thick controllable neon infrastructure routes.
- **react-postprocessing** — selective bloom for emissive city/roads.
- **GSAP + ScrollTrigger** — narrative scroll choreography for the stack/system section.
- **SVG** — system layers, decorative Dixios motifs, map clipping/masks.
- **@webrek/mx-geo** — real Mexico/state/municipality geometry.
- **Motion/Magic UI snippets** — only as reusable implementation patterns, never as borrowed visual identity.
- **ECharts / React Flow / selected embeddable components** — capability-specific visual primitives when they beat custom-from-zero work.
- **FIGLET + textmode.js / ASCII Motion** — ASCII/textmode art direction, preferably exported to SVG/WebM when live rendering is unnecessary.
- **Playwright + Pixelmatch** — deterministic visual regression loop against the reference image.

## Core rule

Before coding any subsystem from zero, answer:

> **Does 60–90% of this already exist as a reusable demo, component, shader, asset pack, or open-source project?**

If yes: run it locally first, verify license, isolate the reusable primitive, then adapt it to Dixios.

## Reuse levels

- **R0** — visual inspiration only.
- **R1** — inspect technique/pattern; reconstruct ourselves.
- **R2** — directly reusable snippet/component.
- **R3** — reusable scene, shader, component block or asset.
- **R4** — complete clonable/runnable demo or project.

## Immediate high-value sources

1. Capability visual resource library — exact embeddable visual objects instead of complete website templates.
2. FIGLET + textmode.js + ASCII Motion — strong experimental graphic language with lightweight export routes.
3. Codrops demos — complete creative-development demos, many with GitHub source.
4. pmndrs/examples — runnable R3F demos explicitly designed to be cloned.
5. Drei — ready-made Three/R3F abstractions.
6. Quaternius/Kenney — avoid hand-building basic city geometry.
7. @webrek/mx-geo — avoid hand-drawing Mexico.
8. Playwright visual comparisons — avoid subjective “looks close” iteration.

See the individual files for exact URLs and adoption notes.
