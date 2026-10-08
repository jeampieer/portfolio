# Evidencia de verificación

Fecha de entrega: **4 de octubre de 2026**, zona de referencia America/Lima.

## Entorno y resultado

macOS arm64, Node **24.21.0**, Next **16.3.8**, React **19.3.0**, TypeScript **5.9.3**, Tailwind **4.3.3**, Framer Motion **14.0.0**, Playwright **1.63.0** y Chromium instalado por Playwright. Versiones exactas en `package-lock.json`.

El Node predeterminado de la máquina era 23.9.0. La validación final se ejecutó con Node 24 mediante `npm exec --yes --package=node@24 -- ...`, sin sustituir la instalación global del usuario. `.nvmrc` recomienda Node 24 para el trabajo posterior.

| Comprobación           | Resultado                                                                      |
| ---------------------- | ------------------------------------------------------------------------------ |
| `npm ci` con Node 24   | Instalación limpia completada                                                  |
| `npm run lint`         | Sin errores ni advertencias de código                                          |
| `npm run typecheck`    | Tipos de Next y TypeScript correctos                                           |
| `npm run format:check` | Correcto                                                                       |
| `npm run build`        | Build de producción correcto; páginas ES/EN y casos de estudio prerenderizados |
| `npm run test:e2e`     | **19/19 pruebas correctas**; última ejecución en 13.0 s                        |
| `npm run verify`       | Cadena completa finalizada con código 0                                        |
| `npm audit --omit=dev` | 0 vulnerabilidades detectadas                                                  |
| `npm audit` completo   | 5 paquetes afectados por un aviso transitivo en tooling; ver security.md       |

## Recorridos y pantallas

- Cambio de idioma en portada y detalle, preservando el slug.
- Cambio de tema y persistencia tras recargar/cambiar de idioma.
- Filtros con resultados y estado vacío; acceso y regreso del caso de estudio.
- Laboratorio controlable con teclado, velocidad, trayectoria, pausa y reset.
- Preferencia de movimiento reducido y contenido legible sin JavaScript.
- Menú móvil, Escape, devolución del foco y salto al contenido.
- Respuestas HTTP 404 para idioma, slug y ruta ausentes; 404 localizada de proyecto.
- `html lang`, robots de desarrollo y ausencia de enlaces vacíos.
- Sin overflow horizontal a **360, 390, 768, 1280 y 1920px**, en español e inglés.
- axe sin infracciones detectadas en las etiquetas WCAG A/AA seleccionadas para ambos idiomas/temas y el detalle.

Se inspeccionó visualmente la portada desktop/móvil y el laboratorio claro mediante navegador. Durante la revisión se corrigieron imports de fuentes y desbordamientos de adornos/enlaces. El build probado y las capturas finales corresponden a la versión corregida.

Capturas generadas desde el build de producción: [desktop](previews/desktop.png) y [móvil](previews/mobile.png). El reporte completo de la última ejecución local está en `playwright-report/index.html`; se excluye del control de versiones.

## Límites y pendientes conocidos

- No se proporcionaron correo, CV, foto, redes, experiencia ni autorización para publicar GM Social; esos datos siguen pendientes del usuario. Los estados condicionales evitan enlaces falsos.
- No se prueba el envío de correos porque no existe un servicio de envío. Tampoco se afirma haber validado un CV o contactos todavía vacíos.
- Los textos de presentación y proceso son una propuesta editorial para revisión; no contienen una trayectoria profesional inventada.
- `SITE_URL` permanece sin configurar; no se ha publicado el sitio ni validado un dominio externo.
- La auditoría automática no certifica conformidad completa WCAG ni reemplaza pruebas con lectores de pantalla, Safari/Firefox o dispositivos físicos.
- Next utiliza `experimental.globalNotFound` para la raíz localizada; su respuesta está probada y debe revisarse al actualizar el framework.
- Permanece el aviso de desarrollo sobre `braces` y el soporte de ESLint 9, documentado en [security.md](security.md). No se ocultó ni se aplicó un downgrade incompatible.

## Ejecución local

El servidor de desarrollo se entrega en **http://127.0.0.1:3000/es**, usando Node 24 y escuchando solo en loopback. La alternativa inglesa es **http://127.0.0.1:3000/en**. Reiniciar posteriormente con `npm run dev` desde la raíz y Node 24 activo. Las pruebas usan el puerto separado 3100 y terminan su propio servidor.

