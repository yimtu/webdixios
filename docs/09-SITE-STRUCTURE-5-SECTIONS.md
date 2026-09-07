# DIXIOS — ESTRUCTURA ACTUALIZADA DEL SITIO

Fuente de alcance: **“Propuesta de nueva página web”**, versión recibida el 6 de septiembre de 2026.

Este documento es la referencia de contenido y arquitectura para la página actual. Si una investigación visual anterior contradice estos nombres, textos o publicaciones, **prevalece esta estructura**.

## Principio

La página mantiene **cinco bloques sustantivos**:

1. Hero
2. Servicios
3. Nosotros
4. Publicaciones
5. Contacto

No se agregan por ahora secciones independientes nuevas como Sistema, México/Territorio, Ciclo, Operación o Casos.

Las investigaciones de recursos visuales, ASCII, 3D, diagramas y gráficos deben alimentar principalmente **Hero y Servicios**; no deben alterar la arquitectura aprobada.

---

## 01 — Hero

### Contenido aprobado

- **DIXIOS**
- **“EL ENCUENTRO DE LA TECNOLOGÍA CON LO HUMANO”**

### Navegación visible en la propuesta

- Nosotros
- Publicaciones
- Contacto

No aparece “Servicios” en la navegación de la propuesta. Puede existir como ancla interna si posteriormente se decide, pero no debe asumirse como elemento aprobado del menú principal.

### Dirección visual

- Mantener el Hero como el momento de mayor peso visual.
- La investigación actual de ciudad/escena puede seguir utilizándose mientras no modifique el contenido aprobado.
- No añadir claims secundarios no presentes en la propuesta sin una aprobación posterior.

---

## 02 — Servicios

**El nombre visible de la sección es “SERVICIOS”.**

Es un solo bloque compuesto por cinco servicios, no cinco secciones independientes.

### Nombres exactos aprobados

1. **DESARROLLO DE SISTEMAS**
2. **ANÁLISIS Y GESTIÓN DE DATOS**
3. **INNOVACIÓN PÚBLICA**
4. **CONSULTORÍA**
5. **CAPACITACIÓN**

### Regla de nomenclatura

- Sustituir **“Asesoría” / “Asesoría estratégica” / “Advisory”** por **“Consultoría”** cuando el texto vaya a aparecer en la página.
- “Capacidades” puede seguir utilizándose internamente en documentos técnicos como categoría de investigación, pero la etiqueta pública aprobada es **Servicios**.

### Dirección de investigación visual vigente

Cada servicio debe poder tener una pieza visual propia, embebible y fuerte. Priorizar:

- componentes visuales ya construidos;
- diagramas animados;
- gráficos de datos;
- ASCII/textmode/FIGLET;
- escenas u objetos 3D cuando realmente ganen visualmente;
- SVG, WebM o componentes ligeros cuando puedan sustituir runtimes pesados.

Bloquear como solución primaria:

- templates completos de landing pages;
- iconos genéricos;
- dashboards SaaS completos;
- shaders sin una función conceptual clara;
- cinco gráficos idénticos cambiando sólo el icono.

La investigación específica vive en:

- `docs/10-CAPABILITIES-VISUAL-RESOURCE-LIBRARY.md`
- `docs/11-ASCII-TEXTMODE-VISUAL-SYSTEM.md`

---

## 03 — Nosotros

### Texto base aprobado

> Somos una empresa mexicana de servicios tecnológicos especializada en el desarrollo de proyectos de innovación.
>
> Contamos con un equipo multidisciplinario de especialistas en: desarrollo de software, ciencia de datos, política pública, educación, salud pública, etc.

### Regla de contenido

No sustituir este texto por la definición más extensa del Contexto Maestro sin autorización. El Contexto Maestro puede orientar diseño, tono y criterio interno, pero esta propuesta contiene el copy público vigente.

### Dirección visual

Todavía abierta.

Debe comunicar:

- empresa mexicana;
- servicios tecnológicos;
- proyectos de innovación;
- equipo multidisciplinario.

Evitar convertir “Nosotros” en otra sección de servicios o en un manifiesto largo.

---

## 04 — Publicaciones

La propuesta actual reemplaza la lista anterior de publicaciones.

### Tres publicaciones aprobadas

1. **Educación universitaria y cambio tecnológico en México**
2. **Manual de prompting para principiantes**
3. **¿Qué son las humanidades digitales?**

### Estructura mostrada en la propuesta

- tres columnas / piezas editoriales;
- título en la parte superior;
- espacio visual debajo de cada título para imagen, arte o recurso gráfico.

### Dirección visual

- mantener carácter editorial;
- pueden producirse imágenes originales para cada publicación;
- no reutilizar visuales de Servicios de manera mecánica;
- priorizar legibilidad de títulos y una composición claramente diferenciada de una cuadrícula SaaS.

### Contenido anterior que ya no debe considerarse vigente

- “Pensamiento lateral en tiempo de la IA”
- “Las leyes de la robótica social”

No eliminarlos de archivos históricos si sirven como registro, pero **no deben aparecer en la implementación actual**.

---

## 05 — Contacto

### Campos aprobados

- **Nombre**
- **Email**
- **Teléfono**
- **Tema**

### Correo visible

- **contacto@dixios.com**

### Dirección funcional

- sección limpia y directa;
- no necesita competir visualmente con Hero o Servicios;
- respetar exactamente “Tema” como campo actual; no sustituirlo automáticamente por “Mensaje” o “Contacto”.

---

# Referencias incluidas en la propuesta

Estas referencias forman parte del material recibido y sirven como insumo, no como estructura adicional de la página.

## Empresas similares

- https://uzu.digital/
- https://aragonestudiosdeopinion.mx/

## Referencias gráficas

- https://pin.it/6hKiQoHoU
- https://pin.it/1GojCmVVa
- https://pin.it/7DSMBaEso
- https://pin.it/1aJd3tRJk
- https://pin.it/5b37mJDXy

---

# Jerarquía de esfuerzo

1. **Hero** — máxima prioridad visual.
2. **Servicios** — máxima prioridad de investigación gráfica y sistema visual.
3. **Nosotros** — resolver identidad/multidisciplina sin inflar contenido.
4. **Publicaciones** — sistema editorial + tres artes.
5. **Contacto** — funcional, preciso, mínimo ruido.

---

# Checklist de fidelidad antes de implementar

- [ ] Hero usa el claim exacto de la propuesta.
- [ ] La sección pública se llama **Servicios**.
- [ ] Son exactamente cinco servicios.
- [ ] El cuarto servicio se llama **Consultoría**, no Asesoría.
- [ ] Nosotros conserva el copy aprobado.
- [ ] Publicaciones contiene exactamente los tres títulos vigentes.
- [ ] Contacto usa Nombre / Email / Teléfono / Tema.
- [ ] Se muestra `contacto@dixios.com`.
- [ ] El menú principal no añade secciones no aprobadas por costumbre.
- [ ] Las investigaciones visuales no cambian la arquitectura del sitio.

## Estado actual

La arquitectura y el contenido base quedan actualizados con la última propuesta. La investigación visual puede continuar sobre **Servicios** utilizando esta nomenclatura como fuente de verdad.