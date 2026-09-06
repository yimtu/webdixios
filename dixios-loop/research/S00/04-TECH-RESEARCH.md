# S00 HERO — 04 TECH / CODE RESEARCH

**Baseline:** `BASELINE_2026_09_05 / S00-HERO`  
**Date checked:** 2026-09-05  
**Phase:** `TECH_RESEARCH`  
**Concept locked:** `RESOLVE` — unresolved institutional variety → modeled relationships → coordinated capability  
**Visual hypothesis:** `FOCUS+CONTEXT + FIELD RESPONSE` around Mexico  
**Hard rule:** Mexico must become perceptually prominent inside the world/globe; a small marker is not sufficient.  
**Scope rule:** technical architecture only. No production code is modified in this phase.

---

# 0. Decision summary

```text
TECH_RESEARCH_RESULT = APPROVED_FOR_BUILD

RECOMMENDED ATTEMPT-01 ARCHITECTURE:
COBE 2.0.1 as global context
+
local SVG/CSS resolution field over the Mexico focus
+
finite, controller-owned requestAnimationFrame only during RESOLVE
+
strong static SVG/CSS fallback that already contains the resolved focus

NEW_RUNTIME_DEPENDENCY = NONE

DO NOT:
- fork or patch Cobe shaders for attempt 01
- install OGL/Three/Pixi/React/R3F
- rely on Cobe CSS-anchor labels for the semantic focus
- run permanent globe rotation
- represent the focus with only a Cobe marker
- add arbitrary geographic arcs or fake operational routes
```

Why this is the first build path:

1. It is the lightest architecture that can satisfy the visual hypothesis without throwing away the existing global renderer.
2. Cobe can be treated as **global context**, while the semantic `RESOLVE` event is owned by a bespoke local SVG/CSS field where art direction is fully controllable.
3. It avoids coupling Dixios to undocumented Cobe shader internals.
4. It avoids a new dependency before the visual judge proves that the lighter ceiling is insufficient.
5. The current Cobe integration contains two concrete v2 API/performance problems that BUILD must repair first; fixing them should reduce cost and make animation lifecycle deterministic.

Escalation architecture if this path cannot visually clear the baseline:

```text
Cobe + SVG/CSS field
        ↓ if visual ceiling is the blocker
custom OGL/WebGL point globe with vertex-shader focus field
```

A custom OGL renderer is technically viable, but it is **not approved for attempt 01** because it adds geometry/data-pipeline work and context-restoration responsibility before the lighter solution has been tested.

---

# 1. Current implementation audit before choosing a renderer

Relevant current files:

```text
src/components/Home.astro
src/scripts/scene.ts
src/scripts/motion.ts
src/styles/global.css
src/styles/v04-fixes.css
package.json
```

Current package set:

```text
astro  ^7.3.1
cobe   2.0.1
gsap   ^3.13.0
@webrek/mx-geo 0.9.1
```

No lockfile is currently present in the repository root.

That does not block TECH_RESEARCH, but it **will block the clean `npm ci` verifier gate** defined by `MASTER.md` until BUILD creates and commits a valid lockfile.

## 1.1 Existing Cobe lifecycle is written against the wrong API shape

### Evidence

**OFFICIAL / pinned-version source**  
Cobe tag `2.0.1`, commit `1f37b2233a64beda6d114d332e201f6310667d60`  
Types: https://github.com/shuding/cobe/blob/1f37b2233a64beda6d114d332e201f6310667d60/src/index.d.ts  
Source: https://github.com/shuding/cobe/blob/1f37b2233a64beda6d114d332e201f6310667d60/src/index.js  
Release: https://github.com/shuding/cobe/releases/tag/2.0.1  
Checked: 2026-09-05

The pinned v2 type surface returns:

```ts
interface Globe {
  update: (state: Partial<COBEOptions>) => void
  destroy: () => void
}
```

There is no `toggle()` method in the pinned v2 type or source.

The pinned v2 renderer is **update-driven**: `update(state)` changes state and renders. It does not own a permanent internal `requestAnimationFrame` loop.

Current `src/scripts/scene.ts`, however:

- passes an `onRender` callback;
- expects it to be called continuously;
- calls `globe.toggle()` from visibility observers.

Those behaviors are not part of the pinned 2.0.1 source/type contract.

### Important documentation inconsistency

**OFFICIAL / upstream README** still shows an `onRender` example as of the check date, while the actual 2.0.1 tag source/types are update-driven and omit it.

