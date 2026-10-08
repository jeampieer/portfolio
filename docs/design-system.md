# Sistema visual

La identidad original se conserva en `JEAMPIEER_TECH_Design_System_v1.0.md`. El sitio interpreta «Orbital Signal» con anillos, una señal cian y composición editorial, sin una interfaz de videojuego.

## Tokens y tipografía

Los tokens de oscuro en `src/app/globals.css` reproducen los valores del documento: fondo `#0F1115`, secundario `#171A21`, superficie `#1D2230`, borde `#2B3342`, acento `#59E1E7`, hover `#7EEBF0`, texto `#E8EDF2` y secundario `#98A2B3`. Los estados success, warning y danger también están definidos.

El documento pide tema claro pero no define su paleta. Se añadió una adaptación explícita: fondos claros, texto oscuro y acento `#08777D` para conservar contraste. `data-theme` controla los tokens; no se duplican componentes. `@theme inline` expone fondo, superficie, acento y texto a Tailwind v4.

Geist Variable se usa para texto, Space Grotesk Variable para títulos e IBM Plex Mono para pequeños rótulos técnicos. Se instalan mediante Fontsource y el build sirve los archivos; no hay solicitudes a Google Fonts en el navegador ni descargas de fuentes en tiempo de build.

La escala usa títulos hero de hasta 72px, secciones de hasta 40px y variantes fluidas para móviles. Espaciado principal en múltiplos de 8; container máximo 1280px. Hay ajustes de tamaño para etiquetas y controles compactos. CSS Grid implementa composiciones de dos/cuatro columnas según el contenido; no se agrega una cuadrícula de doce columnas vacía.

## Componentes e interacción

- Botón primario cian, secundario con borde, ghost y botón de icono con etiqueta.
- Tarjetas con elevación suave y borde de acento.
- Header transparente sobre la portada y blur con borde al desplazar.
- Menú móvil desplegable accesible; Escape devuelve el foco al botón.
- Señales y órbitas son decorativas; no hay canvas, Three.js ni render loop.
- El laboratorio permite cambiar velocidad, trayectoria y pausa. Movimiento reducido detiene la órbita.
- Reveal usa detección de viewport de Framer Motion y animación una sola vez; el HTML inicial sigue visible sin JavaScript.
- El efecto de escritura solo recorta visualmente un texto ya completo en el DOM y respeta movimiento reducido.

## Decisiones por datos pendientes

Se usa monograma hasta contar con foto; el botón CV no aparece sin archivo; el timeline describe proceso mientras se confirma la trayectoria; el arsenal oculta grupos sin datos. Estas decisiones evitan simular contenido personal.

La revisión automatizada de contraste/accesibilidad y la inspección responsive se detallan en [verification.md](verification.md). Las pruebas automáticas no certifican por sí solas conformidad completa WCAG AA.
