# MOTION / QA / PERFORMANCE

## Objective

The site should converge toward the visual reference through deterministic testing, not subjective iteration.

Motion is subordinate to the still composition. First match layout, then animate.

## GSAP

### ScrollTrigger
https://gsap.com/docs/v3/Plugins/ScrollTrigger/

Use for:
- section-linked timelines;
- scrubbed transitions;
- optional pinning;
- fixed timeline checkpoints.

### DrawSVG
https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/

Use for SVG path reveals in the system/map sections.

### MorphSVG
https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/

Use only for justified geometric transformations.

### GSAP installation
https://gsap.com/docs/v3/Installation/

Confirm current package/plugin distribution before implementation.

## Motion Examples

https://motion.dev/examples

Treat this as a pattern library, not a default visual system.

Useful categories:
- hover transitions;
- path drawing;
- text reveals;
- grid/layout transitions;
- scroll examples.

## Visual regression

### Playwright visual comparisons

https://playwright.dev/docs/test-snapshots

Use Playwright to:
- launch deterministic Chromium;
- set exact viewport size;
- wait for fonts/assets/3D scene readiness;
- capture full-page screenshots;
- capture section crops;
- compare against golden reference images.

Recommended QA mode:

- fixed viewport;
- fixed animation clock;
- seeded procedural scene;
- no mouse movement;
- no random light flicker;
- reduced asynchronous variability.

### Pixelmatch

https://github.com/mapbox/pixelmatch

Use for:
- explicit pixel mismatch counts;
- producing diff PNGs;
- custom tolerance reporting outside Playwright's default snapshot flow.

Verify package version/license in the original repo before adoption.

## Suggested test outputs

`artifacts/visual/reference-full.png`

`artifacts/visual/actual-full.png`

`artifacts/visual/diff-full.png`

And section crops:

- `hero`
- `system`
- `capabilities`
- `mexico`
- `publications`
- `footer`

## Correction order

When the visual diff is bad, fix in this order:

1. total page height;
2. section boundaries;
3. grid geometry;
4. content positions;
5. typography size/line-height;
6. line breaks;
7. major visual mass;
8. color;
9. decorative motifs;
10. motion.

Never try to fix layout with animation.

## Three.js performance references

Responsive rendering / DPR:
https://threejs.org/manual/en/responsive.html

Cleanup:
https://threejs.org/manual/en/cleanup.html

Disposal reference:
https://threejs.org/manual/en/how-to-dispose-of-objects.html

InstancedMesh:
https://threejs.org/docs/#api/en/objects/InstancedMesh

## Hero performance policy

Prefer:
- instancing;
- shared materials/geometries;
- capped DPR;
- restrained bloom;
- deterministic low-cost lighting;
- static or baked detail where possible;
- zero allocations in hot render loops.

Avoid:
- one mesh per window;
- many dynamic shadow-casting lights;
- high-resolution postprocessing on mobile;
- unbounded particle counts;
- loading oversized textures when color/material treatment is procedural.

## Suggested degradation ladder

If GPU performance is inadequate:

1. reduce postprocessing resolution/intensity;
2. cap DPR lower;
3. reduce non-focal building count;
4. simplify far geometry;
5. reduce particles;
6. disable expensive effects on mobile.

Preserve the focal composition and neon arterial routes as long as possible.

## Reduced motion

Respect `prefers-reduced-motion`.

Reduced-motion mode should:
- render final stable stack state;
- remove continuous camera parallax;
- remove pulsing route motion;
- preserve all information and CTA accessibility.

## Acceptance gates

Before calling a block finished:

- static frame matches reference closely;
- screenshot test is deterministic;
- build succeeds;
- no console errors;
- mobile fallback works;
- reduced-motion works;
- no obvious resource leaks;
- performance remains acceptable on a realistic device class.