For Dixios, the pinned source and type definitions are the safer authority than the README snippet.

### BUILD implication

Do not preserve the existing lifecycle mechanically.

For v2, Dixios should own the finite RAF:

```text
start RESOLVE
→ requestAnimationFrame
→ globe.update({ phi, theta, width, height, ... })
→ stop RAF when resolved
```

Offscreen/hidden behavior then becomes straightforward: cancel the project-owned RAF rather than calling a nonexistent library toggle.

This is a useful property for S00 because the concept calls for a **finite transformation**, not perpetual spin.

---

## 1.2 Current Cobe sizing double-applies DPR on desktop

**OFFICIAL / pinned-version source:** Cobe 2.0.1 multiplies the supplied `width` and `height` by `devicePixelRatio` internally when sizing its backing canvas.

Current Dixios code already supplies:

```text
width  = CSS_width  × dpr
height = CSS_height × dpr
```

and separately supplies:

```text
devicePixelRatio = dpr
```

Therefore v2 applies DPR twice.

### 700×700 desktop example

Project target:

```text
CSS = 700 × 700
dpr = 1.35
physical pixels = 700 × 700 × 1.35²
                = 893,025 px
```

Current v2 call path effectively becomes:

```text
backing width = 700 × 1.35 × 1.35
              = 1,275.75 px

effective DPR = 1.8225

physical pixels ≈ 1,627,538 px
```

Difference:

```text
1,627,538 / 893,025 ≈ 1.8225
```

So the current desktop backing surface can contain roughly **82.25% more pixels than the intended DPR-1.35 surface**.

RGBA8 color-buffer lower bound:

```text
intended: 893,025 × 4 bytes ≈ 3.41 MiB
current:  1,627,538 × 4 bytes ≈ 6.21 MiB
```

Cobe creates the context with `depth: false`, but antialiasing/driver/compositor allocations can raise real GPU memory beyond this lower bound.

### BUILD implication

Supply Cobe **CSS-space width/height** and pass DPR separately.

The target remains:

```text
desktop DPR <= 1.35
mobile DPR  = 1.0 initially
```

This correction is mandatory before evaluating whether the renderer itself is too expensive.

---

## 1.3 Current fallback is useful and should be promoted, not discarded

`src/styles/v04-fixes.css` already creates a visible dotted globe-like field through `.hero-visual::before` / `::after` when WebGL does not carry the composition.

This is the right progressive-enhancement instinct.

The weakness is semantic: it currently does not encode a strong Mexico-resolved state.

Recommended BUILD direction:

```text
base layer / no GPU:
static authored global field + visibly resolved Mexico focus

GPU enhancement:
Cobe adds depth/world texture and a short orienting movement

semantic transformation:
SVG/CSS resolution field makes Mexico expand / clarify
```

The fallback must not become “canvas hidden = generic dotted circle.”

---

# 2. Evidence registry

## E01 — Cobe 2.0.1 source and type contract

**Evidence type:** OFFICIAL / PINNED RELEASE SOURCE  
**Checked:** 2026-09-05  
**URLs:**
- https://github.com/shuding/cobe/releases/tag/2.0.1
- https://github.com/shuding/cobe/blob/1f37b2233a64beda6d114d332e201f6310667d60/src/index.js
- https://github.com/shuding/cobe/blob/1f37b2233a64beda6d114d332e201f6310667d60/src/index.d.ts

Useful facts:

- MIT license.
- version 2.0.1 released 2026-03-19.
- zero runtime dependencies in package metadata.
- public v2 renderer surface is `update()` + `destroy()`.
- WebGL2 is attempted first, then WebGL1.
- instancing extension is used when WebGL1 is active.
- context is created with `alpha: true`, `antialias: true`, `depth: false`, `preserveDrawingBuffer: false`.
- v2 adds markers/arcs but exposes no public custom globe shader hook.

Transferable conclusion:

> Cobe remains a strong small global-context renderer, but its public API is intentionally constrained; local globe deformation is not a supported extension point.

---

## E02 — Cobe upstream README

**Evidence type:** OFFICIAL, but inconsistent with the pinned source on animation API  
**Checked:** 2026-09-05  
**URL:** https://github.com/shuding/cobe

Upstream describes Cobe as high-performance, zero-dependency, approximately 5 KB, and documents DOM-bindable markers.

Because README animation examples conflict with the pinned v2 source/type surface, BUILD should follow the tagged source rather than assume `onRender` exists.

