---
"alpha-design-system": patch
---

Fix library build: externalize all `peerDependencies` and `dependencies` (including subpaths) so `vaul`, `recharts`, `cmdk`, and other runtime deps are not inlined from `node_modules/.pnpm` paths. Prevents `require('react')` errors in consumer apps using Vite 8 + Rolldown. Move `vaul` from devDependencies to dependencies. Document preferring subpath imports over the root barrel export.