## Actualización del stack del perfil — 7 de octubre de 2026

Zona de referencia America/Lima. El usuario confirmó React, JavaScript, TypeScript y Next.js; Python, Django REST Framework y Node.js; PostgreSQL; y conocimientos básicos de AWS para despliegue con EC2, S3, IAM, Route 53 y VPC. EC2 fue confirmado después de aclarar la mención inicial «S2». No se añadieron empresas, cargos, años ni experiencia avanzada.

Se actualizaron `skillGroups`, los textos ES/EN y las guías de contenido. La base de datos tiene su propio grupo, con el contrato y el icono correspondientes. Se conserva la cuadrícula, los tokens y el stack particular de Orbital Signal; no se instalaron dependencias ni se añadieron servicios de backend al sitio.

La ejecución final de `npm run verify` con Node **24.19.0**, desde el runtime local de Codex, terminó con código **0**: lint, tipos, formato, build y **19/19 E2E** correctos en **10.0 s**. La primera ejecución detectó una comprobación desactualizada que prohibía cualquier `mailto:` aunque el perfil ya tenía correo configurado. Se corrigió para rechazar enlaces vacíos, incluyendo `mailto:` sin destinatario, y se repitió la cadena completa.

Se revisó visualmente el arsenal en español a **1440px** y en inglés a **360px**, sin desbordamiento horizontal ni errores de ejecución con movimiento predeterminado. Django REST Framework se ajusta a dos líneas en móvil. Las pruebas existentes también comprobaron ambos idiomas a 360, 390, 768, 1280 y 1920px, y axe en ambos temas. Capturas de la sección: [desktop ES](previews/stack-es-desktop.png) y [móvil EN](previews/stack-en-mobile.png); se ocultaron encabezado fijo y controles del entorno de desarrollo únicamente al capturar la sección.

Durante una inspección adicional del servidor de desarrollo con movimiento reducido se observó un aviso de hidratación en `OrbitalLab`: el servidor emite la órbita en marcha y el cliente cambia inicialmente a pausa. Ese componente no se modificó en esta actualización. La prueba de movimiento reducido valida el estado final, pero no detecta ese aviso. Queda registrado como límite de la validación; las pruebas no certifican conformidad WCAG completa.

El servidor de desarrollo sigue activo con Node 24 en **http://127.0.0.1:3000/es#stack**; la alternativa inglesa es **http://127.0.0.1:3000/en#stack**. No se crearon commits ni despliegues.

## Caso empresarial MFA — 7 de octubre de 2026

Zona de referencia America/Lima. Se añadió la descripción general autorizada por el usuario en **http://127.0.0.1:3000/es/projects/servicio-mfa** y **http://127.0.0.1:3000/en/projects/servicio-mfa**. El texto distingue reconstrucción/refactorización, validaciones y optimización del despliegue inicial, atribuido explícitamente a otro integrante del equipo. AWS Lambda, Zappa y Terraform solo describen la infraestructura heredada; el stack personal no se amplió con esas herramientas.

El contrato de proyectos incorpora categoría Backend, títulos ES/EN, fecha opcional, rótulo de contexto y secciones opcionales de participación y decisiones. La ilustración conceptual se mantiene exclusiva de Orbital Signal. MFA usa una ficha de texto sin fecha, demo, repositorio ni galería; las capturas del servicio siguen pendientes del usuario. Solo se añadieron dos reglas de presentación en `globals.css`: una columna para `.project-card-text` y un ancho de lectura de 720px para su descripción.

Archivos de implementación: `src/features/portfolio/data/portfolio.ts`, `src/features/portfolio/types/portfolio.types.ts`, `src/lib/i18n/index.ts`, `src/features/portfolio/components/MissionArchive.tsx`, `src/features/portfolio/components/views/ProjectView/index.tsx`, `src/app/[locale]/projects/[slug]/page.tsx` y `src/app/globals.css`. También se actualizaron README, las guías de contenido, arquitectura y pruebas, esta evidencia y `tests/e2e/portfolio.spec.ts`.

