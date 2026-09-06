# S00 HERO — BUILD ATTEMPT 01

**Date:** 2026-09-05  
**Branch:** `loop/S00-hero`  
**Base commit:** `e43735909e7fdd63039d3474a6252fbeb0b8ebb8`  
**Candidate implementation commit:** `472146b660b63f6b4be3ab3c2c6e8b32a0cb6ea5`

## Scope executed

Only S00 Hero implementation files were changed:

- `src/scripts/scene.ts`
- `src/styles/v04-fixes.css`

No S01–S05 source was redesigned. No deployment or DNS work was performed.

## What changed

- Replaced the old Cobe lifecycle assumptions (`onRender` / `toggle`) with a project-owned finite `requestAnimationFrame` controller using Cobe v2 `update()`.
- Corrected width/height handling so DPR is no longer pre-multiplied before Cobe applies `devicePixelRatio`.
- Reoriented the globe toward a Mexico-facing resolved state.
- Reworked the existing orbit elements into a large local resolution/focus field positioned over Mexico’s projected final location.
- Added a clearly perceptible Mexico focal treatment that changes scale, density, line precision and field response rather than relying on a tiny marker alone.
- Reduced peripheral visual emphasis while the field resolves.
- Added finite `RESOLVE` motion; the hero stops its own RAF after settlement.
- Added offscreen/document-hidden pausing during the finite event.
- Added `prefers-reduced-motion`, Save-Data and WebGL-context-loss paths that land directly in the resolved fallback composition.
- Kept one GPU canvas and added no runtime dependency.

## Motion implementation

```text
MOTION_PURPOSE: resolve a global system into a situated Mexico focus
TRIGGER: initial hero entry
ACTIVE_DURATION: 1.65s desktop / 1.05s mobile
OFFSCREEN: cancel RAF; continue only if unresolved when visible again
MOBILE: lower samples, DPR 1, shorter orientation movement, no pointer interaction
REDUCED_MOTION: direct resolved state, no rotation travel
IDLE: no hero RAF after resolve
```

## Minimum validation performed in BUILD

Static/API review confirms the implementation now matches the pinned Cobe 2.0.1 public API (`update()` / `destroy()`) and removes the previous `toggle()` / `onRender` assumptions.

A local dependency install/build could not be executed from the available container because outbound DNS to GitHub/npm is unavailable in that runtime.

## Known verifier prerequisite

The repository still has no package lockfile. `MASTER.md` requires a valid lockfile for `npm ci`; therefore VERIFY must treat this as a technical gate and either obtain/generate the lockfile in an environment with npm registry access or return `TECH_FAIL` to BUILD. No fake/minimal lockfile was fabricated in this phase.

## BUILD result

```text
IMPLEMENTATION_WRITTEN = true
CANDIDATE_COMMIT = 472146b660b63f6b4be3ab3c2c6e8b32a0cb6ea5
NEXT_PHASE = VERIFY
```

No technical pass, screenshots, visual pass or DONE state is claimed by BUILD.
