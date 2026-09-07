# HERO CITY — ART + TECHNICAL DIRECTION

## Source of truth

The current approved hero content comes from the latest client proposal:

- **DIXIOS**
- **EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO**

The hero must stay close to that wording. Do not invent extra service claims, institutional labels, slogans or nationalist messaging inside the hero unless later approved.

The city is the visual interpretation of the claim; the copy should not have to explain the city.

---

# Creative thesis

> **A living city where cool technological infrastructure and warm human activity visibly coexist and converge.**

The hero should not look like:

- a generic cyberpunk game;
- a “smart city” stock illustration;
- a Mexican-nationalist montage;
- a dashboard in 3D;
- an AI/network cliché with floating labels;
- a random procedural city generated only because it is technically impressive.

It should feel like a **designed metropolitan organism**: architecture, infrastructure, movement and human scale.

## Meaning through visual contrast

Technology:

- cool blue / cyan infrastructure;
- precise lines and routes;
- controlled light sequences;
- denser systems and repetition;
- machine-like rhythm.

Human:

- restrained warm amber/coral light;
- occupied windows / public-space clusters;
- tiny human-scale silhouettes only when useful;
- irregularity and localized warmth;
- slower, softer motion.

The strongest moment is where both systems meet — not through a literal icon, but through composition and light.

---

# Copy / typography

## Approved copy

Keep the exact semantic content:

**DIXIOS**

**EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO**

Small typographic adjustments are allowed — line breaks, tracking, weight, scale, capitalization — but do not rewrite the sentence in the first implementation.

Recommended hierarchy:

1. DIXIOS as the dominant wordmark/title.
2. Claim in 2–3 controlled lines.
3. Navigation remains DOM/HTML above the scene.

Do not render primary copy inside WebGL. Keep it accessible, crisp, indexable and independent from GPU loading.

---

# Composition

## Desktop target

Hero height: approximately one viewport (`100svh`) with safe handling for mobile browser chrome.

Recommended composition:

- navigation at top;
- copy occupies a protected negative-space field;
- city occupies roughly the lower 55–70% of the frame and can rise into one side of the text field without hurting legibility;
- skyline should have one clear focal district, not equal-height procedural noise;
- foreground infrastructure routes create depth and lead toward the focal district;
- background city mass fades into atmosphere rather than ending at a hard edge.

The scene should read in the first still frame before any motion starts.

## Camera

Prefer a fixed cinematic 3/4 elevated camera, approximately human-observer scale rather than satellite/map view.

The camera should make the city feel inhabitable.

No OrbitControls in the public hero.

Optional desktop pointer response:

- very small yaw/pitch shift;
- tightly clamped;
- disabled on touch/mobile;
- never enough to expose unfinished edges of the scene.

---

# City construction strategy

Do not build the city renderer from zero.

Use a hybrid:

## A. Focal district — manually art-directed

- approximately 8–16 key buildings / masses;
- deliberate silhouette and spacing;
- selected warm/cool light hierarchy;
- one central convergence zone;
- manually placed public-space/street elements if needed.

This is where visual quality is won.

## B. Urban fabric — repeated / instanced

- modular building families;
- deterministic seeded placement;
- low material count;
- no unique mesh for every building;
- density falls off with distance.

## C. Infrastructure layer

- selected roads / rails / connective lines;
- cool emissive routes;
- sparse pulses or one-shot activation sequences;
- no giant spaghetti network covering the whole city.

## D. Human layer

Human presence must be subtle.

Possible implementation:

- warm windows;
- lit plazas or transit stops;
- tiny posed silhouettes in selected foreground locations;
- a few moving light traces/vehicles if performance permits.

Do not crowd the hero with animated character rigs unless the visual test proves they add value.

---

# Preferred reusable assets

## 1. Quaternius — Downtown City MegaKit

https://quaternius.com/packs/downtowncitymegakit.html

Current source page (May 2026):

- 300+ modular city pieces;
- glTF available;
- seven prebuilt example buildings;
- shared optimized texture sets;
- CC0 for the free assets described on the source page.

**Primary recommendation for city geometry.**

Why:

- enough modular variety to avoid obvious repetition;
- direct glTF path;
- current and actively maintained pack;
- strong license position;
- lets us spend time on composition instead of modeling generic buildings.

Use only selected pieces — do not dump the entire pack into the browser.

