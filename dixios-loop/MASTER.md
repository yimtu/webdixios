# DIXIOS VISUAL LOOP ENGINE
## Sistema maestro definitivo para reconstrucción visual, creative engineering y QA iterativo

**Versión:** 3.0  
**Fecha de congelación:** 2026-09-05  
**Proyecto:** `yimtu/webdixios`  
**Estado inicial:** `BASELINE_LOCK_REQUIRED`  
**Modo de trabajo:** Loop Engineering con Controller / Worker / Verifier / Visual Judge  
**Regla suprema:** ninguna sección se considera terminada hasta que su nueva captura se vea **claramente mejor** que el screenshot baseline correspondiente.

---

# 0. INSTRUCCIÓN PARA CUALQUIER IA QUE LEA ESTE ARCHIVO

Este documento no es una guía opcional ni una lista de ideas. Es el **contrato operativo del proyecto**.

La IA que trabaje en Dixios debe:

1. leer este archivo completo antes de modificar código;
2. ejecutar los milestones y fases en el orden indicado;
3. trabajar una sola sección a la vez;
4. persistir estado en archivos;
5. investigar antes de diseñar o programar;
6. verificar técnicamente antes de emitir juicio visual;
7. no declararse a sí misma terminada;
8. comparar cada resultado contra el baseline visual oficial;
9. repetir el loop cuando el resultado no supere el baseline;
10. no desplegar a producción ni tocar DNS/dominio sin autorización humana explícita.

No se permite saltar directamente de una idea a código.

No se permite cerrar una sección porque “se ve bastante bien”.

No se permite usar gráficas, dashboards, métricas, nodos, mapas o elementos “inteligentes” que no comuniquen algo concreto.

No se permite inventar código complejo sin haber investigado primero documentación, repositorios, ejemplos e implementaciones reales.

---

# 1. OBJETIVO DEL PROYECTO

Dixios debe reconstruirse como una experiencia web institucional de alto nivel con:

- dirección artística claramente superior al baseline actual;
- identidad digital propia;
- composición editorial fuerte;
- visualizaciones con significado;
- creative coding cuando aporte algo real;
- motion intencional;
- sofisticación desktop;
- versión mobile realmente diseñada;
- performance defendible;
- accesibilidad;
- degradación progresiva;
- arquitectura técnica sobria.

La página **no** debe convertirse en:

- SaaS premium genérico;
- landing de IA;
- glassmorphism;
- “Palantir falso”;
- dashboard decorativo;
- cyberpunk;
- sci-fi stock;
- colección de efectos;
- escaparate de librerías.

La meta no es parecer más tecnológica. La meta es que Dixios tenga **autoría visual propia**.

---

# 2. FUENTE DE VERDAD VISUAL: BASELINE LOCK

Los screenshots suministrados por el usuario el 5 de septiembre de 2026 son la autoridad visual inicial.

No son inspiración. No son referencias opcionales. Son el conjunto que debe superarse.

Nombre oficial:

```text
BASELINE_2026_09_05
```

## 2.1 Baselines

| ID | Sección | Archivo obligatorio |
|---|---|---|
| `S00` | Hero | `dixios-loop/screenshots/baseline/S00-HERO.png` |
| `S01` | Sistema / Complejidad | `dixios-loop/screenshots/baseline/S01-SYSTEM.png` |
| `S02` | Capacidades | `dixios-loop/screenshots/baseline/S02-CAPABILITIES.png` |
| `S03` | Ciclo | `dixios-loop/screenshots/baseline/S03-CYCLE.png` |
| `S04` | Operación / Territorio | `dixios-loop/screenshots/baseline/S04-OPERATIONS.png` |
| `S05` | Publicaciones / Cierre | `dixios-loop/screenshots/baseline/S05-PUBLICATIONS.png` |

## 2.2 Bootstrap obligatorio

Antes de ejecutar el primer loop:

- [ ] Copiar los seis screenshots exactos al repositorio en las rutas anteriores.
- [ ] No recrearlos.
- [ ] No redibujarlos.
- [ ] No sustituirlos por screenshots de la versión de código.
- [ ] Registrar dimensiones de cada archivo.
- [ ] Registrar SHA-256 de cada baseline.
- [ ] Crear `dixios-loop/BASELINE.md` con esos hashes.
- [ ] Establecer `baseline_locked: true` únicamente después de verificar los seis archivos.

Si falta uno de los seis baselines:

```text
STOP_REASON = BASELINE_MISSING
```

La IA no puede continuar.

## 2.3 Único criterio visual inicial

Al comenzar una sección:

> **Este screenshot es la pieza que debemos superar.**

Nada más.

No se asigna score. No se establece un “8/10”. No se inventa otra referencia como sustituto.

---

# 3. ÚNICO CRITERIO VISUAL FINAL

Al terminar una iteración visual se hace únicamente esta pregunta:

```text
¿La nueva versión se ve claramente mejor que el screenshot baseline correspondiente?
```

Respuesta válida:

```text
YES
NO
```

Si la respuesta no es un **YES inequívoco**, la sección no pasa.

No existe:

- “casi”;
- “empate técnico”;
- “mejor en algunas cosas”;
- “8.7/10”;
- “prometedora”;
- “suficiente para v1”.

Todo eso equivale a:

```text
NO
```

---

# 4. REGLAS VISUALES ESPECÍFICAS YA CONGELADAS POR EL USUARIO

## 4.1 S00 — Hero

México debe tener mayor presencia visual dentro del mundo/globo.

No basta con:

- un punto más brillante;
- un label;
- un pequeño marcador.

Debe percibirse más grande, más cercano o más importante.

Soluciones válidas a investigar:

- magnificación local;
- lens field;
- distorsión localizada;
- densidad superior de puntos;
- doble capa;
- cámara orientada a México;
- escala local no literal;
- ampliación de una región dentro del globe;
- composición de globo + detalle;
- point-cloud enfocado en México.

Prueba humana simple:

> En menos de un segundo debe ser posible ubicar México como foco relevante de la composición.

No es obligatorio respetar escala cartográfica estricta en el hero. Es una pieza de dirección artística, no un mapa analítico.

## 4.2 S04 — Operación / Territorio

Queda prohibido representar esta sección con un mapa literal de México.

Prohibido:

```text
silueta del país
estados dibujados literalmente
dashboard con México al centro
mapa administrativo tradicional
```

La sección debe expresar territorio/operación mediante abstracción:

- topologías;
- regiones;
- celdas;
- zonas;
- señales;
- rutas;
- relaciones;
- eventos;
- clusters;
- densidad;
- fricción;
- cobertura conceptual;
- capas;
- pulsos;
- estados operativos.

Puede ser data art. Puede ser una interfaz abstracta. Puede ser una topología. Puede ser un campo territorial.

Pero no un mapa literal de México.

## 4.3 Ubicación institucional

No afirmar que Dixios es “de Monterrey”.

No inventar ciudad, estado, sede, oficina o cobertura.

Si un dato geográfico no está confirmado por una fuente del proyecto, no se publica.

---

# 5. CONTENIDO QUE NO DEBE FALSEARSE

Está prohibido inventar para que el diseño “parezca inteligente”:

- porcentajes;
- clientes;
- municipios monitoreados;
- ahorros;
- resultados;
- tiempos;
- número de proyectos;
- volumen de datos;
- cobertura territorial;
- métricas;
- KPIs;
- mapas de clientes;
- casos reales inexistentes;
- citas;
- logos de instituciones;
- cifras en dashboards.