`npm run verify`, con Node **24.19.0**, terminó con código **0**: lint, tipos, formato, build y **20/20 E2E** correctos en **18.5 s**. El build prerenderizó ambos idiomas de ambos casos. Los recorridos comprueban filtro Backend, navegación y cambio de idioma del caso MFA, título/metadatos, atribución del despliegue y ausencia de fecha, ilustración y enlaces externos en el detalle. Ambos casos se leen y abren sin JavaScript, y sus detalles pasan las comprobaciones axe seleccionadas. La portada sigue sin desbordamiento horizontal en ambos idiomas a 360, 390, 768, 1280 y 1920px.

Se inspeccionó el detalle MFA en ES a **1440px** y EN a **360px**, además de la ficha bajo el filtro Backend, sin desbordamiento ni errores de ejecución con movimiento predeterminado. Capturas del portafolio local, no del servicio privado: [detalle desktop ES](previews/mfa-es-desktop.png), [detalle móvil EN](previews/mfa-en-mobile.png) y [ficha móvil EN](previews/mfa-card-mobile.png). Se ocultaron los controles del entorno de desarrollo para las capturas; en la captura de la ficha también se ocultó el encabezado fijo.

La validación corresponde al portafolio y su contenido. No se leyó el repositorio MFA ni se probó el servicio privado. No se publicaron nombres de empresas/plataformas, código, secretos, endpoints, payloads ni URLs internas; tampoco se infirieron métricas, fechas, modalidad MFA, proveedor de correo, base de datos, TTL o política de revocación. Se conserva el aviso de hidratación del laboratorio con movimiento reducido descrito anteriormente. La revisión responsive paralela registra su evidencia y cualquier validación posterior en `docs/responsive-verification.md`.

El servidor de desarrollo **3000** continúa activo con Node 24. No se crearon commits, dependencias, autenticación del portafolio ni despliegues.

## Revisión responsive — 7 de octubre de 2026

Se revisaron la portada completa, Header/Footer y ambos casos de estudio, incluido MFA, en ES/EN y claro/oscuro. Los ajustes en `globals.css` corrigen el desbordamiento decorativo del hero a 1024px, los separadores partidos del stack y las tarjetas de identidad comprimidas desde 400px; también amplían las áreas táctiles móviles.

La matriz de producción comprobó **60/60 combinaciones sin desbordamiento** a 360, 390, 768, 1024 y 1440px. La revisión visual añadió 400 y 640px, y las **20/20 combinaciones adicionales de interacción** pasaron. `npm run verify` con Node **24.19.0** terminó con código **0**, incluyendo **20/20 E2E** en **14.3 s**. El [informe responsive](responsive-verification.md) conserva los hallazgos, capturas y límites de Chromium y del aviso previo de hidratación con movimiento reducido. El servidor de desarrollo sigue activo en el puerto **3000**.

## Caso full stack GM Social — 7 de octubre de 2026

Zona de referencia America/Lima. El usuario autorizó la revisión de Plataforma-Encuestas-GM, su ejecución local y la publicación del relato y las capturas con datos demo. Esta autorización actualiza la restricción histórica de la entrega inicial; no distribuye código interno ni autoriza otros proyectos. El caso está en **http://127.0.0.1:3000/es/projects/plataforma-encuestas-gm** y **http://127.0.0.1:3000/en/projects/plataforma-encuestas-gm**.

Se añadieron ocho grupos de funcionalidades comprobadas, relato ES/EN, portada del dashboard y galería de ocho PNG reales autorizados. El contenido diferencia la contribución web/API del usuario de la aplicación móvil a cargo de otros compañeros. No se añade fecha, demo pública, repositorio ni experiencia cloud inferida. Se conservan los otros casos, el arsenal personal, los tokens y los ajustes responsive anteriores.

Los originales suman **1 862 922 bytes**, con ancho de **1600px** y alturas reales de 850 a 2403px. Se verificaron dimensiones y SHA-256 al copiar cada archivo; no se alteraron sus píxeles. La portada y galería incluyen aviso ES/EN de que cifras, personas, respuestas y ubicaciones son demo. La galería tiene alternativas, captions y enlaces al original en una pestaña nueva, conservando proporción y legibilidad. El [manifiesto persistido](previews/gm-social-captures.json) registra dimensiones, bytes y huellas sin URLs internas ni secretos.