---

## E03 — Cobe marker-label compatibility issue

**Evidence type:** COMMUNITY / OPEN GITHUB ISSUE  
**Checked:** 2026-09-05  
**URL:** https://github.com/shuding/cobe/issues/116

Issue #116 reports that v2 bindable marker labels depend on CSS Anchor Positioning and fail in Safari/Firefox/iOS where the used anchor behavior is unavailable.

This is not treated as proof that Cobe itself cannot render on those browsers. It is a reason **not to make Dixios's core Mexico focus depend on Cobe's DOM-anchor label mechanism**.

BUILD should keep the focus overlay project-owned and browser-independent.

---

## E04 — MDN WebGL best practices

**Evidence type:** OFFICIAL PLATFORM DOCUMENTATION  
**Checked:** 2026-09-05  
**URL:** https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices

Relevant guidance:

- understand device/system limits;
- batch draw calls;
- prefer work in the vertex shader when appropriate;
- estimate per-pixel VRAM budgets;
- smaller back buffers are a valid quality/performance trade;
- delete objects eagerly when finished;
- context loss must be handled as a normal possibility;
- avoid unnecessary blocking WebGL calls.

This supports the project's DPR caps and makes a shader-based Option C technically attractive if Option A's visual ceiling proves insufficient.

---

## E05 — WebGL context loss

**Evidence type:** OFFICIAL PLATFORM DOCUMENTATION  
**Checked:** 2026-09-05  
**URL:** https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event

`webglcontextlost` is widely available. Any custom WebGL renderer must either restore its resources or fail cleanly into the static fallback.

For Dixios, **clean fallback is sufficient for the hero**; restoration is desirable but should not make the fallback disappear.

---

## E06 — Canvas 2D optimization

**Evidence type:** OFFICIAL PLATFORM DOCUMENTATION  
**Checked:** 2026-09-05  
**URL:** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas

Relevant guidance:

- batch similar drawing calls;
- avoid unnecessary canvas-state changes;
- pre-render repeated primitives when useful;
- use `requestAnimationFrame` for animation;
- redraw only what needs to change when possible.

This makes custom Canvas 2D viable for a short, low-density deterministic field, but it still places per-point projection/drawing on the main thread.

---

## E07 — OGL

**Evidence type:** OFFICIAL REPOSITORY / PACKAGE METADATA  
**Checked:** 2026-09-05  
**URLs:**
- https://github.com/oframe/ogl
- https://github.com/oframe/ogl/blob/master/package.json

Facts relevant to this decision:

- minimal WebGL abstraction;
- ES modules;
- zero runtime dependencies;
- `sideEffects: false`;
- package version 1.0.11;
- package metadata declares `Unlicense`;
- project explicitly targets developers who want custom shaders / native-WebGL-level control.

This fits a custom point-globe well, but OGL does not solve the world-land sampling/geometry problem; Dixios would still need its own geometry/mask pipeline.

---

## E08 — OGL context restoration issue

**Evidence type:** COMMUNITY / OPEN GITHUB ISSUE  
**Checked:** 2026-09-05  
**URL:** https://github.com/oframe/ogl/issues/74

An open enhancement requests framework-level support for restoring after context loss.

Therefore a Dixios OGL implementation must assume that **the project owns context-loss recovery/fallback**, not that OGL solves it automatically.

---

# 3. Engineering invariants derived from the concept

Any implementation path must satisfy all of these.

```text
[1] Mexico is obvious in the resolved still frame in <1 second.
[2] The world/global context remains visible.
[3] Mexico changes local resolution/geometry/relational clarity; it is not only a pin.
[4] The visual does not imply fake clients, coverage, routes or metrics.
[5] The RESOLVE event has different before and after information states.
[6] Copy remains the primary institutional message.
[7] Mobile receives a designed state, not a desktop canvas shrunk down.
[8] Reduced motion receives the final resolved state without travel/rotation.
[9] Save-Data / no-WebGL still gets a compositionally strong focal state.
[10] No heavy animation runs offscreen or while document.hidden.
[11] First-view JS remains inside the project's 180 KB gzipped soft target.
[12] One heavy GPU canvas maximum in the viewport.
```

---

# 4. Implementation paths investigated

## OPTION A — Cobe v2 global context + project-owned SVG/CSS resolution field

### Architecture

```text
HTML/CSS editorial chassis
        +
static SVG/CSS resolution field (always present)
        +
Cobe canvas (progressive enhancement)
```

