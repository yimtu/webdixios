---
layout: ../../layouts/PublicationLayout.astro
title: Manual de prompting para principiantes
description: Un método práctico para pedir mejor trabajo a los modelos de inteligencia artificial: objetivo, contexto, criterios, límites, ejemplos, iteración y verificación.
published: true
---

Un prompt no es un conjuro. Es una especificación de trabajo.

Esa diferencia importa porque buena parte de la cultura popular alrededor de la inteligencia artificial convirtió el prompting en una colección de trucos: “actúa como el mejor experto del mundo”, “piensa paso a paso”, “usa estas veinte reglas”, “si haces esto te doy una propina”. Algunas fórmulas pueden modificar una respuesta en ciertos modelos, pero no resuelven el problema principal: **la IA no puede ejecutar con precisión una tarea que nosotros mismos no hemos definido con precisión suficiente.**

Los modelos actuales son mejores para interpretar lenguaje natural que los de hace algunos años. Las guías recientes de OpenAI, Anthropic y Google convergen en principios bastante sobrios: instrucciones claras, contexto suficiente, resultados bien definidos, ejemplos cuando ayudan, estructura consistente e iteración.

Por eso este manual no busca enseñar una plantilla obligatoria. Busca enseñar a pensar qué información necesita el modelo para hacer bien el trabajo.

## 1. Empieza por el resultado, no por la fórmula

Antes de escribir el prompt, formula una pregunta:

**¿Qué tendría que entregarme la IA para que yo considere que hizo bien el trabajo?**

“Investiga inteligencia artificial” es una petición abierta. “Compara las políticas de adopción de IA en educación superior de México, China y la Unión Europea; separa hechos de recomendaciones; utiliza fuentes primarias publicadas desde 2025 y explica qué elementos serían transferibles a una universidad mexicana” ya contiene un estándar.

Un buen objetivo reduce el espacio de interpretaciones posibles.

Para tareas simples, una sola frase puede bastar:

> Resume este documento en cinco ideas que un director general pueda entender sin conocimiento técnico.

Para una tarea compleja conviene especificar varias dimensiones: qué se quiere producir, para quién, con qué material, bajo qué restricciones y cómo debe validarse.

## 2. La fórmula general: úsala como mapa, no como ritual

Una estructura útil para principiantes contiene seis preguntas.

### Rol o perspectiva

¿Hay una perspectiva profesional que realmente cambie la forma de resolver la tarea?

“Actúa como abogado laboral mexicano” puede ser útil si necesitamos que el modelo identifique problemas con criterios jurídicos. “Actúa como genio de clase mundial” aporta poco si no definimos qué debe hacer.

El rol sirve cuando introduce un marco, estándares o vocabulario relevantes. No sustituye las instrucciones.

### Tarea

¿Qué acción concreta debe ejecutar?

Comparar, resumir, diagnosticar, traducir, clasificar, proponer, revisar, programar, calcular o investigar son verbos distintos. Es preferible pedir una acción observable a decir solamente “ayúdame con esto”.

### Contexto

¿Qué información necesita para entender el problema?

Aquí caben el trasfondo, el público, la decisión que está en juego, los documentos de referencia, la situación de la organización o cualquier dato que cambie la respuesta.

El contexto es especialmente importante cuando trabajamos con información interna que el modelo no podría conocer por sí mismo.

### Resultado y formato

¿Cómo debe verse la salida?

No hace falta especificar formato por costumbre. Hágalo cuando la forma importe: un correo de 150 palabras, una tabla comparativa, un memo para dirección, tres alternativas, código que compile o una respuesta en lenguaje no técnico.

Las guías oficiales de OpenAI y Google recomiendan describir explícitamente el resultado deseado; cuando el formato es difícil de explicar, mostrar un ejemplo suele ser todavía más efectivo.

### Límites

¿Qué condiciones no se pueden romper?

País, periodo, presupuesto, legislación aplicable, número máximo de palabras, tecnologías permitidas, fuentes aceptables, supuestos que no deben hacerse, datos que no deben exponerse.

Un límite útil modifica la solución. Un catálogo de prohibiciones decorativas sólo agrega ruido.

### Criterio de calidad y verificación

¿Cómo sabremos que la respuesta merece confianza?

Esta es una de las partes que más se omiten. Podemos pedir que diferencie hechos, inferencias y opiniones; que cite las fuentes de afirmaciones verificables; que señale incertidumbre; que compruebe cálculos; que confronte hipótesis o que revise la respuesta contra requisitos concretos.

