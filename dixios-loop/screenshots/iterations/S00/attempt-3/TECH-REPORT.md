# S00 HERO — VERIFY / ATTEMPT 03

**Candidate:** `334173e729053f16676033d1b3b2aeef4f3cf798`  
**Environment:** Ubuntu 24.04 / Node 22.23.2 / npm 10.9.8 / Chromium via Playwright 1.55.0 / DPR 1  
**GitHub Actions run:** `34015056082`  
**Result:** TECH_PASS

## Supply chain

- `npm ci`: PASS
- `npm audit`: PASS
- `npm run build`: PASS

## Browser gate

- S00 isolated horizontal overflow: PASS
- Console errors: 0
- Network/HTTP errors: 0
- Hero anchors: PASS
- Unlabeled territorial focus: PASS
- Focus substantially inside Hero crop: PASS
- Reduced motion: PASS
- Save-Data fallback: PASS
- WebGL render path: PASS
- WebGL context-loss fallback: PASS
- Offscreen pause/resume: PASS

## Performance

- Initial JS gzip: 50.8 KiB
- Avg scripting / 60fps frame: 0.055 ms
- Avg total task / 60fps frame: 0.231 ms
- Estimated headroom: 16.439 ms
- CLS: 0

SwiftShader is used only to exercise a deterministic WebGL-capable CI path; it is not a production GPU benchmark. Visual taste is not evaluated in VERIFY.