Cobe is no longer asked to perform the semantic transformation.

Its role becomes:

```text
WORLD / SYSTEM CONTEXT
```

The project-owned local SVG/CSS layer owns:

```text
MEXICO / SITUATED FOCUS / RESOLVE
```

### Motion sequence

```text
0. global field is visible
1. Cobe turns a short distance toward a Mexico-facing final orientation
2. global motion decelerates and stops
3. local resolution field expands/sharpens over the Mexico region
4. selected non-quantitative traces stabilize
5. scene becomes essentially still
```

No geography-dependent Cobe CSS anchors are required.

The SVG focus can activate only after the globe reaches its known final orientation, so it does not need to track a rotating country every frame.

### Transfer

- retains existing Cobe dependency; upstream advertises approximately 5 KB for the library;
- no new runtime package;
- bespoke focus controller + SVG logic expected to be small, but exact gzip size **must be measured in BUILD**;
- no bitmap hero asset required.

### Runtime

- one WebGL canvas during a short animation;
- one localized SVG/CSS group;
- no permanent Cobe updates after resolved state;
- no second full-resolution canvas.

Expected best case after lifecycle fix:

```text
active high-cost window: ~1.4–1.8 s desktop
idle: no project RAF
```

### Mobile

Strong.

- DPR 1.0 initial target;
- reduce Cobe map samples;
- no pointer response;
- start closer to final orientation;
- shorter resolve event or direct resolved state on weak/Save-Data conditions.

### Fallback

Strong.

SVG/CSS focus remains even if Cobe is absent; existing CSS dotted sphere can remain the world-context fallback.

### Accessibility

Strong.

Canvas stays `aria-hidden`/decorative to semantics; visible labels in the resolution field should be real HTML/SVG text only when meaningful. No interaction is required to reveal the core message.

### Maintenance

Low–medium.

Main maintenance risk is Cobe API drift; pinning exact 2.0.1 + owning the animation loop reduces ambiguity.

### Visual ceiling

High enough for attempt 01, but not unlimited.

True local distortion of Cobe's own land/dot shader is impossible through the public API. The illusion of focus+context is created by **composition and overlay**, not by changing Cobe's globe shader.

### Verdict

```text
RECOMMENDED FOR BUILD ATTEMPT 01
```

---

## OPTION B — custom Canvas 2D point globe / focus-context renderer

### Architecture

Project owns:

- geographic point sampling or raster mask;
- spherical projection;
- rotation;
- focus deformation;
- point styling;
- local field response;
- animation loop.

### Transfer

Potentially low if the land mask/point set is compact.

However the renderer must ship or generate a world representation that Cobe currently provides internally. Exact transfer cannot be known until geometry format is selected.

Reasonable BUILD gate if this option is escalated to later:

```text
world geometry/mask <= 40 KB compressed
renderer incremental JS <= 15 KB gzipped
```

These are project budgets, **not measured facts**.

### Runtime

Main-thread cost is the key risk.

For each active frame, thousands of points may require:

```text
3D rotation
projection
visibility test
focus-distance test
drawing
```

At 8,000 points × 60 FPS:

```text
480,000 point updates / second
```

That number alone is not a benchmark, but it explains why batching and a short active duration are essential.

A Canvas path should batch points by style/size instead of issuing independent state changes per point.

### Mobile

Moderate.

Suggested density if escalated:

```text
desktop: ~6k–10k visible/sample points
mobile:  ~2.5k–4k
```

These are starting test ranges, not guarantees.

### Fallback

Good: SVG/CSS resolved poster can replace canvas.

### Accessibility

Good if treated as decorative and semantic copy remains HTML.

### Maintenance

Medium–high because Dixios owns projection, geometry generation and renderer correctness.

### Visual ceiling

High for 2D graphic treatment; lower than custom WebGL for large point counts, depth and deformation at minimal per-point CPU cost.

### Verdict

```text
VALID BUT NOT SELECTED
```

Reason: replacing a functioning GPU globe with a bespoke CPU renderer creates substantial implementation work without first proving that Cobe + authored focus layer is visually insufficient.

---

## OPTION C — custom OGL/WebGL point globe with focus deformation in shader

### Architecture

```text
OGL renderer
+
custom point/land geometry
+
vertex shader with Mexico focus field
+
minimal fragment shader
```

