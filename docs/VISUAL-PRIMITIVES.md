# Dixios: visual primitives

## Direction and reference

Primary art reference: `ChatGPT Image Sep 7, 2026, 01_42_51 AM.png` at the repository root. The implementation uses its isometric blue/cyan volumes, coral innovation accent, layered violet consulting artwork, rising violet training columns, and multidisciplinary network. No raster decoration is shipped.

Read alongside `10-CAPABILITIES-VISUAL-RESOURCE-LIBRARY.md` and `11-ASCII-TEXTMODE-VISUAL-SYSTEM.md`. Those research documents suggest exploratory libraries, while the current approved image and latest brief determine the final composition. Large textmode, graph-editor, and chart runtimes would not improve these small, fixed visual compositions; static-first SVG preserves sharpness without hydration.

## Source investigation and reuse

Verified on 2026-09-07:

- [Magic UI Animated Beam source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-beam.tsx): inspected its two overlaid SVG paths, moving signal, and responsive connection geometry.
- [Magic UI license](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md): MIT, copyright Magic UI. A notice is retained in `licenses/MAGIC-UI-MIT.txt`.

The useful engineering primitive is a quiet connection track with a separately moving high-contrast signal. Dixios adapts that primitive using normalized `pathLength="100"`, a short dash, and CSS stroke-offset animation. Fixed SVG coordinates eliminate the original React references, `ResizeObserver`, state updates, and Motion dependency. This is an independently written reduced primitive, not a copy of Magic UI's component or visual design.

The original upstream React/Motion component was also executed in an isolated local prototype (`artifacts/research`, excluded from production and version control), with React 19.2.4, Motion 12.35.2 and a local `cn` class-joining shim. Chromium verified a nonempty connection path, changing gradient coordinates and zero page exceptions; `upstream-beam.png` records that run. The adapted CSS/SVG primitive is then exercised by the integrated page. No marketplace previews, example artwork, icon packs, or unverified assets are copied.

## Components

| Component | Engineering | Meaning |
| --- | --- | --- |
| `ServiceVisual`, kind 0 | Assembled blue isometric volumes and a traveling connector signal | Systems working together |
| `ServiceVisual`, kind 1 | Translucent cyan/blue planes, samples, thin connecting paths | Data becoming structured information |
| `ServiceVisual`, kind 2 | Blue supporting cubes with a raised coral core | A new public capability within a working system |
| `ServiceVisual`, kind 3 | Separated violet planes with a dark top plane | Evidence and layers of judgment |
| `ServiceVisual`, kind 4 | Six rising violet columns | Increasing institutional capability |
| `TeamVisual` | Named disciplines, central Dixios node, signal paths, geometric objects and abstract bars | Multidisciplinary collaboration |
| `PublicationArt` | Original programmatic vector compositions | Approved editorial topics without invented metadata |

Colors and gradients describe faces, material, depth, or information layers. They are not generic background effects. Services are decorative alongside their real headings and descriptions, with no link, cursor, or implied interaction. The team graphic exposes one accessible title/description; the visible names match the approved disciplines.

## Motion and performance

- No JavaScript or runtime graphics libraries in these components.
- Gentle translations are 3 px maximum, with 7–11 second cycles and offset phases.
- Team bar motion changes scale by at most 6%.
- Signals follow existing connection lines rather than adding particles.
- `prefers-reduced-motion: reduce` stops all animation without hiding content.
- An ancestor `[data-qa]` also freezes animation for consistent screenshots.
- SVG scales with its container and remains crisp at mobile DPR.
- Publication art remains still, preserving editorial reading comfort.
- At 600 px and below, the team switches to a separately composed 360 × 306 SVG: larger discipline labels, a central core, reduced cube/point count, and redistributed bars. This preserves legibility rather than shrinking the desktop diagram. Only the visible SVG enters the accessibility tree.

Final page-level viewport screenshots and browser checks are recorded with the implementation QA report; they must be run against the integrated page, not inferred from compilation.