La [matriz del caso contra producción local](previews/gm-social/responsive-results.json) comprobó **20/20 combinaciones** de ES/EN, claro/oscuro y 360, 390, 768, 1024 y 1440px: sin desbordamiento, proporciones conservadas, ocho imágenes cargadas por combinación y ningún error de ejecución observado. Se inspeccionaron visualmente portada, funcionalidades y galería en desktop y móvil. Capturas seleccionadas: [portada desktop ES](previews/gm-social/es-dark-1440-header.png), [funcionalidades desktop ES](previews/gm-social/es-dark-1440-features.png), [funcionalidades móvil EN](previews/gm-social/en-light-360-features.png) y [galería móvil EN](previews/gm-social/en-light-360-gallery.png). Las capturas por sección ocultan solo encabezado fijo y enlace de salto para evitar superposiciones; la portada conserva ambos. Esta evidencia de layout precede el ajuste editorial final de Flutter a «a cargo de otros compañeros», sin cambio de estructura ni imágenes.

La cobertura E2E se amplió al filtro Full stack con un resultado real, navegación ES/EN, ocho imágenes cargadas con ancho original, ocho originales PNG con HTTP 200, aviso demo, metadatos, ausencia de fecha/enlaces públicos y funcionalidades. Se conserva la lectura y navegación a los tres casos sin JavaScript; axe incluye el detalle GM Social. Una ejecución previa completa pasó **21/21 pruebas**; otra se detuvo únicamente por formato del JSON de la matriz, sin errores de lint o tipos. El archivo se formateó antes de la verificación de cierre.

La verificación de cierre `npm run verify`, con Node **24.19.0**, terminó con código **0**: lint, tipos, formato, build y **21/21 E2E** correctos en **13.8 s**. Ambos idiomas de los tres casos se prerenderizaron. Se confirmó HTTP **200** para las rutas ES/EN de GM Social en el puerto 3000 y para la web fuente en 3001. La API fuente sigue escuchando en 8000 y responde HTTP a la consulta de su raíz; esa raíz no tiene una página y devuelve 404. Estos chequeos de disponibilidad no repiten la auditoría de la plataforma.

Archivos principales: `data/portfolio.ts`, `data/gm-social-gallery.ts`, `types/portfolio.types.ts`, `MissionArchive.tsx`, `views/ProjectView/index.tsx` dentro de la feature portfolio; `src/lib/i18n/index.ts`, `src/app/globals.css`, `tests/e2e/portfolio.spec.ts` y los PNG en `public/images/projects/plataforma-encuestas-gm/`. También se actualizaron README, las guías de contenido, arquitectura, pruebas, planificación y el índice. El [registro persistente de GM Social](gm-social-verification.md) conserva las comprobaciones de la plataforma fuente y sus límites, separado de las pruebas del portafolio.

La fuente comprobó dashboard/filtro territorial, consultas existentes de estudios, instrumentos, asignaciones, actividades y calidad, permisos por rol y exportaciones CSV/XLSX. Bootstrap/sincronización idempotente se inspeccionó en código y documentación; Flutter no se ejecutó. Google Maps falló por origen local no permitido y se excluyó de la selección. Aceptación integral, instrumentos oficiales e infraestructura productiva siguen pendientes. Los datos demo no se publican como métricas comerciales; no se ejecutó una auditoría completa de seguridad o WCAG. El aviso previo de hidratación del laboratorio con movimiento reducido permanece fuera de este cambio.

El servidor del portafolio se mantiene en **3000** con Node 24. Los servidores de la plataforma fuente **3001** y **8000** se preservan. No se añadieron dependencias, servicios de autenticación al portafolio, commits ni despliegues. El servidor temporal de producción **3100** usado para la revisión del layout se detuvo al terminar.

## Corrección de capturas GM Social a formato horizontal — 7 de octubre de 2026

El usuario solicitó pantallas normales de monitor. Se reemplazaron los ocho PNG públicos y la portada por capturas fuente reales **1920×1080, 16:9, viewport fijo, escala/zoom 1 y `fullPage: false`**. Se verificaron dimensiones y SHA-256 de los ocho archivos antes de copiarlos, sin modificar sus píxeles ni combinar pantallas. El conjunto vigente suma **1 391 780 bytes**. El [manifiesto vigente](previews/gm-social-captures.json) registra esta revisión; el [manifiesto inicial](previews/gm-social-captures-initial.json) conserva la evidencia anterior. Los originales previos de la fuente se preservaron.

