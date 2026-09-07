# Resultados antiguos e icono en Google

Las URLs identificadas por el usuario son:

- `https://dixios.com/articulo2.html`
- `https://dixios.com/aviso_privacidad.html`
- `https://dixios.com/articulo1.html`

Las tres devolvían HTTP 404 antes del cambio. Se conserva ese estado para que Google reconozca que ya no existen; `404.html` aporta navegación accesible a inicio y publicaciones. No se crean redirecciones genéricas a inicio, páginas antiguas con estado 200 ni un aviso legal inventado. El 404 incluye `noindex, follow` y no se incorpora al sitemap.

Los iconos PNG de 96 px y Apple de 180 px se generan durante el build a partir del SVG existente. No cambia la identidad, no se carga un servicio de imágenes en el navegador. Los enlaces a iconos respetan la base de cada entorno.

## Paso pendiente en la cuenta del propietario

El usuario indica que probablemente no tiene Search Console configurado. Crear una propiedad de prefijo URL `https://dixios.com/` y verificar mediante el archivo HTML emitido por Google permite hacerlo sin cambiar DNS. No publicar un token inventado ni verificar otra cuenta sin autorización.

Una vez verificada, revisar las URLs exactas y solicitar su retirada temporal si sigue siendo urgente. Elegir «sólo esta URL», nunca el prefijo raíz del dominio: ocultaría el sitio completo. La retirada dura aproximadamente seis meses y no sustituye el 404 para la eliminación permanente. Después solicitar un nuevo rastreo de inicio y enviar `sitemap.xml`.

No hay una opción de código para desactivar todos los sitelinks ni plazo garantizado para que Google muestre un favicon. No se ha enviado ninguna solicitud de retirada desde este repositorio.

Fuentes oficiales:

- [Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks)
- [Retiradas en Search Console](https://support.google.com/webmasters/answer/9689846)
- [Verificación de propiedad](https://support.google.com/webmasters/answer/9008080)
- [Favicon en resultados](https://developers.google.com/search/docs/appearance/favicon-in-search)
