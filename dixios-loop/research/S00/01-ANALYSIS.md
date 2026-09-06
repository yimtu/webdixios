# S00 HERO — 01 ANALYSIS

**Baseline:** `BASELINE_2026_09_05 / S00-HERO`  
**Date:** 2026-09-05  
**Phase:** `ANALYZE`  
**Rule:** analysis only; no solution selection in this phase.

---

## 1. What the baseline is doing

The baseline hero establishes Dixios through three simultaneous layers:

1. **Institutional identity layer** — large lowercase `dixios`, compact navigation, restrained copy, white-on-blue authority.
2. **Systems/data layer** — a dotted globe, small modules, grids, crosses, bars, orbital/diagram-like lines, and small monospace annotations.
3. **Territorial/global layer** — the world is the dominant visual object, implying that Dixios works across interconnected systems rather than as a conventional consulting brand.

The composition is asymmetrical but controlled: large copy occupies the left; a dense visual system occupies the center/right; microcopy and small diagram fragments prevent the right side from feeling like a single stock illustration.

The strongest visual move in the baseline is not the globe by itself. It is the **globe embedded inside a larger graphic language** of modular marks, grids, line systems and red/white interruptions. That creates authorship and makes the image feel editorial rather than merely 3D.

---

## 2. What the current implementation is doing

The current implementation keeps the same broad structure but translates it into a live Astro composition:

- `Home.astro` renders the hero as semantic HTML plus a dedicated `#hero-globe` canvas.
- The copy block contains eyebrow, oversized wordmark, explanatory deck and CTA.
- Around the globe, the implementation adds two orbit rings, two interface modules, a chrome-signal strip, an ASCII legend, a side-note column, two CSS pixel fields, decorative line fragments and an oversized outline stencil word.
- `scene.ts` renders the globe with `cobe` and continuously rotates it unless reduced motion is requested.
- `motion.ts` gives the hero an entrance sequence and a small scroll-linked displacement/fade.
- `global.css` establishes a fixed visual grammar: cobalt/royal blue field, white typography, coral signal color, cyan secondary accent, thin diagram lines, monospace metadata and a visible grid/noise texture.

This means the hero is already not a static mockup. It has a real motion system, a GPU/canvas visual, semantic copy and explicit fallback behavior.

---

## 3. What currently communicates well

### 3.1 Brand hierarchy

The implementation gives `dixios` strong scale and immediate left-side dominance. This correctly preserves the baseline’s most important textual hierarchy: brand first, explanatory copy second, technical visual third.

### 3.2 Institutional tone

The typography, spacing, thin rules, small uppercase/monospace labels and restricted accent colors keep the page from reading like consumer tech or entertainment UI. The site feels serious and operational.

### 3.3 Global-system metaphor

The globe successfully communicates scope, relationships and interconnectedness without requiring literal explanatory text. Even before reading the deck, a visitor sees a system larger than a single dashboard or organization.

### 3.4 Layered visual grammar

The modules, pixel fields, orbital lines, ASCII legend and side notes prevent the canvas from becoming the only source of visual interest. This is important because the baseline’s value comes from layering rather than one hero object.

### 3.5 Existing motion restraint

The current motion is relatively disciplined:

- entrance motion is finite;
- globe rotation is continuous but slow;
- hero parallax is subtle;
- reduced motion disables the GSAP sequence and globe rotation;
- `IntersectionObserver` and `document.hidden` logic stop the globe when it should not run;
- `Save-Data` hides the canvas entirely.

This is a materially better technical foundation than an uncontrolled always-on decorative animation.

---

## 4. What currently limits the hero

### 4.1 Mexico is not perceptually important enough

This is the clearest hard failure relative to the frozen project rule.

The globe is global, but Mexico does not currently function as a strong perceptual anchor. `scene.ts` provides no markers and no explicit Mexico-focused treatment; it primarily controls globe orientation, scale, sampling and continuous `phi` rotation.

