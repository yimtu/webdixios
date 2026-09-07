# Escribir las publicaciones

Cada portada abre una página propia. Las tres páginas ya contienen los artículos proporcionados por el autor, editados para claridad y tono institucional. Conservan sus títulos y URLs, sin fechas ni autorías añadidas.

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

## Edición de los textos recibidos

Se reemplazaron las comparaciones por bloques geopolíticos por apartados temáticos, conservando los argumentos de educación, prompting y patrimonio. Los ejemplos del manual usan atención ciudadana en lugar de reformas políticamente sensibles. Las cifras de educación se atribuyen al comunicado de la SEP enlazado; se retiraron referencias académicas imprecisas. Los enlaces primarios aparecen junto a las afirmaciones correspondientes.

La presentación conserva el diseño editorial existente; únicamente se dimensionaron los subtítulos del cuerpo, se distinguieron citas y se subrayaron fuentes para lectura y accesibilidad.

Las rutas usan la base de Astro: funcionan tanto en `/` como en `/webdixios/`. El layout compartido está en `src/layouts/PublicationLayout.astro`, basado en los [layouts oficiales de Markdown de Astro](https://docs.astro.build/en/basics/layouts/).
