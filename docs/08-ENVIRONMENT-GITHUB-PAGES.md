# ENVIRONMENT / GITHUB PAGES

## Objective

Keep the site static-first, isolate heavy graphics, and preserve straightforward deployment to GitHub Pages.

## Recommended application architecture

### Astro shell

Use Astro for:
- routing;
- static markup;
- typography/layout;
- editorial sections;
- SVG system graphics;
- Mexico block;
- publications/footer/navigation.

Official docs:
https://docs.astro.build/

GitHub Pages deployment:
https://docs.astro.build/en/guides/deploy/github/

## R3F as an island, not an app rewrite

Use React only for the hero 3D island if the reusable pmndrs ecosystem materially reduces implementation cost.

Recommended packages:

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing meshline
```

GSAP for system/motion:

```bash
npm install gsap
```

Visual QA:

```bash
npm install -D @playwright/test pixelmatch pngjs
npx playwright install chromium
```

Mexico package:

```bash
npm install @webrek/mx-geo
```

Check current package versions before installing into production.

## Suggested project structure

```text
src/
  components/
    hero/
      HeroCity.tsx
      HeroCityIsland.astro
    system/
      SystemStack.astro
    capabilities/
      Capabilities.astro
    mexico/
      MexicoTerritory.astro
    publications/
      Publications.astro
  pages/
    index.astro
  styles/
    tokens.css
    global.css
  lib/
    visual-test.ts
    seeded-rng.ts
public/
  assets/
    3d/
    textures/
tests/
  visual/
    reference/
    dixios.spec.ts
scripts/
  visual-diff.mjs
licenses/
```

## Astro integration principle

Do not hydrate the whole page.

Only hydrate the hero component where interactivity is necessary.

Prefer loading strategies such as visibility-based hydration where appropriate, but verify behavior against the current Astro version before shipping.

## GitHub Pages concerns

Follow Astro's official GitHub Pages guide for:
- `site` configuration;
- `base` configuration when deploying under a repository subpath;
- Actions workflow;
- static output.

Never hard-code root-relative asset paths without checking the configured base path.

## Build gate

Minimum CI:

```bash
npm ci
npm run build
```

If visual tests run in CI:

```bash
npx playwright install --with-deps chromium
npm run build
# serve dist locally
# run Playwright against served output
```

## Static compatibility

The following parts can remain fully static:
- navbar;
- system stack markup/SVG;
- capability grid;
- Mexico SVG;
- publications;
- CTA/footer.

Only the hero truly needs a realtime GPU renderer.

## Asset optimization

For glTF city assets consider:
- compressed textures;
- geometry simplification;
- removing unused animation/data;
- reuse/instancing;
- splitting focal assets from background asset packs.

Three GLTFLoader docs:
https://threejs.org/docs/#examples/en/loaders/GLTFLoader

## Environment rule

Do not add a framework because a demo uses it unless the reusable value exceeds the integration cost.

For the hero, R3F/Drei can be justified because it unlocks:
- existing pmndrs examples;
- Html annotations;
- Instances/Merged;
- postprocessing ecosystem;
- scene utilities.

For the rest of the page, prefer Astro + DOM/SVG.

## Definition of environment-ready

- clean install succeeds;
- build succeeds;
- GitHub Pages workflow succeeds;
- hero island loads without blocking static content;
- direct/repository-subpath asset URLs work;
- visual tests can run deterministically;
- all third-party asset licenses are recorded.