Se actualizaron dimensiones, títulos, alternativas y captions ES/EN en `data/gm-social-gallery.ts`. Los captions describen la función visible; detalles del encuadre permanecen en [gm-social-verification.md](gm-social-verification.md). La vista previa de instrumento no muestra los nueve tipos completos y el detalle de entrevista ahora muestra respuestas/ubicación/firma, sin atribuirle la sección de tiempos que queda fuera del encuadre. Las capacidades verificadas del caso permanecen; el aviso demo y los enlaces a PNG originales a resolución completa se conservan. No fue necesario cambiar componentes, estilos, contratos ni otras fichas.

`npm run verify` con Node **24.19.0** terminó con código **0**: lint, tipos, formato, build y **21/21 E2E** correctos en **12.6 s**. La prueba de galería ahora exige ancho natural 1920, alto 1080 y proporción renderizada 16:9; conserva el conteo de ocho imágenes y verifica originales PNG con HTTP 200. No se repitió la auditoría funcional de la plataforma fuente.

La [revisión adicional del formato horizontal](previews/gm-social-horizontal/responsive-results.json) comprobó **8/8 combinaciones** de ES/EN, claro/oscuro y anchos de **360/1440px** contra el servidor de desarrollo: ocho imágenes cargadas por combinación, proporción de contenido conservada en portada/galería, sin desbordamiento ni errores de ejecución observados. Se inspeccionaron visualmente [portada desktop ES](previews/gm-social-horizontal/es-dark-1440-cover.png), [galería desktop ES](previews/gm-social-horizontal/es-dark-1440-gallery.png), [portada móvil EN](previews/gm-social-horizontal/en-light-360-cover.png) y [galería móvil EN](previews/gm-social-horizontal/en-light-360-gallery.png). Las capturas de revisión por sección ocultan encabezado fijo, enlace de salto y controles del entorno para evitar superposiciones; las imágenes del producto permanecen completas.

La captura **09 — Mapa de actividades** sigue pendiente: Google Maps rechazó también el origen adicional probado con `RefererNotAllowedMapError`. No se publicó un mapa fallido o ficticio ni se cambiaron restricciones externas. Se requiere un origen permitido por la clave efectiva y evidencia de carga real de Google Maps con Perú antes de incorporar esa novena imagen y actualizar el límite del caso. La respuesta del usuario se gestiona en el chat coordinador; esta espera no impide entregar el reemplazo de las ocho pantallas.

El caso actualizado permanece en **http://127.0.0.1:3000/es/projects/plataforma-encuestas-gm**, con alternativa EN. Los servidores **3000, 3001 y 8000** se preservan. No se añadieron dependencias, commits o despliegues.

## Orbital Signal oculto temporalmente del inicio — 7 de octubre de 2026

Se añadió `showInArchive?: boolean` al contrato y `showInArchive: false` a Orbital Signal. `PortfolioView` excluye las entradas con ese valor antes de pasar proyectos al archivo cliente, por lo que el listado y todos sus filtros ES/EN muestran solo MFA y GM Social. Los demás proyectos se muestran por defecto. El contenido de Orbital Signal, su detalle directo en ambos idiomas, sus metadatos y su inclusión en las rutas generadas se conservan. No se modificaron textos ni capturas de los casos empresariales, estilos, tokens o stack.

Archivos cambiados: `src/features/portfolio/types/portfolio.types.ts`, `src/features/portfolio/data/portfolio.ts`, `src/features/portfolio/components/views/PortfolioView/index.tsx`, `tests/e2e/portfolio.spec.ts`, `docs/content.md` y este registro. La guía de contenido explica cómo revertirlo: quitar `showInArchive` de la entrada o cambiarlo a `true`.

`npm run verify` con Node **24.19.0** terminó con código **0**: lint, tipos, formato, build y **21/21 pruebas E2E** correctas en **11.4 s**. Los recorridos existentes comprueban los dos casos visibles, el filtro Frontend vacío, el acceso directo HTTP 200 a Orbital Signal y el cambio ES/EN conservando su slug. Sin JavaScript, el inicio también omite Orbital Signal y permite navegar a ambos casos empresariales; su detalle sigue legible por URL directa.

Se inspeccionó el listado en ES a **1440px** y EN a **360px**, con los dos casos empresariales y sin desbordamiento. Las verificaciones responsive y axe existentes siguen pasando. Los servidores **3000, 3001 y 8000** continúan activos; no hubo commits ni despliegues.

## Capturas verificadas del caso MFA — 8 de octubre de 2026

