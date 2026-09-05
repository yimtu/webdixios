# Web Dixios

Nueva página institucional de Dixios.

## Dirección

**Institutional Computational Modernism**: identidad institucional mexicana + sistema gráfico generativo + interfaces operativas + motion con significado.

Las primitivas visuales de Dixios (`● + ━ ■ grid`) no son decoración: representan actores/datos, coordinación, flujos, decisiones y estructura institucional.

## Stack

- Astro (static output)
- TypeScript
- CSS / SVG
- GSAP + ScrollTrigger
- Canvas 2D ligero para el hero
- GitHub Pages

No se usa React, Lenis, Three.js ni trackers de terceros en esta primera versión. Se agregan sólo si un caso de uso lo justifica y pasa profiling.

## Desarrollo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## GitHub Pages

Mientras el sitio viva como project page se usa `base: '/webdixios'` en `astro.config.mjs`.
Cuando `dixios.com` sea el custom domain, cambiar `site` a `https://dixios.com` y `base` a `/`.

El workflow `.github/workflows/deploy.yml` construye y publica `dist/`.

## Pendientes antes de producción

- Confirmar HEX/Pantone oficiales de la marca.
- Confirmar buzón oficial del formulario de contacto.
- Añadir URLs/archivos reales de las tres publicaciones.
- Pinnear GitHub Actions a commit SHA completo antes de producción.
- Validar en Safari iOS, Android medio, Chrome, Firefox y reduced-motion.
- Lighthouse / Core Web Vitals y profiling final.
