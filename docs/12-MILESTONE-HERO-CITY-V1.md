# MILESTONE 01 — HERO CITY V1

## Mission

Build the first production-quality section of Dixios as one complete implementation milestone:

> **DIXIOS — EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO**

The result must be a real, working Hero section — not a moodboard, not a wireframe, not a shader demo, not a technical spike.

This milestone is intended to be executed in one focused implementation pass from repository setup through deterministic visual QA.

---

# 0. Source of truth

Use, in this order:

1. `docs/09-SITE-STRUCTURE-5-SECTIONS.md` for approved content and architecture.
2. `docs/01-HERO-CITY.md` for current Hero art/technical direction.
3. `docs/06-MOTION-QA-PERFORMANCE.md` for QA/performance rules.
4. `docs/07-ASSETS-LICENSES.md` for license handling.
5. `docs/08-ENVIRONMENT-GITHUB-PAGES.md` for Astro/R3F architecture and deployment constraints.
6. `docs/SOURCES.md` for primary sources.

If older documents conflict with the current Hero source-of-truth, the latest Hero/site-structure documents win.

---

# 1. Final outcome

At the end of this milestone, opening the site must show a complete first screen with:

- navigation;
- `DIXIOS`;
- `EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO`;
- a designed 3D metropolitan city;
- visible but restrained technological infrastructure;
- visible but restrained human warmth/activity;
- one deliberate convergence moment between both systems;
- responsive desktop/mobile behavior;
- reduced-motion behavior;
- deterministic screenshots;
- successful production build.

The Hero should already be presentation-worthy before the rest of the page exists.

---

# 2. Creative objective

## Core image

A **living metropolitan organism** rather than a cyberpunk city.

The phrase “el encuentro de la tecnología con lo humano” must become visible through the scene itself:

### Technology

- cool cyan / electric-blue paths;
- precise repeated structures;
- controlled signal movement;
- infrastructure logic;
- architectural rhythm.

### Human

- warm amber/coral pockets;
- windows / plazas / transit / occupied places;
- subtle human-scale silhouettes where useful;
- localized irregularity;
- slower and softer activation.

### Encounter

Both visual systems converge in one focal district/urban node.

Do not explain this with floating labels.

---

# 3. Explicit visual prohibitions

The implementation fails if it defaults to:

- Mexican flag colors as a visual theme;
- Mexican map/landmarks as Hero shorthand;
- cyberpunk purple-neon overload;
- Blade Runner rain/fog cliché;
- floating AI brain/network icons;
- generic smart-city infographic look;
- random skyscraper generator with no composition;
- huge sci-fi HUD overlays;
- Matrix terminal aesthetics;
- game controls / OrbitControls;
- text inside WebGL for primary content.

The target is contemporary institutional technology with visual ambition, not a game landing page.

---

# 4. Phase A — establish the actual web project

The current repository is documentation-first. This milestone must create the implementation foundation.

## Required stack

- Astro
- React integration only where needed for the Hero
- Three.js
- React Three Fiber
- Drei
- optional React Postprocessing
- optional meshline only if route geometry truly benefits

## Deliverable structure

Recommended minimum:

```text
src/
  components/
    hero/
      Hero.astro
      HeroCityIsland.tsx
      HeroCityScene.tsx
      CityBuildings.tsx
      CityInfrastructure.tsx
      CityHumanLayer.tsx
      HeroFallback.astro
  pages/
    index.astro
  styles/
    tokens.css
    global.css
  lib/
    seeded-rng.ts
public/
  assets/
    3d/
    textures/
    hero/
tests/
  visual/
```

Do not over-engineer abstractions before the Hero works.

---

# 5. Phase B — typography and DOM composition first

Before touching 3D, build the HTML/CSS Hero shell.

Required:

- exact approved copy;
- desktop line breaks deliberately composed;
- mobile line breaks deliberately composed;
- navigation from current proposal;
- protected negative-space region for copy;
- correct Hero height using modern viewport units;
- accessible heading hierarchy;
- visible fallback while 3D loads.

## Gate B

Take a screenshot with **no 3D loaded**.

The composition must already look deliberate.

If the text/layout is weak, do not try to fix it with the city.

---

# 6. Phase C — asset acquisition and audit

Do not model generic city geometry by hand unless a required focal form cannot be sourced.

## Primary asset source

### Quaternius Downtown City MegaKit

https://quaternius.com/packs/downtowncitymegakit.html

Use a curated subset only.

Target selection:

- 4–6 midrise families;
- 4–8 tower/focal families;
- selected street/roof/detail elements;
- shared-texture variants where possible.

## Secondary assets

Kenney City Kit Commercial:
https://kenney.nl/assets/city-kit-commercial

Kenney City Kit Industrial:
https://kenney.nl/assets/city-kit-industrial

Quaternius Background Posed Humans:
https://quaternius.com/packs/backgroundposedhumans.html

Poly Haven only for specific environment/lighting needs:
https://polyhaven.com/

## Asset rule

Every downloaded/adopted source must be recorded before final merge:

- source URL;
- license;
- original filename;
- transformation/optimization performed;
- final destination path.

Do not commit entire megapacks when only a small subset is used.

---

# 7. Phase D — optimize all adopted 3D assets

Use glTF Transform before production integration.

https://gltf-transform.dev/

For each asset:

1. inspect;
2. prune unused data;
3. deduplicate;
4. simplify only where silhouette survives;
5. compress geometry using Meshopt/Draco as appropriate;
6. reduce texture dimensions;
7. convert/compress textures using WebP/KTX2 where appropriate;
8. verify visually after optimization.

Do not optimize blindly. Compare before/after screenshots for focal assets.

## Asset budget mindset

Prefer:

- shared materials;
- shared textures;
- repeated geometry;
- instancing;
- small texture counts.

Avoid:

- a unique material per building;
- separate high-resolution textures for background objects;
- importing invisible metadata/animations.

---

# 8. Phase E — build the city from composition outward

## E1. Focal district

Build this manually first.

Target:

- 8–16 important building masses;
- strong skyline hierarchy;
- one dominant cluster;
- deliberate gaps and negative space;
- no accidental wall of equal towers.

This district should carry most of the artistic effort.

## E2. Urban fabric

After the focal district works:

- generate deterministic surrounding blocks;
- use seeded placement;
- instance repeated building families;
- lower visual detail with distance;
- fade far edges through fog/atmosphere.

Never let procedural placement control the focal composition.

## E3. Ground / roads

Use simple dark geometry.

Roads need not be realistic GIS.

They exist to:

- create perspective;
- organize blocks;
- create paths for technological signals;
- help the city read at a glance.

---

# 9. Phase F — technology layer

Technology must read as **infrastructure**.

Create a small number of intentional routes:

- one dominant cyan arterial route;
- one or two secondary blue routes;
- optional single coral/magenta accent where needed;
- moving signal/pulse only on selected segments.

Possible implementation:

- Curve3 + tube geometry;
- Line2 / meshline where width/rendering requires it;
- emissive material;
- selective bloom.

## Failure condition

If the city becomes a neon spaghetti network, remove routes.

Fewer, more meaningful lines win.

---

# 10. Phase G — human layer

Do not solve “human” by adding dozens of animated people.

Implement in this priority order:

1. warm occupied-window clusters;
2. warm public-space zones;
3. transit/vehicle light traces if visually useful;
4. a small number of posed foreground silhouettes;
5. animated human rigs only if all simpler approaches fail to create human scale.

The human signal should feel embedded in city life, not pasted on top.

---

# 11. Phase H — light/material system

## Base materials

- graphite / near-black building mass;
- limited roughness variation;
- no photoreal PBR obsession;
- windows and routes carry most of the light language.

## Lighting

Start minimal:

- environment/ambient base;
- one directional/key source;
- emissive materials;
- optional restrained bloom.

Do not solve darkness by adding many point lights.

## Palette

Technology:
- cyan / electric blue.

Human:
- amber / coral.

Neutral:
- graphite / black / warm near-white.

Magenta:
- tertiary only.

---

# 12. Phase I — motion

First freeze a beautiful frame.

Then add motion.

## Intro choreography

Target 1–2 seconds total:

1. city mass resolves from darkness;
2. warm human pockets become perceptible;
3. cool infrastructure activates;
4. routes converge toward focal district;
5. scene settles.

No long cinematic intro that delays the page.

## Idle

The scene should become almost calm.

Possible residual motion:

- very sparse route pulse;
- subtle atmospheric drift;
- barely perceptible warm activity.

## Pointer

Desktop only:

- tiny clamped parallax;
- no free camera orbit;
- no interaction required to understand the scene.

## Scroll

Only add a small exit motion toward Servicios.

Do not build the next section inside WebGL in this milestone.

---

# 13. Phase J — performance architecture

## Instancing

Use instancing or merged geometry for repeated urban fabric.

Never instantiate every window as a unique mesh.

## DPR

Cap DPR.

Use a lower range on mobile and weaker devices.