Zona de referencia America/Lima. El usuario autorizó revisar el backend MFA privado y preparar capturas con datos sintéticos en un entorno local aislado. Se integró la entrega fuente final de cuatro PNG **1920×1080, 16:9**, sin alterar sus píxeles. Se comprobaron dimensiones y SHA-256 antes y después de copiar los **505 766 bytes** a `public/images/projects/servicio-mfa/`. El [manifiesto sanitizado](previews/mfa-captures.json) conserva metadatos ES/EN y huellas; el [registro del servicio](mfa-verification.md) resume siete resultados HTTP reales y límites sin reproducir el informe privado.

La portada muestra la verificación de código en un cliente local construido para documentar pruebas. La galería presenta configuración de plataformas y contador de solicitud en Django Admin original, seguidos de código vigente y destinatario rechazado en el cliente de prueba. Portada y galería incluyen aviso ES/EN de entorno local, datos sintéticos y herramienta de prueba; el cliente no se presenta como frontend del producto ni Swagger. Los títulos, alternativas y captions describen las superficies reales y los cuatro originales se pueden abrir en una pestaña nueva.

El relato ES/EN ahora precisa caché de configuración de plataforma en autenticación, consulta de identificador/correo mediante la API de origen antes del envío e invalidación del código después de un uso correcto. La historia de reconstrucción/refactorización y la atribución del despliegue a otro compañero se conservan como contexto aportado por el usuario. AWS Lambda, Zappa y Terraform no se presentan como despliegue verificado localmente ni se añaden al stack personal.

Las **7/7 pruebas HTTP de la fuente** comprobaron registro 201, código vigente 202 e invalidación, código incorrecto/reutilizado 401, destinatario 400, clave incorrecta 401 y plataforma desconocida 400. Los rechazos no generaron nuevos archivos de correo. El entorno aislado utilizó SQLite para el backend y la plataforma de origen sintética, con correo a archivo; esto prueba la lógica backend y su contrato con ese origen, no una integración productiva. No se ejecutaron SMS, reenvío, vencimiento, límites diarios, servicios externos ni despliegue. No se repitió esa auditoría al integrar las capturas.

`npm run verify`, con Node **24.19.0**, terminó con código **0**: lint, tipos, formato, build y **21/21 E2E** correctos en **12.5 s**. La prueba existente de MFA comprueba la portada desde el filtro Backend, las cinco imágenes del detalle (portada más cuatro capturas), dimensiones naturales, proporción, originales PNG con HTTP 200, aviso de demo, navegación ES/EN, metadatos y atribución del despliegue. La navegación sin JavaScript ahora comprueba también los cuatro enlaces originales y el aviso. Se conservan los recorridos de GM Social y Orbital Signal, las comprobaciones responsive y las etiquetas axe seleccionadas.

La [matriz adicional contra desarrollo local](previews/mfa-demo/responsive-results.json) pasó **8/8 combinaciones**: ES/EN, claro/oscuro y **360/1440px**, tanto en el archivo del inicio como en el detalle MFA. Todas cargaron la portada y cuatro imágenes de galería, conservaron proporciones y no mostraron desbordamiento horizontal ni errores de ejecución o consola. La medida de proporción descuenta el borde decorativo de 1px de la portada; el primer intento de la herramienta de revisión midió ese borde como parte de la imagen y se corrigió el cálculo sin cambiar estilos ni píxeles. Se inspeccionaron visualmente [ficha desktop ES](previews/mfa-demo/es-dark-1440-card.png), [portada desktop ES](previews/mfa-demo/es-dark-1440-cover.png), [galería desktop ES](previews/mfa-demo/es-dark-1440-gallery.png), [ficha móvil EN](previews/mfa-demo/en-light-360-card.png), [portada móvil EN](previews/mfa-demo/en-light-360-cover.png) y [galería móvil EN](previews/mfa-demo/en-light-360-gallery.png). Las capturas de revisión por sección ocultan encabezado fijo, enlace de salto y controles del entorno para evitar superposiciones. En móvil el texto de las pantallas se reduce con la imagen completa; el enlace original permite leerlo a resolución completa.

