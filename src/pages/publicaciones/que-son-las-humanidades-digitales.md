---
layout: ../../layouts/PublicationLayout.astro
title: ¿Qué son las humanidades digitales?
description: Cultura, datos y computación para estudiar el patrimonio, conectar colecciones y conservar la procedencia de la información en la era de la IA.
published: true
---

Una fotografía digitalizada permite observar una escena. Si conocemos su autoría, lugar, fecha, colección y condiciones de uso, también podemos relacionarla con otras imágenes, contrastarla con documentos y estudiarla como parte de un proceso histórico. Esa diferencia ayuda a entender qué aportan las humanidades digitales.

El campo reúne preguntas de la historia, la literatura, la lingüística, el arte y otras disciplinas con métodos digitales. Su trabajo se desarrolla en la intersección entre cultura, datos y computación: organiza materiales, construye herramientas de análisis y examina críticamente cómo la tecnología interviene en nuestra relación con el conocimiento.

Digitalizar un libro puede ser un primer paso valioso, pero no agota esa tarea. Importan las preguntas que hacemos, las decisiones con las que convertimos un documento en datos y las interpretaciones que esos datos permiten sostener.

## De una colección a un sistema de relaciones

Pensemos en cartas conservadas en archivos distintos. Reunir sus imágenes facilita la consulta; registrar remitentes, destinatarios, lugares y fechas permite además explorar correspondencias, identificar vacíos y reconstruir redes. El resultado no reemplaza la lectura de las cartas: ayuda a decidir qué leer, qué comparar y qué hipótesis revisar.

La información que describe cada objeto se conoce como metadatos. Puede incluir autoría, origen, lengua, soporte, colección, derechos y relaciones con otros materiales. También debe admitir incertidumbre: una fecha aproximada o una atribución discutida no deberían convertirse en datos aparentemente exactos por exigencias del sistema.

Describir requiere criterio, no sólo capturar campos. Un catálogo puede conservar denominaciones históricas necesarias para investigar y, al mismo tiempo, explicar su contexto o incorporar formas de identificación utilizadas por las personas representadas. Hacer explícitas esas decisiones permite entender mejor el archivo.

## Interoperabilidad: conectar sin uniformar

Dos colecciones pueden estar disponibles en internet y seguir siendo difíciles de consultar juntas. Si describen de manera incompatible los mismos tipos de objetos, una búsqueda compartida exige trabajo adicional. La interoperabilidad busca que los sistemas intercambien información y conserven suficiente significado para utilizarla correctamente.

