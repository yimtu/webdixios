# MEXICO / TERRITORY — Implementation Guide

## Objective

Render a real Mexico silhouette with state-aware geometry and a Dixios dot-density treatment.

Do not draw the country by hand and do not use a raster map.

## Primary source: @webrek/mx-geo

Repository:
https://github.com/webrek/mx-geo

This package provides:
- 32-state catalog keyed by INEGI identifiers;
- TopoJSON derived from INEGI geometry;
- framework-free core data/helpers;
- SVG rendering helpers;
- municipality drill-down support loaded on demand;
- labels/centroids and map-related helpers.

The project README should be treated as the canonical package guide.

## Recommended integration

Prefer framework-free SVG output inside Astro rather than adding React just for this block.

Workflow:

1. import Mexico/state geometry from `@webrek/mx-geo`;
2. generate SVG paths at build/render time;
3. retain `data-cve`/state identity when possible;
4. apply custom `<pattern>`, `<clipPath>` or `<mask>` layers;
5. style with Dixios blue/cyan/magenta/coral accents.

## Dot-density references

### Andrew Woodruff dot-density gist

https://gist.github.com/awoodruff/94dc6fc7038eba690f43

Use as a reference for:
- distributing many points inside polygon geometry;
- point-in-polygon checks;
- density rendering architecture;
- Canvas/D3/TopoJSON workflows.

Do not copy data semantics that do not belong to Dixios.

### Observable dot-density example

https://observablehq.com/@aboutaaron/racial-demographic-dot-density-map

Use as a reference for:
- forkable notebook structure;
- density distribution;
- legend/data mapping concepts.

Verify notebook/license metadata before shipping copied code.

## SVG primitives

### Pattern
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern

Use for:
- repeating dot fields;
- line fields;
- small squares.

### ClipPath
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath

Use to constrain color overlays or patterns to Mexico/state geometry.

### Mask
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask

Use for:
- reveals;
- gradient/pattern transitions;
- animated territorial activation.

## Scroll/reveal references

Codrops SVG hub:
https://tympanus.net/codrops/hub/tag/svg/

Study their scroll-driven SVG and mask demos for:
- path reveal;
- mask choreography;
- section-controlled progression.

Use GSAP only if the reveal meaningfully improves the narrative.

## Target visual construction

Recommended layering:

1. base Mexico paths in deep/electric blue;
2. dot pattern clipped to the country;
3. selected cyan/magenta/coral vertical or diagonal activation bands clipped to geometry;
4. sparse node highlights;
5. optional state-border hairline at very low contrast.

The map must not become a conventional choropleth unless actual data calls for it.

## Target copy/stat structure

Left:
- eyebrow;
- headline;
- short supporting copy;
- action link.

Center:
- Mexico visual.

Right:
- 32 estados;
- 2,475 municipios;
- one broader narrative line, if approved by content.

The first two counts should come from verified geographic/package sources rather than invented display data.

## Do not use

- hand-drawn Mexico approximations;
- static PNG/SVG screenshots exported from design tools if code geometry exists;
- MapLibre/deck.gl for this purely editorial block;
- fake heatmaps;
- fake live metrics.

## Future escalation

If a future operational page needs actual interactive geography, then evaluate:

- MapLibre GL JS: https://maplibre.org/maplibre-gl-js/docs/
- deck.gl: https://deck.gl/docs/

Those are not required for the reference homepage block.

## Acceptance criteria

- geometry is Mexico, not an approximation;
- dot/pattern treatment remains crisp at desktop and mobile;
- state geometry remains technically addressable;
- no external map API/token required for the homepage;
- all animation can be disabled without losing meaning;
- SVG remains responsive and accessible.
