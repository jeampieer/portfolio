# Completar el contenido

## Perfil y enlaces

Editar `src/config/site.ts`. Los valores son públicos y pueden formar parte del JavaScript del navegador; no guardar secretos.

```ts
export const siteConfig = {
    // ...conservar brand, name y url según el archivo actual
    email: "", // correo real
    github: "", // URL https real
    linkedin: "", // URL https real
    cv: "", // por ejemplo /documents/cv.pdf, después de crear el archivo
    portrait: "", // por ejemplo /images/profile.webp, después de crear el archivo
};
```

La navegación muestra «Hablemos» cuando no hay CV. Una vez configurado, muestra «Descargar CV» con el atributo `download`. Usar un archivo del propio sitio para que el navegador pueda descargarlo. Colocar los archivos en `public/documents/` o `public/images/`; no añadir rutas a archivos inexistentes.

Si no hay foto, se muestra el monograma orbital. La foto vive dentro del mismo círculo decorativo; el texto del hero ya identifica a la persona. Si el retrato debe comunicar información adicional, adaptar su alternativa accesible y quitar `aria-hidden` de ese contenido.

El contacto usa `mailto:` y copia opcional del correo, con aviso de éxito/error. No hay formulario que simule enviar mensajes. Mientras no haya correo, aparece un estado honesto de canal pendiente. Los enlaces sociales vacíos no se dibujan.

## Textos y traducciones

Editar `src/lib/i18n/index.ts`. `Dictionary` deriva del objeto español y exige la misma estructura en inglés. Actualizar tanto `es` como `en`, incluidos títulos SEO, descripción, introducción, tarjetas de identidad y timeline. El marcador `{name}` de la introducción y del título SEO se reemplaza automáticamente con `siteConfig.name`. Revisar el resto de los textos editoriales al personalizar el perfil.

Los textos actuales de identidad y proceso son una propuesta editorial para revisar. No son declaraciones de trayectoria comprobada. No se añadieron empresas, títulos, fechas laborales o métricas.

## Proyectos

Agregar una entrada a `projects` en `src/features/portfolio/data/portfolio.ts`. El contrato `Project` exige:

- `slug` único, legible y estable, título ES/EN, número y categoría (`frontend`, `backend` o `fullstack`).
- `year` opcional: omitir si el usuario no confirmó una fecha. `context` opcional con rótulo ES/EN; si se omite, se usa el rótulo del portafolio personal.
- `showInArchive` opcional: se muestra por defecto; `false` oculta la ficha del archivo de proyectos y de todos sus filtros en el inicio ES/EN. Conserva el contenido y el acceso directo al detalle, metadatos y sitemap.
- `description`, `problem`, `architecture`, `impact` y `learnings`, cada uno con `es` y `en`.
- `participation` y `decisions` opcionales, con ES/EN, para distinguir el aporte personal y las decisiones de ingeniería. Solo se muestran las secciones presentes.
- `tags` con las tecnologías confirmadas del proyecto.
- `features` opcional: lista de funcionalidades con título y descripción ES/EN.
- `gallery`: lista de imágenes locales con dimensiones reales, título, alternativa y caption opcional ES/EN. Puede estar vacía. `cover` opcional selecciona una imagen verificada para la portada.
- `galleryNotice` opcional: aviso ES/EN que identifica el contexto de las imágenes, obligatorio para presentar datos demo como tales.
- `demoUrl` y `repositoryUrl` opcionales: solo enlaces públicos reales.

Cada entrada genera su ficha en ambos idiomas, incluidos título y metadatos. Las capturas se presentan en la página de detalle si existen. `artwork: "orbital-signal"` habilita la composición conceptual CSS exclusiva de ese caso; no es una captura de un sistema externo. Omitir `artwork` en los demás casos y usar la galería solo para imágenes verificadas que el usuario autorice publicar.

Orbital Signal está temporalmente oculto del inicio mediante `showInArchive: false` en su entrada de `portfolio.ts`; el archivo de proyectos muestra MFA y GM Social. Para volver a mostrarlo, quitar ese campo o cambiarlo a `true`. Su detalle sigue disponible en `/es/projects/orbital-signal` y `/en/projects/orbital-signal`. La opción controla presentación, no privacidad ni disponibilidad de la ruta.

### Caso empresarial MFA confirmado

