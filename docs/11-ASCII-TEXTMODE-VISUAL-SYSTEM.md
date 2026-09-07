# ASCII / TEXTMODE — VISUAL SYSTEM FOR DIXIOS

## Objective

Use ASCII/textmode as a **graphic material** inside Dixios, not as a hacker-terminal gimmick.

The priority is visual strength, motion and ease of integration.

The system should support:

- FIGLET typography;
- animated ASCII/textmode graphics;
- diagrams and architectural systems;
- image/video-to-ASCII conversion;
- loops that can be exported before deployment;
- live browser rendering only where interactivity materially improves the result.

## Core direction

> **FIGLET + textmode animation is the primary route.**
>
> Prefer animated textmode over plain static ASCII when the movement adds meaning.
>
> Do not make ASCII Morph a required dependency or central design direction.

---

# 1. FIGLET — primary typographic engine

Primary sources:

- https://github.com/patorjk/figlet.js
- npm/package documentation through the project repository

License: **MIT**.

FIGlet.js works in Node and browser environments and converts normal text into large character-based typography using FIGfonts.

Best Dixios uses:

- capability titles or keywords;
- large section numbers;
- data callouts;
- animated typographic interstitials;
- words that appear/disappear or resolve from noise;
- compact ASCII labels embedded in other diagrams.

Example role, not final art:

```text
 ____  _____  __  _  ___  __  ____
|  _ \|_   _| \ \/ / |_ _|/ ___|
| | | | | |    \  /   | | \___ \
| |_| | | |    /  \   | |  ___) |
|____/  |_|   /_/\_\ |___||____/
```

Do not use FIGLET everywhere. It becomes much stronger when reserved for specific beats.

---

# 2. textmode.js — primary live/animated engine

Primary sources:

- https://github.com/humanbydefinition/textmode.js
- https://code.textmode.art/docs/
- https://code.textmode.art/gallery
- https://editor.textmode.art/

License: **MIT**.

This is the strongest runtime candidate because it is purpose-built for browser textmode graphics rather than terminal emulation.

It supports a grid-based visual system with:

- glyphs/characters;
- text;
- points;
- lines;
- rectangles and other shapes;
- image/video inputs;
- colors;
- easing/animation;
- layers;
- noise/procedural systems;
- export workflows.

## FIGLET integration

The textmode ecosystem includes FIGLET-oriented support/plugins such as `textmode.figlet.js`, making this combination especially useful:

`FIGLET typography + animated textmode scene`

This should be investigated before adding a separate React-only ASCII typography stack.

## Recommended use

Use textmode.js for pieces where the **motion itself communicates the capability**:

- signals travelling between systems;
- data reorganizing into information;
- nodes propagating knowledge;
- an institutional system assembling itself;
- a FIGLET word resolving character-by-character;
- a map/object becoming a character field;
- controlled procedural movement.

## Runtime rule

Do not automatically ship textmode.js live.

If a piece does not need interaction after approval:

1. design/render it with textmode.js;
2. export the result;
3. ship SVG, image or video instead.

This turns textmode.js into a **design studio**, not necessarily a production dependency.

---

# 3. ASCII Motion — primary visual editor / animation studio

Primary sources:

- https://www.ascii-motion.com/
- https://ascii-motion.app/
- https://github.com/CameronFoxly/Ascii-Motion
- https://www.ascii-motion.com/open-source

Core project license: **MIT**; verify current terms for any hosted/cloud/premium service separately.

ASCII Motion is valuable because it already behaves like an animation/design application rather than a low-level renderer.

Useful capabilities include:

- drawing in ASCII/ANSI/textmode;
- layers;
- frame/keyframe animation;
- moving/rotating/scaling elements;
- image conversion;
- video conversion;
- custom character palettes;
- color;
- dithering/effects;
- export workflows including web-friendly formats.

## Why it matters for Dixios

It lets us prototype visually before deciding how the final website should render the piece.

Pipeline:

```text
idea / image / video / 3D render
              ↓
         ASCII Motion
              ↓
      polish + animation
              ↓
 SVG / HTML / video / other export
              ↓
            Astro
```

Prefer this route when a finished animation is enough and no runtime interaction is required.

