# HERO CITY V1 — PRE-IMPLEMENTATION RESEARCH / BUG AVOIDANCE

Date: 2026-09-07

## Decision after official docs + developer/designer community review

Hero V1 uses:
- Astro for semantic/editorial UI;
- one vanilla Three.js canvas on capable desktop devices only;
- an existing CC0 city asset family rather than modeled/procedural buildings;
- no React/R3F in the Hero;
- no custom shaders or postprocessing chain;
- static SVG fallback on mobile/coarse-pointer/reduced-motion/save-data;
- dynamically imported Three.js so fallback paths do not pay the 3D runtime cost.

## Bugs/risk patterns explicitly designed around

### WebGL context churn
Current R3F/React community reports include React 19 + StrictMode development context-loss behavior during delayed unmount/remount. Browsers also limit active WebGL contexts. Hero V1 therefore owns exactly one renderer with explicit lifecycle and never mounts a canvas per card/state.

### Mobile GPU / Spline embed cost
Spline remains a valid editing tool, but current user reports still show iOS/mobile stutter on complex scenes. Above-the-fold Hero performance is too sensitive to make a hosted 3D viewer an unconditional dependency. Mobile gets an art-directed static path.

### Continuous rendering waste
The renderer stops when the Hero leaves the viewport or the tab is hidden. DPR is capped at 1.5. There are no shadow maps or postprocessing passes.

### “Fallback hides broken production asset”
The first CI pass proved the fallback was robust but also revealed a bad certification condition: the originally selected SceneView catalog URL returned 404 while tests still passed.

The fix is structural:
- the canonical asset is now a pinned, directly verified GitHub binary;
- CI exits non-zero if that asset cannot be downloaded;
- desktop browser test requires `data-city-status="ready"`;
- fallback remains a runtime resilience feature, not a CI success criterion.

## Asset chosen after second sourcing pass

**Quaternius Downtown City MegaKit — Standard Edition**
- CC0;
- specifically built as reusable city geometry;
- current free pack supports web-friendly formats.

For V1 we consume the already web-optimized derivative in:
- `TonPlaygramBot/TonPlaygramWebApp`
- pinned commit `dccec03c704fce20e9414ad37d1efca0566a546b`
- `webapp/public/assets/kart-royale/city.glb`
- ~3.79 MB

That project's own attribution record identifies the derivative as Quaternius Downtown City MegaKit and documents its conversion into centered GLB templates with LODs. The project code is MIT licensed.

## Rendering/art direction rules

1. The city is visual infrastructure, not a game.
2. No OrbitControls or user navigation.
3. Buildings are existing authored assets; Dixios only arranges the already-optimized blocks for editorial composition.
4. Dark ink + two dominant blues; white for typography/highlights.
5. Primary text never lives inside WebGL.
6. Labels are restrained HTML overlays.
7. City remains subordinate to reading hierarchy.
8. The Hero must remain usable if WebGL disappears completely.

## Current QA gates

- `npm run check:hero`
- CI-only canonical asset fetch must succeed
- `npm run build`
- Playwright desktop: live city must become `ready`
- Playwright mobile: deliberate static fallback
- screenshots from both projects
- no uncaught page errors
- visual review before PR leaves draft state
