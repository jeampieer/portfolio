# Sistema visual

La identidad original se conserva en `JEAMPIEER_TECH_Design_System_v1.0.md`. El sitio interpreta «Orbital Signal» con anillos, una señal cian y composición editorial, sin una interfaz de videojuego.

## Tokens y tipografía

Los tokens de oscuro en `src/app/globals.css` reproducen los valores del documento: fondo `#0F1115`, secundario `#171A21`, superficie `#1D2230`, borde `#2B3342`, acento `#59E1E7`, hover `#7EEBF0`, texto `#E8EDF2` y secundario `#98A2B3`. Los estados success, warning y danger también están definidos.

El documento pide tema claro pero no define su paleta. Se añadió una adaptación explícita: fondos claros, texto oscuro y acento `#08777D` para conservar contraste. `data-theme` controla los tokens; no se duplican componentes. `@theme inline` expone fondo, superficie, acento y texto a Tailwind v4.

Geist Variable se usa para texto, Space Grotesk Variable para títulos e IBM Plex Mono para pequeños rótulos técnicos. Se instalan mediante Fontsource y el build sirve los archivos; no hay solicitudes a Google Fonts en el navegador ni descargas de fuentes en tiempo de build.

La escala usa títulos hero de hasta 72px, títulos de casos de hasta 56px (40px en móvil), secciones de hasta 40px y variantes fluidas para móviles. Espaciado principal en múltiplos de 8; container máximo 1280px. Hay ajustes de tamaño para etiquetas y controles compactos. CSS Grid implementa composiciones de dos/cuatro columnas según el contenido; no se agrega una cuadrícula de doce columnas vacía.

## Componentes e interacción

- Botón primario cian, secundario con borde, ghost y botón de icono con etiqueta.
- Superficie compartida `surface-card`: borde de acento y glow tenue en hover; las informativas conservan su tamaño. `surface-card-link` añade elevación de 3px en hover y foco interno, sin ocultar contenido. Transiciones de 180–200ms.
- Header transparente sobre la portada y blur con borde al desplazar.
- Disclosures nativos para Más y menú compacto por debajo de 1280px; Escape devuelve el foco al summary. Destinos compartidos y CV independiente.
- Señales y órbitas son decorativas; no hay canvas, Three.js ni render loop.
- El laboratorio permite cambiar velocidad, trayectoria y pausa. Movimiento reducido detiene la órbita; también se pausa fuera del viewport o al ocultar la pestaña.
- Reveal usa detección de viewport de Framer Motion y animación de 400ms una sola vez, desplazamiento de 24px y escalonado de 50ms limitado a 150ms; el HTML inicial sigue visible sin JavaScript.
- El efecto de escritura solo recorta visualmente un texto ya completo en el DOM y respeta movimiento reducido.

## Decisiones por datos pendientes

La fotografía y el CV provienen de la configuración publicada; el CTA de descarga solo se muestra si existe archivo. El timeline describe proceso, integrado bajo Sobre mí; el arsenal oculta grupos sin datos y no simula enlaces en las tecnologías. Estas decisiones evitan simular contenido personal.

La revisión automatizada de contraste/accesibilidad y la inspección responsive se detallan en [verification.md](verification.md). Las pruebas automáticas no certifican por sí solas conformidad completa WCAG AA.

El visor usa la misma superficie, borde, tipografía y controles que el sitio, con opacidad de 160ms al abrir/cerrar mediante transiciones discretas de dialog. El fondo queda inerte y la captura completa se ajusta con contain; tamaño original habilita scroll nativo. Movimiento reducido elimina las transiciones y las transformaciones de hover; no se recorta el foco en los enlaces de imagen. La 404 reutiliza marca y estilos de recuperación en ambos temas.