Una visualización puede ser:

1. **artística**, dejando claro que es abstracta; o
2. **informativa**, si sus datos y relaciones son reales.

Queda prohibido el híbrido: una visualización que parece representar datos reales, pero cuyos números y relaciones fueron inventados para decorar.

---

# 6. ARQUITECTURA DE LOOP ENGINEERING

El loop se separa en roles.

```text
BASELINE LOCK
      ↓
CONTROLLER
      ↓
┌──────────────┬───────────────┬───────────────┐
│ RESEARCHER   │ WORKER        │ VERIFIER      │
│ concepto     │ implementación│ build/browser │
│ visual       │ código        │ performance   │
│ técnico      │ assets        │ QA técnico    │
└──────┬───────┴───────┬───────┴───────┬───────┘
       │               │               │
       └───────────────┴───────────────┘
                       ↓
                 PLAYWRIGHT
                 screenshots
                       ↓
                 VISUAL JUDGE
                       ↓
                ┌──────┴──────┐
                │             │
                NO            YES
                │             │
             ROUTE          PASS
                │
                └──────→ LOOP
```

## 6.1 Controller

Responsabilidades:

- leer `STATE.json`;
- comprobar que el estado corresponde a archivos reales;
- decidir la siguiente acción;
- seleccionar una sola tarea;
- no editar la sección directamente si existe Worker separado;
- recibir resultados de Researcher / Worker / Verifier;
- decidir la ruta cuando existe un fallo;
- impedir loops infinitos;
- escalar a humano cuando corresponde.

El Controller nunca marca visualmente una sección como terminada por intuición.

## 6.2 Researcher

Responsabilidades:

- análisis conceptual;
- visual research;
- investigación técnica;
- búsqueda de documentación oficial;
- búsqueda de repos;
- búsqueda de ejemplos;
- búsqueda de issues;
- búsqueda de Reddit / foros especializados;
- comparación de herramientas.

No escribe código de producción durante las fases 1–4.

## 6.3 Worker

Responsabilidades:

- implementar la tarea exacta asignada;
- modificar únicamente archivos relevantes;
- respetar decisiones investigadas;
- no añadir dependencias no aprobadas;
- no marcar su propio trabajo como terminado;
- mantener fallbacks y responsive.

## 6.4 Verifier

Responsabilidades:

- instalar dependencias;
- compilar;
- abrir página;
- capturar errores;
- revisar overflow;
- revisar rutas;
- revisar mobile;
- revisar reduced motion;
- revisar recursos;
- ejecutar Playwright;
- generar artifacts;
- marcar `technical_pass`.

El Verifier no emite juicios de taste.

## 6.5 Visual Judge

Recibe únicamente:

- baseline;
- candidato.

No recibe:

- número de iteración;
- tiempo invertido;
- código;
- tecnologías;
- explicación del Worker;
- hype;
- dificultad;
- “esto usa WebGL”.

Su tarea es elegir cuál se ve mejor.

---

# 7. ESTADO PERSISTENTE

Crear:

```text
dixios-loop/STATE.json
```

Formato:

```json
{
  "schema_version": 1,
  "project": "DIXIOS_WEB",
  "baseline_id": "BASELINE_2026_09_05",
  "baseline_locked": false,
  "current_section": "S00",
  "global_status": "ACTIVE",
  "limits": {
    "max_attempts_per_section": 12,
    "max_consecutive_technical_failures": 3,
    "max_same_failure_route": 3
  },
  "sections": {
    "S00": {
      "name": "Hero",
      "attempt": 0,
      "phase": "ANALYZE",
      "analysis_done": false,
      "concept_locked": false,
      "visual_research_done": false,
      "tech_research_done": false,
      "implemented": false,
      "screenshots_ready": false,
      "technical_pass": false,
      "judge_pass_order_a": false,
      "judge_pass_order_b": false,
      "visually_better_than_baseline": false,
      "status": "PENDING",
      "failure_route_count": 0,
      "last_failure_route": null,
      "last_diagnosis": null,
      "candidate_commit": null
    },
    "S01": { "name": "System", "status": "PENDING" },
    "S02": { "name": "Capabilities", "status": "PENDING" },
    "S03": { "name": "Cycle", "status": "PENDING" },
    "S04": { "name": "Operations", "status": "PENDING" },
    "S05": { "name": "Publications", "status": "PENDING" }
  }
}
```

## 7.1 Propiedad de campos

Researcher puede actualizar:

```text
analysis_done
concept_locked
visual_research_done
tech_research_done
```

Worker puede actualizar:

```text
implemented
candidate_commit
```

Verifier puede actualizar:

```text
screenshots_ready
technical_pass
```

Visual Judge puede actualizar:

```text
judge_pass_order_a
judge_pass_order_b
```

Nadie escribe manualmente:

```text
visually_better_than_baseline
status = DONE
```

Se derivan:

```text
visually_better_than_baseline =
judge_pass_order_a == true
AND
judge_pass_order_b == true
```

Y:

```text
DONE =
technical_pass == true
AND
visually_better_than_baseline == true
```

---

# 8. ESTRUCTURA DE ARCHIVOS

Crear:

```text
dixios-loop/
│
├── MASTER.md
├── GLOBAL_RULES.md
├── BASELINE.md
├── STATE.json
│
├── sections/
│   ├── S00-HERO.md
│   ├── S01-SYSTEM.md
│   ├── S02-CAPABILITIES.md
│   ├── S03-CYCLE.md
│   ├── S04-OPERATIONS.md
│   └── S05-PUBLICATIONS.md
│
├── research/
│   ├── global/
│   ├── S00/
│   ├── S01/
│   ├── S02/
│   ├── S03/
│   ├── S04/
│   └── S05/
│
├── screenshots/
│   ├── baseline/
│   └── iterations/
│       ├── S00/
│       ├── S01/
│       ├── S02/
│       ├── S03/
│       ├── S04/
│       └── S05/
│
├── artifacts/
│
├── learnings/
│   └── LEARNINGS.md
│
└── logs/
```

Runtime logs pueden ir en `.gitignore`.

Los baselines nunca se ignoran.

---

# 9. SECUENCIA GLOBAL

Orden de ejecución:

```text
BOOTSTRAP
  ↓
S00 HERO
  ↓
S01 SYSTEM
  ↓
S02 CAPABILITIES
  ↓
S03 CYCLE
  ↓
S04 OPERATIONS
  ↓
S05 PUBLICATIONS
  ↓
FULL PAGE INTEGRATION QA
  ↓
HUMAN REVIEW
  ↓
READY FOR DEPLOY
```

No trabajar dos secciones simultáneamente salvo autorización expresa.

---

# 10. LOOP DE 7 FASES POR SECCIÓN

Cada sección pasa exactamente por estas siete fases.

---

## FASE 01 — ANALYZE

### Input

- baseline screenshot;
- código de la sección actual;
- contexto institucional relevante;
- contenido de la sección;
- reglas globales.

### Proceso

Documentar únicamente:

1. qué hace la sección;
2. qué comunica;
3. qué elementos visuales utiliza;
4. qué elementos son semánticos;
5. qué elementos son decorativos;
6. qué relaciones existen entre copy y gráfico;
7. qué partes del baseline deben preservarse;
8. qué limitaciones tiene la implementación actual;
9. qué parte tiene mayor potencial visual.

No proponer solución todavía.

### Output

