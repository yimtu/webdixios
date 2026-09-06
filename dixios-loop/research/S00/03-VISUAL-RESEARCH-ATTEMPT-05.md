# S00 HERO — VISUAL RESEARCH / ATTEMPT 05 DIRECTION

**Date checked:** 2026-09-06  
**Baseline:** user-restored S00 Hero, 1084×292  
**Official candidate entering research:** `50cf73692c7df67feca7eebbc837ae9786269f82` (attempt 04)  
**Research sandbox branch:** `build/S00-attempt4-smoke`  
**Selected proof prototype:** GitHub-style transparent dot globe, prototype G/H family.  

## 1. Baseline visual grammar

The reference is not simply a globe plus copy. Its strength comes from a coordinated editorial system:

- dominant white wordmark/copy block on the left;
- large world system on the right without a visually heavy opaque sphere body;
- dotted geographic masses and fine spherical construction;
- multiple scales of micro-detail: tiny dots, squares, short bars, scanlines, grid modules, side notes and isolated coral blocks;
- coral, white and cyan distributed across the whole right-side composition rather than concentrated in one local patch;
- clear negative-space hierarchy: the globe is rich, but does not swallow the left copy;
- the situated territory must become perceptually prominent through increased local resolution, not through a text label or a flat silhouette pasted over the globe.

The country name must not appear in the Hero.

## 2. Measured visual gap

Simple raster diagnostics were used only as directional evidence, never as an aesthetic score.

| Metric | Baseline | Attempt 04 | Prototype G | Prototype H |
|---|---:|---:|---:|---:|
| mean luminance | 0.281 | 0.239 | 0.289 | 0.287 |
| bright pixels | 5.32% | 1.44% | 3.32% | 3.03% |
| white pixels | 3.68% | 0.95% | 2.76% | lower than G but cleaner |
| coral pixels | 0.79% | 0.00% | 0.22% | ~0.22% |
| strong-edge density | 14.59% | 5.43% | 6.96% | 6.29% |

Interpretation:

- attempt 04 was dramatically too dark and too low-detail;
- G/H recover the baseline luminance balance and remove the opaque-disc failure;
- remaining gap is mostly editorial craft/density, not an unresolved globe-rendering problem;
- G is the denser proof; H demonstrates the cleaner lower-dot-size threshold. Production should tune between G and H rather than return to the attempt-04 marker pile.

## 3. Research + programming loop

### A — sparse COBE + rebuilt editorial field

**Result:** discarded.

A large red/cyan diagonal band appeared. Root cause was not COBE: an inherited `attempt3` rule on `.orbit-b::before` retained its old background gradient while the experiment changed its dimensions. This exposed a real maintenance risk from stacking attempt-specific CSS files.

**Learning:** final production should consolidate S00 styles instead of indefinitely cascading old attempt overrides.

### B — inherited-gradient fix

**Result:** discarded.

The left hierarchy returned and the editorial modules improved, but the globe remained a large opaque/dark disc.

### C — fewer, uniform COBE markers

**Result:** discarded.

COBE issue #96 documents unnatural color artifacts when differently sized/colored markers overlap. Attempt 04 had used a dense marker field and mixed sizes/colors, so C reduced the field to one size/color and sparse sampling. The marker artifact improved, but the opaque sphere remained.

Source: https://github.com/shuding/cobe/issues/96

### D — remove CSS isolation around blended canvas

**Result:** discarded.

Removing `isolation:isolate` did not eliminate the dark globe body. Therefore the issue was not merely CSS backdrop compositing.

### E — color-match the COBE globe body

**Result:** discarded.

Multiple base/dark/brightness combinations still produced a visually solid globe. Review of current COBE rendering plus its open transparency issue confirmed this is architectural, not a tuning problem.

COBE `Transparent base color` issue #23 remains open. The maintainer's response is explicit: transparent base color is not currently supported.

Source: https://github.com/shuding/cobe/issues/23

Historical PR #42 added `opacity` and `mapBaseBrightness`, but the resulting opacity control is not equivalent to a page-background-transparent sphere body for this design requirement.

Source: https://github.com/shuding/cobe/pull/42

**Conclusion:** stop spending iterations trying to make COBE behave like a transparent point-only globe.

### F — GitHub-style transparent Three.js dot globe

**Result:** structural breakthrough.

The prototype used:

- `WebGLRenderer({ alpha: true })` with transparent clear color;
- an invisible depth-only sphere (`colorWrite:false`) to hide backside points without painting a globe body;
- world land as `THREE.Points` generated from a compact world mask;
- target territory as a second, slightly larger/brighter geographic point cloud;
- a few coral points as explicitly decorative signals;
- finite orientation transition only;
- DOM/CSS editorial instrumentation retained around the WebGL layer.

