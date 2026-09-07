# DIXIOS — Reuse Atlas

This file maps the target homepage subsystems to reusable implementations that already exist.

## Reuse scale

- **R0** — inspiration only.
- **R1** — inspect/reconstruct technique.
- **R2** — reusable snippet/component.
- **R3** — reusable scene/shader/component/asset.
- **R4** — runnable/clonable project.

## Target-to-source map

| Target feature | Recommended reusable base | Level | What to reuse | What stays custom |
|---|---|---:|---|---|
| Cyberpunk institutional city | SynthCity | R4 | city architecture, procedural placement patterns, scene organization | Dixios skyline composition, palette, focal towers, copy |
| R3F city / examples ecosystem | pmndrs/examples | R4 | complete runnable scenes and implementation patterns | final art direction |
| Modular buildings | Quaternius Downtown City MegaKit | R4 Asset | modular glTF building parts and assembled buildings | materials, lighting, composition |
| Extra urban buildings | Kenney City Kit Commercial | R4 Asset | CC0 city meshes | Dixios styling |
| Roads / urban props | Kenney City Kit Roads | R4 Asset | road pieces / signs / urban geometry | neon treatment and flow |
| Neon routes | pmndrs/meshline | R3 | thick WebGL line primitive, dashes, animated offsets | route topology and color language |
| Glow / emissive treatment | react-postprocessing Bloom | R3 | selective bloom pipeline | restrained thresholds/intensity |
| Floating labels on 3D | Drei `<Html>` | R3 | HTML anchored to 3D positions | typography, borders, label semantics |
| Repeated buildings | Drei `Instances` | R3 | instancing abstraction | asset selection and distribution |
| Repeated GLTF submeshes | Drei `Merged` | R3 | merged/instanced imported meshes | layout and scene graph |
| Exploded 5-layer system | Codrops 3D Stack Motion | R4 | scroll-linked stacked-depth behavior | rhombus geometry, internal graphics, legend |
| Isometric stack alternative | Aceternity Stacked Isometric Boxes | R3 | SVG/isometric stacking behavior | Dixios visuals and copy |
| Animated map/network paths | Codrops SVG/GSAP demos | R3–R4 | DrawSVG/MotionPath choreography | institutional semantic structure |
| DOM connection beams | Magic UI Animated Beam | R3 | geometry and animation mechanism | minimal Dixios hairline appearance |
| Five capability columns | Aceternity feature blocks | R3 | responsive grid/border/hover skeleton | icons, typography, no-SaaS art direction |
| Dot/grid decorative motifs | Magic UI patterns | R3 | SVG generation/animation patterns | exact Dixios primitives |
| Microinteraction snippets | Motion Examples | R3 | production interaction patterns | selection and restraint |
| Real Mexico geometry | `@webrek/mx-geo` | R4 | INEGI-based TopoJSON/SVG, state/municipality data | dot-density styling |
| Mexico dot-density | Andrew Woodruff dot-density gist / Observable notebook | R4 | point-in-polygon / distribution pattern | data semantics and Dixios palette |
| SVG map reveal | Codrops SVG mask transitions | R3–R4 | mask/scroll implementation | Mexico paths and brand treatment |
| Publication cards | simple blog grid pattern | R3 | responsive editorial grid | article design and content |
| Navbar | classic navbar pattern | R3 | responsive skeleton/accessibility | Dixios styling |
| Footer | centered footer pattern | R3 | responsive structure | Dixios composition/motifs |

## Primary repositories and docs

### Three / R3F / city

- SynthCity: https://github.com/jeffbeene/synthcity
- pmndrs examples: https://github.com/pmndrs/examples
- React Three Fiber docs: https://r3f.docs.pmnd.rs/
- Drei docs: https://drei.docs.pmnd.rs/
- meshline: https://github.com/pmndrs/meshline
- React Postprocessing: https://react-postprocessing.docs.pmnd.rs/

### Stack / SVG / motion

- Codrops 3D Stack Motion article: https://tympanus.net/codrops/2024/03/06/on-scroll-3d-stack-motion-effect/
- 3D Stack Motion repo: https://github.com/codrops/3DStackMotion
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP DrawSVG: https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/
- GSAP MorphSVG: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/
- Motion examples: https://motion.dev/examples

### Mexico

- mx-geo: https://github.com/webrek/mx-geo
- Dot-density example gist: https://gist.github.com/awoodruff/94dc6fc7038eba690f43
- Observable dot-density example: https://observablehq.com/@aboutaaron/racial-demographic-dot-density-map

### Assets

- Quaternius Downtown City MegaKit: https://quaternius.com/packs/downtowncitymegakit.html
- Kenney City Kit Commercial: https://kenney.nl/assets/city-kit-commercial
- Kenney City Kit Roads: https://kenney.nl/assets/city-kit-roads

### QA

- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Pixelmatch: https://github.com/mapbox/pixelmatch

## Decision rule

Before adding a new dependency or custom subsystem:

1. Run the closest existing demo locally.
2. Verify its license from the original repository/source.
3. Confirm it solves at least 60% of the engineering problem.
4. Extract only the reusable primitive.
5. Restyle/recompose until no borrowed visual identity remains.
6. Add deterministic screenshot coverage before final motion polish.
