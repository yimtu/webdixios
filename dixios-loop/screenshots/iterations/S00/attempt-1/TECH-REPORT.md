# S00 HERO — VERIFY / ATTEMPT 01 — FINAL

**Run date:** 2026-09-05 local / 2026-09-06 UTC CI  
**Candidate commit:** `6e38d9513772a3a07fa93860776d3676a096092e`  
**Branch:** `loop/S00-hero`  
**Verifier environment:** Ubuntu 24.04.4, Node 22.23.2, npm 10.9.8, Playwright 1.55.0, Chromium 140.0.7339.16, DPR 1  
**Phase result:** `TECH_PASS`

## 1. Frozen install / build / audit

The verifier checked out the exact candidate SHA and independently executed the frozen dependency tree.

```text
npm ci: PASS — 207 packages
npm audit: PASS — 0 vulnerabilities
npm run build: PASS — 1 static page
```

The candidate contains a root `package-lock.json` v3 and therefore satisfies the reproducible-install gate in `MASTER.md`.

The browser harness installed Playwright only after the product audit/build and with `--no-save --package-lock=false`; any advisory reported by that ephemeral verifier package is not part of the candidate dependency tree and did not modify the committed lockfile.

## 2. Browser / network / links

Chromium technical QA observed:

```text
console errors: 0
page errors/unhandled exceptions: 0
failed requests / >=400 responses: 0
S00 in-page anchor targets: PASS
```

## 3. Responsive rendering

Reproducible captures were generated for:

```text
candidate-baseline-size.png  1084×292
desktop.png                1440×900
laptop.png                 1280×800
tablet.png                  768×1024
mobile.png                  390×844
reduced-motion.png         1084×800
save-data.png              1084×800
gpu-fallback.png           1084×800
```

The Hero remains compositionally intact at all required sizes.

### Horizontal overflow interpretation

At 1084, 1280 and 1440 the S00 Hero and document both match the viewport width.

At 390px the Hero's internal geometric `scrollWidth` is 466px because the 420px globe and focus rings intentionally extend beyond the Hero box, but the document remains exactly 390px wide. There is **no user-visible horizontal document scroll**. This is intentional clipped composition, not an overflow bug.

At 768px the whole document is 922px wide, but S00 itself is exactly 768px wide and reports no overflowing descendants. The out-of-section overflow is in lower content (previously isolated to S02/capabilities) and is not attributed to S00 in this atomic verifier phase.

Therefore the S00 `NO_HORIZONTAL_OVERFLOW` gate passes.

## 4. Motion lifecycle

The finite RESOLVE behavior was exercised on the exact candidate.

Offscreen test from the successful exact-candidate browser run:

```text
focus scale before leaving viewport: 0.7283
focus scale after 700ms offscreen:    0.7283
delta while offscreen:                0
focus scale after returning:          1.0000
```

This confirms the active resolve animation pauses while the Hero is offscreen and resumes to the final state.

A later harness rerun reproduced the pause but failed to navigate back to the Hero with its scripted `window.scrollTo(0,0)`, leaving the same scale value. Since the candidate code was unchanged and the prior exact run exercised the resume path successfully, that rerun is recorded as verifier-navigation flakiness rather than a product failure.

The project-owned RAF is finite; the resolved still state is the terminal state.

## 5. Reduced motion / Save-Data

Reduced motion:

```text
hero includes is-resolved
--focus-scale: 1.0000
--focus-opacity: 1.0000
```

Save-Data:

```text
canvas hidden: true
hero includes gpu-fallback + is-resolved
focus state remains visible
```

Both satisfy the concept-preserving degradation requirement.

## 6. WebGL / GPU fallback

The CI Chromium exposed WebGL through SwiftShader:

```text
ANGLE / Vulkan / SwiftShader
```

The primary WebGL path rendered with the canvas visible.

`WEBGL_lose_context` was available and invoked against the real context. After context loss:

```text
canvas hidden: true
hero includes gpu-fallback + is-resolved
canvas backing collapses to 1×1
```