A shader can compute focus from angular distance to a Mexico focus vector and alter point scale/displacement/clarity in one or a few draw calls.

This is the technically cleanest path to **true field deformation**.

### Transfer

OGL itself is modular, zero-dependency and tree-shakeable according to package metadata.

No trustworthy project-specific gzip number exists until bundled with the exact imports, so TECH_RESEARCH does **not invent one**.

If escalated, BUILD gate:

```text
OGL + renderer incremental JS <= 25 KB gzipped
world mask/geometry <= 40 KB compressed
```

If the combined incremental cost exceeds that without a decisive visual gain, reject it.

### Runtime

Potentially excellent.

A point field can be batched into one draw call, and MDN recommends moving suitable work into the vertex shader.

For a 700×700 canvas at DPR 1.35:

```text
893,025 physical pixels
```

Fragment cost still matters, but local deformation math on ~10k–20k vertices is much cheaper than equivalent per-point JS work in many cases.

### Mobile

Potentially good if:

- DPR <= 1.0–1.25;
- point count and fragment overdraw are capped;
- no expensive transparency stack;
- precision is tested on real mobile GPUs;
- static fallback appears on context loss / Save-Data / unsupported WebGL.

### Fallback

Required and straightforward conceptually: use the same static SVG/CSS resolved field.

### Accessibility

Good if canvas remains visual-only and important information is outside it.

### Maintenance

High relative to Option A.

Dixios owns:

- shader code;
- geometry pipeline;
- context-loss behavior;
- resize/DPR logic;
- WebGL cleanup;
- mobile GPU QA.

OGL's open context-restoration issue means fallback/reinitialization is explicitly a project responsibility.

### Visual ceiling

Highest.

This is the only investigated path that can make the **underlying globe field itself** deform around Mexico with full control rather than using an overlay illusion.

### Verdict

```text
TECHNICALLY APPROVED AS ESCALATION PATH
DEPENDENCY_APPROVED_FOR_ATTEMPT_01 = false
```

Reason: the visual ceiling is compelling, but the heavier architecture is not yet justified when a zero-new-dependency path can express the same concept through layered focus+context.

---

## OPTION D — SVG/CSS-only world + resolved focus

### Architecture

No canvas. A small number of SVG paths/patterns/masks compose a globe-like systemic field, with Mexico resolved through vector scale/density/line response.

### Transfer

Very low if path data is compact.

### Runtime

Excellent if element count remains low and large animated filters are avoided.

### Mobile

Excellent.

### Fallback

It is itself the fallback.

### Accessibility

Excellent.

### Maintenance

Low.

### Visual ceiling

Medium.

A vector-only scene can be highly authored, but it gives up much of the world-depth/materiality that the baseline/current hero already possesses. It risks feeling like a diagram rather than the desired field/chassis tension.

### Verdict

```text
APPROVED AS FALLBACK / LOW-POWER STATE
NOT SELECTED AS PRIMARY ATTEMPT
```

---

# 5. Mandatory comparison matrix

| Option | Transfer | Runtime | Mobile | Fallback | Complexity | Maintenance | Accessibility | Visual ceiling |
|---|---:|---:|---|---|---|---|---|---|
| **A — Cobe + SVG/CSS field** | **Lowest incremental; no new package** | **Low after finite RAF + DPR fix** | **Strong** | **Strong** | Medium | Low–medium | Strong | High |
| B — Canvas 2D custom | Low–medium, geometry-dependent | Medium; main-thread point work | Moderate | Strong | High | Medium–high | Strong | High 2D |
| C — OGL/WebGL custom | Medium, exact bundle TBD | Potentially excellent GPU path | Good if aggressively capped/tested | Required | High | High | Strong if decorative | **Highest** |
| D — SVG/CSS only | **Very low** | **Very low** | **Excellent** | Native | Low–medium | Low | **Excellent** | Medium |

Selection criterion is **not** “which uses the most sophisticated technology.”

Option A wins attempt 01 because it reaches the required conceptual state with the smallest incremental runtime/supply-chain cost while keeping Option C available if the visual judge exposes a genuine rendering-ceiling problem.

---

# 6. Pixel, frame and memory math

Project budget from `MASTER.md`:

```text
60 FPS frame = 16.67 ms
main-thread scripting average <= 4 ms
render/paint average <= 6 ms
headroom >= 6 ms
```

S00 should not consume the whole project budget.

## 6.1 Proposed hero runtime budget during RESOLVE

Internal S00 target:

```text
JS/controller work average <= 2.0 ms/frame desktop
JS/controller work average <= 2.5 ms/frame mobile
GPU/render contribution <= 4.0 ms/frame on target hardware during active event
long tasks > 50 ms = none caused by hero animation
```

These are attempt gates to profile, not claims of measured current performance.

## 6.2 Desktop canvas target

At maximum visual box 700×700, DPR 1.35:

```text
700 × 700 × 1.35²
= 893,025 physical pixels
```

RGBA8 lower-bound color surface:

```text
893,025 × 4
= 3,572,100 bytes
≈ 3.41 MiB
```

A DPR-2 backing store would be:

```text
700 × 700 × 2²
= 1,960,000 px
≈ 7.48 MiB RGBA8 lower bound
```

So DPR 1.35 uses about:

```text
893,025 / 1,960,000 ≈ 45.6%
```

of the DPR-2 pixel count — roughly **54.4% fewer pixels**.

## 6.3 Current accidental double-DPR cost

As audited above:

```text
effective backing width ≈ 1,275.75
physical pixels ≈ 1.628M
```

Correcting the v2 call to 893k pixels reduces raster work by roughly:

```text
1 - 893,025 / 1,627,538 ≈ 45.1%
```

relative to the current double-DPR backing surface.

That is a meaningful optimization available **without changing visual ambition**.

## 6.4 Mobile canvas target

Current CSS mobile canvas is 420×420 and project DPR is 1:

```text
420 × 420 × 1²
= 176,400 px
```

RGBA8 lower bound:

```text
176,400 × 4
= 705,600 bytes
≈ 0.67 MiB
```

This is appropriate as a starting point.

Do not raise mobile DPR until profiling shows margin and visual judge evidence shows a meaningful benefit.

---

# 7. DOM / SVG budget for Option A

The semantic focus field should remain intentionally small.

Proposed upper envelope:

```text
1 SVG root
<= 6 grouped layers
<= 80 vector primitives total
<= 12 visible semantic text/label nodes
0 full-screen SVG blur/filter animations
0 per-point DOM particles
```

The goal is not to animate hundreds of DOM dots individually.

Use:

- repeated path/pattern geometry;
- masks/clip paths where stable;
- grouped transforms;
- CSS custom properties or one GSAP timeline for state transitions;
- SVG stroke-dash / transform / opacity only where they explain `RESOLVE`.

If the field requires hundreds/thousands of independently animated elements, that is evidence to escalate to Canvas/WebGL instead of forcing the DOM.

---

# 8. Dependency due diligence

## 8.1 Existing dependency — Cobe

```text
NAME: cobe
VERSION: 2.0.1 (exact in package.json)
OFFICIAL_URL: https://cobe.vercel.app
REPOSITORY: https://github.com/shuding/cobe
LICENSE: MIT
LAST_RELEASE: 2.0.1 / 2026-03-19
MAINTENANCE_ACTIVITY: repository pushed 2026-07-18 at check time; active issues/PRs exist
BUNDLE_COST: upstream advertises ~5 KB; exact Dixios chunk must be measured in BUILD/VERIFY
BROWSER_REQUIREMENTS: WebGL2 preferred, WebGL1 fallback; instancing extension path exists
MOBILE_NOTES: keep DPR <=1–1.25; do not depend on CSS-anchor marker labels on iOS/Safari
KNOWN_ISSUES: open issue #116 around marker-label CSS Anchor Positioning; upstream README/API inconsistency around onRender; project integration currently calls nonexistent toggle()
WHY_NEEDED: already supplies compact global/world context and land-dot rendering
WHY_NATIVE/CSS/SVG_IS_NOT_ENOUGH: primary scene benefits from depth/world materiality; SVG/CSS remains semantic focus + fallback
FALLBACK: project-owned SVG/CSS global field + resolved Mexico focus
DEPENDENCY_APPROVED: true, existing dependency, pin exact version
```

### Pinning recommendation

Do not change `cobe` to a caret range during this loop.

The source/README mismatch makes exact version behavior particularly important.

---

## 8.2 Candidate dependency — OGL

