# Ejecutar en producción

## Local

```bash
npm ci
npm run build
npm run start
```

`start` escucha en `127.0.0.1:3000`. Detener el servidor de desarrollo antes de usar ese puerto, o ejecutar `npm run start -- --port 3001`.

## Origen público

Crear `.env.local` a partir de `.env.example` y definir `SITE_URL` **solo después de confirmar el dominio real**. Usar un origen HTTP/HTTPS sin rutas. Esta variable se evalúa durante la generación estática: repetir el build tras cambiarla.

Sin `SITE_URL`, la aplicación omite canonical/alternates públicos y Open Graph, emite `noindex, nofollow`, bloquea crawlers en robots y genera un sitemap vacío. Con `SITE_URL`, se habilitan canonical, hreflang ES/EN/x-default, Open Graph de texto, robots y sitemap. No se inventa una URL de producción por el nombre de marca.

## Hosting

Usar un hosting compatible con Next.js 16 y Node 24, con comando de build `npm run build`. No hay proveedor, remoto Git, dominio o despliegue creado en esta entrega. Para un servidor propio detrás de un proxy, decidir expresamente la interfaz de escucha y TLS: el script local se restringe a loopback.

El proyecto no configura `output: export`: redirects y cabeceras los sirve Next. Si se requiere alojamiento puramente estático, preparar una adaptación específica de redirects/404/headers e imágenes y volver a verificar.

## Checklist de publicación

1. Revisar contenido personal y traducciones; retirar el estado de contacto pendiente al añadir correo.
2. Añadir los archivos reales de foto y CV y probar su carga/descarga.
3. Confirmar autorización de proyectos, capturas y enlaces públicos.
4. Definir el dominio y reconstruir.
5. Ejecutar `npm run verify`, revisar recursos, metadatos y cabeceras en el destino.
6. Revisar el aviso de dependencias de desarrollo en `security.md`.

No hay un formulario de contacto ni un servicio de email que configurar. Añadir uno requiere una nueva decisión de alcance.