## 2. Kenney — City Kit (Commercial)

https://kenney.nl/assets/city-kit-commercial

- 50 assets;
- CC0;
- simple stylized geometry;
- useful for secondary/far structures or silhouette variation.

Secondary source, not the main art direction.

## 3. Kenney — City Kit (Industrial)

https://kenney.nl/assets/city-kit-industrial

- 40 assets;
- CC0;
- useful for infrastructure / non-office urban variation.

Only use where the scene needs industrial/infrastructure contrast.

## 4. Roads

Quaternius Modular Streets:
https://quaternius.com/packs/modularstreets.html

Kenney road assets may also be evaluated from the existing source library.

Road geometry should support the composition, but the visible technological routes can be independent emissive paths rather than literal road materials.

## 5. Human-scale assets

### Quaternius Background Posed Humans

https://quaternius.com/packs/backgroundposedhumans.html

CC0. Useful because static posed humans are cheaper than animated rigs and can create scale in foreground locations.

### Quaternius Universal Base Characters

https://quaternius.com/packs/universalbasecharacters.html

CC0, glTF, game-ready humanoid topology. Only test if a small number of animated/rigged figures materially improve the hero.

Default: **posed/static or implied human presence first**.

## 6. Poly Haven

https://polyhaven.com/
https://polyhaven.com/license

All Poly Haven assets are published under CC0.

Potential uses:

- one HDRI or lighting reference;
- restrained environment textures;
- occasional architecture/infrastructure asset if a focal detail is missing.

Do not load large 8K assets just because they are available. The final web scene should use compressed, purpose-sized textures.

---

# Reference implementations / engineering patterns

## SynthCity

https://github.com/jeffbeene/synthcity
https://jeff-beene.com/portfolio/synthcity/

MIT codebase.

Study:

- procedural city organization;
- spawn/placement architecture;
- urban atmosphere;
- camera/world management.

Do **not** inherit its Blade Runner / synthwave visual identity. Dixios should be calmer, clearer and more institutional.

## pmndrs examples

https://github.com/pmndrs/examples
https://pmndrs.github.io/examples/

MIT repository of runnable R3F demos.

Useful patterns:

- instancing;
- GLTF loading;
- HTML/DOM + WebGL coexistence;
- deterministic visual screenshots;
- postprocessing;
- camera patterns.

## Codrops 3D/scroll case studies

Useful engineering reference, not a visual identity source:

- https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/
- https://tympanus.net/codrops/2022/01/05/crafting-scroll-based-animations-in-three-js/

Relevant current practices include:

- GPU instancing;
- compressed assets;
- camera motion subordinate to narrative;
- keeping HTML content separate from WebGL when possible.

---

# Final technical direction

## Application architecture

- Astro static shell.
- React integration only for Hero 3D.
- `three`.
- `@react-three/fiber`.
- `@react-three/drei`.
- `@react-three/postprocessing` only if selective bloom materially improves the still frame.
- `meshline` or equivalent only for infrastructure routes if normal geometry/Line2 is insufficient.

The rest of the page must not become a React app because of the hero.

Current R3F compatibility rule from official docs:

- R3F v9 pairs with React 19;
- verify exact package versions when implementation starts.

## Astro hydration

The hero is above the fold, so the implementation should test `client:load` against a static poster/fallback rather than blindly using delayed hydration.

Primary text/navigation must render immediately without waiting for the canvas.

## Renderer

Prefer stable WebGL/R3F for the first milestone.

Do not make WebGPU a milestone dependency merely because current Three/Spline ecosystems support it. The goal is a dependable hero across mainstream browsers.

---

# Asset optimization pipeline

Use glTF Transform for every adopted glTF/GLB asset before it reaches production.

https://gltf-transform.dev/

Recommended pipeline, tuned per asset:

1. `inspect`;
2. remove unused nodes/data (`prune`);
3. deduplicate (`dedup`);
4. simplify only when silhouette survives;
5. Meshopt or Draco geometry compression;
6. resize textures to the minimum necessary resolution;
7. WebP and/or KTX2/Basis compression where appropriate;
8. verify final asset in a separate glTF viewer and in the actual R3F scene.

Three.js `GLTFLoader` supports Draco, KTX2 and Meshopt decoders.

