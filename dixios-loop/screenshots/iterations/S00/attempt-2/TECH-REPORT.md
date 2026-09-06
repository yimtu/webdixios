# S00 HERO — VERIFY / ATTEMPT 02

**Candidate:** `62535a5ac5984fa61879d00323e42248ee18363f`  
**Environment:** Ubuntu 24.04 / Node 22.23.2 / npm 10.9.8 / Chromium via Playwright 1.55.0 / DPR 1  
**GitHub Actions run:** `34013701362`  
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
- Unlabeled territorial focus (no country name in Hero): PASS
- Focus substantially inside Hero crop: PASS
- Reduced motion: PASS
- Save-Data fallback: PASS
- WebGL render path: PASS
- WebGL context-loss fallback: PASS
- Offscreen pause/resume: PASS

## Performance

- Initial JS gzip: 50.8 KiB (soft target <= 180 KiB)
- Avg scripting / 60fps frame: 0.086 ms
- Avg total task / 60fps frame: 0.265 ms
- Estimated main-thread headroom: 16.405 ms
- CLS: 0

The SwiftShader renderer is used only to exercise a deterministic WebGL-capable CI path; it is not treated as a production-GPU benchmark. Visual taste is intentionally not evaluated in VERIFY.