This immediately removed the opaque-disc failure.

### G — camera + focus calibration

**Result:** strongest architecture proof.

Positive X tilt moved the 20–30°N region into the optical center. World dots were bright and the target region became perceptually prominent while remaining part of the same sphere.

Temporary proof commit: `91631b421eb1ea523a329d3a1b41d6cd54e09ea8`.

### H — lower dot-size editorial calibration

**Result:** selected clean-density boundary.

Reduced world/focus dot sizes removed some of G's blocky/pixel-mass appearance while preserving the architecture. H is slightly less dense by raster metrics than G, so production should interpolate between G and H rather than thin the world further.

Temporary proof commit: `b93ae055fe701fcdb796ba22fe5f5d0962ec1608`.

## 4. External production precedent

### GitHub Engineering — How we built the GitHub globe

URL: https://github.blog/engineering/user-experience/how-we-built-the-github-globe/

WHY RELEVANT:

GitHub documents a production globe built in Three.js/WebGL as separate visual layers. Its Earth regions are represented by roughly 12,000 small circles generated from a world image mask and positioned on a sphere. This directly solves the visual requirement that caused repeated S00 failures: visible geographic land without a dominant opaque sphere body.

WHAT CAN TRANSFER:

- transparent WebGL scene;
- point/instanced geographic land layer;
- hidden/depth-aware spherical structure;
- depth/edge attenuation;
- graceful density/pixel-ratio degradation;
- separate layers for world, focus and signals.

WHAT MUST NOT BE COPIED:

- GitHub-specific colors, interactions, data, arcs or branding;
- fake activity/routes/data.

### jessehhydee/threejs-globe

URL: https://github.com/jessehhydee/threejs-globe

WHY RELEVANT:

Independent open-source implementation explicitly inspired by Stripe/GitHub globes. It follows the same practical pattern: world-image pixels are mapped to latitude/longitude and rendered as globe dots.

WHAT CAN TRANSFER:

- image-mask → lat/lon → sphere-dot pipeline;
- practical confirmation outside GitHub's internal implementation.

## 5. Locked visual direction

For the next production candidate, the globe architecture should be:

```text
transparent WebGL canvas
+
world land rendered as dense fine points
+
second geographic point cloud for situated territorial resolution
+
small distributed coral signals
+
subtle spherical construction lines
+
DOM/CSS editorial instruments around the sphere
```

The territory is prominent because it has:

- greater local point size/brightness/density;
- central camera placement;
- a few restrained coral signals;
- continuity with the world point layer.

It is NOT represented by:

- the country name;
- a CSS polygon;
- a translucent fill;
- a glowing sticker;
- a dense pile of overlapping mixed COBE markers;
- fake geographic activity data.

## 6. Composition targets for production

Preserve the baseline proportions rather than simply making the globe bigger:

- left copy block must remain immediately dominant and fully visible at the locked 1084×292 crop;
- globe/world field occupies the center-right and can crop beyond the frame, but must not read as a giant solid circle;
- focus region should sit near the optical center of the globe, not at its top edge;
- restore multiple families of surrounding detail: pixel cluster, scanlines, top diagnostic card, lower module, right grid, vertical note, isolated coral/white blocks;
- coral density should increase from prototype G/H, but remain distributed rather than implying real events;
- production dot size should land between G and H: H is cleaner, G has stronger density.

## 7. Research decision

**VISUAL_RESEARCH_RESULT: LOCK DIRECTION**

The core visual uncertainty is resolved. Continued visual-search browsing is unlikely to remove meaningful risk. The remaining unknowns are technical/productization questions:

- Three.js bundle cost and whether it fits S00 transfer budget;
- whether to tree-shake, dynamically import, or build a smaller point renderer;
- fallback design;
- mobile density/DPR;
- WebGL context-loss behavior;
- finite-motion lifecycle;
- exact edge/depth attenuation technique;
- dependency due diligence and license.

Those belong to TECH_RESEARCH, not more visual research.

## 8. Selected handoff

```text
DIRECTION = GitHub-style transparent dot world
REFERENCE PROOF = prototypes G/H
COBE = reject for primary S00 globe rendering because transparent base body is unsupported
TERRITORY = same-sphere brighter geographic point cloud, unlabeled
EDITORIAL DENSITY = rebuild to baseline-like multi-scale rhythm
NEXT PHASE = TECH_RESEARCH
```