```text
dixios-loop/research/SXX/01-ANALYSIS.md
```

### Estado

```text
analysis_done = true
phase = CONCEPT_RESEARCH
```

---

## FASE 02 — CONCEPT RESEARCH

Pregunta central:

> ¿Qué significa realmente esta sección y qué transformación conceptual debe percibir el visitante?

No preguntar todavía:

> ¿qué efecto se ve cool?

### Debe investigar

Según la sección:

- systems thinking;
- cybernetics;
- decision systems;
- knowledge transformation;
- information theory;
- organizational design;
- operational workflows;
- territory as system;
- coordination;
- signal/noise;
- evidence;
- modeling;
- simulation;
- learning;
- capability diffusion;
- editorial thought.

### Output obligatorio

```text
CORE IDEA:
...

VERB:
...

INPUT STATE:
...

TRANSFORMATION:
...

OUTPUT STATE:
...

WHAT THE VISITOR SHOULD UNDERSTAND WITHOUT READING THE EXPLANATION:
...
```

Archivo:

```text
dixios-loop/research/SXX/02-CONCEPT.md
```

### Gate

No pasar a visual research hasta poder explicar la sección en una frase sin utilizar:

```text
innovador
futurista
tecnológico
premium
inteligente
dinámico
```

Esas palabras describen estilo, no concepto.

### Estado

```text
concept_locked = true
phase = VISUAL_RESEARCH
```

---

## FASE 03 — VISUAL RESEARCH

Objetivo: buscar maneras visuales de expresar el concepto definido en la fase anterior.

No limitar la investigación a websites.

### Fuentes obligatorias a explorar cuando sean pertinentes

- Pinterest;
- Godly;
- HOVERSTAT.ES;
- Awwwards;
- Codrops;
- GSAP Showcase;
- HUDS+GUIS;
- Interface In Game;
- motion studios;
- game UI;
- design studios;
- data art;
- scientific visualization;
- generative design;
- editorial design;
- cartography;
- technical manuals;
- cybernetics diagrams;
- early computing graphics;
- ASCII/textmode;
- pixel/dither;
- industrial graphics;
- stencil;
- chrome/material studies;
- motion graphics;
- experimental typography.

### Pinterest query bank

No buscar únicamente:

```text
tech web design
```

Combinar búsquedas:

```text
computational typography
generative typography
shader graphic design
GLSL art
machine vision graphic design
procedural graphics
data art direction
industrial graphic design
technical manual graphic design
machine schematic design
stencil typography
control room graphics
aerospace manual design
ASCII graphic design
terminal typography
CRT interface
command line art
bitmap typography
textmode design
chrome typography
metallic graphic design
3D chrome editorial
xerox typography
halftone editorial
scanner art
dither graphic design
cybernetics diagram
systems theory diagram
network science poster
feedback loop graphic design
occult diagram typography
hermetic diagram design
technical cartography
topographic graphic design
experimental web design
interactive typography website
creative developer portfolio
WebGL editorial website
digital art direction web
Mexico 68 graphic identity
Lance Wyman Mexico
Eduardo Terrazas graphic design
Mexican modernist poster
```

### Research artifacts

Guardar por sección:

```text
03-VISUAL-RESEARCH.md
references/
```

Cada referencia debe registrar:

```text
URL:
SOURCE:
DATE_CHECKED:
WHY_RELEVANT:
WHAT_CAN_TRANSFER:
WHAT_MUST_NOT_BE_COPIED:
```

### Regla de screenshots

La investigación visual no se considera completa si únicamente contiene links y texto.

Debe guardar screenshots o thumbnails suficientes para comparar visualmente.

### Estado

```text
visual_research_done = true
phase = TECH_RESEARCH
```

---

## FASE 04 — TECH / CODE RESEARCH

Regla:

> NO INVENTAR CÓDIGO COMPLEJO ANTES DE BUSCAR SI ALGUIEN YA RESOLVIÓ EL MISMO PROBLEMA O UNA PARTE IMPORTANTE DEL PROBLEMA.

### Orden obligatorio de fuentes

1. documentación oficial;
2. repositorio oficial;
3. ejemplos/demos oficiales;
4. repos de desarrolladores reconocibles;
5. issues/discussions del repo;
6. artículos técnicos;
7. Codrops / creative engineering;
8. Reddit / foros especializados;
9. Stack Overflow si el problema es específico;
10. experimentación propia.

### Para cada idea visual investigar mínimo tres enfoques

Ejemplo:

```text
IDEA:
Campo de datos que se convierte en estructura.

OPTION A:
SVG + GSAP

OPTION B:
Canvas 2D

OPTION C:
OGL/WebGL shader
```

Comparar:

```text
transfer size
runtime cost
mobile behavior
accessibility
fallback complexity
implementation complexity
maintenance
browser support
visual ceiling
```

### Matriz obligatoria

```markdown
| Option | Transfer | Runtime | Mobile | Fallback | Complexity | Visual ceiling |
|---|---:|---:|---|---|---|---|
| A | ... | ... | ... | ... | ... | ... |
| B | ... | ... | ... | ... | ... | ... |
| C | ... | ... | ... | ... | ... | ... |
```

La selección se justifica técnicamente.

### Due diligence antes de añadir una dependencia

Registrar:

```text
NAME:
VERSION:
OFFICIAL_URL:
REPOSITORY:
LICENSE:
LAST_RELEASE:
MAINTENANCE_ACTIVITY:
BUNDLE_COST:
BROWSER_REQUIREMENTS:
MOBILE_NOTES:
KNOWN_ISSUES:
WHY_NEEDED:
WHY_NATIVE/CSS/SVG_IS_NOT_ENOUGH:
FALLBACK:
```

Si no se completa esta ficha:

```text
DEPENDENCY_APPROVED = false
```

### Estado

```text
tech_research_done = true
phase = BUILD
```

---

## FASE 05 — BUILD

### Regla de scope

Un loop modifica una sola sección.

No:

```text
mejorar Hero + footer + fuentes + otras tres cosas
```

Sí:

```text
TASK = S01 / attempt 03 / system transformation visual
```

### Antes de editar

Ejecutar:

```bash
git status
git rev-parse HEAD
```

Registrar commit base.

### Branch recomendado

```text
loop/S00-hero
loop/S01-system
loop/S02-capabilities
...
```

### Commit por attempt

Formato:

```text
loop(S00): attempt 01 hero field
loop(S00): attempt 02 mexico lens
loop(S00): attempt 03 refined motion
```

Al finalizar la sección puede hacerse squash merge si se desea conservar main limpio.

### Reglas de implementación

1. Progressive enhancement.
2. HTML/CSS/SVG primero.
3. Canvas si aporta densidad o generatividad.
4. WebGL si aporta algo imposible o claramente superior.
5. No añadir React porque sí.
6. No añadir un motor adicional si una herramienta existente resuelve el problema.
7. No introducir smooth scroll sin necesidad demostrada.
8. No introducir fake data.
9. Motion debe poder desactivarse/reducirse.
10. Debe existir fallback si el efecto principal depende de GPU.

### Estado

```text
implemented = true
phase = VERIFY
```

---

## FASE 06 — RENDER / TECH VERIFY / SCREENSHOT

Esta fase no evalúa estética.

Evalúa si el candidato es técnicamente válido.

### Build

Desde clean install cuando corresponda:

```bash
npm ci
npm run build
```

Si no existe lockfile válido:

```text
TECH_FAIL
```

