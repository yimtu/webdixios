# DIXIOS QUALITY-FIRST DEVELOPMENT CONTRACT
## Contrato maestro para dirección visual, creative engineering, investigación, implementación y QA

**Versión:** 4.0  
**Fecha:** 2026-09-06  
**Proyecto:** `yimtu/webdixios`  
**Modo:** `QUALITY_FIRST_CONTINUOUS`  
**Regla suprema:** cada decisión importante debe sobrevivir evidencia, implementación real, render y comparación. No se detiene trabajo por una frontera artificial de fase.

---

# 0. AUTORIDAD DEL CONTRATO

Este archivo es el contrato operativo principal del proyecto. Sustituye la rigidez de ejecución de MASTER v3.0. El historial Git conserva la versión anterior.

Cualquier IA que trabaje en Dixios debe leer, como mínimo:

```text
dixios-loop/MASTER.md
dixios-loop/STATE.json
dixios-loop/BASELINE.md
research vigente de la sección activa
código relevante de la sección activa
```

Si existe `dixios-loop/QUALITY_PROTOCOL.md`, también es obligatorio.

La fuente de verdad del proyecto es el repositorio, no la memoria de conversación.

---

# 1. PRINCIPIO CENTRAL: CALIDAD ANTES QUE CEREMONIA

El proyecto conserva fases, roles y gates porque son útiles para no autoengañarse. Sin embargo, **las fases ya no son fronteras de ejecución**.

La IA NO debe detener una ejecución únicamente porque terminó `VISUAL_RESEARCH`, `TECH_RESEARCH`, `BUILD`, `VERIFY` o cualquier otra fase.

Una sola ejecución puede recorrer varias fases contiguas de la **misma sección activa**, siempre que:

1. cada gate anterior haya sido realmente satisfecho;
2. el estado se persista cuando cambia una decisión material;
3. investigación, prototipos y candidatos se distingan claramente;
4. ningún fail técnico sea ocultado;
5. ningún candidato roto llegue al Visual Judge;
6. no se toque infraestructura/deploy sin autorización humana;
7. no se cambie simultáneamente otra sección salvo autorización humana expresa.

`STATE.phase` significa:

> **siguiente gate formal aún no completado**

No significa:

> única actividad permitida en esta respuesta.

---

# 2. CONTINUOUS QUALITY CYCLE

Para trabajo visual o técnico no trivial, el patrón por defecto es:

```text
READ CURRENT STATE
      ↓
INSPECT BASELINE + CURRENT IMPLEMENTATION
      ↓
RESEARCH REAL SOLUTIONS
      ↓
FORM HYPOTHESIS
      ↓
PROTOTYPE / IMPLEMENT
      ↓
RENDER IN REAL BROWSER
      ↓
COMPARE AGAINST REFERENCE / PREVIOUS BEST
      ↓
DIAGNOSE ROOT CAUSE
      ↓
KEEP / MODIFY / DISCARD
      ↺
```

Este ciclo puede repetirse muchas veces dentro de una sola ejecución.

No existe una obligación de producir ocho iteraciones. Existe la obligación de **no parar en la primera implementación plausible** cuando la evidencia visual o técnica todavía no es suficiente.

## 2.1 Regla de convergencia

Continuar iterando mientras ocurra cualquiera de estas condiciones:

- la causa del fallo todavía no está aislada;
- existen dos o más hipótesis técnicamente plausibles sin probar;
- el candidato todavía pierde claramente atributos esenciales del baseline;
- un cambio estructural puede resolver varios síntomas a la vez;
- el resultado depende de una suposición no verificada;
- la arquitectura seleccionada no ha sido probada en browser real;
- mobile/fallback podría invalidar la decisión desktop.

Se puede cerrar un ciclo de investigación cuando:

```text
PROBLEM_ISOLATED = true
AND
DIRECTION_PROTOTYPED = true
AND
DIRECTION_RENDERED = true
AND
KNOWN_FAILURE_MODES_DOCUMENTED = true
AND
ENOUGH_EVIDENCE_TO_BUILD = true
```

No confundir esto con `VISUAL_PASS` final.

---

# 3. REGLA DE ROOT-CAUSE

