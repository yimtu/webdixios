# S00 HERO — VISUAL_JUDGE / ATTEMPT 01 — BLOCKED

**Date:** 2026-09-05 local / 2026-09-06 UTC  
**Candidate commit:** `6e38d9513772a3a07fa93860776d3676a096092e`  
**Expected baseline:** `dixios-loop/screenshots/baseline/S00-HERO.jpg`  
**Expected dimensions:** `1084×292`  
**Result:** `STOP_REASON = BASELINE_MISSING` (usable visual baseline unavailable)

## Why the pairwise judge was not run

`MASTER.md` requires Visual Judge to receive only the visible baseline and visible candidate, then run two order-inverted comparisons. It also prohibits continuing when a baseline is unavailable.

The locked S00 repository file was exported through GitHub Actions directly from `main` and inspected as raw bytes. Its container metadata identifies a JPEG at 1084×292, but full raster decoding fails with:

```text
OSError: broken data stream when reading image file
```

A tolerant decode yields an all-black image, so it is not a valid visual proxy for the original user-supplied baseline.

Observed exported-repository-copy SHA-256:

```text
ecf3216661b0ca7972fa6ea3a87ec92022c668c578b54cc6f9259d387cbdd711
```

`BASELINE.md` records the original user-supplied S00 source SHA-256 as:

```text
e42bfaf3707c54bdacce81a49a18d03a748855a54355e6c30a710c3e2ba879d3
```

The project documentation already notes that the GitHub JPEG is a copy rather than the original source. Therefore hash inequality alone is not the blocker; the blocker is that the current repository copy cannot be decoded into a reliable visible baseline.

A search of accessible conversation/Library image files for the original S00 baseline returned no usable result.

## Candidate input

The verified candidate pairwise screenshot exists and is valid:

```text
dixios-loop/screenshots/iterations/S00/attempt-1/candidate-baseline-size.png
1084×292
```

The candidate is not judged because the opposing baseline input is invalid.

## Pairwise result

```text
PASS A: NOT RUN
PASS B: NOT RUN
judge_pass_order_a: unchanged (false)
judge_pass_order_b: unchanged (false)
visually_better_than_baseline: unchanged (false)
phase: unchanged (VISUAL_JUDGE)
```

No visual failure route is assigned because no valid pairwise judgment occurred.

## Required recovery

Restore the exact original S00 baseline screenshot (the source corresponding to SHA-256 `e42bfaf...`) as a decodable image at the locked baseline path, or otherwise make that exact original accessible to the judging run. Then rerun only `S00 — VISUAL_JUDGE`.
