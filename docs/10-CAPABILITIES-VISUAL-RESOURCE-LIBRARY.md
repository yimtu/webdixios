# CAPABILITIES — EMBEDDABLE VISUAL RESOURCE LIBRARY

## Purpose

This document replaces the previous template-oriented research with a stricter rule:

> **Do not use full website templates as the design source for Capabilities.**
>
> Search for self-contained visual objects that can live inside the Dixios page: animated diagrams, node systems, charts, 3D scenes, interactive illustrations, textmode pieces, timelines and reusable graphic components.

The target is **code already converted into visual design**, not technical primitives that still require inventing the artwork from zero.

## Hard exclusions

Do not treat the following as default solutions for the Capabilities graphics:

- complete Framer/Webflow landing-page templates;
- generic SaaS feature cards;
- shader galleries as a visual answer by themselves;
- Matrix-rain / hacker-terminal clichés;
- commodity icon packs;
- dashboards when a single strong data object communicates the idea better;
- heavy Three.js builds when a lighter reusable component or exported asset can achieve the same result.

## Selection criteria

Prefer resources that are:

1. free and/or open source;
2. visually strong before customization;
3. easy to isolate as one component;
4. easy to restyle with Dixios typography/colors;
5. compatible with Astro directly or through a small React island;
6. animatable without large runtime cost;
7. exportable to SVG/video/static fallback where practical;
8. backed by a clear license.

---

# Priority shortlist

## 1. Development of systems — Magic UI Animated Beam

Primary reference:

- https://magicui.design/docs/components/animated-beam
- components index: https://magicui.design/docs/components

Why it fits:

- it is already a self-contained visual object, not a page template;
- it represents integration through moving paths between nodes;
- supports multiple inputs, outputs and bidirectional flow;
- the visual logic maps directly to legacy systems → integration → Dixios platform → data/users/operations;
- easy to recolor and strip of default SaaS iconography.

Recommended Dixios treatment:

- remove vendor logos;
- use institutional/system labels instead;
- reduce circles/cards and make the graph flatter, denser and more editorial;
- use one discrete Dixios accent color for moving signals;
- almost-static idle state, with movement becoming more visible on hover/focus or section entry.

Reuse level: **R2/R3** depending on final implementation.

License note: Magic UI publishes its component source openly; verify the repository/license at implementation time and preserve required notices.

### Alternative: React Flow

- https://reactflow.dev/
- https://reactflow.dev/examples

React Flow is MIT-licensed and useful when the graphic needs actual topology rather than a fixed illustration.

Use for:

- system architecture;
- integrations;
- process graphs;
- decision/evidence graphs;
- data pipelines.

Do **not** ship the default editor chrome. Keep only nodes, edges and motion.

---

## 2. Analysis and data management — Apache ECharts

Primary sources:

- https://echarts.apache.org/examples/en/index.html
- https://echarts.apache.org/
- https://github.com/apache/echarts

License: **Apache-2.0**.

The correct use is not a dashboard. Select one strong visualization object and let it occupy the composition.

Best candidate families:

- Sankey;
- graph/network;
- sunburst;
- treemap;
- parallel coordinates;
- heatmap;
- theme river / temporal flow.

Recommended first prototype: **Sankey or graph/network**.

Visual concept:

`fragmented sources → integration/cleaning → analysis → operational information → decisions`

Why it is strong:

- communicates transformation of information rather than generic analytics;
- can be animated subtly;
- can use real or plausible institutional structures later;
- Apache license is clear;
- renderer can remain live or the final approved composition can be captured/exported as a lightweight asset.

---

## 3. Public innovation — orbital / system-in-motion composition

### Discovery source: 21st.dev

- https://21st.dev/community/components

The strongest family found in research was the **radial/orbital timeline/system** idea: a central object with stages or capabilities arranged around it.

Possible Dixios semantics:

`understand → design → prototype → implement → measure → scale`

This communicates innovation as an operating cycle rather than using a lightbulb or generic “innovation” icon.

### Important 21st.dev reuse rule

Treat 21st.dev primarily as **visual discovery**, not as a blanket open-source license.

Current marketplace terms assign rights component-by-component and restrict reuse of marketplace previews/media. Therefore:

1. identify the exact component;
2. inspect its author/source repository;
3. verify the component's original license;
4. reuse code only when that source/license permits it;
5. never copy 21st preview images/videos into production.

If a clean reusable source cannot be verified, reconstruct the composition with our own implementation.