---

# 4. Rune — video/animation → animated ASCII component

Primary source:

- https://github.com/zeke-john/rune

License: **MIT**.

Rune is useful for one specific trick: convert a source animation/video into an ASCII animation and render it efficiently in React.

Potential pipeline:

```text
Spline / Blender / Motion / generated video
                    ↓
                   Rune
                    ↓
             ASCII animation
```

Useful built-in/typical subjects include globe/planet/rocket/fire-like animations, but the important capability is conversion of our own visual source.

Advantages:

- animation can be visually sophisticated before ASCII conversion;
- lazy/visibility-aware behavior is built around a web use case;
- useful as an Astro React island if one piece justifies it.

Disadvantage:

- React-specific;
- not the first choice if textmode.js or a pre-rendered WebM gives the same result.

Priority: **secondary / specialized**.

---

# 5. ascii-canvas — lightweight live conversion experiment

Primary source:

- https://github.com/phyrextsai/ascii-canvas

License: **MIT**.

This project exposes a very small Web Component that can convert visual sources such as image/video/canvas into a live ASCII representation.

Interesting because:

- framework-independent Web Component;
- suitable for Astro;
- very small compared with full graphics engines;
- can be used as a live stylization layer over an existing visual source.

Possible experiment:

`animated canvas / lightweight video → ascii-canvas → live textmode output`

Treat as **experimental** because the project is young. Do not make it a critical site dependency before testing browser coverage, performance and maintenance risk.

---

# 6. ASCII SVG / offline output route

When possible, prefer an output that preserves the ASCII/textmode appearance without running an engine.

Good final formats:

## Static

1. **SVG** — preferred for crisp scalable character compositions and diagrams.
2. HTML `<pre>` — lowest complexity when actual selectable text is useful.
3. PNG/WebP — acceptable for artwork that does not need scaling/interactivity.

## Animated

1. **WebM** — preferred for a decorative approved loop.
2. lightweight HTML/CSS/JS — when motion is simple enough to implement without a graphics runtime.
3. GIF — only when compatibility/simplicity wins; generally worse compression than modern video.
4. live textmode.js — when the piece genuinely responds to user state/data/input.

## Performance principle

> Static if static works. Pre-rendered loop if interaction is unnecessary. Live renderer only if live behavior creates value.

---

# 7. Visual language: do not restrict ourselves to strict 7-bit ASCII

Use **textmode** broadly, including Unicode block/line glyphs when aesthetically stronger.

Useful character families:

### density ramps

```text
 .:-=+*#%@
```

### block density

```text
░▒▓█
```

### line systems

```text
┌ ─ ┬ ┐ │ ├ ┼ ┤ └ ┴ ┘
```

### signal/point systems

```text
· • + * × ○ ●
```

This gives us much more control than pretending the page must look like a 1980s terminal.

---

# 8. Strongest concepts for Dixios Capabilities

## Development of systems

**Animated system architecture in textmode.**

Concept:

```text
+---------+       +---------+
| LEGACY  | ----> |   API   |
+---------+       +----+----+
                       |
          +------------+------------+
          v                         v
     +---------+                +---------+
     |  DATA   |                |  USERS  |
     +---------+                +---------+
```

Motion:

- signals travel along connectors;
- nodes activate in sequence;
- selected FIGLET word `SYSTEM` or `DIXIOS` can resolve in the background;
- idle remains calm.

Best engine: **textmode.js**.

Alternative: build in ASCII Motion and ship as a loop.

---

## Analysis and data management

Do not make another ordinary bar chart just because it is ASCII.

Stronger options:

- data particles converging into clusters;
- values transforming from noisy character density to organized pattern;
- ASCII/time-series line reacting to real/placeholder data;
- map converted to density characters;
- FIGLET number/stat resolving from granular characters.

Possible visual progression:

```text
.  . .   :  .  : .   .
 : .  .   . : .  .. :
     ↓
░░▒▒▓▓██
     ↓
INFORMATION
```

Best engine: **textmode.js**, possibly pre-rendered.

---

## Public innovation

Avoid the lightbulb and avoid relying on ASCII Morph as a library.

Instead animate **system assembly / experimentation**:

