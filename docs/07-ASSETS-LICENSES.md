# ASSETS / LICENSES — Adoption Guide

## Purpose

Avoid unnecessary 3D modeling and avoid licensing mistakes.

This file is not legal advice. Always verify the current license on the original asset/repository page before shipping.

## Quaternius

Downtown City MegaKit:
https://quaternius.com/packs/downtowncitymegakit.html

General site:
https://quaternius.com/

Recommended use:
- modular downtown geometry;
- focal/non-focal building families;
- quick skyline assembly;
- glTF asset pipeline.

Quaternius commonly publishes CC0 asset packs. Verify the specific pack page/license at adoption time and preserve a local license record in the repo.

Suggested documentation practice:

`licenses/quaternius-downtown-city-megakit.txt`

Include:
- source URL;
- download date;
- license text or license URL;
- pack version/name.

## Kenney

City Kit Commercial:
https://kenney.nl/assets/city-kit-commercial

City Kit Roads:
https://kenney.nl/assets/city-kit-roads

General assets:
https://kenney.nl/assets

Recommended use:
- lightweight urban meshes;
- road/prop geometry;
- fallback/mobile assets;
- repetitive low-poly structures where silhouette matters more than fine detail.

Kenney commonly distributes assets under CC0. Verify the pack page/license at download time and retain the license record.

## SynthCity

Repo:
https://github.com/jeffbeene/synthcity

Use primarily as an engineering reference/project base.

Before copying code/assets:
- inspect repository `LICENSE`;
- inspect whether bundled 3D assets have separate provenance/licenses;
- do not assume repo code license automatically covers every third-party asset.

## pmndrs ecosystem

Examples:
https://github.com/pmndrs/examples

Drei:
https://github.com/pmndrs/drei

meshline:
https://github.com/pmndrs/meshline

React Postprocessing:
https://github.com/pmndrs/react-postprocessing

For each adopted package or copied demo:
- record package version;
- record source path/demo name;
- retain license attribution if required;
- avoid copying unrelated demo assets with unclear rights.

## Codrops demos

3D Stack Motion:
https://github.com/codrops/3DStackMotion

Article:
https://tympanus.net/codrops/2024/03/06/on-scroll-3d-stack-motion-effect/

Codrops commonly publishes demo source with permissive licenses, but verify the actual repository license for each demo. Treat article imagery/fonts/assets separately from code when their rights differ.

## Aceternity / Magic UI

Aceternity:
https://ui.aceternity.com/

Magic UI:
https://magicui.design/

These are component ecosystems. Verify current terms for:
- free components;
- paid/pro blocks;
- redistribution restrictions;
- whether source may be copied into a commercial project.

Do not assume all visually accessible demos share one license.

## Fonts

Do not copy font files from design references or third-party demos without explicit licensing.

Prefer:
- system stacks;
- properly licensed webfonts;
- project-owned fonts.

Keep font licenses in `licenses/`.

## Asset provenance checklist

For every downloaded asset, record:

- asset name;
- source URL;
- author/publisher;
- license;
- attribution requirement;
- modification allowed?;
- commercial use allowed?;
- redistribution allowed?;
- date downloaded;
- local file path.

## Recommended repo structure

```text
assets/
  3d/
  textures/
  hdr/
licenses/
  README.md
  quaternius-*.txt
  kenney-*.txt
  third-party-code-*.txt
```

## Rule

If license status is unclear, do not ship the asset. Replace it with a clearly licensed equivalent.