Pedir “no alucines” no garantiza exactitud. Diseñar un proceso de verificación sí mejora las condiciones para detectar errores.

## 3. Una plantilla práctica

Para un trabajo importante, esta estructura suele ser suficiente:

```text
Objetivo:
¿Qué necesito conseguir y para qué?

Tarea:
¿Qué debe hacer exactamente la IA?

Contexto:
¿Qué necesita saber para entender el problema?

Material de referencia:
¿Qué documentos, datos o fuentes debe usar?

Criterios de calidad:
¿Qué debe cumplir una buena respuesta?

Límites:
¿Qué restricciones son reales?

Formato:
¿Cómo necesito recibir el resultado?

Verificación:
¿Qué debe comprobar antes de cerrar?
```

No todos los campos son obligatorios. Si una petición puede resolverse bien con dos líneas, no hay mérito en convertirla en una página.

## 4. Los ejemplos son instrucciones comprimidas

A veces es difícil describir un tono, una clasificación o un formato. En esos casos, un ejemplo bien elegido puede comunicar más que varios párrafos de reglas.

Google recomienda explícitamente el uso de ejemplos *few-shot* para mostrar patrones de respuesta. Anthropic los considera una de las formas más fiables de dirigir formato, tono y estructura. OpenAI también recomienda mostrar el formato esperado cuando la salida debe ser consistente.

El principio es simple:

**si puedes mostrar qué significa “bien”, muéstralo.**

Por ejemplo, si quieres que una IA clasifique solicitudes ciudadanas, proporciona varios casos reales ya clasificados, incluidos casos ambiguos. Si quieres que escriba con el estilo de una institución, comparte muestras aprobadas. Si quieres una salida que después leerá un sistema, enseña exactamente la estructura válida.

Los ejemplos deben ser representativos. Un ejemplo incorrecto o demasiado estrecho también enseña el patrón equivocado.

## 5. Meta-prompting: usar la IA para mejorar la instrucción

No siempre sabemos qué pedir. En vez de improvisar una especificación enorme, podemos pedir al propio modelo que detecte vacíos.

Un meta-prompt útil sería:

> Quiero obtener una ficha técnica para decidir si esta tecnología puede utilizarse en un municipio mexicano. Antes de redactarla, revisa mi solicitud, identifica qué información falta para evaluar viabilidad, costo, integración, seguridad y operación, y propón una versión mejorada del prompt. No inventes los datos que falten.

El valor del meta-prompting no está en que la IA descubra una “frase secreta”. Está en utilizarla como revisor de requisitos.

También puede pedírsele que critique una instrucción existente:

> Señala ambigüedades, requisitos contradictorios, información ausente y criterios de éxito que no están definidos. Después entrega una versión más precisa.

## 6. Cothinking sin convertirlo en teatro

Los problemas complejos rara vez se resuelven mejor con un único disparo. Conviene trabajar por etapas.

Una secuencia útil puede ser:

1. construir un primer diagnóstico;
2. investigar evidencia que pueda contradecirlo;
3. comparar hipótesis;
4. identificar qué información cambiaría la conclusión;
5. producir la versión final;
6. verificar hechos, cifras y requisitos.

Eso es colaboración iterativa: usar la conversación para mejorar el problema y la respuesta.

No es necesario pedir al modelo que revele razonamientos internos extensos. Para trabajo profesional es más útil solicitar **conclusiones, supuestos, evidencia, alternativas y comprobaciones**. Esos elementos se pueden revisar; un monólogo de “pensamiento” no es una garantía de calidad.

## 7. Investigar requiere un prompt diferente a redactar

Una IA puede escribir una frase convincente sin que la frase sea verdadera. Cuando la tarea depende de hechos actuales, el prompt debe gobernar la búsqueda y la evidencia.

En vez de:

> Explícame la política de IA de China.

Es mejor:

> Investiga la política vigente de China sobre IA en educación superior. Prioriza documentos del Ministerio de Educación y del gobierno central publicados entre 2025 y 2026. Separa lo que ordena la política de tu interpretación. Para cada afirmación material incluye fuente y fecha. Si dos fuentes se contradicen, no las reconcilies sin evidencia.

La diferencia no es estilo. Es arquitectura de evidencia.

Para temas actuales, ninguna instrucción sustituye el acceso a fuentes recientes. Y para decisiones importantes, ninguna respuesta de un modelo debería sustituir la revisión humana de las fuentes primarias.

