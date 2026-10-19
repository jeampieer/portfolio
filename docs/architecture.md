# Arquitectura

## Alcance

Aplicación pública de presentación. No consume un backend ni mantiene una sesión. Next.js genera HTML para los idiomas y proyectos conocidos; la hidratación añade el tema, navegación y laboratorio. El servidor Next local sirve recursos y rutas, pero no hay API de negocio.

## Relación con gm-social-web

Se revisaron `package.json`, `AGENTS.md`, `README.md`, `docs/architecture.md`, `docs/INDEX.md`, configuración y ejemplos de vistas/layouts. La referencia no fue modificada.

| Convención de la referencia                            | Adaptación                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------- |
| App Router, `src/`, imports `@/` y TS estricto         | Conservados                                                         |
| `features/{domain}/types`, `hooks`, `components/views` | Conservados en `features/portfolio`                                 |
| UI global en `components/ui`, layouts, providers       | Conservados para marca, secciones, tema y motion                    |
| Prettier: 4 espacios, comillas dobles y 100 columnas   | Conservado                                                          |
| Servicios, API formatters y TanStack Query             | Omitidos porque el contenido es local tipado                        |
| Auth, cookies, guards, Route Handlers, axios           | Omitidos por alcance explícito                                      |
| Ant Design                                             | Sustituido por componentes propios y Tailwind v4 según la identidad |
| Documentación técnica y `AGENTS.md`                    | Adaptados al portafolio                                             |

No se copió código de negocio ni documentación privada dentro de páginas públicas.

## Flujo

`proxy.ts` asigna HTTP 404 a idiomas/slugs no publicados → `page.tsx` valida los parámetros → carga una vista de la feature → la vista obtiene diccionario y datos → componentes de sección presentan el contenido. Las funciones `generateMetadata` viven junto a la ruta y usan `lib/seo.ts`. El seguimiento de secciones vive en un hook y los destinos compartidos de Header/Footer en `data/navigation.ts`. Los disclosures nativos mantienen navegación sin JavaScript; el cambio de idioma carga el documento localizado y conserva el ancla. El laboratorio mantiene estado local porque su comportamiento no se comparte. `useMotionPreferences` comparte suscripciones a movimiento reducido y visibilidad del documento, con snapshots de servidor estables para evitar discrepancias de hidratación. Un observador de viewport pausa el laboratorio fuera de pantalla.

`AppProvider` integra `next-themes`, `LazyMotion` y `MotionConfig`. Su tema se controla mediante estado React inicializado en oscuro y `forcedTheme`; el Header usa `useThemeToggle` para alternarlo sin guardar la elección. Los valores previos de `localStorage` y el esquema del sistema no determinan el tema. La navegación interna con Next conserva el estado del documento; una recarga, nueva apertura o cambio de idioma con navegación completa vuelve a oscuro. No convierte en cliente los hijos ya compuestos en servidor. Los componentes estáticos, como Hero, IdentitySignal, EngineeringArsenal, Timeline y ProjectView, siguen siendo Server Components. Las islas cliente son Header, Reveal, HeroMotion, ProjectCarousel, OrbitalLab, Contact y el visor compartido ImageViewer. Las secciones y los captions se componen en servidor y se pasan como hijos al visor; solo el diálogo y sus controles mantienen estado cliente.

El contrato `Project` admite títulos localizados, categorías frontend/backend/fullstack, fecha opcional y secciones opcionales de participación y decisiones. La ilustración conceptual solo se habilita en Orbital Signal mediante `artwork`; los casos sin ilustración usan una ficha de texto y omiten esa vista en el detalle. La galería solo se renderiza cuando contiene imágenes autorizadas. El caso MFA es una descripción pública de un backend privado, sin conectar ese servicio ni añadir autenticación al portafolio.

GM Social incorpora `features`, `cover` y `galleryNotice` opcionales. `ProjectImage` conserva dimensiones, título, alternativa y caption localizados. La galería presenta los PNG originales sin recomprimir texto, permite ampliarlos en el sitio o abrirlos en una pestaña nueva y se adapta a una o dos columnas; mantiene enlaces originales sin JavaScript; el visor añade ampliación mediante una isla cliente compartida. Los datos de galería viven en `data/gm-social-gallery.ts`, y los archivos autorizados en `public/images/projects/plataforma-encuestas-gm/`. MFA reutiliza el mismo contrato y presentación; sus datos viven en `data/mfa-gallery.ts` y sus cuatro PNG en `public/images/projects/servicio-mfa/`. El cliente de prueba visible en las capturas pertenece al entorno de evidencia y no se incorpora al sitio. Los servicios de GM Social y MFA no son dependencias de ejecución del portafolio.