`servicio-mfa` presenta «Servicio MFA para plataformas empresariales» como proyecto backend privado con descripción general autorizada por el usuario. Su aporte fue estudiar y reconstruir el flujo heredado, rehacer/refactorizar el backend y optimizar registro, validaciones y envío de correos/códigos. El detalle atribuye el despliegue inicial a otro integrante del equipo. Python, Django y Django REST Framework son tecnologías del servicio; AWS Lambda, Zappa y Terraform describen la infraestructura heredada y no amplían el stack personal ni atribuyen su despliegue al propietario.

El usuario autorizó revisar el repositorio MFA y preparar material local aislado con datos sintéticos. Esta autorización actualiza la restricción anterior y se limita al caso y las capturas aprobadas. Se describen claves por plataforma almacenadas como hash, consulta de identificador/correo mediante la API de origen antes del envío e invalidación del código tras verificación correcta. La caché reutiliza configuración de plataforma en la autenticación, no el resultado de todas las validaciones ni el flujo completo. La reconstrucción y la atribución del despliegue son contexto aportado por el usuario; el despliegue no se verificó localmente.

La portada usa la verificación de código en el cliente local de prueba. La galería reúne cuatro PNG originales **1920×1080, 16:9**, en `public/images/projects/servicio-mfa/`; sus textos ES/EN viven en `data/mfa-gallery.ts`. Se ordenan como plataformas en Django Admin, registro de solicitud, código vigente y destinatario rechazado. Los dos encuadres de Django Admin pertenecen a la administración original. El cliente se creó para mostrar solicitudes HTTP reales; no es frontend del servicio ni Swagger. Portada y galería llevan aviso ES/EN de datos sintéticos y herramienta de prueba, y permiten abrir los originales sin recortar o estirar las pantallas.

El [registro sanitizado de MFA](mfa-verification.md) conserva siete resultados HTTP y sus límites; el [manifiesto de capturas](previews/mfa-captures.json) conserva dimensiones, huellas y metadatos fuente sin credenciales, rutas internas del checkout ni payloads. El entorno usa dos bases SQLite aisladas, una plataforma de origen sintética y correo a archivo; esas herramientas de prueba no amplían el stack del servicio ni el personal. No se conectó producción, no se enviaron correos reales y no se verificaron integración productiva, despliegue, SMS, reenvío, vencimiento ni límites diarios. No hay fecha del proyecto, demo pública, repositorio, métricas de rendimiento ni auditoría integral de seguridad. La fecha visible en las capturas corresponde a la prueba local.

### Caso empresarial GM Social autorizado

El usuario autorizó revisar Plataforma-Encuestas-GM y publicar una descripción general de GM Social junto a sus capturas locales con datos demo. `plataforma-encuestas-gm` se presenta como proyecto full stack privado, sin fecha, enlace público a la aplicación ni repositorio. La autoría web/API de principio a fin fue declarada por el usuario; la base web parte de una plantilla y la app móvil corresponde a otros compañeros.

La galería usa ocho PNG reales de `public/images/projects/plataforma-encuestas-gm/`, todos horizontales de **1920×1080 (16:9)**, capturados con viewport fijo y `fullPage: false`. Los textos ES/EN describen únicamente lo visible en cada encuadre y se conserva acceso al original. El dashboard es la portada y las capturas siguen el flujo de estudio, instrumento, asignación, recepción, detalle, calidad y análisis. Se identifica explícitamente que cifras, personas, respuestas y ubicaciones son de demostración. El [registro de revisión de GM Social](gm-social-verification.md) conserva evidencia y límites sin secretos ni código interno; las huellas de las imágenes están en `docs/previews/gm-social-captures.json`.

La aceptación integral con Flutter, instrumentos oficiales e infraestructura productiva permanece pendiente. Google Maps no se validó en el entorno local y no se incluye una captura de mapa funcional. No atribuir resultados comerciales a los valores demo ni ampliar el stack personal a partir del stack de este proyecto. La autorización se limita a este caso y material demo; otros proyectos requieren su propia confirmación. El portafolio no depende de servicios, código o autenticación de GM Social.

## Experiencias y comunidad

La sección aparece después de Proyectos y antes de Educación. Los dos textos ES/EN y sus autores viven en `src/features/portfolio/data/experiences.ts`. Presentan las publicaciones de Egresados UTP y de IGH, empresa donde trabaja el propietario según su confirmación. No se deducen fechas, cargos ni el logro concreto de la felicitación universitaria.

La carpeta `public/images/experiences/` contiene las dos capturas completas de LinkedIn añadidas por el propietario. Se usan estos nombres exactos:

| Archivo            | Publicación                     |
| ------------------ | ------------------------------- |
| `utp-linkedin.png` | Egresados UTP                   |
| `igh-linkedin.png` | IGH · Inveritas Global Holdings |

Guardar PNG reales; renombrar la extensión de un JPEG no convierte el formato. Si se usan otros nombres o formatos, actualizar `imageFile` en los datos. El sitio comprueba la existencia del archivo al renderizar en el servidor: mientras falte, muestra un estado de captura pendiente sin solicitar imágenes inexistentes. En desarrollo, añadir o reemplazar los archivos y refrescar la página; en producción, ejecutar un nuevo build después de actualizarlos.

Cada captura se conserva completa, con `object-fit: contain`, sin filtros ni recortes, dentro de un marco 4:3. Se sirve sin recomprimir para conservar el texto de LinkedIn y dispone de acceso al archivo original en una pestaña nueva. El marco mantiene una altura estable aunque las capturas tengan proporciones distintas. En móvil, abrir el original permite ampliar para leer. Los autores también aparecen como texto fuera de las capturas. No se incluyen URLs de publicaciones hasta disponer de enlaces confirmados.

Los rótulos de sección, estado pendiente y enlaces se editan en `dictionary.experiences` en ambos idiomas. La composición es de servidor y reutiliza `Reveal`; no añade carrusel, modal ni estado cliente.

## Educación e idiomas

«Mi educación» aparece después de Experiencias y comunidad y antes de Stack. Las listas `education` y `languages` viven en `src/features/portfolio/data/portfolio.ts`, con contratos `EducationEntry` y `LanguageSkill`. Los encabezados y estados académicos se editan en `dictionary.education` en ambos idiomas. Los nombres oficiales de las instituciones se conservan en español también en EN.

La información fue confirmada por el propietario: Universidad Tecnológica del Perú (UTP), Ingeniería de Software, Lima, Perú, **2026 – Actualidad**, **En curso**; IDAT – Instituto de Educación Superior, Desarrollo de Sistemas de Información, Lima, Perú, **2023**, **Egresado**. El año de IDAT se muestra como un dato único, sin inferir fecha de inicio o duración. Egresado no se convierte en bachiller o titulado; la traducción EN tampoco atribuye un grado académico.

Idiomas: **Español — Nativo**, **Inglés — Intermedio (lectura técnica y comunicación oral/escrita)** e **Italiano — Básico**. No se añaden porcentajes, niveles MCER, certificaciones, documentos ni logos no proporcionados. Cada programa tiene institución, ubicación, periodo y estado; las descripciones de idioma son opcionales. La sección usa dos tarjetas académicas en escritorio y una columna en móvil, con una lista de definiciones para los idiomas debajo. No requiere archivos nuevos, backend ni estado cliente.

## Trayectoria y stack

El timeline actual es un proceso en tres pasos, sin fechas. Se puede sustituir su contenido en `dictionary.timeline.steps` por hitos laborales reales cuando se confirmen, y cambiar el título/descripción para que diga trayectoria. No añadir años de experiencia por deducción.

Los seis grupos del arsenal existen en `skillGroups`: frontend, backend, base de datos, despliegue/cloud, IA y herramientas. Los grupos vacíos no se renderizan. El arsenal describe las tecnologías del perfil; los `tags` de cada proyecto conservan su stack particular. Añadir solo las tecnologías que el usuario quiera declarar. No hay barras ni porcentajes de dominio.

El stack confirmado del perfil incluye React, JavaScript, TypeScript y Next.js en frontend; Python, Django REST Framework y Node.js en backend; PostgreSQL, SQL Server y MySQL en base de datos; y AWS con EC2, S3, IAM, Route 53 y VPC para despliegue. AWS se presenta explícitamente como conocimiento básico suficiente para desplegar aplicaciones. Esto no atribuye experiencia avanzada, empresas, cargos ni años de trabajo. IA sigue sin tecnologías confirmadas.

El grupo «Herramientas y prácticas» presenta Git, Docker y Testing por elección del propietario. Testing describe una práctica sin atribuir un framework ni un nivel de dominio. ESLint, Prettier y Playwright siguen siendo herramientas de verificación del portafolio, pero no se declaran como parte del stack personal.

## Antes de publicar

Revisar los textos propuestos, completar los datos públicos, verificar todas las URLs/descargas, dar permiso a cada caso de estudio y definir el dominio real con `SITE_URL`. Luego ejecutar `npm run verify` y revisar ambos idiomas, temas y móvil.