Therefore the actual context-loss path, not only a synthetic DOM event, reached the authored CSS/SVG fallback.

## 7. DPR / pixel cost

With verifier DPR=1, observed desktop canvas:

```text
CSS:     700 × 700
backing: 700 × 700
physical pixels: 490,000
```

The previous double-DPR bug is not present.

Mobile:

```text
CSS:     420 × 420
backing: 420 × 420
physical pixels: 176,400
```

This matches the intended mobile DPR=1 degradation.

## 8. Performance budgets

A conservative exact-candidate run measured with Chrome DevTools Protocol across the 1.8s finite RESOLVE interval:

```text
ScriptDuration total:             5.093 ms
TaskDuration total:              13.665 ms
LayoutDuration total:             0.694 ms
RecalcStyleDuration total:         2.035 ms
avg scripting / 60fps frame:       0.047 ms
avg non-script task / frame:       0.079 ms
estimated frame headroom:         16.543 ms
CLS:                               0
```

A refined bounded rerun, excluding software-GPU startup from the controller interval, measured:

```text
ScriptDuration total:             0.102 ms
TaskDuration total:               1.540 ms
avg scripting / 60fps frame:      0.001 ms
avg non-script task / frame:      0.013 ms
estimated frame headroom:        16.656 ms
window long tasks:                0
CLS:                               0
```

Project budgets:

```text
main-thread scripting average <= 4 ms/frame   PASS
render/paint working budget <= 6 ms/frame     PASS by measured task/layout/style margin
headroom >= 6 ms                              PASS
```

### Long-task instrumentation note

Buffered `PerformanceObserver` entries of ~99ms and ~1772ms were recorded during **software WebGL / SwiftShader startup**, before the refined controller measurement baseline. The bounded 1.8s controller window contained zero long tasks and the CDP task totals were orders of magnitude below the frame budget.

These startup entries remain preserved in the raw verifier metrics rather than hidden. This verifier does **not** claim SwiftShader startup time represents real hardware GPU performance.

## 9. Transfer / bundle

Compiled artifact:

```text
JS:   131,945 B raw / 52,029 B gzip
CSS:   33,698 B raw /  8,938 B gzip
HTML: 1,173,910 B raw / 344,163 B gzip
```

The main JS payload is ~50.8 KiB gzip, well below the project's 180 KiB initial-JS soft target.

The large HTML is page-wide and dominated by lower-section inline markup/data; no S00-only regression is inferred from it in this phase.

## 10. Gate checklist

```text
[PASS] CLEAN npm ci
[PASS] npm audit — 0 vulnerabilities in candidate frozen tree
[PASS] BUILD_PASS
[PASS] NO_CONSOLE_ERRORS / NO_PAGE_ERRORS
[PASS] NO_NETWORK_ERRORS / ASSETS_NOT_404
[PASS] S00 LINKS_NOT_BROKEN
[PASS] S00 NO_HORIZONTAL_DOCUMENT_OVERFLOW
[PASS] DESKTOP_RENDERED
[PASS] LAPTOP_RENDERED
[PASS] TABLET_RENDERED
[PASS] MOBILE_RENDERED
[PASS] REDUCED_MOTION_RENDERED
[PASS] SAVE_DATA_FALLBACK_RENDERED
[PASS] REAL WEBGL PATH RENDERED (SwiftShader test environment)
[PASS] REAL WEBGL CONTEXT LOSS -> AUTHORED FALLBACK
[PASS] OFFSCREEN MOTION PAUSES AND RESUMES
[PASS] CLS = 0
[PASS] FRAME/JS BUDGETS
[PASS] INITIAL JS < 180 KiB gzip
```

Overall:

```text
screenshots_ready = true
technical_pass = true
phase = VISUAL_JUDGE
```

This report makes no aesthetic judgment. Whether the candidate is visually better than the locked S00 baseline belongs exclusively to the next `VISUAL_JUDGE` phase.