Un ejemplo técnico es el Europeana Data Model, que ofrece un marco para representar y relacionar metadatos de patrimonio cultural. Su documentación distingue elementos del objeto cultural, sus representaciones digitales y su contexto, y proporciona reglas para mapear información existente. [Documentación del modelo de datos de Europeana](https://pro.europeana.eu/index.php/page/edm-documentation).

La lección útil no consiste en adoptar un portal determinado, sino en acordar descripciones, identificadores y mecanismos de intercambio. Es posible desarrollar una búsqueda común sin trasladar todas las colecciones a una sola base ni eliminar la responsabilidad de las instituciones que las custodian.

También conviene distinguir acceso de reutilización. Poder consultar una imagen no significa que esté permitido redistribuirla, modificarla o incorporarla a un sistema de inteligencia artificial. Un proyecto debe comunicar por separado las condiciones de uso de los objetos, sus reproducciones y los metadatos.

## Más escala no significa menos interpretación

Un corpus es una colección de materiales organizada para su estudio. Sobre un conjunto de textos pueden analizarse frecuencias, cambios de vocabulario, menciones de lugares o relaciones entre personas. Estas operaciones permiten explorar patrones que sería laborioso detectar mediante lectura individual.

Pero un patrón no es todavía una explicación. Una palabra puede aparecer más porque cambió el tema de una publicación, porque sobrevivieron más ejemplares de cierto periodo o porque el reconocimiento de caracteres funciona mejor en una parte del corpus. La calidad de la interpretación depende de revisar esas posibilidades.

Por eso el análisis computacional y la lectura atenta pueden complementarse. El primero orienta la exploración; la segunda permite examinar significados, ambigüedades y casos que contradicen la tendencia. Documentar la selección de materiales y las limitaciones del método hace que otras personas puedan discutir el resultado.

## Inteligencia artificial y procedencia

La inteligencia artificial puede apoyar tareas como transcripción, clasificación, traducción y búsqueda. Su utilidad depende del material y de la revisión: una descripción convincente puede atribuir a una fotografía algo que no aparece en ella, y una transcripción puede alterar un nombre propio sin que el error resulte evidente.

El problema se agrava cuando una salida automática entra al catálogo sin identificarse como tal. Una inferencia puede terminar siendo utilizada como si formara parte del documento original. Por eso proponemos conservar siempre una separación visible entre fuente, transformación y validación.

La procedencia registra de dónde viene una información y cómo se produjo. La familia de especificaciones PROV del W3C ofrece un marco para describir entidades, actividades y agentes involucrados en ese proceso; no es exclusiva de la IA, pero resulta pertinente para documentar sus intervenciones. [Introducción a PROV](https://www.w3.org/TR/prov-overview/).

En un proyecto cultural, esto puede traducirse en conservar el original, la herramienta y versión utilizadas, las correcciones posteriores y quién revisó el resultado. Una reconstrucción generada debe presentarse como una propuesta interpretativa, no como evidencia recuperada. Las lagunas también forman parte de lo que sabemos y no conviene ocultarlas con una imagen completa.

## Lenguas y patrimonio de México

El patrimonio mexicano incluye materiales documentales, sonoros, visuales y lingüísticos que requieren formas distintas de descripción. Diseñar herramientas únicamente alrededor del español dejaría fuera necesidades importantes. El catálogo del INALI, por ejemplo, documenta variantes lingüísticas, autodenominaciones y referencias geográficas: distinciones que una clasificación demasiado general puede borrar. [Catálogo de las Lenguas Indígenas Nacionales](https://site.inali.gob.mx/pdf/catalogo_lenguas_indigenas.pdf).

Trabajar con una grabación o un diccionario no consiste solamente en preparar datos para un modelo. También exige atender quién produjo el material, cómo desea identificarse, qué variantes están representadas y qué usos se acordaron. La participación de hablantes y comunidades debe formar parte del diseño y de la evaluación, no limitarse a una consulta al final.

Los principios CARE de la Global Indigenous Data Alliance ponen el énfasis en beneficio colectivo, autoridad para controlar, responsabilidad y ética. Complementan las metas técnicas de intercambio de datos con preguntas sobre las personas, los propósitos y las decisiones que afectan a los pueblos indígenas. [Principios CARE para la gobernanza de datos indígenas](https://www.gida-global.org/careprinciples).

Desde esa perspectiva, recomendamos acordar consentimiento, atribución, acceso y reutilización antes de difundir materiales, considerando también los derechos de las personas participantes. No todo conocimiento debe publicarse sin restricciones ni utilizarse para entrenar IA. La apertura puede ser apropiada en algunos casos; en otros, corresponde establecer acceso limitado o no divulgar.

## Una ruta de trabajo para instituciones

Para una biblioteca, universidad, archivo o museo, proponemos comenzar por una colección acotada y una pregunta concreta. Un proyecto manejable permite probar criterios de descripción, revisar derechos y calcular el esfuerzo de mantenimiento antes de ampliar el alcance. Comprar una plataforma no sustituye esas decisiones.

Una ruta inicial puede organizarse en cinco tareas:

1. Definir qué materiales se trabajarán, para quién y con qué propósito de investigación, conservación o consulta.
2. Acordar metadatos, formatos y criterios de calidad, incluyendo cómo registrar dudas y ausencias.
3. Documentar procedencia, permisos y restricciones, con participación de quienes corresponda.
4. Probar la consulta y el intercambio con usuarios reales, sin depender exclusivamente de una interfaz visual.
5. Asignar responsables y recursos para respaldos, correcciones, actualización y preservación.

La evaluación debería considerar si el proyecto ayuda a encontrar materiales, comprender su contexto y utilizarlos de manera responsable. El número de archivos publicados, por sí solo, no dice si una colección se volvió más confiable o más útil.

Las humanidades digitales permiten ampliar el acceso y formular nuevas preguntas, pero su aportación también consiste en conservar distinciones: entre original y reconstrucción, entre dato e interpretación, entre disponibilidad y permiso. Organizar esas diferencias con rigor es una forma de cuidar el conocimiento que las instituciones y las comunidades ponen en circulación.