## Render loop

Test whether the scene can transition to on-demand rendering after its intro.

If using `frameloop="demand"`, explicitly invalidate for pointer/controlled animation events.

If continuous rendering remains necessary:

- stop/pause when offscreen;
- adapt DPR/effects;
- keep hot loops allocation-free.

## Effects degradation order

If slow:

1. lower postprocessing resolution/intensity;
2. lower DPR;
3. reduce far-building count;
4. simplify far geometry;
5. remove particles;
6. remove secondary decorative lights.

Do not destroy the focal skyline first.

---

# 14. Phase K — responsive strategy

Create explicit scene configurations rather than hoping one camera works everywhere.

## Desktop

- full focal district;
- supporting city fabric;
- infrastructure motion;
- optional parallax.

## Tablet/laptop

- maintain composition;
- reduce far density where needed;
- ensure copy still owns protected space.

## Mobile

- dedicated camera position/FOV;
- fewer background buildings;
- reduced DPR;
- little/no postprocessing;
- no pointer motion;
- city framed to support text rather than crop randomly.

## Fallback

Have an intentionally composed poster/static state available.

The page must never become blank because WebGL fails.

---

# 15. Phase L — accessibility / reduced motion

Primary DOM text and navigation must remain available independently of WebGL.

For `prefers-reduced-motion`:

- skip intro movement;
- render final stable state;
- remove pointer parallax;
- remove continuous route pulses;
- preserve visual meaning.

The canvas is decorative/narrative; do not make critical information exist only inside it.

---

# 16. Phase M — deterministic visual QA loop

Build QA into the milestone, not after it.

## Required deterministic controls

- seeded PRNG;
- fixed camera mode;
- ability to freeze animation at a specified time/final frame;
- disable pointer response;
- fixed DPR where needed for snapshots;
- wait until GLTF/assets report ready.

## Required screenshots

At minimum:

1. 1440×900 desktop;
2. 1280×800 laptop;
3. representative mobile portrait;
4. reduced-motion state;
5. fallback/poster state.

## Visual correction order

1. typography / line breaks;
2. city mass / silhouette;
3. copy-vs-city balance;
4. focal district position;
5. road/infrastructure perspective;
6. warm-vs-cool hierarchy;
7. atmospheric depth;
8. minor detail;
9. motion.

Do not polish bloom before composition is right.

---

# 17. Build / code quality gates

The milestone is not complete until:

- clean install succeeds;
- dev server starts without console errors;
- production build succeeds;
- page renders without WebGL warnings/errors;
- navigation/text renders before/without 3D;
- no obvious resource leaks after mount/unmount;
- asset paths are deployment-safe;
- every third-party asset used has a recorded license/source;
- visual screenshots are reproducible.

---

# 18. Acceptance criteria — visual

The Hero must satisfy all of these:

### Copy

- `DIXIOS` is dominant and immediately readable.
- claim remains semantically exact: `EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO`.

### City

- skyline is clearly composed rather than uniformly procedural;
- city feels contemporary and metropolitan;
- no obvious Mexican-nationalist symbols;
- no default cyberpunk/rainbow-neon look;
- technology reads through infrastructure;
- human presence reads through warmth/occupation/scale;
- convergence between both is visually understandable.

### Motion

- motion improves the meaning;
- no motion is required for comprehension;
- intro settles quickly;
- no gratuitous continuous movement.

### Performance

- desktop feels fluid on a realistic modern laptop;
- mobile has an intentional degradation/fallback path;
- loading does not block DOM content.

### Polish

- no default Three/R3F/demo aesthetics remain;
- no obvious unmodified asset-pack look;
- materials/palette unify heterogeneous models;
- Hero looks like Dixios, not Quaternius/Kenney/SynthCity.

---

# 19. Required outputs from the single execution

The execution is expected to leave:

1. a working Astro site foundation;
2. complete Hero DOM/CSS;
3. working Hero R3F scene;
4. selected and optimized 3D assets;
5. license/source log for adopted assets;
6. responsive/mobile version;
7. reduced-motion version;
8. fallback/poster state;
9. deterministic visual tests/screenshots;
10. successful build;
11. a concise implementation report listing:
   - what was built;
   - exact assets used;
   - performance compromises;
   - remaining visual differences/issues;
   - screenshot locations.

---

# 20. Stop condition

Do **not** proceed to Servicios during this milestone.

The task ends when Hero City V1 is independently presentation-worthy and passes the gates above.

> **One excellent Hero is the milestone. The rest of the page waits.**