```text
NAME: ogl
VERSION_RESEARCHED: 1.0.11
OFFICIAL_URL: https://oframe.github.io/ogl/examples
REPOSITORY: https://github.com/oframe/ogl
LICENSE: package metadata declares Unlicense
LAST_RELEASE/PACKAGE VERSION: 1.0.11; exact publish/release cadence should be rechecked if escalation occurs
MAINTENANCE_ACTIVITY: repo not archived; last repository push observed 2025-04-13
BUNDLE_COST: unknown for Dixios until exact imports are bundled; do not invent a number
BROWSER_REQUIREMENTS: WebGL; project must own shader/browser compatibility
MOBILE_NOTES: DPR/overdraw/precision must be profiled; fallback mandatory
KNOWN_ISSUES: open issue #74 requests framework support for context restoration
WHY_NEEDED: only if true local deformation of underlying globe field is required after Option A fails visually
WHY_NATIVE/CSS/SVG_IS_NOT_ENOUGH: shader path offers one/few draw calls and genuine per-vertex focus deformation at higher point counts
FALLBACK: SVG/CSS resolved poster
DEPENDENCY_APPROVED: false for attempt 01; conditionally approvable after a TECH_RESEARCH escalation
```

No other new runtime library is justified for S00 attempt 01.

---

# 9. Why not patch/fork Cobe's shader now

Cobe's internal source contains custom GLSL, but the public API does not expose a shader hook.

A local magnification patch would therefore mean one of:

```text
fork Cobe
vendor internal source
monkey-patch built distribution
maintain a custom shader branch
```

All four convert a small dependency into a private renderer without gaining the cleanliness of actually owning a purpose-built renderer.

If true shader-level deformation is necessary, Option C is cleaner: own the renderer intentionally with OGL/native WebGL rather than create a hidden Cobe fork.

Therefore:

```text
COBE_SHADER_PATCH = REJECTED
```

---

# 10. Recommended BUILD architecture in concrete terms

This section defines constraints, not implementation code.

## Layer 0 — editorial chassis

Keep the hero's core:

- cobalt field;
- large `dixios` wordmark;
- copy hierarchy;
- coral active signal;
- restrained micro-instrumentation.

The BUILD should remove or subordinate decorative fragments that compete with the single Mexico-resolution event.

## Layer 1 — always-present fallback world field

Use the existing CSS/SVG fallback concept as a real art-directed layer.

It must already contain:

```text
WORLD CONTEXT
+
MEXICO RESOLVED REGION
```

so Save-Data / WebGL failure still satisfies the hard visual hierarchy.

## Layer 2 — Cobe global context

Cobe should:

- render world/land density;
- begin near, not far from, the final useful orientation;
- perform a short finite orientation movement;
- stop updating after settle;
- receive CSS dimensions + DPR separately;
- avoid arbitrary routes and fake markers.

No perpetual rotation.

## Layer 3 — Mexico resolution field

A local SVG/CSS group placed over the resolved Mexico region should supply at least two of these hierarchy signals:

```text
local scale expansion
higher point/line density
sharper line hierarchy
field curvature/convergence
explicit local coordinate/chassis frame
selected relationship traces
```

Coral can signal activation, but **color alone does not count**.

The resolved region should occupy enough of the globe's visible area to be noticed immediately; it must not collapse into a 10–20 px icon.

## Layer 4 — instrumentation

Only micrographics that support the transformation survive.

Permissible semantic vocabulary already supported by project copy/research:

```text
OBSERVAR
DISTINGUIR
MODELAR
RELACIONAR
COORDINAR

DATOS
SISTEMAS
PERSONAS
INSTITUCIONES

CAMPO
FOCO
CAPACIDAD
```

No fake status, counts, KPIs, coverage numbers or city claims.

---

# 11. Motion contract

## MOTION_PURPOSE

Make `RESOLVE` visible: the world remains complex while a situated Mexico region gains scale, distinction and stable relationships.

## TRIGGER

Primary:

```text
first hero entry / scene ready
```

Do not depend on scroll to understand the hero.

Optional desktop-only secondary response after settlement:

```text
small pointer-local field perturbation
```

Only include it if it does not obscure the strong resolved still state.

## ACTIVE_DURATION

Desktop target:

```text
1.4–1.8 s one-shot resolve
```

Mobile target:

```text
0.8–1.2 s or direct resolved state on constrained devices
```

No continuous high-intensity animation afterward.

## OFFSCREEN_BEHAVIOR

```text
cancel project RAF immediately when not intersecting
no animation while document.hidden
resume only if an unfinished one-shot needs completion
otherwise remain in resolved still state
```

Because Cobe v2 is update-driven, there is no need for a library `toggle()`.

## MOBILE_VARIANT