### Auditoría de dependencias

```bash
npm audit
```

Si el npm actual soporta firmas/provenance en el flujo configurado, ejecutar también la verificación pertinente.

No actualizar dependencias automáticamente para “silenciar” warnings. Investigar primero.

### Dev preview

En Codespaces:

```bash
npm run dev
```

Abrir puerto 4321 mediante GitHub Codespaces.

Mientras exista:

```js
base: "/webdixios"
```

la ruta esperada es:

```text
https://<codespace>-4321.app.github.dev/webdixios/
```

No confundir 404 de `/` con fallo de la aplicación.

### Playwright

Añadir/configurar Playwright para:

- desktop;
- mobile;
- screenshots;
- overflow;
- console errors;
- visual regression técnica;
- capturas reproducibles.

### Entorno de captura fijo

Para los pairwise screenshots:

```text
browser = Chromium
DPR = 1
fonts = local/repo
animations = deterministic capture point
OS/container = fixed
browser_version = pinned when possible
```

La captura del candidato debe tener el mismo crop/aspect/dimensiones que el baseline correspondiente.

No comparar un baseline de sección recortada contra una full page.

### Capturas técnicas adicionales

Aunque el visual baseline sea desktop, capturar también:

```text
Desktop wide
Laptop
Tablet
Mobile 390×844
```

No se les asigna score estético.

Se utilizan para verificar que la sección no colapse.

### Checks técnicos

```text
[ ] BUILD_PASS
[ ] NO_CONSOLE_ERRORS
[ ] NO_UNHANDLED_REJECTIONS
[ ] NO_HORIZONTAL_OVERFLOW
[ ] LINKS_NOT_BROKEN
[ ] ASSETS_NOT_404
[ ] DESKTOP_RENDERED
[ ] TABLET_RENDERED
[ ] MOBILE_RENDERED
[ ] REDUCED_MOTION_RENDERED
[ ] GPU_FALLBACK_RENDERED_IF_APPLICABLE
[ ] NO_OBVIOUS_LAYOUT_SHIFT
[ ] PERFORMANCE_NOT_REGRESSED_BEYOND_BUDGET
```

### Output

```text
dixios-loop/screenshots/iterations/SXX/attempt-N/
```

Debe contener:

```text
candidate-baseline-size.png
desktop.png
tablet.png
mobile.png
reduced-motion.png
TECH-REPORT.md
```

### Estado

```text
screenshots_ready = true
technical_pass = true
phase = VISUAL_JUDGE
```

Si falla:

```text
technical_pass = false
phase = BUILD
```

No mandar un candidato roto al Visual Judge.

---

## FASE 07 — PAIRWISE VISUAL JUDGE

Esta es la única fase que decide si visualmente quedó mejor.

### Pass A

Input:

```text
LEFT  = BASELINE
RIGHT = CANDIDATE
```

Pregunta exacta:

```text
Which of these two designs is visually stronger, more distinctive,
more accomplished and more appropriate as high-end web art direction
for the same Dixios section?

Do not reward complexity, number of effects, WebGL, animation technology
or novelty by itself.

Judge only the visible design.

Return exactly:
WINNER: LEFT | RIGHT | TIE

If BASELINE or TIE wins, add:
FAILURE_DIAGNOSIS: one concise explanation of the main visual reason.
```

Candidate pasa A únicamente si:

```text
WINNER = RIGHT
```

### Pass B — orden invertido

Input:

```text
LEFT  = CANDIDATE
RIGHT = BASELINE
```

Misma pregunta.

Candidate pasa B únicamente si:

```text
WINNER = LEFT
```

### Resultado

```text
VISUAL_PASS =
PASS_A == candidate
AND
PASS_B == candidate
```

Si:

- empata;
- el juez duda;
- cambia de opinión al invertir orden;
- baseline gana una vez;

resultado:

```text
VISUAL_PASS = false
```

### Regla importante

El Visual Judge no conoce cuál es “nuevo”.

No decirle:

```text
este es nuestro nuevo diseño
```

Usar nombres neutrales:

```text
LEFT
RIGHT
```

### Human override

Únicamente el usuario puede forzar:

```text
HUMAN_OVERRIDE = PASS
```

La IA no.

---

# 11. ROUTING DESPUÉS DE UN FAIL

Cuando candidate no gana, no reiniciar ciegamente desde cero.

El Controller clasifica la causa.

## ROUTE = CONCEPT_RESEARCH

Usar cuando:

- el visual es llamativo pero expresa la idea incorrecta;
- la metáfora no funciona;
- el gráfico no comunica el significado;
- se volvió decorativo.

Volver a Fase 02.

## ROUTE = VISUAL_RESEARCH

Usar cuando:

- concepto correcto;
- composición floja;
- resultado genérico;
- falta autoría;
- baseline visualmente sigue siendo mejor.

Volver a Fase 03.

## ROUTE = TECH_RESEARCH

Usar cuando:

- idea y dirección son buenas;
- implementación no alcanza el efecto;
- rendering barato/torpe;
- técnica elegida limita el resultado.

Volver a Fase 04.

## ROUTE = BUILD

Usar cuando:

- diseño elegido funciona;
- problema es craft;
- spacing;
- layout;
- responsive;
- bugs;
- motion;
- refinamiento.

Volver a Fase 05.

---

# 12. STOPPING CONDITIONS Y ESCALATION

Configurar:

```text
MAX_ATTEMPTS_PER_SECTION = 12
MAX_CONSECUTIVE_TECH_FAILURES = 3
MAX_SAME_FAILURE_ROUTE = 3
```

## Escalation A

Si hay tres technical failures seguidos:

```text
STATUS = ESCALATE_TECH
```

El Controller debe:

- detener iteraciones estéticas;
- investigar causa técnica;
- resumir los tres fallos;
- proponer arquitectura alternativa.

## Escalation B

Si la misma ruta de fail ocurre tres veces:

```text
STATUS = ESCALATE_CONCEPT
```

No seguir afinando el mismo diseño.

Volver a plantear concepto/dirección.

## Escalation C

Si llega a attempt 12 sin PASS:

```text
STATUS = HUMAN_REVIEW_REQUIRED
```

Entregar:

- baseline;
- mejor candidato;
- últimos tres candidatos;
- diagnósticos;
- research acumulado;
- bloqueo técnico/visual.

No continuar indefinidamente.

---

# 13. FRESH CONTEXT POR ITERACIÓN

Cada nueva ejecución del Worker debe recibir únicamente:

```text
MASTER.md
GLOBAL_RULES.md
STATE.json
SECTION.md
baseline screenshot
latest candidate screenshot
latest diagnosis
relevant research docs
relevant code files
```

No cargar el historial completo de todos los attempts si no es necesario.

La memoria del proyecto vive en archivos y Git, no en una conversación infinita.

---

# 14. LEARNINGS PERSISTENTES

Después de cada sección aprobada añadir a:

```text
dixios-loop/learnings/LEARNINGS.md
```

Formato:

```markdown
## S00 Hero

### What worked
...

### What repeatedly failed
...

### Tools worth reusing
...

### Performance findings
...

### Patterns that belong to Dixios
...

### Patterns that must not be reused automatically
...
```

Las learnings informan las secciones siguientes, pero no sustituyen su research conceptual/visual específico.

---

# 15. PRINCIPIOS TÉCNICOS DEL PROYECTO

## 15.1 Base

Preferencia:

```text
Astro
TypeScript
HTML
CSS
SVG
GSAP
```