Archivos principales: `data/mfa-gallery.ts`, `data/portfolio.ts` y los cuatro PNG, además de `tests/e2e/portfolio.spec.ts`, README, guías de contenido/arquitectura/pruebas, índice y evidencia sanitizada. Se reutilizaron contrato y componentes existentes; no hubo cambios de estilos, dependencias, servicios de negocio, autenticación del portafolio, commits o despliegues. GM Social conserva sus ocho capturas horizontales; Orbital Signal sigue oculto del inicio y accesible por URL directa. El stack y los ajustes responsive se conservan. El aviso previo del laboratorio con movimiento reducido y los límites de Chromium, WCAG y producción permanecen documentados.

El caso queda en **http://127.0.0.1:3000/es/projects/servicio-mfa** y **http://127.0.0.1:3000/en/projects/servicio-mfa**. Se confirmaron activos los servidores del portafolio **3000**, GM web/API **3001/8000**, MFA **8001** y plataforma de prueba **8002**. La herramienta local MFA sigue en **http://127.0.0.1:8001/demo/**. Las pruebas del portafolio terminaron su servidor temporal **3100**.

## Preparación del primer commit — 8 de octubre de 2026

Por solicitud del usuario, se preparó el primer commit local del portafolio. Se amplió `.gitignore` para excluir dependencias, builds, tipos generados por Next.js, cachés, reportes de pruebas, autenticación local de Playwright, variables de entorno, claves privadas, metadatos locales de Vercel y archivos del sistema/editor. Se conserva `.env.example`, el lockfile, código, configuración, documentación y recursos públicos. La guía TypeScript incluida en Next **16.3.8** indica excluir `next-env.d.ts`; `next typegen`, ya incluido en `typecheck`, lo regenera en un checkout limpio.

Se reescribió el README en primera persona para presentar el proyecto, sus decisiones de arquitectura y el aporte personal en los casos de estudio. Se conservan la atribución del despliegue MFA y de la app móvil GM Social, los límites de las pruebas y los comandos reproducibles. No se añadieron cargos, años de experiencia o métricas. Los enlaces de contacto corresponden a la configuración pública existente. La aplicación y sus textos ES/EN no cambiaron.

`npm run verify`, con Node **24.19.0**, terminó con código **0**: lint, tipos, formato, build y **21/21 E2E** correctos en **14.9 s**. No se cambió el layout ni se repitió la inspección visual manual. Se revisaron los archivos candidatos y no se encontraron coincidencias en la búsqueda de patrones comunes de credenciales; esto no constituye una auditoría integral de secretos. Los límites funcionales y de accesibilidad documentados anteriormente se conservan. Este cierre no incluye publicación, remotos ni despliegues.

## Experiencias y comunidad — 8 de octubre de 2026

Se añadió una sección de servidor después de Proyectos y antes de Stack, con dos tarjetas ES/EN que identifican a Egresados UTP y a IGH como autores de las publicaciones de LinkedIn. El usuario confirmó que IGH es su empresa de trabajo y pidió conservar las capturas completas para mostrar quién las publicó. Los textos no deducen el logro concreto de la felicitación, fechas, cargos ni responsabilidades en el seminario. Se actualizó la numeración de las secciones posteriores y las guías de contenido y arquitectura.

Se creó `public/images/experiences/` y se dejó **vacía**, tal como pidió el usuario. Los archivos esperados son `utp-linkedin.png` e `igh-linkedin.png`. Mientras no existan, se muestra un estado pendiente sin enlaces ni solicitudes a imágenes ausentes. Añadirlos y refrescar el servidor de desarrollo habilita las capturas; producción necesita un nuevo build. Git no conserva carpetas vacías. No se añadieron dependencias ni conexiones a LinkedIn.

Las capturas se presentan completas en un marco 4:3 con `object-fit: contain`, sin filtros ni recomprimir el texto, y se pueden abrir a resolución original. Para verificar esta rama se copiaron temporalmente los dos adjuntos del usuario: **928×1292** y **2052×1148**. La [matriz de revisión](previews/experiences/results.json) pasó **8/8 combinaciones** de ES/EN, claro/oscuro y **360/1440px**, con ambas imágenes cargadas, originales HTTP 200, sin desbordamiento ni errores de ejecución observados con movimiento predeterminado. Se inspeccionaron visualmente [desktop con capturas](previews/experiences/es-dark-1440-captures.png) y [móvil con capturas](previews/experiences/en-light-360-captures.png). Estas imágenes de revisión documentan la presentación prevista; las copias temporales se retiraron tras comprobar que seguían siendo idénticas a los adjuntos originales.

