# CAPABILITIES GRAPHIC SYSTEM

## Objective

Recreate the five-capability strip as a disciplined editorial grid, not a generic SaaS feature section.

The reusable frameworks should solve layout, responsive behavior and microinteraction. Dixios must supply the symbols, typography, color language and spacing.

## Reusable foundations

### Aceternity feature sections

Collection:
https://ui.aceternity.com/feature-section

Useful patterns:
- bordered feature grids;
- hover activation;
- responsive column-to-stack behavior;
- section heading + supporting copy architecture.

Reference block:
https://ui.aceternity.com/blocks/feature-sections/simple-with-hover-effects

Use only:
- grid skeleton;
- responsive strategy;
- event/hover mechanics.

Discard:
- gradients;
- iconography;
- rounded cards;
- SaaS aesthetics.

## Decorative primitives

### Magic UI Animated Grid Pattern

https://magicui.design/docs/components/animated-grid-pattern

Can be adapted for:
- dot matrices;
- small square fields;
- edge/corner decoration;
- subtle activation on hover.

Catalog:
https://magicui.design/docs/components

Also inspect related components such as dot/grid/flickering/striped patterns.

Use implementation ideas only; construct final patterns with Dixios colors and density rules.

## Motion patterns

### Motion Examples

https://motion.dev/examples

Use as a library of interaction patterns for:
- symbol reveal;
- dots reorganizing;
- path drawing;
- small hover state transitions;
- staggered entrances;
- layout changes.

Do not add continuous animation merely because a pattern exists.

## Five symbols

Each capability should have a primitive symbol that belongs to the same graphic grammar.

Suggested:

1. **Sistemas y desarrollo** — stacked horizontal rails / modules.
2. **Datos e inteligencia** — dot matrix with one active cluster.
3. **Innovación pública** — plus/cross system changing arrangement.
4. **Asesoría estratégica** — vertical parallel bars / evidence lanes.
5. **Capacitación y talento** — dot matrix / propagation pattern.

The symbols should use only:
- line;
- point;
- square;
- plus;
- simple filled bar.

No commodity icon set should define the visual identity.

## Recommended DOM structure

- section wrapper;
- section intro row;
- five-column CSS Grid;
- one capability article per column;
- SVG symbol inside each article;
- footer arrow/action;
- shared border grid.

## CSS guidance

- no border radius or max 0–2px if absolutely required;
- no shadows;
- 1px low-contrast hairlines;
- dark background;
- white/near-white typography;
- cyan/magenta/coral/electric-blue as discrete accents;
- consistent vertical rhythm across all five columns.

## Motion guidance

Idle state should be nearly static.

On hover/focus:
- symbol can reorganize;
- one accent can activate;
- arrow can translate slightly;
- border emphasis can rise.

Keep duration around 200–450ms.

Respect `prefers-reduced-motion`.

## Acceptance criteria

- all five columns read as one institutional system;
- symbols are recognizably Dixios, not borrowed UI-library icons;
- responsive collapse preserves hierarchy;
- hover/focus states are keyboard-accessible;
- no effect undermines legibility;
- section still works without JavaScript.