As a result, the visual communicates “world / system / network,” but not strongly enough “world with Mexico as a meaningful focal territory.”

This is not a cosmetic issue. It is a hierarchy problem: the project has already declared that Mexico must be discoverable almost immediately.

### 4.2 The globe is a recognizable library object

The current hero uses `cobe`. The implementation is tasteful, but the central sphere still carries the visual signature of a recognizable point-globe component. The surrounding design language adds authorship, yet the main object itself is not fully proprietary.

The risk is not that Cobe is bad. The risk is that the most dominant visual asset can read as a polished implementation choice rather than a distinctly Dixios visual artifact.

### 4.3 Decorative fragments are stronger as atmosphere than as information

The current modules (`DX / 01`, bar block, `CAPACIDAD`, `INSTITUTIONAL SIGNAL`, ASCII legend, side notes) build a convincing technical atmosphere, but they do not yet form a clear system of relationships.

They read as a family, but not as a sequence or logic that a viewer can intuitively trace.

This is acceptable as art direction, but it limits the hero’s ability to communicate Dixios’s core promise through the visual itself rather than through copy.

### 4.4 The visual hierarchy is busy in several independent directions

There are multiple simultaneous attention sources:

- the giant `dixios` wordmark;
- the globe;
- pixel fields;
- orbit rings;
- modules;
- ASCII legend;
- vertical side note;
- outline stencil word;
- line fragments.

Because these elements do not all participate in one obvious visual event, the composition can feel layered without feeling fully orchestrated.

The baseline is also dense, but its density is more tightly concentrated around the globe/diagram system. The implementation spreads authoring devices across more independent layers.

### 4.5 Motion currently animates presence more than meaning

The hero’s existing GSAP sequence mostly reveals items through `opacity`, `y`, and `scale`, while the globe rotates continuously and the visual shifts slightly with scroll.

This is polished entrance choreography, but the motion itself does not yet communicate a transformation such as:

- identifying;
- resolving;
- connecting;
- amplifying;
- routing;
- converting complexity into capability.

Therefore, motion currently answers “how does the hero come alive?” more than “what does Dixios do?”

### 4.6 `Save-Data` removes the central visual without an equivalent compositional replacement

When `Save-Data` is active, the canvas is hidden. The remaining CSS/HTML decoration still exists, so the hero does not become blank, but the dominant globe disappears.

That creates a compositional dependency on the canvas: the fallback is technically safe, but it is not equivalent in visual weight.

### 4.7 The hero carries multiple rendering systems before its conceptual grammar is fully unified

The visual currently mixes:

- canvas/WebGL-like globe rendering via Cobe;
- CSS grids and lines;
- GSAP entrance animation;
- GSAP scroll motion;
- static HTML interface fragments.

This is technically manageable, but every system introduces coordination cost. Because the visual concept is not yet fully unified, extra layers can increase complexity faster than they increase meaning.

---

## 5. Semantic vs decorative elements

### Semantically meaningful today

- `dixios` wordmark;
- eyebrow describing institutional technology;
- hero deck;
- CTA;
- globe as global/system metaphor;
- side-note terms: data, systems, people, institutions, impact;
- ASCII legend categories: actor, data, rule, flow, decision;
- label `CAPACIDAD`.

### Primarily decorative/atmospheric today

- orbit rings;
- stencil `OPERABLE`;
- chrome strip as currently used;
- pixel fields;
- line fragments;
- module bars without explicit relationship;
- anonymous `DX / 01` module state.

These decorative elements are not necessarily wrong. The issue is that they currently contribute more to texture than to a legible systems narrative.

---

## 6. Relationship between copy and graphic

The copy says:

> Dixios converts institutional complexity into systems that allow people to understand, decide, execute and improve.

The graphic says, more generally:

> Dixios operates in a global field of data, actors, rules, systems and decisions.

Those two statements are compatible, but they are not yet identical.

The copy expresses **conversion** and **operability**.

The graphic expresses **scope**, **network**, **data density** and **technical capability**.

