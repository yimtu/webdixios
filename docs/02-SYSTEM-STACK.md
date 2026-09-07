# SYSTEM STACK — “Un sistema para mejores decisiones”

## Objective

Recreate the reference exploded-layer diagram as a real stacked system rather than a static illustration.

This block should remain mostly DOM/SVG. Do not reach for WebGL unless a specific sub-element cannot be expressed cleanly in SVG.

## Best reusable base

### Codrops — On-Scroll 3D Stack Motion Effect

Article:
https://tympanus.net/codrops/2024/03/06/on-scroll-3d-stack-motion-effect/

Repository:
https://github.com/codrops/3DStackMotion

What to reuse:
- stacked depth logic;
- scroll-linked separation;
- transform orchestration;
- perspective setup;
- enter/exit choreography.

What to replace:
- cards/images;
- original colors;
- original typography;
- any borrowed decorative identity.

Target adaptation:
- five rhombus/isometric SVG planes;
- each plane contains custom linework/map/network detail;
- vertical node axis on the right;
- legend aligned to six semantic labels.

## Alternative reusable base

### Aceternity — Stacked Isometric Boxes

Feature sections collection:
https://ui.aceternity.com/feature-section

Use as an implementation reference for:
- isometric face construction;
- layered SVG/DOM geometry;
- hover/motion mechanics;
- responsive stacking.

Treat Aceternity styling as disposable. Keep only mechanics.

## GSAP documentation

### ScrollTrigger
https://gsap.com/docs/v3/Plugins/ScrollTrigger/

Use for:
- section activation;
- scrubbed depth separation;
- optional pinning;
- deterministic labels/timeline states.

### DrawSVG
https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/

Use for:
- drawing connection lines;
- revealing network paths inside planes;
- vertical semantic axis reveal.

### MorphSVG
https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/

Use only if one internal path truly needs to morph between states.

Avoid gratuitous morphing.

## SVG map/network choreography

Codrops SVG collection:
https://tympanus.net/codrops/hub/tag/svg/

Study specifically:
- scroll-driven map animations;
- path reveals;
- mask transitions;
- motion-path techniques.

Use those techniques to build the internal graphics of each plane.

## DOM connection option

### Magic UI Animated Beam

Docs:
https://magicui.design/docs/components/animated-beam

Use only for the connection primitive if helpful:
- DOM-to-DOM path geometry;
- animated directional flow;
- responsive recalculation.

Restyle completely:
- remove glossy AI-tool look;
- use 1px hairlines;
- no gradients unless subtle;
- minimal pulse.

## CSS 3D considerations

MDN `transform-style`:
https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style

Remember:
- `preserve-3d` only works while ancestor/grouping properties do not flatten the 3D context;
- filters, masks, opacity/grouping can change flattening behavior;
- keep the perspective container simple.

## Target plane semantics

Suggested five planes:

1. **Personas** — points/paths indicating actors.
2. **Instituciones** — zones/nodes/organizational boundaries.
3. **Datos** — raster/grid/data connections.
4. **Procesos** — directional routes/workflow paths.
5. **Territorio** — spatial/map geometry.

Right-side legend may include a sixth conceptual outcome:

6. **Resultados** — output node / measurable state.

## Recommended implementation sequence

1. Match static geometry to reference.
2. Build each plane as standalone SVG.
3. Stack with CSS transforms.
4. Match reference spacing at final state.
5. Add GSAP timeline that starts compressed and resolves to final spacing.
6. Add internal path reveals only after the final still frame matches.
7. Add visual regression screenshot.

## Do not do

- no Three.js for this block;
- no fake dashboard charts;
- no random nodes with no semantic meaning;
- no glass cards;
- no rounded SaaS cards;
- no bloom/neon overuse;
- no continuous looping animation after the section settles.

## Acceptance criteria

- final stacked composition closely matches reference geometry;
- each plane is visually distinct but part of one system;
- legend aligns cleanly;
- the section is understandable even with motion disabled;
- motion explains assembly/disassembly rather than decorating it;
- no layout shift when scripts initialize.