## 15.2 Jerarquía de rendering

Antes de añadir una capa más pesada:

```text
CSS
↓
SVG
↓
Canvas 2D
↓
OGL/WebGL/Three
```

No es una prohibición. Es una regla de justificación.

Si WebGL produce una diferencia visual realmente importante, usarlo.

Si CSS/SVG consigue el resultado con menor coste, usar CSS/SVG.

## 15.3 React

No utilizar React como base de la página.

Astro debe seguir renderizando estático el contenido que no necesita runtime.

React/R3F solamente si una escena concreta realmente se beneficia de ello.

## 15.4 Smooth scroll

Native scroll por defecto.

No instalar Lenis o equivalente únicamente porque “las webs creativas lo usan”.

Cualquier smooth scrolling debe:

- resolver una necesidad concreta;
- probarse en Safari móvil;
- probarse con touch;
- no romper anchors;
- no afectar accesibilidad.

---

# 16. PERFORMANCE BUDGETS DEL PROYECTO

Estos son presupuestos internos de Dixios, no estándares universales.

## 16.1 Frame math

A 60 FPS:

```text
1000 / 60 = 16.67 ms por frame
```

Objetivo:

```text
main-thread scripting promedio <= 4 ms
render/paint promedio <= 6 ms
headroom >= 6 ms
```

No es necesario alcanzar 60 FPS en todo momento si el visual no está animando, pero la interacción no debe sentirse bloqueada.

## 16.2 Pixel cost

Recordatorio:

```text
physicalPixels = CSS_width × CSS_height × DPR²
```

Ejemplo:

```text
700 × 700 × DPR 2
= 1,960,000 pixels
```

Con DPR 1.35:

```text
700 × 700 × 1.35²
≈ 893,025 pixels
```

Reducción aproximada:

```text
1 - 893025 / 1960000
≈ 54.4%
```

Por ello:

```text
desktop animated canvas DPR target <= 1.5
mobile animated canvas DPR target <= 1.25
```

Subir solo si profiling demuestra margen.

## 16.3 Initial JS

Soft target:

```text
initial JS <= 180 KB gzipped
```

Si se excede:

- documentar por qué;
- identificar chunk;
- lazy-load;
- dynamic import;
- reemplazar librería cuando tenga sentido.

## 16.4 Fonts

Objetivo:

```text
critical fonts <= 200 KB transfer
```

Evitar familias completas si se usan 2 pesos.

## 16.5 LCP visual

Objetivo de asset principal:

```text
<= 350 KB transfer
```

Si el hero necesita más:

- poster/fallback ligero primero;
- capa GPU después.

## 16.6 First viewport

Mobile first-view target:

```text
<= 1.5 MB transfer
```

Incluyendo:

- HTML;
- CSS;
- JS inicial;
- fuentes;
- LCP.

Recursos creativos de secciones inferiores deben cargar al acercarse al viewport.

## 16.7 WebGL

Reglas:

- máximo un canvas GPU pesado visible a la vez;
- detener RAF offscreen;
- detener RAF con `document.hidden`;
- respetar `prefers-reduced-motion`;
- respetar `Save-Data` cuando sea viable;
- liberar recursos;
- evitar DPR 2 indiscriminado;
- fallback obligatorio.

---

# 17. CORE WEB VITALS

Objetivos externos:

```text
LCP <= 2.5 s
INP <= 200 ms
CLS <= 0.1
```

Evaluar en percentil 75 cuando existan datos reales de campo.

Lighthouse/lab se usa como regresión, no como sustituto de métricas reales.

---

# 18. RESPONSIVE

Mobile no es:

```text
desktop * 0.5
```

Cada sección debe definir explícitamente:

```text
DESKTOP_COMPOSITION
TABLET_COMPOSITION
MOBILE_COMPOSITION
```

Si un gráfico pierde significado al reducirse:

- reestructurarlo;
- dividirlo;
- cambiar representación;
- reducir densidad;
- transformar horizontal → vertical;
- eliminar detalles secundarios;
- sustituir interacción por estados más directos.

No conservar una visualización ilegible por fidelidad al desktop.

---

# 19. MOTION

Motion debe corresponder a un verbo.

Ejemplos permitidos:

```text
fragmentar
agrupar
clasificar
filtrar
alinear
conectar
transferir
revelar
propagar
materializar
desmaterializar
ampliar
comprimir
mapear
corregir
```

Evitar:

```text
fade porque sí
parallax porque sí
rotación porque sí
float infinito porque sí
glow porque sí
```

## Reduced motion

No convertir automáticamente todo en:

```css
animation: none;
```

Cuando sea posible conservar la información:

```text
FULL:
fragmentos viajan y se reorganizan

REDUCED:
fragmentos aparecen ya reorganizados
```

La información permanece. La coreografía se reduce.

## 19.1 Requisito de movimiento / comportamiento visual

Los gráficos principales no deben sentirse como ilustraciones muertas si el concepto permite comportamiento.

Por defecto, cada una de las secciones `S00`–`S04` debe investigar al menos **una respuesta visual significativa**. No es obligatorio que sea pesada, continua ni WebGL.

Ejemplos válidos:

```text
hover que revela relaciones
cursor que altera localmente el sistema
scroll que transforma un estado en otro
pulsos event-driven
rutas que se activan
glifos que se clasifican
ASCII/dither que aparece al procesar
capas que se alinean
señales que se propagan
microparallax local
una pieza estática que cambia de estado de forma discreta
```

Regla:

> Si el movimiento no mejora significado, jerarquía, materialidad o sensación de sistema vivo, no se añade.

Preferencia:

```text
microinteracción ligera
> animación procedural localizada
> canvas continuo
> WebGL permanente
```

Cada sección debe documentar:

```text
MOTION_PURPOSE:
TRIGGER:
ACTIVE_DURATION:
OFFSCREEN_BEHAVIOR:
MOBILE_VARIANT:
REDUCED_MOTION_VARIANT:
ESTIMATED_RUNTIME_COST:
```

Un gráfico puede permanecer completamente estático únicamente cuando la decisión sea deliberada y el Researcher explique por qué el movimiento no aportaría valor.

---

# 20. FUENTES OFICIALES OBLIGATORIAS

## Astro

Deploy GitHub Pages  
https://docs.astro.build/en/guides/deploy/github/

Islands architecture  
https://docs.astro.build/en/concepts/islands/

View transitions  
https://docs.astro.build/en/guides/view-transitions/

Scripts  
https://docs.astro.build/en/guides/client-side-scripts/

Configuration  
https://docs.astro.build/en/reference/configuration-reference/

## Vite

Server options / allowedHosts / strictPort  
https://vite.dev/config/server-options

## GitHub Pages

Custom workflows  
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Limits  
https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

Custom domains  
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

Domain verification  
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## GitHub Actions

Secure use  
https://docs.github.com/en/actions/reference/security/secure-use

## Codespaces

Forwarding ports  
https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace

Troubleshooting port forwarding  
https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-port-forwarding-for-github-codespaces

## GSAP

ScrollTrigger  
https://gsap.com/docs/v3/Plugins/ScrollTrigger/

GSAP docs  
https://gsap.com/docs/v3/

## MDN

Scroll-driven animations  
https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations

content-visibility  
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility

View Transition API  
https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API

prefers-reduced-motion  
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

OffscreenCanvas  
https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

backdrop-filter  
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter

mix-blend-mode  
https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode

SVG filters  
https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/filter

## Three.js

Docs  
https://threejs.org/docs/

Disposal  
https://threejs.org/manual/en/how-to-dispose-of-objects.html

Cleanup  
https://threejs.org/manual/en/cleanup.html

GLTFLoader  
https://threejs.org/docs/pages/GLTFLoader.html

KTX2Loader  
https://threejs.org/docs/pages/KTX2Loader.html

DRACOLoader  
https://threejs.org/docs/pages/DRACOLoader.html

## React Three Fiber

Performance  
https://r3f.docs.pmnd.rs/advanced/scaling-performance

## Playwright

Visual comparisons  
https://playwright.dev/docs/test-snapshots

Screenshots  
https://playwright.dev/docs/screenshots

## Web performance

Core Web Vitals  
https://web.dev/articles/vitals

## npm

npm audit  
https://docs.npmjs.com/cli/commands/npm-audit/

---

# 21. LOOP ENGINEERING / AGENT ENGINEERING

## LoopArena

Paper:  
https://arxiv.org/abs/2608.28281

Repository:  
https://github.com/AMAP-ML/LoopArena

Ideas relevantes:

- Controller separado del Worker;
- estado estructurado;
- loops largos fallan aunque Worker sea capaz;
- verificar antes de parar;
- no confiar ciegamente en progress notes;
- asignar siguiente acción mediante un contrato explícito.

## Loop Engineering: Building Blocks, Adoption, and Impact

https://arxiv.org/abs/2608.21884

Ideas relevantes:

- machine-checkable stop conditions;
- persistent state;
- verifier sub-agents;
- budgets;
- escalation humana;
- loops definidos alrededor del agente.

## Ralph Wiggum implementations

Fresh context / one task / one commit:  
https://github.com/wavilikhin/ralph-wiggum

Stop hooks / completion criteria:  
https://github.com/upneja/ralph-wiggum

Usarlos como referencia arquitectónica, no instalar automáticamente.

---

# 22. MULTIMODAL UI JUDGING

Paper:

https://arxiv.org/abs/2510.08783

Uso en Dixios:

- Visual Judge como evaluador temprano;
- no reemplaza juicio humano final;
- usar comparación por pares;
- aislarlo del proceso;
- invertir posiciones para detectar inconsistencia.

Si los resultados son ambiguos:

```text
FAIL
```

No forzar PASS.

---

# 23. CREATIVE ENGINEERING / IMPLEMENTATION RESEARCH

## Codrops

Home / demos:  
https://tympanus.net/codrops/

Vercel Prism / vgpu:  
https://tympanus.net/codrops/2026/09/03/from-rays-to-meshes-building-vercels-prism-with-vgpu/

Real-time ASCII / dithering:  
https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/

Datamosh / Three:  
https://tympanus.net/codrops/2026/09/02/breaking-the-frame-building-a-real-time-datamosh-effect-with-three-js/

Depth relighting:  
https://tympanus.net/codrops/2026/08/19/relighting-images-with-depth-maps-and-three-js/

No copiar el efecto porque es cool. Usar como investigación de técnica.

---

# 24. CREATIVE CODING TOOL REGISTRY

Ninguna herramienta es obligatoria. El Researcher debe seleccionar sólo las necesarias.

## textmode.js

Repo:  
https://github.com/humanbydefinition/textmode.js

Use cases:

- ASCII;
- bitmap/textmode;
- machine-vision aesthetics;
- dynamic text rasterization;
- custom GLSL filters.

Consideraciones:

- WebGL2;
- fallback obligatorio;
- útil para Datos + IA o editorial;
- no convertir todo el site en terminal.

## OGL

Repo:  
https://github.com/oframe/ogl

Use cases:

- shaders;
- small WebGL scenes;
- custom rendering;
- cuando Three sea excesivo.

Ventaja:

- abstracción mínima;
- modular;
- orientado a desarrolladores cómodos con shaders/WebGL.

## shader-web-background

Repo:  
https://github.com/xemantic/shader-web-background

Use cases:

- fragment shaders;
- multipass;
- feedback loops;
- backgrounds generativos.

Investigar licencia antes de incorporar.

## cables.gl

Docs:  
https://cables.gl/docs/docs

Standalone:  
https://cables.gl/standalone

Use cases:

- prototipar creative coding;
- motion;
- 3D;
- interactions;
- experimentar antes de escribir renderer manual.

Puede utilizarse como laboratorio aunque el resultado final se reimplemente.

## Cobe

Repo:  
https://github.com/shuding/cobe

Use cases:

- globe ligero;
- hero global;
- point globe.

No asumir que Cobe es suficiente para el requisito México-grande.

Puede requerir custom geometry, overlay o técnica alternativa.

## PixiJS

https://pixijs.com/

Use cases:

- 2D GPU;
- grandes cantidades de sprites;
- fields;
- particles;
- compositing.

## D3

https://d3js.org/

Use cases:

- layouts;
- force;
- scales;
- geometry;
- data transforms.

No usar estilo D3 por defecto. Utilizar D3 como motor de cálculo cuando sea útil.

## p5.js

https://p5js.org/

Use cases:

- prototipado generativo;
- sketches;
- investigación visual rápida.

No necesariamente shipping runtime.

## Paper.js

http://paperjs.org/

Use cases:

- vector generativo;
- paths;
- geometry.

## Flubber

https://github.com/veltman/flubber

Use cases:

- morphing SVG.

Revisar mantenimiento/compatibilidad antes de instalar.

---

# 25. VISUAL RESEARCH SOURCES

Pinterest  
https://www.pinterest.com/

Godly  
https://godly.website/

HOVERSTAT.ES  
https://www.hoverstat.es/

Awwwards  
https://www.awwwards.com/

GSAP Showcase  
https://gsap.com/showcase/

HUDS+GUIS  
https://www.hudsandguis.com/

Interface In Game  
https://interfaceingame.com/

Codrops  
https://tympanus.net/codrops/

FIELD  
https://field.io/

Pentagram  
https://www.pentagram.com/

IBM Design Language  
https://www.ibm.com/design/language/

Territory Studio  
https://territorystudio.com/

Estas fuentes alimentan investigación. No son templates.

---

# 26. RESEARCH COMMUNITY / FORUM RULE

Para técnicas no triviales buscar también:

```text
Reddit
GitHub Issues
GitHub Discussions
Hacker News cuando aplique
Stack Overflow para bugs concretos
foros de la librería
Discord/documentación comunitaria cuando sea accesible
```

Consultas ejemplo:

```text
<library> mobile performance
<library> Safari issue
<library> Android lag
<library> memory leak
<library> production website
<effect> WebGL performance
<effect> mobile fallback
GSAP ScrollTrigger mobile production
WebGL DPR mobile performance
ASCII shader web performance
Canvas particle field performance
Astro GSAP production
Astro WebGL cleanup
```

Registrar fecha.

No tratar un comentario como hecho universal.

Distinguir:

```text
OFFICIAL
MAINTAINER
COMMUNITY
ANECDOTAL
```

---

# 27. SECURITY / SUPPLY CHAIN

Antes de producción:

- lockfile obligatorio;
- `npm ci`;
- revisar `npm audit`;
- limitar scripts terceros;
- no usar CDN random para librerías;
- bundle local cuando sea razonable;
- revisar licencias;
- no añadir trackers por defecto;
- Actions de terceros pineadas a full commit SHA cuando se cierre producción;
- CSP cuando sea compatible con deployment final;
- no incluir secretos en frontend;
- no incluir tokens;
- no subir credenciales.

