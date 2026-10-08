# GM Social — evidencia del caso de estudio

Revisión: **7 de octubre de 2026**, America/Lima. El usuario autorizó revisar Plataforma-Encuestas-GM, ejecutar su entorno local y publicar sus datos demo y capturas. Esta autorización permite el relato y las imágenes seleccionadas; no distribuye código interno, credenciales o servicios privados.

## Origen y alcance

La revisión de la plataforma contrastó documentación frontend/backend con modelos, servicios, policies, contratos y vistas. Se consultaron las guías de arquitectura, planes de implementación y contratos vigentes de reportes, calidad y sincronización, además de la guía de integración móvil. Este registro conserva un resumen de la evidencia entregada por el chat de revisión y no depende de sus archivos temporales.

El usuario declara desarrollo full stack de principio a fin del backoffice web y API. La base web deriva de una plantilla existente. La app móvil pertenece a otros compañeros. No se infieren cargo, fechas, nombre del cliente, impacto comercial ni despliegue productivo.

## Implementación y comprobaciones de la plataforma

| Área                  | Evidencia y alcance comprobado                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquitectura          | Next.js App Router, React, TypeScript, Ant Design y TanStack Query en web; Django REST Framework y PostgreSQL en API. Reglas y policies se mantienen en el backend modular; la web integra la API mediante un proxy del servidor.           |
| Seguimiento           | Dashboard y gráficos cargados con datos persistidos. El filtro territorial cambió las métricas mostradas mediante solicitudes reales. La actualización periódica no se describe como WebSockets ni tiempo real.                             |
| Estudios y asignación | Detalles existentes de estudio, zonas, cuotas y asignaciones, con responsables, supervisores, versión del instrumento y metas. No se ejecutaron redistribuciones ni transiciones de estado durante la revisión.                             |
| Instrumentos          | Versión publicada y vista previa de solo lectura. Código y UI incluyen nueve tipos de pregunta y restricciones. No se publicaron ni clonaron nuevas versiones durante la sesión.                                                            |
| Recepción             | Bandeja y detalle de actividades existentes con respuestas tipadas, versión, resultado, revisión y tiempos de captura/recepción distintos. El detalle elegido es un registro demo anterior al contrato móvil vigente.                       |
| Calidad               | Hallazgo existente con severidad, evidencia, notas y metadatos de revisión. No se ejecutaron los botones de resolución o descarte. Las reglas implementadas no acreditan detección de fraude certificada ni umbrales productivos aprobados. |
| Exportación           | Solicitudes locales autenticadas CSV y XLSX devolvieron HTTP 200; se comprobaron BOM UTF-8 y firma ZIP respectivamente. Las bases exportadas no se incorporan al portafolio.                                                                |
| Permisos              | Consultas reales por rol comprobaron acceso a datos detallados, agregados o rechazo según autorización. Los perfiles de cliente y metodología reciben reportes agregados; no se les atribuye acceso a respuestas individuales.              |
| Contrato móvil        | Preparación y sincronización idempotente inspeccionadas en código/documentación. No se ejecutaron Flutter, nuevas sincronizaciones, pruebas de pérdida de conexión o concurrencia.                                                          |

La revisión fuente ejecutó `manage.py check` sin incidencias, comprobó ausencia de migraciones pendientes bajo settings de prueba y completó el build del frontend con código 0. No ejecutó una suite integral de regresión, UAT o carga. Se mantuvieron frontend y API locales activos en los puertos **3001** y **8000**, con el portafolio separado en **3000**; no se modificaron funcionalmente los repositorios fuente.

## Capturas autorizadas y presentación

Ocho PNG reales, todos horizontales de **1920 × 1080px (16:9)**, recapturados con viewport fijo, escala y zoom 1, y `fullPage: false`. No se combinaron pantallas ni estiraron las capturas previas. Se conservan sin cambios de píxeles ni recompresión; suman **1 391 780 bytes**. El total exacto, dimensiones, parámetros de captura y huellas SHA-256 verificados está en [el manifiesto vigente](previews/gm-social-captures.json). Los archivos públicos y sus textos ES/EN se mantienen en `public/images/projects/plataforma-encuestas-gm/` y `src/features/portfolio/data/gm-social-gallery.ts`.

Orden narrativo:

1. Dashboard de campo — portada.
2. Cuotas territoriales del estudio.
3. Vista previa del instrumento publicado.
4. Asignación del trabajo de campo.
5. Actividades confirmadas por el servidor.
6. Respuestas, ubicación y firma.
7. Hallazgo de calidad y trazabilidad.
8. Análisis diario y horario.

El usuario solicitó el reemplazo de la primera selección por pantallas de monitor completas. El [manifiesto inicial](previews/gm-social-captures-initial.json) conserva la evidencia histórica de sus dimensiones y huellas. Los nuevos encuadres 03, 04 y 07 se obtuvieron desplazando normalmente la página: muestran cuotas, preguntas visibles y respuestas/ubicación/firma respectivamente. La 04 no muestra todos los nueve tipos de pregunta y la 07 no muestra los tiempos de captura/recepción; esas capacidades siguen respaldadas por la auditoría inicial. Los títulos, alternativas y captions vigentes describen solo lo visible; los detalles de captura y límites menores se conservan en este documento.

La revisión fuente inspeccionó visualmente las ocho imágenes. Se ocultaron solo los indicadores flotantes del entorno de desarrollo; no hubo mocks, sustitución de datos ni generación de pantallas. No se exponen tokens, contraseñas ni archivos o URLs de firma. Los identificadores, personas, fechas y ubicaciones visibles pertenecen al dataset demo autorizado.

La portada y la galería identifican los datos como demostración. La galería conserva la imagen completa en proporción 16:9 y ofrece enlaces a cada PNG original en una pestaña nueva para leerlo a resolución completa. Títulos, alternativas, captions y aviso tienen ES/EN. El caso privado no tiene fecha, enlace público a la aplicación ni repositorio. Sus tags describen el proyecto y no amplían automáticamente el arsenal personal.

## Límites que deben conservarse

- Google Maps falló por restricción del origen local, incluyendo la comprobación adicional de `localhost:3000`. La novena captura del tab «Mapa de actividades» permanece pendiente de un origen permitido por la clave efectiva y de evidencia de carga real de Google Maps con Perú. La selección excluye el mapa fallido; no se acredita un mapa funcional, PostGIS, seguimiento GPS continuo o pertenencia a polígonos. No se modificaron restricciones externas ni se sustituyó el proveedor por una representación ficticia.
- La app Flutter no fue ejecutada. Un atributo demo de captura sin conexión no demuestra interoperabilidad o ausencia de pérdidas offline.
- Aceptación integral, instrumentos e insumos oficiales, pruebas de carga e infraestructura productiva permanecen pendientes. No se comprobó conexión AWS, almacenamiento productivo, backups o despliegue.
- Las cantidades y nombres del dataset son demostración. No se convierten en métricas de usuarios, ahorro, rendimiento, impacto social o resultados de una campaña.
- La revisión de operaciones existentes no acredita que todas las mutaciones o transiciones hayan sido ensayadas en esta sesión. La documentación histórica se contrastó con contratos y código vigentes; no se publicaron afirmaciones de una planificación como si fueran implementación comprobada.

La validación de la integración, layout y recorridos del portafolio se registra en [verification.md](verification.md), separada de las comprobaciones de la plataforma fuente.
