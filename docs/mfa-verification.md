# Evidencia local del caso MFA

Revisión del **8 de octubre de 2026**, zona America/Lima. El usuario autorizó revisar el servicio backend privado, ejecutarlo en un entorno aislado y publicar las cuatro capturas con datos sintéticos. Este registro resume la entrega fuente sin reproducir su informe privado, credenciales, código interno ni datos operacionales sensibles. La integración del portafolio no repitió la auditoría del servicio.

## Entorno de evidencia

Se ejecutó el backend original Python / Django / Django REST Framework sin cambios en archivos versionados. El entorno temporal utilizó configuración independiente, una base MFA SQLite aislada, una segunda base SQLite para la plataforma de origen sintética y correo a archivo. Las migraciones temporales y las credenciales sintéticas permanecen fuera del portafolio. Se reutilizaron las dependencias existentes; no se conectaron servicios externos o producción ni se enviaron correos reales.

La plataforma de origen de prueba autentica y contrasta identificador/correo contra registros sintéticos. Comprueba el contrato consumido por el servicio; no es el código de la plataforma real y no demuestra una integración de producción. SQLite y el cliente visual son herramientas de esta prueba, no tecnologías añadidas al stack publicado del servicio o del perfil.

## Resultados HTTP entregados

| Operación                             | HTTP | Resultado                                             |
| ------------------------------------- | ---: | ----------------------------------------------------- |
| Registro con destinatario coincidente |  201 | Usuario y contador creados; correo guardado a archivo |
| Código incorrecto                     |  401 | Rechazado                                             |
| Código vigente                        |  202 | `auth: true`; código invalidado después del uso       |
| Reutilización del código              |  401 | Rechazado                                             |
| Destinatario no coincidente           |  400 | Rechazado antes del envío                             |
| Clave de plataforma incorrecta        |  401 | Rechazado                                             |
| Plataforma desconocida                |  400 | Rechazado                                             |

Las **7/7 pruebas fuente** pasaron. También se comprobó la clave contra su hash con valores correcto e incorrecto, el código invalidado en la base, la creación del archivo de correo y la ausencia de nuevos correos tras los rechazos. Las respuestas provienen del backend real, no de simulaciones del cliente.

La herramienta usa autenticación previa para invocar las APIs protegidas. Esa autenticación no constituye la verificación del código: el flujo de correo devuelve `auth: true`, no un JWT nuevo. No se publican credenciales, códigos, tokens, archivos de correo ni bases temporales.

## Capturas autorizadas

Los cuatro originales son **1920×1080, 16:9**, con viewport fijo, escala y zoom 1 y `fullPage: false`. Suman **505 766 bytes**. Se revisaron visualmente y se comprobaron dimensiones y SHA-256 antes y después de copiarlos sin alterar sus píxeles. El [manifiesto sanitizado](previews/mfa-captures.json) conserva huellas, dimensiones, metadatos ES/EN de la fuente y resultados, sin copiar rutas privadas, payloads o credenciales.

| Archivo                             | Superficie y contenido                                      |
| ----------------------------------- | ----------------------------------------------------------- |
| `03-admin-plataformas.png`          | Django Admin original; dos plataformas sintéticas           |
| `04-admin-registro-solicitud.png`   | Django Admin original; contador creado por el registro HTTP |
| `01-api-codigo-valido.png`          | Cliente local de prueba; respuesta HTTP 202, código oculto  |
| `02-api-destinatario-rechazado.png` | Cliente local de prueba; rechazo HTTP 400 sin nuevo correo  |

La galería sigue ese orden y la portada usa la verificación de código. El cliente fue construido para documentar solicitudes reales: no es un frontend del producto ni Swagger. El aviso ES/EN de portada y galería identifica entorno local, datos sintéticos, administración original y cliente de prueba. Los títulos y alternativas describen los encuadres reales; las captions públicas concentran la explicación funcional y el manifiesto conserva la redacción fuente. Las imágenes completas se pueden abrir a resolución original.

## Precisión y límites

El código fuente confirma claves por plataforma almacenadas como hash, consulta del identificador/correo mediante la API de origen antes del envío, invalidación del código tras verificación correcta y caché de configuración de plataforma en autenticación. La caché no cubre todo el flujo ni demuestra una mejora de rendimiento; no se midieron latencia o tasa de aciertos.

La reconstrucción, refactorización y optimización pertenecen al relato aportado por el usuario. El despliegue inicial con AWS Lambda, Zappa y Terraform se atribuye a otro integrante del equipo como contexto del proyecto, no como resultado de esta prueba. No se ejecutó ni verificó ese despliegue y no se confirmó Terraform en el checkout revisado.

No se ejecutaron SMS, reenvío, vencimiento, límites diarios ni producción. Los resultados se limitan a las operaciones de correo anteriores, no a todas las APIs o modalidades de MFA. No constituyen auditoría integral de seguridad, aceptación productiva, métricas comerciales ni prueba cuantitativa de optimización. La fecha visible en las imágenes es la de la prueba, no una fecha del proyecto. No se añade enlace público a la aplicación ni al repositorio privado.

La validación del portafolio, sus capturas responsive y su cierre están registrados en [verification.md](verification.md).