Después de dos ajustes paramétricos que fallen de manera materialmente similar, está prohibido seguir moviendo números a ciegas.

Se debe inspeccionar una capa más profunda:

```text
CSS inheritance
DOM structure
renderer implementation
shader/source
library behavior
browser compositing
GPU/context behavior
asset generation
camera/projection
input data
build output
```

Pregunta obligatoria:

> ¿Estamos afinando parámetros o estamos peleando contra una limitación estructural?

Si existe una limitación estructural, se investiga una arquitectura alternativa antes de hacer otro tweak cosmético.

---

# 4. ESTÁNDAR DE EVIDENCIA

Para una decisión importante de arquitectura, rendering, dependencia o performance, intentar triangular:

```text
A. OFFICIAL
   documentación oficial / especificación

B. SOURCE / MAINTAINER
   repo, source code, issue, PR o comentario del maintainer

C. PRACTITIONER
   experiencia reproducible de programadores en issues, discussions,
   foros especializados, Stack Overflow o Reddit cuando aplique

D. LOCAL EVIDENCE
   build, profiler, browser render, screenshot, medición o reproducción propia
```

Una sola fuente no debe tratarse como verdad universal si la decisión es costosa o difícil de revertir.

Siempre distinguir:

```text
OFFICIAL
MAINTAINER
COMMUNITY
ANECDOTAL
LOCAL_MEASUREMENT
INFERENCE
```

Usar información vigente cuando la tecnología pueda haber cambiado.

---

# 5. VISUAL RESEARCH = RESEARCH + EXPERIMENTATION

Visual Research ya no es una fase puramente textual.

Puede y debe incluir código experimental cuando eso ayude a contestar una pregunta visual o técnica.

## Permitido durante research

- ramas temporales;
- prototipos throwaway;
- instalar una dependencia sin persistirla para medirla;
- scripts de prueba;
- pequeños shaders;
- renders browser;
- screenshots;
- comparación A/B;
- desmontar una librería leyendo su source;
- experimentar con composición, cámara, densidad y materialidad.

## No permitido durante research

- presentar un prototipo como candidato oficial sin formalizarlo;
- contaminar lockfile de producción con dependencias exploratorias sin due diligence;
- desplegar un experimento;
- ocultar fallos porque el prototipo “se ve bien”.

Cada prototipo debe poder clasificarse como:

```text
KEEP
MODIFY
DISCARD
```

Y registrar por qué.

---

# 6. BASELINE Y CRITERIO VISUAL

Baseline oficial:

```text
BASELINE_2026_09_05
```

La pregunta final por sección permanece:

```text
¿La nueva versión se ve claramente mejor que el baseline correspondiente?
```

Sólo existe:

```text
YES
NO
```

Tie, duda, “casi”, “mejor técnicamente”, “más complejo”, “usa WebGL” o “tiene más efectos” equivalen a `NO`.

La complejidad de implementación no gana puntos visuales.

## 6.1 Comparación disciplinada

Siempre que sea posible:

- mismo viewport;
- mismo crop;
- DPR controlado;
- punto de animación determinista;
- fuente/font environment estable;
- baseline y candidate presentados sin hype;
- comparación directa y también orden invertido para el judge final.

Las métricas de edge density, contraste, color occupancy, etc. son diagnóstico, no sustituyen juicio visual.

---

# 7. UNA SECCIÓN ACTIVA, NO UNA MICRO-TAREA ACTIVA

El proyecto sigue trabajando una sección principal a la vez:

```text
S00 HERO
S01 SYSTEM
S02 CAPABILITIES
S03 CYCLE
S04 OPERATIONS
S05 PUBLICATIONS
```

Pero dentro de la sección activa la IA tiene autonomía para tocar los archivos necesarios para resolver el problema completo:

- Astro/HTML;
- CSS;
- TypeScript;
- shader/renderer;
- assets generados;
- tests;
- scripts de QA;
- lockfile si la dependencia fue aprobada;
- documentación de research;
- workflow temporal de laboratorio cuando el entorno local no permite probar algo.

No aplicar una regla absurda de “un solo archivo” o “una sola micro-tarea” si eso degrada la solución.

Sí permanece prohibido usar S00 como excusa para rediseñar S02 o el footer.