```text
- DPR 1.0 initial
- lower mapSamples than desktop
- start near final Mexico-facing orientation
- fewer local traces
- no pointer response
- short resolve or immediate final state under Save-Data / constrained conditions
```

## REDUCED_MOTION_VARIANT

Render the final resolved state directly.

Allowed minimal behavior:

```text
opacity / discrete state appearance only
```

No globe rotation, lens travel or continuous field movement.

## ESTIMATED_RUNTIME_COST

Before profiling, use these as BUILD/VERIFY gates:

```text
active period only: <= ~108 frames at 60fps for 1.8s
project-owned hero controller average <= 2ms/frame desktop target
canvas backing <= 893,025 px at 700×700 desktop/DPR1.35
mobile backing <= 176,400 px at 420×420/DPR1 initially
idle after resolve: no hero RAF
```

Measured runtime must replace these estimates in VERIFY.

---

# 12. Browser/mobile behavior and degradation ladder

```text
TIER 1 — normal WebGL + motion allowed
Cobe + SVG/CSS focus + finite RESOLVE

TIER 2 — prefers-reduced-motion
Cobe or static canvas at final orientation + resolved SVG/CSS focus; no travel

TIER 3 — Save-Data / WebGL unavailable / context lost
SVG/CSS global field + resolved Mexico focus; no canvas dependency

TIER 4 — very narrow mobile
simplified world field + large resolved focus; lower micrographic density
```

The conceptual message must survive every tier.

Context loss must never expose a blank hole in the composition.

---

# 13. Supply-chain / build gate discovered in this phase

Repository root currently has no `package-lock.json` / other lockfile.

`MASTER.md` requires:

```text
npm ci
npm run build
```

and states that lack of a valid lockfile is `TECH_FAIL` in VERIFY.

Therefore BUILD must create a valid lockfile before handing the candidate to VERIFY.

No dependency upgrade should be bundled into that action unless separately justified.

---

# 14. Attempt-01 acceptance gates for BUILD

The build is ready for VERIFY only if all of these are true:

```text
[ ] only S00 visual/source scope changed, plus lockfile if required
[ ] no new runtime dependency
[ ] current Cobe v2 lifecycle mismatch removed
[ ] width/height no longer double-apply DPR
[ ] Mexico is clearly prominent in the resolved still state
[ ] focus is a field/resolution condition, not merely a marker
[ ] world context remains visible
[ ] no fake geographic route, coverage, metric or city claim
[ ] one-shot RESOLVE has a meaningful before/after state
[ ] hero stops its own RAF after resolution
[ ] offscreen/document.hidden behavior is explicit
[ ] reduced motion lands directly in resolved state
[ ] Save-Data/no-WebGL fallback retains Mexico hierarchy
[ ] mobile composition is deliberately simplified
[ ] no Cobe CSS-anchor mechanism is required for core focus
[ ] no second heavy canvas
[ ] lockfile exists for later npm ci verification
```

---

# 15. Escalation criteria to OGL

Route back to TECH_RESEARCH / Option C only if the first visual candidate fails for a **rendering-ceiling reason**, for example:

```text
- overlay cannot feel physically integrated with the globe;
- focus reads as a pasted UI layer rather than a field condition;
- Mexico cannot acquire enough local scale without breaking composition;
- visual judge diagnosis specifically identifies flatness / weak material integration;
- Cobe's fixed globe shader prevents the required authored distortion.
```

Do **not** escalate to OGL because WebGL sounds more sophisticated.

If the problem is spacing, balance, timing or craft, route to BUILD instead.

---

# 16. Final technical recommendation

The most defensible first implementation is:

> **Keep Cobe 2.0.1 as a compact global-context renderer, correct its v2 integration, stop permanent animation, and move the actual meaning of `RESOLVE` into a project-owned localized SVG/CSS field that makes Mexico visibly larger/higher-definition inside the globe.**

This architecture follows the project hierarchy:

```text
CSS/SVG first for semantic transformation
+
existing WebGL only where it already adds depth/context
```

rather than adding a heavier renderer preemptively.

It also creates a clean test:

```text
If this candidate visually wins:
  no additional rendering stack was necessary.

If it fails specifically because the focus cannot integrate deeply enough:
  OGL/native WebGL becomes technically justified by evidence.
```

## Approved next phase

```text
BUILD
```

TECH_RESEARCH owns no implementation, screenshot, technical-pass or visual-judge fields. Those remain unchanged until their corresponding phases.
