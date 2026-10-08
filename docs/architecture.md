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

`page.tsx` valida los parámetros → carga una vista de la feature → la vista obtiene diccionario y datos → componentes de sección presentan el contenido. Las funciones `generateMetadata` viven junto a la ruta y usan `lib/seo.ts`. El seguimiento de secciones vive en un hook y los destinos compartidos de Header/Footer en `data/navigation.ts`. Los disclosures nativos mantienen navegación sin JavaScript; el cambio de idioma carga el documento localizado y conserva el ancla. El laboratorio mantiene estado local porque su comportamiento no se comparte. `useMotionPreferences` comparte suscripciones a movimiento reducido y visibilidad del documento, con snapshots de servidor estables para evitar discrepancias de hidratación. Un observador de viewport pausa el laboratorio fuera de pantalla.

`AppProvider` integra `next-themes`, `LazyMotion` y `MotionConfig`. No convierte en cliente los hijos ya compuestos en servidor. Los componentes estáticos, como Hero, IdentitySignal, EngineeringArsenal, Timeline y ProjectView, siguen siendo Server Components. Las islas cliente son Header, Reveal, OrbitalLab y Contact.

El contrato `Project` admite títulos localizados, categorías frontend/backend/fullstack, fecha opcional y secciones opcionales de participación y decisiones. La ilustración conceptual solo se habilita en Orbital Signal mediante `artwork`; los casos sin ilustración usan una ficha de texto y omiten esa vista en el detalle. La galería solo se renderiza cuando contiene imágenes autorizadas. El caso MFA es una descripción pública de un backend privado, sin conectar ese servicio ni añadir autenticación al portafolio.

GM Social incorpora `features`, `cover` y `galleryNotice` opcionales. `ProjectImage` conserva dimensiones, título, alternativa y caption localizados. La galería presenta los PNG originales sin recomprimir texto, permite abrirlos en una pestaña nueva y se adapta a una o dos columnas; no requiere estado cliente. Los datos de galería viven en `data/gm-social-gallery.ts`, y los archivos autorizados en `public/images/projects/plataforma-encuestas-gm/`. MFA reutiliza el mismo contrato y presentación; sus datos viven en `data/mfa-gallery.ts` y sus cuatro PNG en `public/images/projects/servicio-mfa/`. El cliente de prueba visible en las capturas pertenece al entorno de evidencia y no se incorpora al sitio. Los servicios de GM Social y MFA no son dependencias de ejecución del portafolio.

`ProfessionalExperiences` es una sección de servidor después del stack. Sus dos entradas localizadas viven en `data/experiences.ts`; `getExperienceImage` comprueba archivos locales de `public/images/experiences/` al renderizar para omitir solicitudes a capturas ausentes. En producción esa disponibilidad queda prerenderizada durante el build y requiere reconstrucción después de incorporar archivos. La carpeta contiene las dos capturas añadidas por el propietario. Las capturas completas usan `next/image` con `fill`, `object-fit: contain` y `unoptimized` para conservar el texto, con enlace al original. No se consume LinkedIn ni se añade un servicio de datos o una isla cliente.

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

El inicio ordena Hero, archivo de proyectos, identidad con proceso integrado (`#process`), educación/idiomas, stack, experiencias/comunidad, laboratorio y contacto. El archivo es de servidor, muestra primero los casos full stack y omite `showInArchive: false`; no usa filtros ni una ficha de proyectos futuros. `contributionSummary` aporta un resumen localizado del trabajo personal, sin sustituir la participación y atribuciones del detalle. Solo se generan idiomas ES/EN y los guardas `isLocale` rechazan cualquier otro con HTTP 404; `app/not-found.tsx` reutiliza el documento global cuando el rechazo ocurre antes del layout localizado.
