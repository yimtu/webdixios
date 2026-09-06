# S00 HERO — VERIFY / ATTEMPT 01

**Run date:** 2026-09-05 local / 2026-09-06 UTC CI  
**Candidate implementation commit:** `472146b660b63f6b4be3ab3c2c6e8b32a0cb6ea5`  
**Branch verified:** `loop/S00-hero`  
**Phase result:** `TECH_FAIL`  
**Reason:** the repository has no valid root `package-lock.json` or `npm-shrinkwrap.json`, while `MASTER.md` explicitly requires `npm ci` and declares missing lockfile a technical failure.

## Contract gate

`dixios-loop/MASTER.md` requires a clean install with:

```bash
npm ci
npm run build
```

and states:

```text
If no valid lockfile exists: TECH_FAIL
```

At verification time, `package.json` exists on the candidate branch but `package-lock.json` does not. Therefore the clean/reproducible install gate cannot be satisfied and this candidate must route back to BUILD. It must not be sent to VISUAL_JUDGE.

## Official evidence checked

### OFFICIAL — npm CLI v11 docs

Checked 2026-09-05:

- `npm ci`: https://docs.npmjs.com/cli/v11/commands/npm-ci/
- `package-lock.json`: https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/

Relevant conclusions:

- `npm ci` requires an existing `package-lock.json` or `npm-shrinkwrap.json`.
- `npm ci` exits instead of rewriting a lockfile when it is out of sync with `package.json`.
- npm documents `package-lock.json` as intended to be committed to source control so deployments and CI install the same dependency tree.
- lockfile v3 is the normal format for npm v9+.

### OFFICIAL / MAINTAINER — actions/setup-node

Checked 2026-09-05:

- https://github.com/actions/setup-node
- https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md

The maintainers explicitly recommend committing `package-lock.json` and using `npm ci` in CI. Their npm cache examples also key from the committed lockfile.

## Real developer experience checked

### COMMUNITY — npm/cli issues, current 2026 reports

- npm/cli #9358 (May 2026): a developer reproduced cases where `npm install` on npm 11 could emit a lockfile that an immediate `npm ci` rejected; their working workaround was a second `npm install --package-lock-only` pass before `npm ci`.
  https://github.com/npm/cli/issues/9358

- npm/cli #9846 (Aug 2026): a developer demonstrated version-sensitive `npm ci` behavior for optional dependencies: npm 11.13 accepted a generated lock while npm 11.16 / 12.0.2 rejected it.
  https://github.com/npm/cli/issues/9846

These issues do not prove Dixios has those dependency bugs. They do show why the repair should generate and validate the lockfile with the same npm family used by CI rather than hand-authoring or generating it under an arbitrary npm version.

### COMMUNITY — Stack Overflow practitioner reports

- Multiple developers resolving this `npm ci` class of failure report success by generating/synchronizing the lockfile with `npm install --package-lock-only`, committing it, and then rerunning `npm ci`.
  https://stackoverflow.com/questions/69984660/npm-ci-can-only-install-packages-with-an-existing-package-lock-json-or-npm-shrin

- Other reports identify mismatched Node/npm versions or hidden `.npmrc` flags such as `legacy-peer-deps` as causes of lockfile/CI divergence, reinforcing that install flags and tool versions should match between generation and CI.
  Same thread above; also https://stackoverflow.com/questions/73330206/github-actions-npm-error-package-lock-json-file-was-created-with-an-old-version

Evidence classification: community/practitioner experience, not authoritative specification.

## Supplemental GitHub Actions smoke build

A draft PR was opened only to trigger the repository's existing `pull_request` build job. It was not merged and does not authorize deployment.

Workflow run: `34010493376`  
Result: `success`  
Environment reported by GitHub Actions:

```text
Ubuntu 24.04.4
Node v22.23.2
npm 10.9.8
```

The existing workflow uses `npm install --no-audit --no-fund`, so this is deliberately **not** accepted as the MASTER clean-install gate.

Smoke evidence:

```text
npm install: added 201 packages in 24s
astro build: PASS
1 page built in 1.26s
Pages artifact: 406,184 bytes compressed archive
```

This isolates the failure: the candidate source compiles under the current CI environment, but dependency installation is not reproducible/frozen because the lockfile is absent.

