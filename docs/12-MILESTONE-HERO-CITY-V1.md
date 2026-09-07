# MILESTONE 01 — HERO / GIRO / CIUDAD DIXIOS

Status: IMPLEMENTATION STARTED — `feature/m01-hero-city-v1`

## Objective

Deliver the first functional, visually strong and technically viable section of Dixios with approved verbal identity, editorial hierarchy, an existing/adapted 3D city, clean Astro integration, responsive behavior and a real fallback.

## Current implementation thesis

> Editorial Hero in Astro + existing licensed city as one isolated desktop Three.js canvas + two-blue Dixios treatment + static fallback on mobile/constrained devices.

The page must never depend on the GPU scene to communicate who Dixios is.

## Content lock

Approved claim:

**EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO**

Supporting paragraph is grounded in Contexto Maestro:

> Dixios es una firma de inteligencia, transformación y tecnología institucional. Convertimos problemas públicos complejos en sistemas funcionales de decisión y ejecución.

Navigation remains aligned with the current proposal:

- Nosotros
- Publicaciones
- Contacto

The CTA may point internally to `#servicios`, but `Servicios` is not added to the main navigation by assumption.

## Asset lock for V1

Asset: **Low Poly Night City Building Skyline** by **99.Miles**.

- existing 12-building night-city asset;
- ~6.1k triangles;
- CC BY 4.0;
- optimized GLB copy (~4 MB) fetched from a pinned SceneView commit at build/dev time;
- exact provenance: `licenses/hero-night-city-99-miles.txt`.

This choice is deliberately lighter and safer than 20–50 MB city scenes.

## Technical decision after current bug research

Hero V1 does **not** use React/R3F.

Reason:

- React is unnecessary for one isolated canvas;
- current React 19 + R3F StrictMode issue #3863 can force-loss a remounted canvas context in development;
- multiple WebGL context churn is a known Safari/browser risk;
- vanilla Three.js keeps the Hero renderer lifecycle explicit and small.

Full research: `docs/13-HERO-IMPLEMENTATION-RESEARCH-2026-09-07.md`.

## Components

- `src/components/hero/HeroSection.astro`
- `src/components/hero/HeroContent.astro`
- `src/components/hero/CityScene.astro`
- `src/components/hero/HeroLabels.astro`
- `src/data/hero.ts`
- `src/styles/hero.css`
- `src/scripts/hero-city.js`

## Renderer policy

Desktop live renderer:

- exactly one WebGL canvas;
- no orbit controls;
- no shadow maps;
- no postprocessing;
- DPR capped at 1.5;
- subtle camera drift only;
- animation paused offscreen and when tab is hidden;
- context-loss fallback;
- model-load fallback;
- DOM controls remain outside canvas.

Constrained/mobile policy:

- no WebGL initialization at <= 767 px;
- no WebGL for coarse pointer, save-data or reduced-motion;
- render local SVG poster;
- remove floating city labels.

## Visual policy

City:

- background / right side dominant visual;
- retain model luminance/detail;
- grayscale final canvas then colorize with Dixios two-blue gradient;
- dark ink base;
- no magenta/coral in the city V1;
- white is reserved for type and restrained highlights.

Labels are decorative HTML overlays, not 3D text.

## Acceptance gates

- [ ] exact approved Hero claim visible as H1;
- [ ] supporting paragraph faithfully reflects Contexto Maestro;
- [ ] city is an existing third-party built asset, not a procedural city;
- [ ] asset license/provenance recorded;
- [ ] city reads as Dixios blue, not generic cyberpunk;
- [ ] city does not reduce text readability;
- [ ] no React hydration added to the Hero;
- [ ] mobile uses static fallback by policy;
- [ ] reduced-motion uses fallback;
- [ ] WebGL context loss leaves usable Hero;
- [ ] `npm run check:hero` passes;
- [ ] `npm run build` passes;
- [ ] Playwright desktop + mobile smoke passes;
- [ ] CI screenshot artifact reviewed before merge.

## Out of scope

- remaining site sections;
- CMS;
- final SEO pass;
- complex scroll choreography;
- custom shaders;
- changing the site architecture.
