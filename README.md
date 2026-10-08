# JEAMPIEER.TECH

Soy Jeampieer, desarrollador de software full stack. Construí este portafolio para presentar mi trabajo y explicar las decisiones que hay detrás: qué problema abordé, cómo organicé la solución y cuál fue mi participación en cada proyecto.

El sitio reúne casos de estudio de frontend y backend en español e inglés. Su identidad visual, **Orbital Signal**, combina una estética orbital con una interfaz de lectura clara, temas claro y oscuro y movimiento que respeta las preferencias del usuario.

## Enfoque de ingeniería

Diseñé el portafolio alrededor de una necesidad concreta: publicar contenido y permitir que se explore con facilidad. Elegí páginas prerenderizadas con Next.js App Router, contenido local tipado y componentes de servidor para la presentación. Las interacciones —navegación, filtros, tema y laboratorio— se resuelven en componentes cliente.

Separé contenido, contratos y vistas para que actualizar un proyecto o una traducción no requiera modificar la composición de la página. Las rutas validan idioma y proyecto, preparan metadatos y delegan la presentación a la feature de portafolio.

El sitio funciona sin autenticación, base de datos ni API de negocio. El contacto utiliza correo y enlaces directos. Esta arquitectura mantiene el alcance acotado y permite verificar el portafolio sin depender de los servicios privados que describo en los casos de estudio.

## Stack del portafolio

| Área              | Tecnologías                                  |
| ----------------- | -------------------------------------------- |
| Aplicación        | Next.js 16 · React 19 · TypeScript estricto  |
| Interfaz          | Tailwind CSS v4 · tokens semánticos · Lucide |
| Movimiento y tema | Framer Motion · next-themes                  |
| Tipografía local  | Geist · Space Grotesk · IBM Plex Mono        |
| Calidad           | ESLint · Prettier · Playwright · axe         |

Las versiones exactas están en [`package-lock.json`](package-lock.json). Las tecnologías utilizadas en otros proyectos se documentan en sus respectivos casos.

## Experiencia de uso

