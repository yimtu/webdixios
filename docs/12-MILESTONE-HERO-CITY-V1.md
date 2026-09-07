# MILESTONE 01 — HERO / GIRO / CIUDAD DIXIOS

Status: IMPLEMENTATION + VISUAL QA — `feature/m01-hero-city-v1`

## Objective

Deliver the first functional, visually strong and technically viable section of Dixios with approved verbal identity, editorial hierarchy, an existing/adapted 3D city, clean Astro integration, responsive behavior and a real fallback.

## Production thesis

> Astro owns the editorial Hero. One vanilla Three.js canvas renders an existing open city asset on capable desktop devices. Mobile/constrained devices get an intentional static composition, not a broken or underpowered 3D copy.

The GPU layer can enrich the Hero but can never be required to understand Dixios.

## Content lock

**EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO**

Supporting paragraph:

> Dixios es una firma de inteligencia, transformación y tecnología institucional. Convertimos problemas públicos complejos en sistemas funcionales de decisión y ejecución.

Navigation remains:
- Nosotros
- Publicaciones
- Contacto

## Asset lock V1

Primary geometry: **Quaternius Downtown City MegaKit — Standard Edition (CC0)**.

Dixios consumes the already web-optimized `city.glb` derivative published by the MIT-licensed TonPlaygramWebApp project at pinned commit `dccec03c704fce20e9414ad37d1efca0566a546b`.

The derivative is ~3.79 MB and contains named city block templates and LODs. Dixios does not model new buildings. It adapts the existing block-placement technique into a fixed skyline composition for the Hero.

Exact provenance: `licenses/hero-city-quaternius.txt`.

## Renderer policy

Desktop:
- one WebGL canvas only;
- vanilla Three.js, dynamically imported only after capability checks;
- no React/R3F;
- no shadows;
- no postprocessing;
- DPR <= 1.5;
- subtle camera drift;
- pause offscreen/hidden tab;
- explicit context-loss fallback and cleanup.

Mobile/constrained:
- no Three.js download or WebGL initialization at <= 767 px;
- same for coarse pointer, save-data and reduced-motion;
- local SVG poster fills the visual slot;
- floating city labels removed.

## QA rule strengthened after first CI pass

The first CI run exposed an important failure mode: build/test could pass while the external GLB URL was 404 because the fallback worked correctly.

That is no longer acceptable as milestone certification.

Current gates:
- CI asset fetch must succeed;
- desktop Playwright must reach `data-city-status="ready"`;
- mobile Playwright must intentionally reach `data-city-status="fallback"`;
- both produce screenshot artifacts;
- fallback remains available for real runtime failures.

## Acceptance

- [x] approved H1 and institutional supporting copy implemented;
- [x] Astro editorial structure implemented;
- [x] two-blue city treatment implemented;
- [x] static mobile/reduced-motion fallback implemented;
- [x] renderer lifecycle/context-loss protections implemented;
- [x] first CI smoke identified and prevented silent fallback-only certification;
- [ ] second CI confirms canonical GLB download;
- [ ] second desktop screenshot confirms live 3D composition visually;
- [ ] visual review approved before merge.

## Out of scope

No Servicios, Nosotros, Publicaciones or Contacto section implementation in this milestone. No CMS. No custom shaders. No complex scroll choreography.
