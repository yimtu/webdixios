# PUBLICATIONS / NAV / FOOTER

## Objective

These blocks should be the simplest parts of the page technically. Reuse robust layout/accessibility patterns, but keep visual implementation custom and restrained.

## Navbar

Reference collection:
https://ui.aceternity.com/blocks/navbars

Useful example:
https://ui.aceternity.com/blocks/navbars/navbar-classic

Reuse:
- left/center/right composition;
- responsive collapse strategy;
- keyboard/focus behavior;
- menu open/close mechanics.

Replace:
- styling;
- gradients;
- iconography;
- spacing;
- typography.

Target anatomy:
- Dixios logo left;
- primary links centered;
- bordered CTA right;
- mobile menu only when viewport requires it.

## Publications

Aceternity blog blocks:
https://ui.aceternity.com/blocks/blog-sections

Useful grid example:
https://ui.aceternity.com/blocks/blog-sections/simple-blog-with-grid

Reuse:
- responsive three-column article grid;
- metadata structure;
- card/image ratios;
- mobile stacking.

Prefer custom CSS if the reference layout is simpler than the block.

Target anatomy:
- left intro/copy column;
- three article cards;
- image region;
- category eyebrow;
- headline;
- date;
- right-side editorial note/arrows.

Do not add a JS carousel for only three articles unless actual product requirements later justify it.

## Footer

Aceternity footer collection:
https://ui.aceternity.com/blocks/footers

Useful example:
https://ui.aceternity.com/blocks/footers/centered-with-logo

Reuse:
- responsive footer skeleton;
- nav grouping;
- social-link accessibility;
- copyright row.

Replace entire visual treatment.

Target footer should preserve:
- blue CTA band above footer;
- logo + tagline;
- `Hablemos →` CTA;
- dark bottom footer;
- small navigation;
- social icons;
- corner Dixios patterns;
- short institutional phrases at the bottom edges.

## Accessibility baseline

Prefer semantic HTML:
- `<header>`;
- `<nav>`;
- `<main>`;
- `<article>`;
- `<footer>`.

All interactive elements should have visible keyboard focus.

External/social links should have accessible labels.

Do not rely on hover alone for article discovery.

## Acceptance criteria

- these sections match reference proportions before any decorative polish;
- no unnecessary JS;
- navbar remains usable on keyboard/mobile;
- publications cards remain readable without images;
- footer navigation remains semantic and accessible.