IPERC Antapaccay reutiliza el contrato `Project`, las vistas y el visor existentes, con contenido en `portfolio.ts`, galería en `data/iperc-gallery.ts` y tres PNG en `public/images/projects/iperc-antapaccay/`. Las imágenes muestran la interfaz real con datos sintéticos y respuestas de API simuladas, identificadas mediante `galleryNotice`; la copia temporal de captura no forma parte del sitio. La entrada genera automáticamente detalles ES/EN, metadata, validación del slug y sitemap según la configuración existente. No añade rutas manuales, dependencias, providers ni conexiones a la API privada. El archivo mantiene primero los casos full stack: GM Social, IPERC Antapaccay y después MFA.

`ProfessionalExperiences` es una sección de servidor después del stack. Sus dos entradas localizadas viven en `data/experiences.ts`; `getExperienceImage` comprueba archivos locales de `public/images/experiences/` al renderizar para omitir solicitudes a capturas ausentes. En producción esa disponibilidad queda prerenderizada durante el build y requiere reconstrucción después de incorporar archivos. La carpeta contiene las dos capturas añadidas por el propietario. Las capturas completas usan `next/image` con `fill`, `object-fit: contain` y `unoptimized` para conservar el texto, con enlace al original. No se consume LinkedIn ni se añade un servicio de datos. La sección comparte ImageViewer con las galerías de proyectos; las dimensiones de sus originales están verificadas en los archivos locales.

`Education` compone la formación académica y los idiomas entre identidad y stack. Es un componente de servidor con entradas tipadas `EducationEntry` y `LanguageSkill` en `data/portfolio.ts`, programas y niveles localizados y estados académicos en el diccionario ES/EN. Reutiliza `SectionHeading` y `Reveal`, presenta los programas en una lista de tarjetas y los idiomas en una lista de definiciones. No añade rutas, servicios, archivos públicos ni estado cliente; la formación y los idiomas se leen en el HTML prerenderizado.

## Rutas

| Ruta                               | Resultado                                         |
| ---------------------------------- | ------------------------------------------------- |
| `/`                                | Redirect temporal a `/es`                         |
| `/es`, `/en`                       | Portafolio en el idioma indicado                  |
| `/{locale}/projects/{slug}`        | Caso de estudio, generado desde los datos locales |
| Idioma, slug o página inexistentes | 404                                               |
| `/robots.txt`, `/sitemap.xml`      | Indexación condicionada a `SITE_URL`              |

El root layout se sitúa en `[locale]` para emitir `html lang` correcto desde el servidor, sin depender de un efecto cliente. `generateStaticParams` prepara ES/EN y los proyectos. Los locales se validan con `isLocale`.

Se habilita `experimental.globalNotFound` de Next 16 para cubrir rutas ajenas al root layout localizado. Es una decisión acotada: se prueban sus respuestas HTTP 404. Revisar esta opción al actualizar Next. El detalle ausente usa la página 404 localizada; las rutas fuera del árbol localizado usan el documento global en español con enlace bilingüe.

## Cambios futuros

Agregar una feature solo cuando exista una necesidad real. Si se incorpora un CMS, definir primero el contrato y añadir su service/formatter sin mezclar el consumo de red con la presentación. No introducir almacenamiento de datos personales o envío de correos como si fueran parte del frontend actual.