El estado final con la carpeta vacía se comprobó a **1440px ES oscuro** y **360px EN claro**: dos estados pendientes, sin elementos de imagen/enlaces en la sección, sin desbordamientos ni errores de ejecución observados. Se inspeccionaron [desktop pendiente](previews/experiences/es-dark-1440-pending.png) y [móvil pendiente](previews/experiences/en-light-360-pending.png). Los screenshots de revisión ocultaron solo el encabezado fijo, enlace de salto y controles del entorno para evitar superposiciones.

`npm run verify`, con Node **24.19.0**, terminó con código **0** después de retirar las imágenes temporales: lint, tipos, formato, build y **21/21 E2E** correctos en **16.2 s**. Los recorridos existentes se ampliaron para comprobar ocho secciones, autores ES/EN, estado pendiente y lectura de las experiencias sin JavaScript; también comprueban carga y presentación sin recortes cuando existen archivos. La cadena conserva las pruebas responsive y axe existentes. Los cambios posteriores a esa ejecución se limitaron al registro de evidencia y a capturas de revisión; se comprobó su formato por separado.

La inspección inicial con movimiento reducido encontró el aviso de hidratación previamente documentado de `OrbitalLab`, ajeno a esta sección; la revisión visual se realizó con movimiento predeterminado. Las pruebas existentes de movimiento reducido siguen pasando, sin resolver ni certificar ese aviso. No se realizó una auditoría integral WCAG ni se validaron enlaces a publicaciones originales, aún no proporcionados.

El servidor local se mantiene en **http://127.0.0.1:3000/es#experiences**, con alternativa **http://127.0.0.1:3000/en#experiences**. No se crearon commits ni despliegues.

## Commit de Experiencias y comunidad — 8 de octubre de 2026

El usuario solicitó registrar la implementación anterior en un commit local. Antes del commit se encontraron las dos capturas completas incorporadas por el propietario en `public/images/experiences/`, con los nombres configurados y dimensiones **928×1292** (UTP) y **2052×1148** (IGH). Se actualizó la documentación vigente para reflejar su disponibilidad; la evidencia anterior del estado pendiente se conserva como historial de la implementación.

`npm run verify`, con Node **24.19.0**, terminó con código **0** con ambas imágenes presentes: lint, tipos, formato, build y **21/21 E2E** correctos en **18.2 s**. El recorrido de inicio comprobó la carga de las capturas, presentación con `object-fit: contain`, enlaces al original y autores ES/EN. La revisión visual previa documenta los mismos encuadres y dimensiones en desktop y móvil. El único cambio posterior a esta ejecución fue este registro de evidencia, cuyo formato se comprobó por separado.

El alcance del commit comprende la sección de experiencias, capturas, estilos, traducciones, pruebas y documentación. La educación y los idiomas aportados durante esta revisión permanecen como información para una etapa posterior; no se implementaron ni se incorporaron en este commit. No se realiza push ni despliegue. El servidor de desarrollo se conserva en **http://127.0.0.1:3000/es#experiences**.

## Actualización del stack personal — 8 de octubre de 2026

Por indicación del propietario se añadieron SQL Server y MySQL junto a PostgreSQL en bases de datos. El grupo «Herramientas y calidad» se renombró a «Herramientas y prácticas» / «Tools & practices» y ahora presenta Git, Docker y Testing. ESLint, Prettier y Playwright permanecen como dependencias de verificación del proyecto, sin declararse en el stack personal. Se actualizó `docs/content.md`; no se añadieron frameworks de testing ni niveles de dominio.

En ambas actualizaciones pasaron `npm run lint`, `npm run typecheck` y `npm run format:check` con Node **24.19.0**. La comprobación local de bases de datos validó ES a **1440px** y EN a **360px**, con los tres nombres visibles y sin desbordamiento. La de herramientas validó las **4 combinaciones** ES/EN y **360/1440px**, con los tres elementos nuevos, ausencia de las herramientas retiradas de la tarjeta y sin desbordamiento. Se inspeccionaron visualmente ambas tarjetas en desktop ES y móvil EN. No se añadieron pruebas permanentes para estos cambios de contenido ni se repitió la cadena completa de build/E2E. El layout, contratos y dependencias se conservaron.

Los cambios pendientes se registran en un commit local por la nueva instrucción de cierre de tareas del usuario. Educación e idiomas siguen sin implementar. El servidor de desarrollo permanece en **http://127.0.0.1:3000/es#stack**.