---

# 28. GITHUB PAGES / INFRASTRUCTURA

La fase de diseño no debe tocar:

```text
GoDaddy DNS
MX
Google Workspace
CRM
dixios.com production association
```

Durante desarrollo:

```text
GitHub
→ repo webdixios
→ Codespaces/dev server
```

Deploy a GitHub Pages y asociación con dominio se hacen solamente después de:

```text
ALL_SECTIONS_DONE
FULL_PAGE_TECH_PASS
HUMAN_APPROVAL
```

---

# 29. SECCIÓN S00 — HERO

## Baseline

El screenshot oficial del hero.

## Conceptual purpose

Presentar a Dixios como una organización que convierte complejidad institucional en capacidad.

## Debe conservar

- azul Dixios;
- presencia dominante del logotipo;
- mundo / sistema global;
- tensión institucional;
- coral como señal;
- densidad técnica.

## Debe investigar cómo elevar

- materialidad;
- profundidad;
- composición;
- microinstrumentación;
- movimiento;
- relación mundo ↔ México;
- digital texture;
- data matter.

## Regla México

México mucho más prominente.

## Posibles territorios técnicos a investigar

- Cobe;
- custom point sphere;
- OGL;
- WebGL2;
- SVG globe + Canvas;
- local magnification shader;
- 2D/3D hybrid;
- ASCII detail;
- pixel distortion;
- stencil/frost layer;
- procedural linework.

## Prohibido

- globo stock;
- particles random;
- “tech globe” genérico;
- fake network stats;
- exagerar glow;
- sacrificar copy;
- cargar 3D pesado antes de LCP sin fallback.

---

# 30. SECCIÓN S01 — SISTEMA

## Baseline

“LA COMPLEJIDAD NO DESAPARECE. SE VUELVE OPERABLE.”

## Conceptual purpose

Representar:

```text
fragmentación
→ interpretación
→ modelado
→ priorización
→ operación
→ capacidad
```

## Problema a evitar

“red de nodos que parece inteligente”.

Cada elemento debe pertenecer a:

```text
input
transformation
output
```

## Research directions

- information processing;
- cybernetics;
- signal/noise;
- sorting;
- optical filtering;
- particle advection;
- morph;
- vector fields;
- matrices;
- compression;
- topology;
- scientific diagrams.

## Candidate visual grammars

- heterogenous fragments → membrane → structured matrix;
- noise field → scan → classified bands;
- documents/actors/rules → transform → operable glyph;
- layered system tomography.

## Prohibido

- meaningless graph;
- random bezier connections;
- fake labels;
- decorative analytics.

---

# 31. SECCIÓN S02 — CAPACIDADES

Cinco capacidades.

Cada una necesita un micro-universo visual diferente.

No reutilizar la misma visualización cambiando color.

## Sistemas

Debe expresar:

- arquitectura;
- módulos;
- dependencias;
- ensamblaje;
- integración;
- infraestructura.

Explorar:

- exploded systems;
- blueprints;
- layers;
- modular blocks;
- wireframe assemblies;
- technical schematics.

## Datos + IA

Debe expresar:

- señal;
- inferencia;
- clasificación;
- compresión;
- pattern recognition;
- traducción de información.

Explorar:

- ASCII;
- dithering;
- machine vision;
- raster → vector;
- embeddings abstractos;
- signal fields;
- matrices;
- confidence bands sin fake percentages.

## Innovación pública

Debe expresar:

- rediseño de relación;
- journey;
- transformación de servicio;
- interacción entre actor/institución/resultado.

Explorar:

- flows;
- service paths;
- intersections;
- rewiring;
- before/after topology.

## Asesoría

Debe expresar:

- evidencia;
- criterio;
- incertidumbre;
- hipótesis;
- descarte;
- síntesis;
- decisión.

Explorar:

- dossier;
- annotation;
- redaction;
- document intelligence;
- branching scenarios;
- evidence layering.

## Capacitación

Debe expresar:

- transferencia;
- propagación;
- internalización;
- capability diffusion;
- replicación de conocimiento.

Explorar:

- node propagation;
- encoded transfer;
- seed → network;
- duplication with variation;
- lattice growth.

---

# 32. SECCIÓN S03 — CICLO

## Baseline

“DE ENTENDER A OPERAR.”

## Conceptual purpose

No mostrar cinco iconos.

Mostrar la transformación de una misma capacidad.

Modelo:

```text
ENTENDER
↓
ANALIZAR
↓
DISEÑAR
↓
IMPLEMENTAR
↓
OPERAR
```

La entidad visual debe mantener identidad mientras cambia de estado.

## Research directions

- persistent object transformation;
- material metamorphosis;
- morphing;
- stage machines;
- scroll choreography;
- state transitions;
- timeline as transformation rather than navigation.

## Ideal narrative

```text
evidence / noise
→ pattern
→ model
→ artifact
→ live system
```

## Prohibido

- stepper SaaS;
- cinco iconos independientes;
- orbit por decoración;
- timeline sin transformación visual.

---

# 33. SECCIÓN S04 — OPERATIONS / TERRITORY

## Baseline

Panel oscuro con mapa de México.

## Regla

NO MAPA LITERAL DE MÉXICO.

## Conceptual purpose

Mostrar que Dixios puede:

```text
ver
coordinar
priorizar
actuar
recibir evidencia
detectar excepciones
decidir
cerrar
aprender
```

## Visual direction

`Territorial Signal Field`.

Explorar:

- abstract topologies;
- Voronoi zones;
- cell fields;
- routing;
- clusters;
- edge activity;
- temporal pulses;
- event propagation;
- pressure maps abstractos;
- coordinate space;
- signal slices;
- stacked territories;
- topology without country silhouette.

## Posibles técnicas

- Canvas;
- SVG;
- D3 geometry;
- OGL;
- PixiJS;
- WebGL shader;
- hybrid.

## Prohibido

- México;
- municipios ficticios;
- fake coverage;
- fake live metrics;
- fake satellites;
- “96 municipios” inventado;
- radar chart decorativo.

---

# 34. SECCIÓN S05 — PUBLICATIONS / CLOSING

## Conceptual purpose

Convertir publicaciones en una extensión de la identidad intelectual de Dixios.

No:

```text
blog cards
```

Sí:

```text
objetos editoriales
mini artefactos visuales
familia generativa
```

## Research

- editorial systems;
- generative covers;
- computational typography;
- ASCII;
- chrome;
- pixel;
- line fields;
- data abstractions;
- print/digital hybrids.

## Runtime

No cargar una librería pesada si la misma calidad puede resolverse con assets prerenderizados.

Esta sección es un buen lugar para generar arte estático de alta calidad.

---

# 35. FULL-PAGE INTEGRATION QA

Después de que S00–S05 estén DONE:

No volver a rediseñar cada sección.

Evaluar integración.

Checks:

```text
[ ] SECTION_TRANSITIONS_COHERENT
[ ] NO_TWO_HEAVY_CANVASES_ACTIVE
[ ] TYPOGRAPHY_CONSISTENT
[ ] COLOR_HANDOFFS_WORK
[ ] NAV_WORKS
[ ] ANCHORS_WORK
[ ] MOBILE_FLOW_WORKS
[ ] REDUCED_MOTION_FULL_PAGE_WORKS
[ ] NO_MEMORY_GROWTH_ON_SCROLL_CYCLES
[ ] NO_CONSOLE_ERRORS
[ ] NO_404
[ ] FINAL_BUILD_PASS
```

