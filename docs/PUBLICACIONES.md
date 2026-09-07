# Escribir las publicaciones

Cada portada abre una página propia. Por solicitud del autor, las páginas comienzan sin cuerpo de artículo ni fechas: únicamente el título y la navegación para volver.

Los textos se editan en estos archivos Markdown:

- `src/pages/publicaciones/educacion-universitaria-y-cambio-tecnologico-en-mexico.md`
- `src/pages/publicaciones/manual-de-prompting-para-principiantes.md`
- `src/pages/publicaciones/que-son-las-humanidades-digitales.md`

## Desde ChatGPT

Puedes pedir: «Pon el siguiente texto en la publicación Manual de prompting para principiantes, conserva mis palabras, usa subtítulos y déjala lista para publicar», seguido de tu artículo. No es necesario modificar componentes ni diseñar la página de nuevo.

Para hacerlo a mano, escribe después del segundo `---`. Markdown admite párrafos, `## Subtítulos`, listas y `[enlaces](https://ejemplo.com)`. El título principal ya aparece automáticamente; no lo repitas en el cuerpo.

Cuando el artículo esté completo, cambia `published: false` por `published: true`. Mientras permanezca en `false`, la página es accesible mediante su portada pero incluye `noindex, follow` para evitar que un buscador indexe una página vacía. El indicador no publica en GitHub: todavía hay que revisar, compilar y desplegar el cambio.

Puedes añadir `description: Tu resumen aprobado` dentro del bloque entre `---` para la descripción de buscadores. No se agregan autores, fechas ni otros datos automáticamente.

Los artículos con `published: true` también se incorporan automáticamente al sitemap durante la compilación.

Las rutas usan la base de Astro: funcionan tanto en `/` como en `/webdixios/`. El layout compartido está en `src/layouts/PublicationLayout.astro`, basado en los [layouts oficiales de Markdown de Astro](https://docs.astro.build/en/basics/layouts/).