---

# 8. FASES FORMALES Y GATES

Las fases siguen existiendo para saber qué evidencia falta:

```text
ANALYZE
→ CONCEPT_RESEARCH
→ VISUAL_RESEARCH
→ TECH_RESEARCH
→ BUILD
→ VERIFY
→ VISUAL_JUDGE
```

Una misma ejecución puede cruzar varias.

## ANALYZE gate

Debe entenderse:

- qué comunica la sección;
- qué es semántico/decorativo;
- qué funciona en baseline;
- qué falla en implementación actual;
- qué restricciones existen.

## CONCEPT_RESEARCH gate

Debe existir:

```text
CORE IDEA
VERB
INPUT STATE
TRANSFORMATION
OUTPUT STATE
WHAT USER SHOULD UNDERSTAND VISUALLY
```

## VISUAL_RESEARCH gate

Debe existir evidencia visual suficiente y, cuando la incertidumbre lo requiera, prototipos renderizados.

## TECH_RESEARCH gate

Toda dependencia o arquitectura pesada debe justificar:

```text
NAME
VERSION
OFFICIAL_URL
REPOSITORY
LICENSE
MAINTENANCE
BUNDLE COST
RUNTIME COST
MOBILE STRATEGY
BROWSER REQUIREMENTS
KNOWN ISSUES
FALLBACK
WHY NATIVE/CSS/SVG IS NOT ENOUGH
```

## BUILD gate

Debe existir un candidato reproducible y commit identificable.

## VERIFY gate

Mínimo:

```text
npm ci
npm run build
npm audit
browser render
console/runtime checks
overflow checks
desktop/tablet/mobile
reduced motion
GPU fallback if applicable
performance sanity
```

Sin lockfile válido, `npm ci` no puede considerarse aprobado.

## VISUAL_JUDGE gate

Sólo después de TECH PASS.

Pass A:

```text
LEFT baseline / RIGHT candidate
```

Pass B:

```text
LEFT candidate / RIGHT baseline
```

Candidate debe ganar ambas.

---

# 9. ROLES Y PROPIEDAD DE CAMPOS

Los roles siguen siendo conceptuales incluso si una misma IA los ejecuta en secuencia.

Researcher actualiza:

```text
analysis_done
concept_locked
visual_research_done
tech_research_done
```

Worker actualiza:

```text
implemented
candidate_commit
```

Verifier actualiza:

```text
screenshots_ready
technical_pass
```

Visual Judge actualiza:

```text
judge_pass_order_a
judge_pass_order_b
```

Nadie escribe manualmente:

```text
visually_better_than_baseline
status = DONE
```

Se derivan de gates.

Una IA puede cambiar de rol dentro de la misma ejecución, pero debe respetar la responsabilidad de cada gate. El Worker no puede inventarse un TECH PASS y el Verifier no puede regalar un VISUAL PASS.

---

# 10. PERSISTENCIA SIN BUROCRACIA

Persistir cuando ocurra algo material:

- dirección descartada;
- causa raíz encontrada;
- arquitectura seleccionada;
- dependencia aprobada/rechazada;
- candidato nuevo;
- TECH FAIL/PASS;
- VISUAL FAIL/PASS;
- nueva ruta de fallo.

No hacer commits de ruido por cada ajuste de 2 píxeles si forma parte del mismo experimento.

Los prototipos internos pueden vivir en branch temporal. Sólo el candidato seleccionado se promueve al branch de sección.

---

# 11. REGLAS DE CALIDAD DE IMPLEMENTACIÓN

Preferencia de complejidad:

```text
HTML/CSS
→ SVG
→ Canvas 2D
→ WebGL / Three / OGL
```

No es una prohibición. Si una capa más pesada resuelve un problema real y demuestra mejor ceiling visual, se usa.

Antes de añadir tecnología:

1. investigar si ya existe solución;
2. leer source cuando el comportamiento sea crítico;
3. buscar issues recientes;
4. probar browser real;
5. medir bundle/runtime;
6. diseñar fallback;
7. diseñar mobile.

No introducir React/R3F sólo por usar Three.js. Astro debe seguir siendo la base.

---

# 12. MOBILE ES UNA COMPOSICIÓN PROPIA

