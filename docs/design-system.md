# Sistema visual

La identidad original se conserva en `JEAMPIEER_TECH_Design_System_v1.0.md`. El sitio interpreta «Orbital Signal» con anillos, una señal cian y composición editorial, sin una interfaz de videojuego.

## Tokens y tipografía

Los tokens de oscuro en `src/app/globals.css` reproducen los valores del documento: fondo `#0F1115`, secundario `#171A21`, superficie `#1D2230`, borde `#2B3342`, acento `#59E1E7`, hover `#7EEBF0`, texto `#E8EDF2` y secundario `#98A2B3`. Los estados success, warning y danger también están definidos.

El documento pide tema claro pero no define su paleta. Se añadió una adaptación explícita: fondos claros, texto oscuro y acento `#08777D` para conservar contraste. `data-theme` controla los tokens; no se duplican componentes. `@theme inline` expone fondo, superficie, acento y texto a Tailwind v4.

Geist Variable se usa para texto, Space Grotesk Variable para títulos e IBM Plex Mono para pequeños rótulos técnicos. Se instalan mediante Fontsource y el build sirve los archivos; no hay solicitudes a Google Fonts en el navegador ni descargas de fuentes en tiempo de build.

La escala usa títulos hero de hasta 72px, títulos de casos de hasta 56px (40px en móvil), secciones de hasta 40px y variantes fluidas para móviles. Espaciado principal en múltiplos de 8; container máximo 1280px. Hay ajustes de tamaño para etiquetas y controles compactos. CSS Grid implementa composiciones de dos/cuatro columnas según el contenido; no se agrega una cuadrícula de doce columnas vacía.

## Tema al abrir la plataforma

Cada carga de documento comienza en oscuro, independientemente del sistema operativo o de una elección anterior guardada. `data-theme="dark"` está presente en el HTML del servidor y `AppProvider` controla `forcedTheme` con estado React local. El botón permite alternar claro/oscuro durante la visita; la navegación interna de Next conserva la elección, pero recargar, abrir otra página directamente o cambiar de idioma mediante navegación completa vuelve al oscuro. No se borra la antigua clave `theme`; su valor no controla la apariencia ni se actualiza al pulsar el botón. Las recuperaciones globales también abren en oscuro.

## Componentes e interacción

- Botón primario cian, secundario con borde, ghost y botón de icono con etiqueta.
- Superficie compartida `surface-card`: borde de acento y glow tenue en hover; las informativas conservan su tamaño. `surface-card-link` añade elevación de 3px en hover y foco interno, sin ocultar contenido. Transiciones de 180–200ms.
- Header transparente sobre la portada y blur con borde al desplazar.
- Disclosures nativos para Más y menú compacto por debajo de 1280px; Escape devuelve el foco al summary. Destinos compartidos y CV independiente.
- Señales y órbitas son decorativas; no hay canvas, Three.js ni render loop. En la fotografía, un satélite cian recorre el anillo intermedio cada 28 segundos con una estela SVG corta. Los anillos y el retrato mantienen posición y dimensiones. El halo aumenta su opacidad en 220ms con un puntero preciso, con brillo más tenue en tema claro; en touch conserva su intensidad base.
- El laboratorio permite cambiar velocidad, trayectoria y pausa. Movimiento reducido detiene la órbita; también se pausa fuera del viewport o al ocultar la pestaña.
- Reveal usa detección de viewport de Framer Motion y animación de 400ms una sola vez, desplazamiento de 24px y escalonado de 50ms limitado a 150ms; el HTML inicial sigue visible sin JavaScript.
- El saludo se escribe, permanece visible y se borra en un ciclo CSS de seis segundos, con cursor continuo. «Pausar animaciones» / «Pause animations» detiene la señal y muestra el saludo completo; permite reanudar. Los efectos se pausan fuera del viewport o con la pestaña oculta. Movimiento reducido elimina órbita, estela y escritura, y el control indica la preferencia activa. El HTML inicial y la vista sin JavaScript presentan el saludo completo y el retrato estático.

## Decisiones por datos pendientes

La fotografía y el CV provienen de la configuración publicada; el CTA de descarga solo se muestra si existe archivo. El timeline describe proceso, integrado bajo Sobre mí; el arsenal oculta grupos sin datos y no simula enlaces en las tecnologías. Estas decisiones evitan simular contenido personal.

La revisión automatizada de contraste/accesibilidad y la inspección responsive se detallan en [verification.md](verification.md). Las pruebas automáticas no certifican por sí solas conformidad completa WCAG AA.

El visor usa la misma superficie, borde, tipografía y controles que el sitio, con opacidad de 160ms al abrir/cerrar mediante transiciones discretas de dialog. El fondo queda inerte y la captura completa se ajusta con contain; tamaño original habilita scroll nativo. Movimiento reducido elimina las transiciones y las transformaciones de hover; no se recorta el foco en los enlaces de imagen. La 404 reutiliza marca y estilos de recuperación en ambos temas.

La marca usa el ancla nativa `/{locale}#top` para volver arriba incluso al repetir el mismo destino. Cada card de proyecto tiene un único enlace de detalle cuya área cubre toda la card, con foco visible en su contorno y contexto del título; no se anidan enlaces ni se convierte la card en un botón. «Explorar proyecto» / «Explore project» se presenta como CTA primario cian de al menos 48px de alto. Su superficie visual queda sobre el enlace extendido para que solo el hover directo del CTA active el cambio a `accent-hover` y una elevación de 2px en 180ms; pasar sobre el resto de la card conserva el aspecto base del CTA. El foco de teclado resalta también el CTA y movimiento reducido elimina su desplazamiento. La navegación entre cards se controla desde una isla cliente independiente.

## Carrusel del archivo de proyectos

Una card protagonista por vista conserva imagen completa y texto, con composición horizontal desde 1024px y vertical en tablet/móvil. El track ajusta cada card con scroll snap nativo y comparte la altura para mantener estables los controles al cambiar de proyecto. Flechas de 44px, contador y selectores de 44px proporcionan navegación explícita, además del gesto táctil y el trackpad. La posición se indica únicamente en el contador del carrusel; los identificadores internos de los casos se conservan en sus detalles. El acento identifica la posición activa; las flechas en los límites permanecen reconocibles y no cambian el foco.

No avanza automáticamente ni obliga a arrastrar. El teclado permite recorrer el track con flechas e Inicio/Fin o seguir los enlaces con Tab. Se conserva foco visible, etiquetas ES/EN y un anuncio breve de posición y título. Con movimiento reducido, los cambios son instantáneos. Sin JavaScript se conserva el desplazamiento nativo y los enlaces, y se ocultan únicamente los controles dependientes de hidratación.

Referencias de interacción: [patrón de carrusel WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) y [scroll snap de CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type). La implementación adapta esos principios a contenido prerenderizado y desplazable; no constituye una certificación de accesibilidad.
