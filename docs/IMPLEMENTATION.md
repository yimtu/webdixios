# Dixios — implementación y revisión

Fecha: 7 de septiembre de 2026. Rama: `codex/dixios-astro`.

## Resultado

Página Astro estática con Hero, Servicios, Nosotros, Publicaciones, Contacto y Footer. La referencia artística es `ChatGPT Image Sep 7, 2026, 01_42_51 AM.png`, preservada en la raíz. No se utiliza como fondo ni se sirve al visitante.

El Hero combina HTML con ciudad Three.js real. Servicios tiene cinco composiciones SVG distintas, sin enlaces, flechas ni cursor de enlace. Nosotros utiliza dos composiciones del mismo sistema multidisciplinario: escritorio y móvil. Las tres publicaciones conservan sus títulos; sus portadas son SVG originales. Contacto y menú funcionan con teclado, y el contenido/contacto permanecen disponibles sin JavaScript.

## Fuentes de contenido y decisiones

| Decisión | Evidencia / resolución |
| --- | --- |
| Arquitectura, nombres y Nosotros | `docs/09-SITE-STRUCTURE-5-SECTIONS.md` y brief actual |
| Hero, textos breves de servicios, introducciones | Imagen final aprobada |
| Fechas/categorías de publicaciones | Imagen aprobada: 12 marzo 2024, 6 marzo 2024, 28 febrero 2024; no se agregan autores |
| Navegación Servicios | Brief e imagen actuales sustituyen la advertencia antigua del dossier |
| Campo Tema y email | Documento 09; no se reproduce el campo incorrecto de la imagen |
| Sin mapa, nuevas secciones ni etiquetas 3D | Brief actual sustituye documentos históricos |
| Sin links sociales ni destinos editoriales ficticios | No hay URLs aprobadas en el repositorio |

La investigación previa ya resolvía static-first, familias de assets, biblioteca de gráficos y criterios de QA. Faltaba verificar versiones, licencias específicas, ejecutar assets/primitives, resolver la composición móvil, elegir contacto compatible con hosting estático y comprobar bases de despliegue.

Fuentes externas consultadas para esas decisiones:

- [Integración oficial Astro → GitHub Pages](https://docs.astro.build/en/guides/deploy/github/).
- [Configuración Astro](https://docs.astro.build/en/reference/configuration-reference/).
- [Three.js responsive](https://threejs.org/manual/en/responsive.html) y GLTFLoader.
- [Kenney Commercial](https://kenney.nl/assets/city-kit-commercial), licencia CC0 original del paquete.
- [Magic UI Animated Beam](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-beam.tsx), MIT: ejecutado aislado antes de cerrar la adaptación SVG/CSS.
- Historial del propio repositorio: el intento anterior podía esconder un asset roto detrás del fallback; las pruebas actuales exigen ciudad `ready` y prueban el fallback separadamente.

## Iteraciones visuales ejecutadas

1. **Composición inicial:** página completa ejecutada en navegador y captura `iteration-1-desktop.png`. Los cinco servicios ya seguían el lenguaje aprobado; la ciudad se veía pequeña y aislada.
2. **Masa y proporción:** ciudad ampliada, cámara menos elevada, torre central más alta, dos vías cian y luz de suelo. Capturas `iteration-2-desktop.png` / `iteration-2-mobile.png`. La ciudad llega al borde inferior y tiene mayor jerarquía; el móvil dispone de una zona propia para el 3D.
3. **Legibilidad y adaptación:** diagrama móvil de Nosotros recompuesto con etiquetas mayores, retirada de adornos que interferían en tablet, ajuste de contraste de números de servicios y protección de texto del Hero. Capturas `iteration-3-desktop.png` / `iteration-3-tablet.png` y finales de los cuatro anchos.

Cada pasada se abrió en navegador, se capturó y se inspeccionó frente a la referencia. No se usa un porcentaje de diferencia de píxeles para afirmar fidelidad: la referencia admite cambios de proporción, y la comparación se centra en composición, jerarquía, color, densidad y legibilidad.

Diferencias intencionales: ciudad de geometría más controlada y menor complejidad lumínica que el render; menos decoración periférica; contacto con etiquetas visibles y explicación funcional; móvil con gráficos redistribuidos. La evaluación artística definitiva queda para revisión humana.

## Arquitectura y presupuesto

- Astro 7.3.1; HTML/SVG para toda la página; sin React ni runtime de animación en producción.
- Una importación dinámica Three.js 0.185.1 para Hero, con GLTFLoader.
- Cinco GLB Kenney de **47,964 bytes en total**; geometrías compartidas. 30 edificios visibles en escritorio / 24 móvil, incluso al cambiar orientación.
- DPR máximo 1.5 escritorio / 1 móvil; seis señales / tres móvil; animación limitada a aproximadamente 30 / 15 FPS y detenida fuera de pantalla o con pestaña oculta.
- Reduced motion conserva el 3D estático y detiene las animaciones CSS. Fallback SVG ante WebGL ausente o fallo de assets, sin raster.
- Bundle de ciudad: aproximadamente **603 KB minificado / 152 KB gzip**; sigue siendo el principal coste. El warning de chunk >500 KB está documentado y no oculto. No se cargan postprocessing, React Flow, ECharts, GSAP ni Rive para gráficos que SVG resuelve.
- CSS aproximadamente 21 KB / 5.3 KB gzip; una fuente Inter local de 48 KB. El gzip se midió localmente, no equivale a una medición de transferencia del hosting.

No se afirma rendimiento medido en hardware móvil físico. Las pruebas son Chromium con viewports móviles y WebGL por software; corresponde hacer una última revisión en dispositivos reales antes de publicar.

## Verificación

- `npm ci`: correcto, después de detener servidores locales que bloqueaban el compilador nativo en Windows.
- `npm run check`: cero errores, warnings o hints.
- `npm test`: seis pruebas; 100% líneas, ramas y funciones del módulo de validación/preparación de contacto. Esta métrica no representa cobertura total del renderer.
- `npm run build`, `npm run build:production`, `npm run build:pages`: compilaciones verificadas.
- Once pruebas E2E por entorno `/` y `/webdixios/`: ciudad real, cinco servicios, tres publicaciones, assets sin HTTP >=400, consola sin errores, ausencia de overflow, contraste/accesibilidad automatizada, teclado, formulario, reduced-motion, ausencia de JS, fallo de asset y adaptación al redimensionar.
- Anchos: **390, 430, 768 y 1440 px**. Cero infracciones detectadas por axe en WCAG A/AA para esos recorridos; no se afirma que eso sustituya una auditoría humana completa.
- Canonical y base inspeccionados en navegador: `https://dixios.com/`, `https://yimtu.github.io/webdixios/`.
- `npm audit`: cero vulnerabilidades en las dependencias del proyecto.
- Revisión independiente de código: sin hallazgos altos; se corrigió la reducción de detalle al pasar de escritorio a móvil.

Evidencia: `artifacts/visual/final-{390,430,768,1440}.png`, `pages-{390,430,768,1440}.png`, `reduced-motion.png`, `fallback.png` e iteraciones. El workflow de CI conserva también el reporte Playwright como artifact.

## Contacto y publicación

El botón **Preparar mensaje** valida Nombre, Email, Teléfono opcional y Tema, y abre un borrador `mailto:` a `contacto@dixios.com`. No transmite datos a un tercero ni afirma entrega. El envío final depende de la aplicación de correo del visitante. Hace falta un endpoint aprobado para ofrecer envío directo sin cliente de correo.

Las publicaciones no navegan hasta disponer de destinos aprobados. No hay cambios de DNS, correo, CRM ni dominio. La rama/PR en borrador no implica merge.

## Publicación autorizada posteriormente

El usuario solicitó publicar la versión actual antes de continuar. Se habilitó GitHub Pages con build de Actions y se autorizó únicamente la etiqueta `dixios-preview-2026-09-07` en el entorno de despliegue (se conserva la política existente para main). No se fusionó ninguna rama ni se cambió la configuración del dominio.

- URL pública: https://yimtu.github.io/webdixios/
- Commit publicado: `22ca3e802cbbdf3980f2e195e3335aa64708c05c`.
- Tag: `dixios-preview-2026-09-07`.
- Workflow oficial, build y deploy correctos: https://github.com/yimtu/webdixios/actions/runs/34131281104.
- PR de revisión, en borrador: https://github.com/yimtu/webdixios/pull/10.
- La URL pública se abrió en navegador: ciudad `ready`, cinco servicios, tres publicaciones, cero errores de consola y sin overflow de escritorio.
- Después del despliegue, las **once pruebas E2E también pasaron contra la URL pública**, incluidos 390, 430, 768 y 1440 px, assets, accesibilidad, teclado y formulario.

El workflow permite tags `dixios-preview-*`, pero cada nueva etiqueta requiere también autorización de la política de GitHub Pages o ejecución manual desde una referencia permitida. Un push normal de código a la rama no publica nuevas versiones.

## Dominio definitivo

Por indicación del usuario, la misma versión se volvió a publicar con `target=production`, desde la referencia autorizada `dixios-preview-2026-09-07`, sin merge ni cambios de DNS. GitHub Pages ya tenía configurado y verificado `dixios.com` al iniciar esta operación.

- URL vigente: https://dixios.com/ (base `/`).
- Build y despliegue correctos: https://github.com/yimtu/webdixios/actions/runs/34131919157.
- Las once pruebas E2E pasaron contra `https://dixios.com/`, incluidos los cuatro anchos y la carga de assets.
- La variante `https://www.dixios.com/` presentó un error de certificado al verificarla; no se considera validada. Compartir el dominio sin `www`.

## Ajustes solicitados después de publicación

- Desarrollo de sistemas: se quitó la transparencia del nodo pequeño, se distinguieron sus caras y se conectaron los cuatro nodos por sus bases. Conexiones y cubos comparten ahora una sola animación.
- Publicaciones: fechas eliminadas, tres portadas enlazadas a páginas Markdown sin cuerpo de artículo. Véase `PUBLICACIONES.md`. Páginas vacías con `noindex`; los artículos terminados entran al sitemap al activar `published`.
- Buscadores: título/descripción específicos, Open Graph, identidad WebSite JSON-LD, favicon vectorial sin dependencia de fuentes, robots.txt y sitemap.xml estáticos y base-safe. No se garantiza cuándo Google actualizará sus resultados. Guías consultadas: https://developers.google.com/search/docs/appearance/favicon-in-search y https://developers.google.com/search/docs/appearance/title-link.
- Carga: las descargas GLB tienen límite de diez segundos y abortan en fallo; el SVG inicial sigue visible. Se evita animar la escena vacía durante la descarga.
- Diagnóstico móvil: WebKit emulando iPhone 13 cargó el sitio público sin errores ni overflow; no reproduce un teléfono físico en su red 5G. La captura no demuestra la causa exacta.
- Problema externo confirmado: HTTPS de `www.dixios.com` falla por certificado, CNAME actual apunta al apex. GitHub requiere CNAME `www` → `yimtu.github.io`: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site. No se modificó DNS.
- Pruebas: nuevas pruebas fallaron antes de implementar; posteriormente quince E2E pasaron tanto en build `/` como `/webdixios/`; seis unitarias, módulo contacto con cobertura 100%, audit sin vulnerabilidades. Revisión independiente sin bloqueos altos. Advertencia de tamaño del chunk Three.js ya documentada sigue vigente.
