# AGENTS.md — JEAMPIEER.TECH

Portafolio público de software full stack. Frontend con Next.js App Router, React, TypeScript estricto, Tailwind v4 y Framer Motion. Sin autenticación, backend, base de datos ni envío de formularios.

## Fuentes de verdad

- El pedido y las decisiones del usuario definen el alcance.
- `JEAMPIEER_TECH_Design_System_v1.0.md` contiene la identidad visual de referencia. No alterarlo para justificar una implementación.
- `src/config/site.ts`, `src/features/portfolio/data/portfolio.ts` y `src/lib/i18n/index.ts` contienen la configuración y el contenido publicado.
- `docs/architecture.md` describe la organización vigente.
- `gm-social-web` se usó únicamente como referencia de estructura y convenciones. Sus reglas de negocio, auth, commits y dependencias no se aplican aquí.

## Estructura y criterios

```text
src/app/[locale]/                    rutas delgadas, layouts, metadata
src/components/layout/              Header y Footer
src/components/ui/                  Brand, Reveal, SectionHeading
src/features/portfolio/
  components/views/                 composición de páginas
  components/                       secciones e interacciones
  data/                             contenido editable
  hooks/                            comportamiento reutilizable
  types/                            contratos del dominio
src/config/                         configuración pública
src/lib/                            i18n y SEO
src/providers/                      tema y movimiento
src/types/                          tipos realmente compartidos
docs/                               documentación técnica
tests/e2e/                          pruebas de recorridos reales
```

- Imports absolutos `@/`, componentes PascalCase y hooks `useX`.
- Páginas/layouts/componentes estáticos en servidor; `"use client"` solo cuando haya interacción, hooks o API del navegador.
- No agregar services, axios, TanStack Query ni providers vacíos sin un origen de datos real.
- No introducir Ant Design, guards, sesiones ni `/api` por herencia de la referencia.
- Mantener el contenido fuera de las vistas. Ambos idiomas deben cubrir los mismos campos.
- Usar los tokens de `globals.css`; conservar los colores originales en oscuro y el contraste de la adaptación clara.
- Las preferencias visuales son estado local, no datos del servidor.
- Usar HTML semántico, controles con etiquetas, foco visible y movimiento reducido.
- Las animaciones deben conservar la lectura del HTML prerenderizado sin JavaScript.
- No inventar años de experiencia, cargos, métricas, clientes, tecnologías, URLs, fotos o archivos CV.
- No publicar información de otros repositorios sin autorización explícita del usuario.
- No instalar ni configurar auth/backend por anticipación.

## Flujo de trabajo

1. Leer los archivos implicados y la documentación pertinente.
2. Implementar el cambio mínimo coherente con las capas existentes.
3. Actualizar ES/EN y las guías cuando cambie contenido, arquitectura o configuración.
4. Ejecutar las verificaciones aplicables. Para cambios que afectan el sitio completo, ejecutar `npm run verify` con Node 24.
5. Revisar visualmente desktop y móvil cuando cambie el layout. No afirmar conformidad WCAG completa solo por pasar axe.
6. Registrar evidencia y límites en `docs/verification.md` cuando se cierre una etapa significativa.

No crear commits, remotos, despliegues o integraciones externas salvo que el pedido lo requiera. Mantener cualquier servidor local solicitado por el usuario en ejecución e indicar su URL.

## Comandos

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run test:e2e
npm run verify
```

Los E2E requieren Chromium (`npx playwright install chromium`) y el build actualizado. Usan el puerto 3100. El puerto de desarrollo predeterminado es 3000. `SITE_URL` es opcional y se evalúa durante el build; no poner secretos en `src/config/site.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
