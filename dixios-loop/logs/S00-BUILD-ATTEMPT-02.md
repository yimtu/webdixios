# S00 HERO — BUILD / ATTEMPT 02

**Date:** 2026-09-05 local / 2026-09-06 UTC  
**Route:** VISUAL_JUDGE fail → BUILD  
**Candidate implementation commit:** `62535a5ac5984fa61879d00323e42248ee18363f`

## User direction

Use the original Hero as the dominant visual reference. Do not redesign away from it. Enlarge the territorial focus inside the globe and do not write the country's name in the Hero.

## Implementation

Files changed by the candidate commit:

```text
src/styles/s00-attempt2.css
src/pages/index.astro
```

The new stylesheet is deliberately layered after the previous S00 treatment so this attempt is isolated and reversible.

### Composition

- Returns to the baseline's basic balance: editorial copy on the left, dense globe/system field on the right, small instrumentation surrounding the globe.
- Reduces the oversized low globe treatment that caused the first candidate to miss the locked comparison crop.
- Adds a dedicated short-viewport composition for the 1084×292 pairwise crop rather than letting the focal area fall below the visible frame.

### Territorial focus

- Removed the visible `MÉXICO` label from the Hero through the attempt-02 override.
- Replaced the attempt-01 labeled ellipse with an enlarged point-field silhouette.
- The silhouette is a simplified external outline derived from the existing project geographic source already used by the site; it is not a new dependency and does not add fabricated geographic claims.
- The shape is intentionally enlarged and layered over the global globe as art direction, not as an analytic map or coverage claim.

### Motion / lifecycle

No new animation runtime was added. The existing finite `RESOLVE` lifecycle in `scene.ts` remains unchanged:

```text
MOTION_PURPOSE: resolve a global system into a situated territorial focus
TRIGGER: initial hero entry
ACTIVE_DURATION: 1.65s desktop / 1.05s mobile
OFFSCREEN_BEHAVIOR: cancel RAF; resume only while unresolved
MOBILE_VARIANT: DPR 1, fewer samples, shorter movement
REDUCED_MOTION_VARIANT: direct resolved state
ESTIMATED_RUNTIME_COST: no new JS/runtime introduced in attempt 02
```

## BUILD smoke

A temporary draft PR was opened only to trigger the repository's existing pull-request build workflow against the exact candidate commit.

```text
PR: #4
Workflow run: 34013533639
Build job: SUCCESS
Deploy job: SKIPPED
PR disposition: CLOSED, NOT MERGED
```

This smoke is BUILD evidence only. It does not set `technical_pass`, `screenshots_ready`, or any Visual Judge field.

## BUILD result

```text
implemented = true
candidate_commit = 62535a5ac5984fa61879d00323e42248ee18363f
phase = VERIFY
```

Formal browser/render/performance verification remains the next phase.