Khronos' current asset guidelines explicitly recommend instancing for repeated elements and modern geometry/texture compression for GPU-friendly commerce-ready glTF assets.

---

# Performance strategy

## Draw calls

R3F's official performance guidance recommends aggressive geometry/material reuse and instancing. Repeated urban fabric should therefore use `InstancedMesh`, Drei `Instances`, `Merged`, or pre-merged geometry.

Goal:

- stay comfortably within a few hundred draw calls;
- never create one draw call per window/building prop when it can be shared or instanced.

## DPR

Start with a capped DPR rather than blindly using full device pixel ratio.

Use Drei/R3F performance monitoring to reduce DPR/effects on weaker devices if needed.

## Render loop

The preferred visual design does **not** require a game-like continuous animation forever.

Target behavior:

1. short entrance sequence;
2. scene settles;
3. redraw on pointer/scroll/controlled signal events;
4. idle as much as practical.

Evaluate R3F `frameloop="demand"` once the intro motion has been authored. Official R3F guidance recommends on-demand rendering when scenes can come to rest because it reduces GPU/battery cost.

If continuous motion proves essential, gate it by viewport visibility and adaptive performance rather than running full quality indefinitely.

## Lighting

Prefer:

- baked-looking/simple environment illumination;
- one key directional light or equivalent;
- limited emissive materials;
- selective bloom.

Avoid:

- dozens of point lights;
- dynamic shadows across the entire city;
- full-scene expensive AO/reflections in the first milestone.

---

# Color / material direction

Do not default to rainbow cyberpunk.

Baseline palette:

- near-black / graphite city masses;
- warm near-white text;
- electric blue / cyan as the primary technology signal;
- restrained amber/coral as the human signal;
- magenta only as an optional tertiary accent, not a dominant cyberpunk cue.

Materials should read as designed massing rather than photoreal game assets.

This also lets heterogeneous CC0 model sources become visually coherent.

---

# Motion choreography

## Entry

The first meaningful frame must already look good before animation.

Then, over roughly the first 1–2 seconds:

1. ambient city mass becomes visible;
2. selected warm human-scale lights appear;
3. cool infrastructure routes activate;
4. both converge near the focal district;
5. motion settles.

This visually performs the phrase **“el encuentro de la tecnología con lo humano”** without adding copy.

## Pointer

Desktop only and extremely restrained:

- tiny camera or scene parallax;
- no free orbit;
- no aggressive tilt;
- motion returns smoothly to neutral.

## Scroll exit

A small camera push / vertical drift may accompany exit from Hero into Servicios, but do not build a multi-section 3D world in this milestone.

---

# Mobile / reduced motion

Mobile is not a smaller desktop scene.

Required strategy:

- fewer background buildings;
- lower DPR;
- reduced or disabled postprocessing;
- no pointer parallax;
- protected text area maintained;
- optional pre-rendered/static poster if device/performance rules fail.

`prefers-reduced-motion`:

- show the final composed city state;
- no continuous pulses/parallax;
- no information loss.

---

# Determinism / QA

Visual QA must be reproducible.

Required:

- seeded layout;
- fixed camera in QA mode;
- fixed viewport presets;
- fixed animation time or ability to freeze at the final hero frame;
- no raw `Math.random()` affecting visible placement;
- no cursor parallax in snapshots.

At minimum capture:

- desktop hero;
- laptop hero;
- mobile portrait hero;
- reduced-motion hero;
- fallback/poster state.

---

# Non-goals for first implementation

Do not spend the milestone on:

- a fully procedural infinite city;
- walking/driving controls;
- WebGPU-only effects;
- character crowds;
- complex physics;
- real GIS data;
- Mexican landmarks;
- service labels floating over buildings;
- five different camera scenes;
- day/night simulation;
- audio.

The goal is **one exceptional first screen**, not a game engine.

---

# Definition of success

The hero is successful when:

1. the exact approved copy is immediately readable;
2. the still frame looks intentional without animation;
3. the city feels populated/human without becoming literal or sentimental;
4. technology is visible as infrastructure, not AI cliché iconography;
5. the scene does not look overtly cyberpunk;
6. there is no nationalist visual shorthand;
7. desktop animation adds meaning rather than spectacle;
8. mobile remains elegant and fast;
9. the hero can be frozen deterministically for visual QA;
10. all adopted assets have verified licenses and documented sources.