Nunca asumir:

```text
mobile = desktop * 0.5
```

Cada sección define:

```text
DESKTOP_COMPOSITION
TABLET_COMPOSITION
MOBILE_COMPOSITION
```

Para cualquier visual GPU, mobile debe tener una estrategia explícita antes de BUILD final.

## 12.1 Política GPU móvil

Objetivo: conservar significado y autoría, reducir coste.

Orden de reducción:

```text
1. reducir DPR
2. reducir número de primitives/points
3. reducir draw calls
4. eliminar post-processing
5. eliminar detalles secundarios
6. acortar motion
7. render-on-demand / detener loop
8. sustituir por fallback estático si el dispositivo/condición lo requiere
```

No destruir la idea central para mantener exactamente el mismo detalle desktop.

## 12.2 Targets internos iniciales

```text
mobile GPU DPR target: 1.0
mobile hard cap inicial: 1.25
one heavy GPU canvas visible at a time
no shadows unless proven necessary
no post-processing unless proven necessary
no perpetual RAF for a resolved/static hero
```

Para S00 específicamente, el globe debe poder:

```text
render static fallback immediately
→ enhance with GPU
→ resolve motion in <= ~1 s mobile
→ stop continuous rendering
→ resume only on actual state change if needed
```

`prefers-reduced-motion` conserva estado final con movimiento mínimo o nulo.

`Save-Data` puede usar directamente fallback ligero.

---

# 13. PERFORMANCE BUDGETS

A 60 FPS:

```text
16.67 ms/frame
```

Targets internos de escena activa:

```text
main-thread scripting avg <= 4 ms
render/paint avg <= 6 ms
no avoidable long task > 50 ms
```

Canvas:

```text
physicalPixels = CSS_width × CSS_height × DPR²
```

Default:

```text
desktop animated canvas DPR <= 1.5
mobile animated canvas DPR <= 1.25
```

Initial JS soft target:

```text
<= 180 KB gzip
```

Si una dependencia hace excederlo:

- medir chunk real;
- evaluar tree-shaking;
- dynamic import;
- lazy/conditional loading;
- custom renderer más pequeño si hace falta;
- documentar por qué el coste vale la pena.

Mobile first-view target:

```text
<= 1.5 MB transfer
```

No cargar creative runtimes de secciones inferiores antes de necesitarlos.

---

# 14. WEBGL / THREE LIFECYCLE OBLIGATORIO

Todo canvas GPU debe:

- cap DPR;
- manejar resize sin reallocations absurdas;
- detener trabajo offscreen;
- detener trabajo con `document.hidden` cuando aplique;
- no usar perpetual RAF si la escena queda estática;
- liberar geometrías, materiales, renderer y observers/listeners;
- manejar pérdida de contexto con fallback;
- evitar crear miles de `Object3D` cuando un `BufferGeometry`, `Points` o instancing resuelve el mismo visual;
- mantener draw calls bajos;
- evitar textures/post FX si no aportan valor visible.

Cuando los puntos pueden calcularse offline/build-time, preferir precomputar y enviar datos compactos antes que decodificar/recorrer una máscara grande en el teléfono.

---

# 15. S00 — HERO: REGLAS CONGELADAS

Debe conservar:

- azul Dixios;
- logotipo/copy con jerarquía fuerte;
- mundo/sistema global;
- coral como señal;
- densidad técnica/editorial.

El foco territorial debe ser perceptualmente prominente **dentro del mundo/globo**, no como sticker, label o mapa superpuesto.

Permitido:

- mayor densidad local;
- escala perceptual;
- point cloud de mayor resolución;
- cámara;
- doble resolución sobre la misma esfera;
- arquitectura dot-world transparente.

Prohibido:

- tiny pin como única señal;
- nombre del país como sustituto del énfasis visual;
- globo stock;
- fake routes/metrics;
- sacrificar copy;
- masa oscura que domine el hero si el baseline exige ligereza/densidad;
- CSS country silhouette disfrazada de “globe detail”.

Estado de investigación vigente de S00 debe leerse desde `dixios-loop/research/S00/`.

---

# 16. S04 — OPERATIONS: REGLA CONGELADA

No usar mapa literal de México, silueta del país ni estados administrativos.

