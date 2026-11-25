# Radiografía de correos · Comercial (TEC360 · VPAF)

Presentación web 16:9 (Vite + React + TypeScript + Framer Motion).

- **Editar textos, cifras y notas:** `src/content.ts` (la fecha de validación es `FECHA_VALIDACION`).
- **Local:** `npm install && npm run dev`
- **Pruebas de consistencia:** `npm test`
- **HTML único para compartir:** `npm run build` → `dist/index.html` (abre con doble clic, sin internet; la tipografía va incrustada).

Controles: → / ← / Espacio / Re Pág / Av Pág / swipe · **F** pantalla completa · **N** notas · Inicio / Fin · la URL guarda la slide (`#3`).

## Deploy en Cloudflare

Se publica como **Cloudflare Worker con assets estáticos** (`wrangler.jsonc`, sirve `dist/`).

### Opción A · GitHub Actions (incluida)
`.github/workflows/deploy.yml` corre `npm test` → `npm run build` → `wrangler deploy` en cada push a `main`.
Si una prueba de consistencia falla, no se publica. Además, cada corrida guarda `dist/index.html` como artefacto descargable.

Configura dos secretos en GitHub (*Settings → Secrets and variables → Actions*):

| Secreto | Dónde obtenerlo |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare → *My Profile → API Tokens → Create Token* → plantilla **Edit Cloudflare Workers** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → *Workers & Pages* (columna derecha, «Account ID») |

Mientras no existan los secretos, el workflow solo prueba y compila (no falla).
La URL queda como `https://notificaciones-comercial.<tu-subdominio>.workers.dev`.

### Opción B · Integración Git del panel de Cloudflare (sin secretos)
*Workers & Pages → Create → Import a repository* → este repo. Build command: `npm run build` · Deploy command: `npx wrangler deploy`.
Si usas esta opción, no configures los secretos de la opción A (para no publicar dos veces).

### Manual desde tu computadora
```bash
npx wrangler login
npm run deploy
```