- Contenido y detalles de proyectos en ES/EN, con cambio de idioma que conserva el caso abierto.
- Temas claro y oscuro con preferencia persistida en el navegador.
- Archivo de proyectos con filtros por categoría y galerías con acceso a las capturas originales.
- Experiencias y comunidad con capturas completas de las publicaciones de mi universidad y mi empresa en LinkedIn. La [guía de contenido](docs/content.md#experiencias-y-comunidad) explica cómo actualizarlas en `public/images/experiences/`.
- Educación en UTP e IDAT e idiomas con sus niveles confirmados, disponibles en ES/EN.
- Laboratorio orbital con controles de trayectoria, velocidad, pausa y reinicio.
- Navegación por teclado, foco visible, menú móvil con Escape y enlace para saltar al contenido.
- Contenido principal y enlaces de proyectos legibles sin JavaScript.
- Metadatos por idioma, respuestas 404 y configuración de indexación mediante `SITE_URL`.

## Casos de estudio

### GM Social — Gestión de estudios y trabajo de campo

Desarrollé la API y el backoffice web de una plataforma para configurar estudios sociales, coordinar asignaciones y supervisar información recibida de campo. El backend utiliza Django REST Framework y PostgreSQL; la web, Next.js, React, TypeScript, Ant Design y TanStack Query.

El caso explica decisiones sobre instrumentos versionados, separación de estados, autorización por rol y alcance, reportes y contratos de sincronización. El frontend parte de una plantilla existente; la aplicación móvil está a cargo de otros compañeros.

Presento ocho capturas locales con datos de demostración y el alcance de las comprobaciones realizadas. La evidencia y los pendientes de integración están en [`docs/gm-social-verification.md`](docs/gm-social-verification.md).

### Servicio MFA para plataformas empresariales

Reconstruí y refactoricé un backend heredado con Python, Django y Django REST Framework. Mi trabajo se centró en comprender el flujo existente, reorganizar registro y envío de códigos, extender validaciones de plataforma y destinatario y reutilizar configuración mediante caché. El despliegue inicial fue realizado por otro integrante del equipo.

El caso incluye cuatro capturas de un entorno aislado con datos sintéticos y siete comprobaciones HTTP. Las imágenes distinguen Django Admin del cliente local creado para documentar las pruebas. El alcance y los límites están en [`docs/mfa-verification.md`](docs/mfa-verification.md).

### Orbital Signal

Este portafolio también tiene su propio caso de estudio: arquitectura, identidad visual y decisiones de interacción. Su ficha está temporalmente oculta del archivo del inicio; el detalle permanece disponible en `/es/projects/orbital-signal` y `/en/projects/orbital-signal`.

Los casos empresariales presentan material autorizado y datos de demostración. Sus repositorios y servicios privados no forman parte de este proyecto.

## Ejecución local

Utilizo **Node.js 24** y npm. La versión recomendada está en [`.nvmrc`](.nvmrc).

```bash
nvm use
npm ci
npm run dev
```

El servidor escucha en `127.0.0.1:3000`. Abrir [español](http://127.0.0.1:3000/es) o [inglés](http://127.0.0.1:3000/en). La ruta `/` redirige a `/es`. No se necesita un archivo de entorno para trabajar en local.

Para comprobar el build de producción:

```bash
npm run build
npm run start
```

`dev` y `start` usan el mismo puerto; deben ejecutarse por separado.

## Organización

```text
src/app/[locale]/         Rutas, layouts y metadatos
src/components/layout/   Header y Footer
src/components/ui/       Elementos de presentación compartidos
src/features/portfolio/  Vistas, secciones, contenido, contratos y hooks
src/config/              Configuración pública del perfil
src/lib/                 Traducciones y SEO
src/providers/           Tema y preferencias de movimiento
tests/e2e/               Recorridos sobre el build de producción
docs/                    Arquitectura, guías y evidencia
public/                  Foto, CV y capturas autorizadas
```

La configuración del perfil está en [`src/config/site.ts`](src/config/site.ts), los proyectos y tecnologías en [`portfolio.ts`](src/features/portfolio/data/portfolio.ts) y los textos ES/EN en [`src/lib/i18n/index.ts`](src/lib/i18n/index.ts). La identidad visual toma como referencia [`JEAMPIEER_TECH_Design_System_v1.0.md`](JEAMPIEER_TECH_Design_System_v1.0.md).

## Verificación

La cadena de verificación ejecuta lint, generación de tipos, TypeScript, formato, build y pruebas E2E:

```bash
npx playwright install chromium   # Primera instalación
npm run verify
```

Las 22 pruebas actuales cubren navegación bilingüe, educación e idiomas, persistencia del tema, filtros, galerías, laboratorio, movimiento reducido, teclado, rutas inexistentes y lectura sin JavaScript. También comprueban desbordamientos en varios anchos y ejecutan análisis automáticos de accesibilidad con axe.

Playwright inicia un servidor de producción independiente en `127.0.0.1:3100`; ese puerto debe estar libre. Para ejecutar solo los E2E, primero actualizo el build y después uso `npm run test:e2e`. Los resultados y límites de la validación están en [`docs/verification.md`](docs/verification.md). Las comprobaciones automáticas se complementan con revisión visual; no certifican conformidad WCAG completa.

El `.gitignore` excluye dependencias, builds, cachés, reportes, archivos de entorno y configuración local. Versiono `.env.example` y el lockfile para documentar la configuración y mantener instalaciones reproducibles.

## Configuración de publicación

`SITE_URL` define el origen público y se evalúa durante el build. Sin esa variable, el sitio mantiene `noindex, nofollow`, bloquea el rastreo y genera un sitemap vacío. Al configurar un dominio confirmado y reconstruir, habilita canonical, alternates de idioma, Open Graph, robots y sitemap.

Los detalles de ejecución y publicación están en [`docs/deployment.md`](docs/deployment.md). La documentación completa se encuentra en [`docs/INDEX.md`](docs/INDEX.md).

## Contacto

[Correo](mailto:jeampieerlimahuaya@gmail.com) · [GitHub](https://github.com/jeampieer) · [LinkedIn](https://www.linkedin.com/in/jeampieerlimahuaya/)