## Artifact QA performed despite TECH_FAIL

The successful smoke artifact was downloaded and inspected with Chromium at DPR 1. This is diagnostic evidence only; because the clean-install gate failed, these captures are not promoted to `screenshots_ready` and are not eligible for VISUAL_JUDGE.

### Rendering / console

```text
desktop 1440×900: rendered; no console/page errors observed
laptop 1280×800: rendered; no console/page errors observed
mobile 390×844: rendered; no console/page errors observed
reduced motion 1084×800: rendered directly in resolved state
fixed candidate crop 1084×292: captured diagnostically
```

All in-page anchor href targets existed in the compiled DOM.

### Overflow

S00 itself did not overflow horizontally at desktop, tablet or mobile widths.

At 768px the **whole document** measured `922px` wide, but the overflow offenders were outside S00, principally `.cap-heading-note` in the capabilities section (S02). The S00 hero itself measured `768px` scroll width with no overflowing descendants. This pre-existing lower-section issue is recorded but is not attributed to S00 in this verification.

### Reduced motion

At `prefers-reduced-motion: reduce`, S00 reached:

```text
hero hero-enhanced is-resolved
--focus-scale: 1.0000
--focus-opacity: 1.0000
```

No motion-dependent semantic state was lost in the diagnostic render.

### GPU fallback

The QA Chromium environment did not expose WebGL, so the actual GPU/Cobe rendering path could not be benchmarked in this local diagnostic pass. A synthetic `webglcontextlost` event was used to exercise the project-owned fallback handler.

Observed fallback state:

```text
canvas hidden = true
hero classes include gpu-fallback + is-resolved
focus scale = 1.0000
focus opacity = 1.0000
```

The authored CSS resolution field remains visible. A later successful VERIFY should still exercise the actual WebGL path in a GPU/WebGL-capable browser environment.

## Transfer / bundle diagnostics

Compiled artifact sizes:

```text
JS   raw 131,945 B / gzip 51,840 B
CSS  raw  33,698 B / gzip  8,937 B
HTML raw 1,173,910 B / gzip 345,284 B
```

The principal JS chunk is well under the S00 technical-research soft target of 180 KB gzipped. The large HTML payload is dominated by page-wide inline content including lower sections and is not treated as an S00-only regression in this atomic verification.

## Audit status

`npm audit` was not accepted as completed for the candidate because npm's normal audit workflow expects a dependency lock, and the repository has none. The existing smoke workflow also runs install with `--no-audit`.

Do not use `npm audit --no-package-lock` as a substitute for the frozen-tree gate; npm documentation warns that without a lock the dependency tree can vary between runs.

## Gate checklist

```text
[FAIL] CLEAN npm ci — impossible: no committed lockfile
[PASS, supplemental only] source compiles using npm install
[PASS, diagnostic] no S00 console/page errors observed
[PASS, diagnostic] no S00 horizontal overflow
[PASS, diagnostic] desktop render
[PASS, diagnostic] tablet S00 layout contained
[PASS, diagnostic] mobile render
[PASS, diagnostic] reduced-motion resolved state
[PARTIAL] GPU fallback handler exercised; real WebGL path unavailable in local QA Chromium
[PASS] primary JS chunk 51.8 KB gzip < 180 KB S00 soft target
[NOT COMPLETE] npm audit against frozen tree
```

Overall:

```text
technical_pass = false
screenshots_ready = false
phase = BUILD
```

## Exact repair recommended for the next BUILD

Do not hand-write a lockfile.

Use a networked environment matching the current CI toolchain as closely as practical:

```text
Node 22.23.2
npm 10.9.8
```

Then:

```bash
rm -rf node_modules
npm install --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci --no-audit --no-fund
npm run build
npm audit
```

If lock generation or `npm ci` exposes peer-dependency/config issues, inspect `.npmrc` and generation flags before changing dependencies. If an npm-version-specific lock writer bug appears, re-run a package-lock-only pass and keep generation + CI on the same npm version, following the npm/cli 2026 practitioner evidence above.

Commit the resulting root `package-lock.json` only after the immediate `npm ci` validation passes. No dependency upgrade is required merely to fix this gate.