### OSS fallback: Magic UI Orbiting Circles

- https://magicui.design/docs/components/orbiting-circles

Useful because the orbital motion already exists and can be restyled into an institutional cycle without writing the motion system from zero.

---

## 4. Advisory — React Flow evidence/decision graph

Primary sources:

- https://reactflow.dev/
- https://reactflow.dev/examples

License: **MIT** for React Flow and its MIT examples; React Flow also publishes separate Pro examples, which must not be assumed free.

Recommended visual language:

`context + actors + data + constraints → judgement → scenarios / decision`

The finished piece should look like an editorial/system diagram, not a workflow-builder UI.

Keep:

- graph layout;
- connections;
- animated edges where useful;
- node hierarchy;
- custom node content.

Discard:

- toolbar;
- minimap;
- handles if not required;
- editor background;
- drag affordances in the final static presentation.

This is a strong candidate for a lightly animated graphic: one route activates, evidence nodes pulse once, and the decision node resolves.

---

## 5. Training — Orbiting Circles / propagation system

Primary OSS candidate:

- https://magicui.design/docs/components/orbiting-circles

Visual concept:

center = institutional capability

inner orbit = knowledge / methods / tools

outer orbit = teams / officials / areas

This expresses **knowledge transfer and propagation**, not “online course software”.

Recommended motion:

- slow orbital movement;
- one item transfers from center to outer ring;
- hover/focus can reveal a label;
- reduced-motion mode freezes the composition without losing meaning.

### Higher-aesthetic optional source: Rive Marketplace

- https://rive.app/marketplace/

Rive is valuable for small interactive illustrations and micro-scenes. Individual marketplace files commonly expose their license on the item page (many community examples are CC BY). Verify the exact file before adoption and retain attribution when required.

Use Rive only when the selected artifact is materially better than the OSS CSS/SVG/React alternative.

---

# Cross-capability visual arsenals

## Spline Community / Spline Viewer

- https://community.spline.design/
- https://viewer.spline.design/
- https://docs.spline.design/exporting-your-scene/web/exporting-as-spline-viewer

Spline is the preferred 3D shortcut when a capability needs a sculptural object rather than a diagram.

Advantages:

- scenes can be remixed;
- `<spline-viewer>` is a native web component;
- supports scroll/cursor/global interactions;
- community files expose licensing/remix rules.

Caveat:

- check the current Spline plan/export/watermark conditions before shipping;
- do not make the whole Capabilities section dependent on Spline;
- use it for one hero-grade object if it clearly wins visually.

## Rive

Use for:

- compact interactive illustrations;
- state-machine-like visual transitions;
- bento/card micro-scenes;
- learning/propagation visualizations;
- abstract but controllable motion.

Prefer one excellent Rive scene over multiple generic animated icons.

---

# Current recommended mapping

| Capability | First prototype | Secondary route |
|---|---|---|
| Development of systems | Magic UI Animated Beam | React Flow / Spline object |
| Analysis and data management | ECharts Sankey or network | textmode/data graphic |
| Public innovation | orbital system composition | Magic UI Orbiting Circles |
| Advisory | React Flow evidence/decision graph | static editorial SVG |
| Training | Orbiting Circles / propagation | Rive interactive micro-scene |

## Shared art-direction rule

The five graphics do **not** need to use the same library.

They need to use the same **Dixios visual grammar**:

- dark/controlled background;
- restrained accent palette;
- thin infrastructure lines;
- information density rather than ornamental gradients;
- flat/technical typography;
- no generic SaaS cards;
- purposeful movement;
- nearly static idle state where possible;
- common scale, spacing and frame treatment.

The shared identity comes from art direction, not from forcing every capability through one component library.

---

# Implementation order

1. Prototype **Animated Beam** for Development of systems.
2. Prototype **ECharts Sankey/network** for Data.
3. Prototype **React Flow evidence/decision graph** for Advisory.
4. Prototype **Orbiting Circles** twice with different semantics: Innovation and Training.
5. Compare screenshots side-by-side.
6. Replace one of the weaker 2D pieces with Spline or Rive only if the upgrade is substantial.
7. Normalize typography, palette, line weight, motion speed and framing.
8. Add `prefers-reduced-motion` fallbacks.
9. Run visual regression before adding more effects.

## Core rule

> **Use the strongest prebuilt visual primitive, then erase its borrowed identity and rebuild the surface as Dixios.**