Fuentes técnicas consultadas: [App Router](https://nextjs.org/docs/app/getting-started), [internacionalización](https://nextjs.org/docs/app/guides/internationalization), [Tailwind con Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs) y [movimiento reducido](https://motion.dev/docs/react-use-reduced-motion).

## Recorrido UX

El inicio ordena Hero, archivo de proyectos, identidad con proceso integrado (`#process`), educación/idiomas, stack, experiencias/comunidad, laboratorio y contacto. El archivo es de servidor, muestra primero los casos full stack y omite `showInArchive: false`; no usa filtros ni una ficha de proyectos futuros. `cardTitle` y `cardDescription` definen la presentación breve del archivo; `contributionSummary` conserva el resumen de participación en el detalle del caso, junto a las atribuciones. Solo se generan idiomas ES/EN y los guardas de página `isLocale` muestran recuperación para cualquier otro. Un proxy de routing asigna HTTP 404 a idiomas/slugs no publicados; para idiomas inválidos el layout entrega una envoltura raíz ES y la página renderiza la recuperación con destinos bilingües. Así se conserva HTML inicial legible sin JavaScript. `app/not-found.tsx` mantiene el fallback raíz para rechazos ajenos a esa envoltura.

## Carrusel de proyectos

`MissionArchive` conserva la composición de las cards en servidor y pasa sus hijos a `ProjectCarousel`, una isla cliente que recibe únicamente slug, nombre corto localizado y rótulos de navegación. El HTML de todos los proyectos y sus enlaces se prerenderiza. No se envía el contrato completo de cada caso al controlador ni se añaden dependencias o proveedores.

CSS Grid distribuye una card por vista, con altura compartida y scroll horizontal nativo ajustado mediante scroll snap. Flechas, contador y selectores directos usan estado local; un listener pasivo sincroniza la posición después del desplazamiento y ResizeObserver conserva el proyecto seleccionado al cambiar de ancho. No hay intervalos ni avance automático. Movimiento reducido usa desplazamiento instantáneo.

El track admite flechas izquierda/derecha e Inicio/Fin cuando tiene el foco. Tab mantiene la secuencia nativa de enlaces; enfocar un enlace fuera de vista alinea su card. Los controles conservan el foco en los límites mediante `aria-disabled`, y el estado anuncia posición y título de forma discreta. Todas las cards siguen en el árbol accesible y no se ocultan mediante `aria-hidden` o `inert`. Sin JavaScript quedan disponibles el scroll, su barra nativa y la navegación por teclado a los enlaces; los botones que dependen de hidratación se mantienen ocultos e inertes, con espacio reservado para evitar saltos de layout.

## Visor y casos

`ImageViewer` recibe imágenes ya localizadas (src, ancho/alto, título, alternativa y caption), etiquetas y aviso opcional. Delega la apertura desde enlaces `data-viewer-index` compuestos en servidor; respeta clics modificados y mantiene su destino original sin JavaScript. El diálogo nativo bloquea el fondo, añade ciclo de foco, permite Escape, devuelve foco sin desplazar la página y restaura el overflow previo. El tamaño original conserva los píxeles del archivo y usa desplazamiento nativo de teclado/touch; el modo ajustado usa contain. No descarga, recorta ni recomprime nuevos archivos.

Los índices de casos usan `#case-problem`, `#case-participation`, `#case-architecture`, `#case-decisions`, `#case-impact`, `#case-learnings`, `#case-features` y `#case-gallery` según contenido disponible, independientes del idioma. El resumen de aporte conserva las atribuciones y precede la portada. El retrato y la portada del detalle usan loading eager; las galerías conservan lazy loading y solo se carga la imagen del visor al abrirlo.

Las 404 comparten `NotFoundContent`, marca, fuentes y tokens. La localizada ofrece Inicio/Proyectos; la global ofrece destinos ES/EN separados. `RecoveryTheme` refuerza el tema oscuro y el esquema de color del documento de recuperación sin leer preferencias guardadas ni añadir el script bootstrap de next-themes: la recuperación no necesita controles de tema y evita un bootstrap inline si Next monta el fallback raíz en cliente. Los idiomas inválidos se presentan dentro de una envoltura raíz válida, conservando recuperación sin JavaScript. Todos los documentos raíz emiten `data-theme="dark"` desde el servidor, también sin JavaScript. Los documentos normales mantienen AppProvider.

El proxy de routing no contiene auth, API de negocio ni acceso a datos externos: solo compara ES/EN y slugs publicados con la configuración local y asigna el estado HTTP. Excluye recursos de Next, imágenes, documentos, icono, robots y sitemap. Las páginas entregan recuperación explícita en servidor, porque `notFound()` para parámetros desconocidos de SSG en Next 16.3.8 devolvía un documento de error sin contenido visible sin JavaScript. Las rutas no coincidentes siguen usando global-not-found. Las respuestas y los assets excluidos tienen pruebas HTTP y no-JS. Revisar este comportamiento al actualizar Next.

Brand enlaza al inicio mediante `/{locale}#top` con navegación nativa, que también desplaza al repetir el mismo hash. Las cards del archivo conservan composición en servidor con imagen, nombre breve, descripción corta y un único enlace CTA de estilo primario. Solo el CTA navega al caso; no se extiende a la superficie de la card. Los resúmenes ES/EN viven en `portfolio.ts` y las atribuciones y tecnologías se conservan en el detalle.

`HeroMotion` añade una isla cliente para pausar las animaciones del Hero y observar su visibilidad y la de la fotografía por separado. Hero y OrbitalScene conservan composición en servidor, pasadas como hijos/slots. Un snapshot de hidratación estable mantiene saludo y escena estáticos en el HTML inicial; después se habilitan los ciclos CSS. La señal recorre el anillo intermedio en 28 segundos, con una estela SVG decorativa y halo por hover. El estado local de pausa muestra el saludo completo; movimiento reducido elimina los ciclos. La pestaña oculta y el viewport pausan los efectos sin un render loop JavaScript. El control se reserva en el layout y permanece oculto sin JavaScript.
