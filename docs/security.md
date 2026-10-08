# Seguridad y privacidad

## Alcance actual

Sitio de presentación. Sin autenticación, tokens, cookies de sesión, backend, uploads, pagos, analítica ni formularios de envío. `next-themes` guarda la elección de tema en `localStorage`; no almacena datos personales. El laboratorio y los filtros mantienen estado en memoria.

`mailto:` delega al cliente de correo del visitante y no transmite nada automáticamente. Copiar correo usa Clipboard API únicamente al pulsar el control y muestra un error si el navegador lo impide. No se recopila información de visitantes.

`src/config/site.ts` y los módulos de contenido se consideran públicos. No escribir secretos allí. `.env*` se ignora salvo `.env.example`; `SITE_URL` es una configuración de origen público, no una credencial.

Las URLs sociales o de proyectos se completan manualmente y deben verificarse antes de publicar. Los enlaces a otra pestaña incluyen `noopener noreferrer`. React escapa el contenido; no se usa `dangerouslySetInnerHTML`.

## Cabeceras

Next configura `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` y `Permissions-Policy` que desactiva cámara, micrófono y geolocalización. Se desactiva `X-Powered-By`.

No se afirma que exista una CSP estricta: Next y el cambio de tema utilizan scripts inline. Añadir CSP requiere diseñar nonces/hashes con el modo de render elegido y verificar navegación/tema. HSTS y TLS corresponden al hosting real y no se fuerzan sobre localhost.

## Dependencias

El lockfile hace reproducible la instalación. Ejecutar `npm audit --omit=dev` para revisar el código de producción y `npm audit` para incluir herramientas. No usar `npm audit fix --force` sin revisar los cambios de versión y su efecto.

En la revisión inicial apareció un aviso de agotamiento de stack en `braces <=3.0.3`, transitivo de `micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next`. npm contabiliza cinco paquetes afectados, no cinco fallos distintos de la aplicación. La última versión de braces consultada fue 3.0.3; la corrección sugerida por npm baja la configuración Next a 14.2.35 y rompe la alineación con Next 16. No se aplicó esa degradación. La exposición está en el tooling de desarrollo, no en dependencias de producción; revisar cuando exista un parche compatible. [Aviso GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

ESLint 9 se conserva por compatibilidad con la configuración del proyecto de referencia; npm indica que su línea ya no recibe soporte. Planificar una actualización conjunta de ESLint/config/plugins y verificarla, sin cambiar de major a ciegas. Los resultados concretos constan en [verification.md](verification.md).
