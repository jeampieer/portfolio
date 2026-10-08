# Verificación

## Entorno reproducible

```bash
nvm use
npm ci
npx playwright install chromium
npm run verify
```

`verify` corre lint, tipos, formato, build y E2E. Next 16 no ejecuta ESLint dentro de `next build`, por eso es un paso explícito. `typecheck` ejecuta `next typegen` antes de `tsc` para funcionar en un checkout limpio.

Los E2E sirven el build de producción en `127.0.0.1:3100`, con dos workers y Chromium. No dependen del dev server ni de datos externos. El puerto debe estar libre. `reuseExistingServer: false` evita probar por error otro proceso. `test:e2e` por separado requiere ejecutar `build` después de editar código.

## Cobertura

- Redirección inicial y siete secciones.
- Rutas y contenido ES/EN, también en detalles de proyectos.
- Cambio de tema y persistencia entre recargas e idiomas.
- Filtros de proyectos y estado vacío.
- Filtro Backend, navegación al caso MFA, título/metadatos ES/EN y atribución del despliegue inicial; ausencia de fechas inventadas, ilustración y enlaces públicos al servicio; cuatro capturas 1920×1080, proporción 16:9, originales PNG con HTTP 200 y aviso ES/EN de datos sintéticos y cliente local de prueba.
- Filtro Full stack y caso GM Social, ocho capturas horizontales 1920×1080 cargadas con proporción 16:9 conservada, enlaces a originales PNG con HTTP 200, aviso demo y navegación ES/EN.
- Laboratorio: teclado en slider, órbita, pausa y reset.
- Movimiento reducido y contenido visible.
- Menú móvil, cierre por Escape y por navegación.
- Ausencia de overflow horizontal a 360, 390, 768, 1280 y 1920px en ambos idiomas.
- axe WCAG A/AA en ambos temas/idiomas y página de detalle.
- 404, robots de desarrollo y ausencia de enlaces vacíos.
- Lectura del contenido y navegación a los tres casos de estudio sin JavaScript.
- Enlace para saltar al contenido como primer destino de teclado.

Los errores conservan trazas y capturas en `test-results/`; el reporte HTML está en `playwright-report/`. Ambos se excluyen de Git. `npx playwright show-report` abre el reporte.

## Revisión manual

Comprobar composición, tamaños, recortes, foco visible y encabezado al hacer scroll. Abrir ES/EN, claro/oscuro y una ventana móvil. Verificar enlaces de contacto, CV y redes después de completar esos valores; no se declaran probados mientras estén vacíos.

axe no sustituye una evaluación manual con lector de pantalla, todos los navegadores, dispositivos físicos ni auditorías completas de WCAG. El rango de pantallas comprobado no garantiza todos los tamaños posibles.

Resultados de la entrega: [verification.md](verification.md).
