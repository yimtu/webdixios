# S00 HERO — BUILD / ATTEMPT 03

**Candidate:** `334173e729053f16676033d1b3b2aeef4f3cf798`  
**Previous candidate:** `62535a5ac5984fa61879d00323e42248ee18363f`  
**Result:** BUILD_PASS / ready for VERIFY

## Diagnosis carried from Visual Judge

Attempt 02 fixed the crop and removed the country-name label, but the enlarged territorial form still read like a glowing translucent sticker pasted over the globe. The failure came from three implementation choices acting together:

1. large bright dots with almost full opacity;
2. an independent translucent fill and drop-shadow inside the silhouette;
3. a second surrounding ellipse/orbit with enough contrast to make the focus read as a detached panel.

The baseline instead distributes emphasis across one coherent globe plus surrounding editorial signals.

## Research applied in this BUILD

### COBE official / maintainer evidence

- Current COBE docs expose globe-level visual controls (`mapSamples`, `mapBrightness`, `baseColor`, `glowColor`, markers/arcs) but do not expose a first-class country-fill API. The official positioning model for DOM additions is compositional/progressive enhancement around the canvas rather than arbitrary polygon fills inside the globe.
- COBE 2.0.1 remains the current pinned release used by the project. Recent COBE issues also show that marker and WebGL behavior is still evolving, so this attempt deliberately avoids a dependency upgrade or undocumented shader patch.

Sources:
- https://github.com/shuding/cobe
- https://github.com/shuding/cobe/releases
- https://github.com/shuding/cobe/issues

### CSS compositing / masking

MDN documents `mix-blend-mode` as the mechanism for blending an element with its backdrop in the same stacking context, `isolation` as the control for containing that compositing context, and `mask-image` as a supported way to modulate alpha with generated gradients. Those primitives fit the approved progressive-enhancement architecture without introducing a new rendering library.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image

## Attempt 03 implementation

- Added `src/styles/s00-attempt3.css` as a narrow override layer.
- Kept the attempt-02 territorial size class but reduced it slightly instead of enlarging again.
- Removed opaque/translucent territorial fill and all drop-shadow glow from the focus.
- Rebuilt the focus as very fine dot texture on transparent background so the underlying COBE globe remains visible.
- Applied radial alpha masking so the dot field fades like a sphere-lit surface instead of ending at uniform intensity.
- Used `mix-blend-mode: screen` inside an isolated `.hero-visual` stacking context so the focus visually fuses with the globe behind it.
- Reduced the outer orbit to one low-contrast ellipse plus a thin signal line.
- Demoted module A, module B, chrome signal, ASCII legend, and stencil opacity so they frame rather than compete with the territorial focus.
- Preserved the no-country-name rule.
- Preserved existing finite RESOLVE motion, reduced-motion behavior, Save-Data fallback, WebGL lifecycle, and DPR limits; no JS/runtime changes were needed.
- Kept the short 1084×292 comparison viewport supported without making the focus larger.

## Build smoke

Temporary draft PR `#5` exercised the existing pull_request workflow against the exact candidate commit.

```text
run: 34014235803
Install dependencies: PASS
Build site: PASS
Upload Pages artifact: PASS
Deploy: SKIPPED
```

PR #5 was closed without merge. No deploy/DNS/domain changes were made.

## Next phase

`VERIFY`