Territorio debe expresarse mediante abstracción operativa: topología, regiones, celdas, señales, relaciones, excepciones, rutas, densidad o capas.

---

# 17. DATOS Y AFIRMACIONES

Prohibido inventar:

- clientes;
- métricas;
- KPIs;
- municipios;
- cobertura;
- resultados;
- porcentajes;
- tiempos;
- proyectos;
- quotes;
- logos institucionales;
- mapas de clientes;
- ciudad/sede.

No afirmar que Dixios es “de Monterrey” ni cualquier otra ubicación salvo fuente del proyecto.

Una pieza puede ser abstracta/artística, pero no debe parecer dato real si no lo es.

---

# 18. MOTION

Motion debe corresponder a un verbo y mejorar significado, jerarquía, materialidad o sensación de sistema vivo.

Cada S00–S04 documenta:

```text
MOTION_PURPOSE
TRIGGER
ACTIVE_DURATION
OFFSCREEN_BEHAVIOR
MOBILE_VARIANT
REDUCED_MOTION_VARIANT
ESTIMATED_RUNTIME_COST
```

Evitar movimiento infinito por decoración.

Preferencia:

```text
microinteracción ligera
> animación procedural localizada
> canvas continuo
> WebGL permanente
```

---

# 19. STOP CONDITIONS REALES

La IA NO se detiene sólo porque “terminó una fase”.

Debe detenerse o pedir intervención cuando:

- el usuario lo pide;
- falta baseline/archivo/acceso indispensable;
- se requiere una acción irreversible o externa no autorizada;
- se alcanzó un bloqueo técnico real que no puede resolverse con herramientas disponibles;
- el contrato exige human approval;
- se llegaría a deploy/DNS/producción;
- una decisión implica secreto, credencial o riesgo fuera de alcance;
- se agota el límite de attempts de sección y requiere revisión humana.

No es stop condition:

```text
“ya terminé research”
“la siguiente fase es BUILD”
“sólo puedo hacer una fase por turno”
```

---

# 20. ROUTING DE FAIL

Clasificar causa, no reiniciar a ciegas.

```text
CONCEPT_RESEARCH
  metáfora/idea incorrecta

VISUAL_RESEARCH
  dirección visual/composición/autoría insuficiente

TECH_RESEARCH
  técnica/renderer/dependencia limita el resultado

BUILD
  dirección correcta pero falta craft, responsive, motion o bugfix
```

Tres fails técnicos consecutivos → `ESCALATE_TECH`.

Tres veces la misma ruta de fail → replantear, no seguir afinando lo mismo.

Attempt 12 sin PASS → `HUMAN_REVIEW_REQUIRED`.

Los prototipos internos A/B/C dentro de un mismo attempt no incrementan automáticamente el número de attempt oficial.

---

# 21. FULL PAGE / DEPLOY

Orden macro:

```text
S00
→ S01
→ S02
→ S03
→ S04
→ S05
→ FULL PAGE INTEGRATION QA
→ HUMAN REVIEW
→ READY FOR DEPLOY
```

No tocar durante diseño:

```text
GoDaddy DNS
MX
Google Workspace
CRM
dixios.com production association
```

Deploy requiere:

```text
ALL_SECTIONS_DONE
FULL_PAGE_TECH_PASS
HUMAN_APPROVAL
```

---

# 22. INFORME DE CIERRE DE EJECUCIÓN

Al terminar una ejecución significativa reportar de forma compacta:

```text
ACTIVE SECTION
WORK PERFORMED
RESEARCH / EVIDENCE
EXPERIMENTS AND DISCARDS
FILES / COMMITS
TECH GATE
VISUAL GATE
STATE TRANSITION
NEXT REAL BLOCKER OR NEXT ACTION
```

No inflar el reporte con actividad que no cambió una decisión.

---

# 23. REGLA FINAL

El estándar Dixios no es:

> “seguir el proceso correctamente”.

Es:

> **producir una solución que aguante investigación, source inspection, prototipado, browser real, mobile, performance y comparación visual — y seguir iterando mientras todavía exista una explicación razonable de por qué puede mejorar.**

El proceso existe para aumentar criterio, no para limitarlo.
