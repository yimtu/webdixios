# HERO CITY — Implementation Guide

## Objective

Recreate the reference hero as a real interactive 3D city rather than a raster background.

The engineering goal is not to invent a city renderer from scratch. Use existing reusable scene/code/assets, then concentrate custom work on composition, lighting, palette and narrative labels.

## Recommended stack

- Astro shell
- React island for R3F hero
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`
- `meshline`
- modular glTF city assets

## Reusable bases

### 1. SynthCity — complete cyberpunk city reference/project

Repository:
https://github.com/jeffbeene/synthcity

Portfolio/background:
https://jeff-beene.com/portfolio/synthcity/

Use it to study:
- city scene organization;
- procedural building placement;
- atmosphere/fog;
- emissive billboard/urban-light treatment;
- navigation/camera decisions;
- asset-vs-procedural split.

Do **not** copy its visual identity. Extract engineering patterns only.

### 2. pmndrs/examples — runnable R3F scenes

Repo:
https://github.com/pmndrs/examples

Live examples root:
https://pmndrs.github.io/examples/

Useful for:
- runnable scene architecture;
- instancing;
- annotations;
- postprocessing;
- shaders;
- camera interaction;
- GLTF asset integration.

The repo is intended to be cloned/remixed demo-by-demo.

### 3. React Three Fiber docs

https://r3f.docs.pmnd.rs/

Read before adoption:
- Canvas lifecycle;
- hooks;
- performance pitfalls;
- loading assets;
- event system;
- frameloop strategy.

### 4. Drei

Docs:
https://drei.docs.pmnd.rs/

Specific helpers:

#### HTML labels
https://drei.docs.pmnd.rs/misc/html

Use for `PERSONAS`, `DATOS`, `INSTITUCIONES`, `DECISIONES`, `TERRITORIO`, `RESULTADOS` anchored to 3D points without manually projecting coordinates.

#### Instances
https://drei.docs.pmnd.rs/performances/instances

Use for repeated building/prop families where one geometry/material is reused many times.

#### Merged
https://drei.docs.pmnd.rs/performances/merged

Use for imported GLTF scenes containing repeated submeshes that can be instanced/merged efficiently.

## City assets

### Quaternius Downtown City MegaKit

https://quaternius.com/packs/downtowncitymegakit.html

Use for:
- modular downtown buildings;
- assembled buildings;
- urban detail without hand-modeling everything.

Important: verify current license on source page before shipping. Quaternius commonly publishes CC0 packs, but always verify the specific pack.

### Kenney City Kit Commercial

https://kenney.nl/assets/city-kit-commercial

Use for:
- skyscrapers;
- commercial building variation;
- simple geometry suitable for instancing.

### Kenney City Kit Roads

https://kenney.nl/assets/city-kit-roads

Use for:
- road geometry;
- signs;
- street props;
- block-layout helpers.

Kenney assets are commonly CC0; verify the pack page/license at adoption time.

## Neon infrastructure routes

### meshline

Repo:
https://github.com/pmndrs/meshline

Use instead of basic Three line primitives when needing:
- thick screen-consistent lines;
- animated dash offset;
- route textures;
- variable widths;
- glowing cyan/magenta infrastructure routes.

Recommended use:
- 1 dominant cyan arterial route;
- 1 secondary electric-blue route;
- sparse magenta/coral information routes;
- optional moving pulses via dash offset/texture animation.

## Bloom / glow

### React Postprocessing

Docs root:
https://react-postprocessing.docs.pmnd.rs/

Bloom:
https://react-postprocessing.docs.pmnd.rs/effects/bloom

Use selective bloom for:
- emissive windows;
- neon routes;
- limited rooftop nodes.

Do not bloom the entire scene. Keep copy/UI out of the postprocessing pass when possible.

## Three.js primary docs

### InstancedMesh
https://threejs.org/docs/#api/en/objects/InstancedMesh

### GLTFLoader
https://threejs.org/docs/#examples/en/loaders/GLTFLoader

### MeshStandardMaterial
https://threejs.org/docs/#api/en/materials/MeshStandardMaterial

### Responsive rendering / DPR
https://threejs.org/manual/en/responsive.html

### Cleanup / disposal
https://threejs.org/manual/en/cleanup.html

## Recommended architecture

### Scene split

**Focal skyline**
- 6–12 manually placed landmark towers;
- hand-tuned silhouette against the reference;
- unique emissive accents.

**Urban fabric**
- repeated building families via Instances/Merged;
- deterministic seeded placement;
- lower detail than focal skyline.

**Infrastructure**
- meshline routes;
- selected street mesh assets;
- limited animated pulses.

**Atmosphere**
- fog;
- subtle particles only if needed;
- restrained bloom.

**Labels**
- Drei `<Html>` anchored to chosen objects/points.

## Determinism requirement

Visual QA needs the exact same frame every time.

Use:
- seeded PRNG;
- fixed camera in QA mode;
- fixed animation time in QA mode;
- no unseeded `Math.random()`;
- no mouse-parallax in screenshot tests.

## Performance order of operations

If the hero is slow, reduce in this order:

1. postprocessing quality;
2. device pixel ratio;
3. secondary building count;
4. secondary lights;
5. particles;
6. far-distance decoration.

Do not remove the focal skyline first.

## Acceptance criteria

- skyline mass and horizon feel close to reference;
- road curves read from first glance;
- clear empty zone behind copy;
- cyan/magenta/coral distributed intentionally;
- labels remain readable at target viewport;
- deterministic screenshot output;
- no runtime console errors;
- no obvious memory/resource leak after navigation/unmount.