## 8. Lo que suele empeorar un prompt

**Inflar el rol.** “Eres el mayor experto de la historia” no compensa la falta de contexto, criterios o datos.

**Confundir longitud con precisión.** Un prompt de dos páginas puede ser peor que uno de ocho líneas si mezcla prioridades y contradicciones.

**Pedir certeza absoluta.** Frases como “debes estar 100% seguro” no crean evidencia. Es mejor pedir que señale incertidumbre y verifique.

**Esconder el objetivo.** Si el modelo no sabe para qué se utilizará la respuesta, puede optimizar la dimensión equivocada.

**Prohibir sin orientar.** “No seas genérico” sirve poco. “Explica cada recomendación con mecanismo, evidencia y ejemplo concreto” define qué hacer en su lugar.

**Aceptar el primer resultado.** Las guías actuales de los principales proveedores describen el prompting como un proceso iterativo. Revisar, señalar fallas y pedir una segunda versión no es un fracaso del prompt; es parte normal del trabajo.

**Usar información sin jerarquía.** Cuando se adjuntan muchos documentos, conviene distinguir instrucciones, fuentes, ejemplos y datos. Una estructura clara reduce el riesgo de que el modelo trate material de referencia como una orden.

## 9. Tres ejemplos

### Investigación

```text
Objetivo:
Entender si un software de gestión de casos puede reducir trabajo administrativo
en un gobierno municipal mexicano.

Tarea:
Compara cinco soluciones operativas y reconstruye qué procesos automatizan.

Contexto:
El usuario final no es técnico. La institución tiene presupuesto limitado y sistemas legados.

Criterios:
Distingue funciones comprobadas de marketing. Prioriza documentación oficial,
casos de implementación y contratos públicos cuando existan.

Límites:
No asumas integraciones que no estén documentadas. Usa información 2025-2026.

Formato:
Memo ejecutivo de máximo 1,500 palabras con una tabla comparativa.

Verificación:
Cita cada afirmación sobre precio, integración, seguridad o despliegue.
```

### Escritura

```text
Reescribe el texto adjunto para una publicación institucional.

Conserva todos los hechos y argumentos.
El público es general pero educado.
Usa español mexicano sobrio.
Elimina clichés, adjetivos promocionales y repeticiones.
No agregues información que no esté en el original.
Entrega entre 700 y 900 palabras.
```

### Análisis

```text
Analiza esta propuesta de política pública.

Primero reconstruye el mecanismo causal:
qué intervención produce qué cambio y mediante qué actor.

Después identifica:
- los tres supuestos más frágiles;
- la evidencia que los apoya o contradice;
- quién tendría poder para bloquear la implementación;
- qué información cambiaría la recomendación.

Separa hechos, inferencias y juicio.
```

## 10. El cambio más importante

El prompting está evolucionando junto con los modelos. Las recomendaciones oficiales de 2026 son, en muchos sentidos, menos esotéricas que las de los primeros años de la IA generativa. Los modelos más capaces requieren menos ritual y toleran mejor el lenguaje natural; la dificultad se desplaza hacia definir el trabajo, proporcionar el contexto correcto y evaluar la salida.

Eso cambia dónde está la ventaja.

Una persona que sólo conoce “prompts virales” puede obtener respuestas llamativas. Una persona que sabe formular problemas, seleccionar evidencia, explicar restricciones, construir ejemplos y verificar resultados puede usar distintos modelos y seguir obteniendo buen trabajo cuando cambie la interfaz.

**El objetivo no es aprender a hablarle a una máquina. Es aprender a especificar, supervisar y evaluar trabajo intelectual asistido por máquinas.**

## Fuentes seleccionadas

Este manual parte de materiales de capacitación de Dixios sobre fórmula general, auto-optimización, meta-prompting, trabajo iterativo y verificación, actualizados con documentación técnica vigente.

- OpenAI, “Best practices for prompt engineering with the OpenAI API”: https://help.openai.com/en/articles/6654000-using-the-api-prompt-engineering
- OpenAI, “Prompt engineering best practices for ChatGPT”: https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt
- OpenAI, “How do I create a good prompt for an AI model?”: https://help.openai.com/en/articles/4936848
- Anthropic, “Prompting best practices”: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables
- Google AI for Developers, “Prompt design strategies”: https://ai.google.dev/gemini-api/docs/prompting-strategies