The gap between those meanings is the most important conceptual constraint for the next phase.

---

## 7. What should be preserved from the baseline/current implementation

The following qualities are already valuable and should not be discarded casually in later phases:

- strong cobalt/royal-blue identity;
- coral as a high-information accent rather than a decorative gradient;
- oversized `dixios` brand presence;
- white technical/editorial contrast;
- world/system scale;
- dense micrographic layer around a dominant central visual;
- institutional restraint;
- thin technical linework;
- monospace metadata language;
- asymmetrical editorial composition;
- clear separation between brand copy and system visualization;
- non-cartoon character;
- controlled use of motion rather than constant spectacle;
- fallback/reduced-motion awareness already present in code.

Preserving these does **not** mean preserving every current element or the current implementation technique.

---

## 8. Technical constraints visible in the current implementation

### 8.1 Hero layout

Desktop layout uses three columns:

```text
copy / visual / side-note
```

with the visual expected to occupy at least ~560 px inside the current CSS grid.

### 8.2 Canvas dependency

The globe is a single `canvas` element whose pixel dimensions are recalculated from its CSS box. DPR is capped at:

```text
desktop: 1.35
mobile: 1.0
```

This is already aligned with the project’s performance discipline.

### 8.3 Globe runtime

Current globe behavior includes:

- mobile vs desktop sample counts;
- responsive dimensions;
- slow continuous rotation;
- IntersectionObserver pausing;
- `document.hidden` pausing;
- cleanup via `destroy()` on `pagehide`;
- reduced-motion support;
- Save-Data suppression.

Any later redesign that replaces this behavior must preserve at least the same runtime hygiene.

### 8.4 Motion stack

GSAP + ScrollTrigger is already installed and active for:

- intro choreography;
- hero exit/parallax;
- lower-section reveals.

Adding another motion engine later would increase implementation complexity and would require explicit technical justification.

### 8.5 CSS density

The hero already contains multiple absolutely positioned decorative systems. Any future implementation that adds more layers without removing/reorganizing existing ones risks collision across breakpoints and may reduce legibility.

---

## 9. Main opportunities exposed by the audit

This section deliberately states opportunities as **problems to solve**, not solutions.

1. Make Mexico a genuine hierarchy anchor rather than an incidental location on a world sphere.
2. Close the semantic gap between the copy’s promise of transformation and the visual’s current emphasis on global network/data atmosphere.
3. Increase authorship of the dominant visual so the hero cannot be mistaken for a polished library-demo composition.
4. Give at least part of the surrounding micrographic system a legible relationship to the main visual.
5. Ensure motion expresses a meaningful Dixios verb rather than only entrance/reveal.
6. Preserve the current performance hygiene while increasing visual specificity.
7. Preserve the baseline’s strong editorial density without letting independent decorative layers compete with one another.
8. Ensure fallback states retain compositional weight instead of merely hiding the main canvas.

---

## 10. Highest-potential area

The area with the highest potential is the relationship among:

```text
WORLD / MEXICO / COMPLEXITY / CAPABILITY
```

The current hero already has enough technical infrastructure and visual language to support a sophisticated result. The main limitation is not lack of effects; it is that those four ideas are not yet fused into one unmistakable visual statement.

That relationship should be resolved conceptually before any new art direction or code is chosen.

---

## 11. Analysis conclusion

The hero is already structurally competent and technically more mature than the frozen baseline image alone suggests. It has meaningful advantages: live rendering, controlled motion, responsive canvas sizing, runtime pausing, reduced-motion handling and a broader graphic vocabulary.

However, the current implementation still does not satisfy the project’s strongest S00 requirement: **Mexico is not perceptually dominant enough**, and the dominant visual communicates a global technical system more clearly than it communicates Dixios’s promised transformation from institutional complexity into operable capability.

Therefore the correct next phase is **CONCEPT_RESEARCH**, not additional implementation.

No implementation direction is approved by this analysis.