## Memory smoke test

En una sesión:

```text
scroll top → bottom → top
repeat 3 times
```

Confirmar que:

- canvases no se duplican;
- listeners no se multiplican;
- ScrollTriggers no se duplican;
- memoria no crece indefinidamente.

---

# 36. MASTER MILESTONE CHECKLIST

```text
DIXIOS — VISUAL MILESTONE
STATUS: ACTIVE

BOOTSTRAP
[ ] Baselines imported
[ ] Baseline SHA-256 recorded
[ ] STATE.json created
[ ] Folder structure created
[ ] Technical environment validated

S00 HERO
[ ] Analyze
[ ] Concept research
[ ] Visual research
[ ] Technical research
[ ] Build
[ ] Render + technical verification
[ ] Pairwise visual judge A
[ ] Pairwise visual judge B
[ ] Better than baseline
[ ] DONE

S01 SYSTEM
[ ] Analyze
[ ] Concept research
[ ] Visual research
[ ] Technical research
[ ] Build
[ ] Render + technical verification
[ ] Pairwise visual judge A
[ ] Pairwise visual judge B
[ ] Better than baseline
[ ] DONE

S02 CAPABILITIES
[ ] Analyze
[ ] Concept research
[ ] Visual research
[ ] Technical research
[ ] Build
[ ] Render + technical verification
[ ] Pairwise visual judge A
[ ] Pairwise visual judge B
[ ] Better than baseline
[ ] DONE

S03 CYCLE
[ ] Analyze
[ ] Concept research
[ ] Visual research
[ ] Technical research
[ ] Build
[ ] Render + technical verification
[ ] Pairwise visual judge A
[ ] Pairwise visual judge B
[ ] Better than baseline
[ ] DONE

S04 OPERATIONS
[ ] Analyze
[ ] Concept research
[ ] Visual research
[ ] Technical research
[ ] Build
[ ] Render + technical verification
[ ] Pairwise visual judge A
[ ] Pairwise visual judge B
[ ] Better than baseline
[ ] NO LITERAL MEXICO MAP
[ ] DONE

S05 PUBLICATIONS
[ ] Analyze
[ ] Concept research
[ ] Visual research
[ ] Technical research
[ ] Build
[ ] Render + technical verification
[ ] Pairwise visual judge A
[ ] Pairwise visual judge B
[ ] Better than baseline
[ ] DONE

FULL PAGE
[ ] Integration QA
[ ] Responsive QA
[ ] Reduced-motion QA
[ ] Performance QA
[ ] Security/dependency review
[ ] Final clean build
[ ] Human review
[ ] READY_FOR_DEPLOY
```

---

# 37. CONTROLLER CONTRACT

Cada ciclo Controller produce exactamente:

```json
{
  "section": "S00",
  "attempt": 1,
  "current_phase": "VISUAL_RESEARCH",
  "next_action": "VISUAL_RESEARCH",
  "reason": "Candidate concept is valid but baseline still has stronger composition.",
  "allowed_scope": [
    "dixios-loop/research/S00",
    "hero-related source files"
  ],
  "forbidden_scope": [
    "S01",
    "S02",
    "S03",
    "S04",
    "S05",
    "DNS",
    "production deploy"
  ],
  "stop_after": "Complete this one action and persist results."
}
```

`next_action` sólo puede ser:

```text
ANALYZE
CONCEPT_RESEARCH
VISUAL_RESEARCH
TECH_RESEARCH
BUILD
VERIFY
VISUAL_JUDGE
ESCALATE
PASS
```

---

# 38. WORKER PROMPT TEMPLATE

```text
You are the DIXIOS Worker.

Read:
1. dixios-loop/MASTER.md
2. dixios-loop/GLOBAL_RULES.md
3. dixios-loop/STATE.json
4. the active section file
5. the Controller Contract

Execute ONLY the assigned action.

Do not redesign other sections.
Do not deploy.
Do not edit DNS.
Do not invent metrics.
Do not add dependencies unless TECH_RESEARCH approved them.
Do not mark VISUAL_PASS.
Do not mark DONE.

Before coding:
- inspect relevant source;
- inspect approved research;
- inspect latest diagnosis.

After coding:
- run the minimum validation needed;
- commit using loop(SXX): attempt NN description;
- report modified files;
- update only fields you own.
```

---

# 39. RESEARCHER PROMPT TEMPLATE

```text
You are the DIXIOS Researcher.

You do not write production code during research phases.

Use this priority:
1. official docs
2. official repository
3. official examples
4. reputable developer implementations
5. issues/discussions
6. technical articles
7. Reddit / specialized forums
8. experimentation

For visual research:
- use screenshots, not only URLs;
- search beyond web design;
- connect every reference to the active concept;
- distinguish transferable principle from aesthetic copying.

For technical research:
- produce at least three approaches;
- investigate mobile/performance/fallback;
- complete dependency due diligence before recommending installation.

Persist research to the active section directory.
```

---

# 40. VERIFIER PROMPT TEMPLATE

```text
You are the DIXIOS Technical Verifier.

You do not evaluate taste.

Verify the active candidate.

Run:
- clean dependency install when appropriate;
- production build;
- browser render;
- console monitoring;
- asset/network checks;
- responsive viewports;
- reduced-motion;
- fallback behavior;
- screenshot capture.

If any technical gate fails:
technical_pass = false
Return exact failure.

If all technical gates pass:
technical_pass = true
Generate candidate screenshots.

Do not mark visual pass.
Do not mark DONE.
```

---

# 41. VISUAL JUDGE PROMPT TEMPLATE

```text
You are an isolated visual judge.

You receive two screenshots of the SAME section.

You do not know which one is new.

Question:

Which design is visually stronger, more distinctive,
more accomplished and more appropriate as high-end web art direction
for Dixios?

Do not reward complexity, number of effects, animation technology,
WebGL, 3D, novelty or density by themselves.

Judge only what is visibly accomplished.

Return exactly:

WINNER: LEFT | RIGHT | TIE

If the baseline or TIE wins:
FAILURE_DIAGNOSIS: <one concise visual reason>

Do not give scores.
Do not suggest implementation.
```

---

# 42. FINAL HUMAN REVIEW

Incluso si todos los automated pairwise gates pasan:

```text
READY_FOR_DEPLOY != DEPLOYED
```

El usuario debe ver:

- final desktop;
- final mobile;
- full-page;
- critical motion clips/screenshots.

Sólo el usuario puede autorizar:

```text
HUMAN_APPROVED = true
```

Luego se prepara despliegue.

---

# 43. DEFINICIÓN FINAL DE DONE

El proyecto Dixios está DONE únicamente si:

```text
baseline_locked == true

AND

S00.status == DONE
S01.status == DONE
S02.status == DONE
S03.status == DONE
S04.status == DONE
S05.status == DONE

AND

full_page_technical_pass == true
human_approved == true
```

No existe otra definición.

---

# 44. PRINCIPIO FINAL

La finalidad del loop no es producir más iteraciones.

Es evitar mediocridad.

La pregunta que abre y cierra cada sección es la misma:

> **¿La nueva pieza se ve claramente mejor que el baseline que el usuario entregó?**

Si no:

```text
ITERATE
```

Si sí y técnicamente pasa:

```text
DONE
```

Nada más.
