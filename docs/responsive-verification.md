# Revisión responsive — JEAMPIEER.TECH

Registro histórico; la revisión UX/UI vigente está al final de este documento.

Fecha: **7 de octubre de 2026**, America/Lima. Revisión paralela a la incorporación de la ficha MFA; este registro se mantiene separado de `verification.md` para evitar ediciones simultáneas.

## Hallazgos y ajustes

Los cambios de implementación se limitan a `src/app/globals.css`. Se conservan los tokens, los textos ES/EN y los componentes existentes.

- A **1024px**, el halo decorativo del hero extendía el documento hasta **1028px**. La escena ahora recorta su desbordamiento decorativo con `overflow: clip`, sin ocultar desbordamientos del documento completo.
- A **360px y 768px**, los elementos flex del stack encogían y separaban el punto de su tecnología en dos líneas. Cada elemento conserva su texto y separador; el grupo puede pasar a otra línea. El espaciado móvil permite mostrar el stack actual en una sola línea a 360px.
- Desde **400px**, las tarjetas de identidad pasaban a dos columnas estrechas, con cuerpos de 12px y encabezados partidos. Se conserva una columna hasta 639px y se aumenta el cuerpo móvil a 14px y los títulos a 19px. A 640px se mantienen dos columnas; desktop conserva cuatro.
- Tema, menú e idioma tienen áreas móviles de al menos **44 × 44px**. Los filtros tienen al menos 44 × 44px y pueden envolver si falta espacio; los enlaces sociales y de regreso al inicio también tienen 44px de altura móvil.

No se modificaron los datos, contratos, vistas ni archivos compartidos de la ficha MFA. No se añadieron dependencias, commits o despliegues.

## Cobertura

Se revisaron portada completa, Header/Footer, hero, identidad, timeline, proyectos y filtros, stack, laboratorio y contacto. Las rutas de detalle son `orbital-signal` y `servicio-mfa`, en **ES/EN** y **oscuro/claro**.

La matriz de geometría cubre **360, 390, 768, 1024 y 1440px**: 60 combinaciones de ancho, idioma, tema y ruta. La revisión visual por secciones añade **400 y 640px**, alrededor del cambio de columnas de identidad. Se inspeccionaron capturas y contenido, además de medir el ancho del documento. El tema se configura explícitamente: el sitio usa oscuro por defecto y no sigue la preferencia de color del navegador.

Las comprobaciones de interacción cubren las 20 combinaciones de esos cinco anchos, dos idiomas y dos temas: menú móvil, Escape y devolución del foco, navegación por sección, filtro Backend, apertura de MFA, cambio de idioma conservando el slug, controles del laboratorio y cambio de tema. Las áreas táctiles móviles se midieron en el DOM. Las **20/20 combinaciones de interacción** terminaron correctamente contra el build de producción, con esperas sobre el estado actualizado de React.

## Validación y evidencia

Node **24.19.0**, Next **16.3.8** y Chromium de Playwright, usando las dependencias ya instaladas. `npm run verify` terminó con código **0**: lint, tipos, formato, build y **20/20 pruebas E2E** correctos, incluyendo el caso MFA; la última ejecución E2E tomó **14.3 s**. Se conserva el servidor de desarrollo en **http://127.0.0.1:3000/es** y **http://127.0.0.1:3000/en**.

La [matriz final](previews/responsive/results.json) registró **60/60 combinaciones sin desbordamiento**, con el tema real coincidiendo con el solicitado. Las capturas de producción se registran en `docs/previews/responsive/`: [portada ES móvil](previews/responsive/es-dark-360-es.png), [portada EN desktop](previews/responsive/en-light-1440-en.png), [MFA ES móvil](previews/responsive/es-dark-360-servicio-mfa.png) y [MFA EN desktop](previews/responsive/en-light-1440-servicio-mfa.png). Las capturas adicionales por sección incluyen las variantes restantes de tema/idioma en producción y los cambios de columnas a 400/640px en desarrollo, identificados por el prefijo `dev-`. Estas capturas ocultan únicamente Header fijo, enlace de salto y controles del entorno de desarrollo para evitar superposiciones del proceso de captura; la navegación se comprueba aparte sin ocultarlos.

## Límites

La revisión usa Chromium con tamaños simulados; no sustituye Safari/Firefox ni dispositivos físicos. Las comprobaciones de axe no certifican conformidad WCAG completa. El aviso de hidratación de `OrbitalLab` bajo movimiento reducido, ya documentado en `verification.md`, queda fuera de este cambio; el recorrido E2E comprueba el estado reducido final. No se valida envío de correo ni servicios privados: el portafolio no implementa esos servicios.

## Actualización UX/UI — 8 de octubre de 2026

La matriz actual incluye inicio, los **tres** proyectos y 404 localizada/global, ES/EN y oscuro/claro a **360, 390, 768, 1024, 1280 y 1440px**: **144/144 combinaciones** sin overflow horizontal. Se comprueban títulos de casos ≤56px (≤40px móvil), menú compacto <1280px, navegación desktop desde 1280px y CV accesible en el menú. Se revisaron capturas completas a 390/1440px y el visor a 390px con touch simulado y a 1440px con teclado.

La nueva navegación, ocho secciones principales y proceso integrado sustituyen la organización y los filtros del registro histórico. El aviso de hidratación del laboratorio bajo movimiento reducido queda corregido y tiene cobertura de consola. Los límites Chromium, touch simulado y axe parcial siguen vigentes. Evidencia y ejecución final: [verification.md](verification.md); capturas en [previews/ux-ui](previews/ux-ui/).