```text
?   +       ?      .
    ?  +       +
          ↓
+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+
```

Meaning:

`uncertainty → prototype → working system`

Movement can be done directly in textmode.js/ASCII Motion without a dedicated morph dependency.

Possible FIGLET beat:

`TEST → LEARN → SCALE`

---

## Advisory

Keep this the most sober textmode graphic.

Use an evidence/decision tree:

```text
              [ EVIDENCE ]
                   |
       +-----------+-----------+
       |                       |
 [ SCENARIO A ]          [ SCENARIO B ]
       |                       |
       +-----------+-----------+
                   |
              [ DECISION ]
```

Motion:

- one route activates;
- unused routes fade;
- the final decision locks in;
- a FIGLET keyword such as `DECIDE` can appear only after resolution.

Best engine: CSS/SVG if motion is simple; **textmode.js** if the character-grid transformation is visually superior.

---

## Training

Use **knowledge propagation**, not a graduation-cap icon.

```text
                  [•••]
                    |
             +------+------+
             |             |
           [•••]          [•••]
           /   \          /   \
         [••] [••]      [••] [••]
```

Motion:

- knowledge token leaves center;
- it propagates through teams;
- nodes retain the learned state;
- final field becomes denser/more capable.

FIGLET option:

A large word such as `CAPACITY` appears progressively as the propagation completes.

Best engine: **textmode.js** or ASCII Motion exported loop.

---

# 9. FIGLET motion experiments worth prototyping

FIGLET should not remain frozen. Prototype at least these four:

## A. Scan reveal

Characters illuminate left-to-right as though the word is being measured.

## B. Noise resolve

Random/low-density glyphs progressively lock into the FIGLET word.

## C. Signal fill

The word outline exists dimly; data/signal characters travel through it and fill it.

## D. Layered drift

Two or three copies of the FIGLET word move by 1–2 character cells and then re-align into one crisp word.

Avoid generic glitch spam.

Motion must communicate **formation, transfer, analysis or coordination**.

---

# 10. Deployment decision tree

```text
Does the graphic need user interaction?
│
├─ NO
│  │
│  ├─ Static composition? → SVG / HTML <pre>
│  │
│  └─ Looping motion? → WebM first
│
└─ YES
   │
   ├─ Character-grid native? → textmode.js
   │
   ├─ Existing visual/video to stylize live? → test ascii-canvas
   │
   └─ React video-to-ASCII use case? → Rune
```

This keeps production simple even if the design process is experimental.

---

# 11. Recommended prototype sequence

1. Install/test **figlet.js** in a tiny local proof.
2. Test the current **textmode.js** editor/gallery and FIGLET integration.
3. Build one animated FIGLET word with noise-resolve motion.
4. Build **Development of systems** as a live character-grid system diagram.
5. Build **Training** as a propagation graphic.
6. Recreate one as an **ASCII Motion** pre-rendered loop and compare visual quality/performance.
7. Test a normal video/3D render through **Rune or ascii-canvas** only if we have a source visual worth converting.
8. Export the best versions and compare them inside the real Capabilities section.
9. Prefer the lightest production form that preserves the approved look.

---

# 12. Priority ranking

| Resource | Role | OSS / license | Priority |
|---|---|---|---|
| **FIGlet.js** | typographic ASCII generation | MIT | **P0** |
| **textmode.js** | live/generative/animated textmode | MIT | **P0** |
| **ASCII Motion** | visual editor + animation + conversion | MIT core | **P0/P1** |
| **Rune** | video → animated ASCII React component | MIT | P1 specialized |
| **ascii-canvas** | tiny live image/video/canvas → ASCII Web Component | MIT | P1 experimental |
| dedicated ASCII morph library | morph-only effect | varies | **not a priority** |

## Final direction

The most promising Dixios ASCII stack is:

> **FIGLET for typographic form + textmode.js for meaningful movement + ASCII Motion for visual authoring/export.**

Use Rune/ascii-canvas only when converting an already-good animated source gives a stronger result than drawing directly in textmode.

ASCII should become a recognizable Dixios graphic language for **systems, information, institutional capacity and transformation** — not a retro-computing decoration.
