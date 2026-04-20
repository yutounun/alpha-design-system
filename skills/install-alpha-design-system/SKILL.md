---
name: install-alpha-design-system
description: >-
    Install alpha-design-system in a consumer app: add package, import styles.css, import components.
    Peers React 18–19, Tailwind v4. Optional shadcn registry URL. Use when wiring the DS into Next/Vite.
---

# install-alpha-design-system

**Peers:** `react` / `react-dom` `>=18 <20`, `tailwindcss` **v4** (~`^4.2`). Optional: `recharts` for Chart — ask if they need it.

## Tailwind on Vite

If the app uses **Vite**, install Tailwind v4 with the **@tailwindcss/vite** plugin using the official flow first: [Installing Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite) (`tailwindcss`, `@tailwindcss/vite`, plugin in `vite.config`, `@import "tailwindcss";` in CSS). Once that builds, add `@import "alpha-design-system/styles.css";` to the same CSS entry (after Tailwind’s import unless their setup requires a different order).

## npm (default)

```bash
pnpm add alpha-design-system
```

Global CSS (e.g. `app/globals.css`):

```css
@import "tailwindcss";
/* Path is relative to THIS file — add/remove `..` until it reaches project node_modules */
@source "../node_modules/alpha-design-system/dist/**/*.js";

@import "alpha-design-system/styles.css";
```

Examples: `src/index.css` → `@source "../node_modules/alpha-design-system/dist/**/*.js";` · `src/app/globals.css` → `@source "../../node_modules/alpha-design-system/dist/**/*.js";`

```tsx
// Prefer subpath imports so the bundler only resolves components you use:
import { Button } from "alpha-design-system/button";

// Root barrel import re-exports all public components; use only when you import many pieces.
import { Button } from "alpha-design-system";
```

Subpaths follow `package.json` `exports` (e.g. `alpha-design-system/drawer`, `alpha-design-system/chart`).

## Theme

On `<html>` (or app root): `data-theme` for alternate themes; class `dark` for dark mode. Wrong colors → check CSS import + same DOM subtree.

## shadcn (source in repo)

Requires shadcn + Tailwind v4. Add `utils` before components that need `cn`:

```bash
npx shadcn@latest add https://alpha-design-system-five.vercel.app/r/utils.json
npx shadcn@latest add https://alpha-design-system-five.vercel.app/r/button.json
```

[registry.json](https://github.com/yutounun/alpha-design-system/blob/main/registry.json) lists items. Without the npm package, import theme from [`src/styles/theme.css`](https://github.com/yutounun/alpha-design-system/blob/main/src/styles/theme.css) (or equivalent).

## Agent notes

Prefer npm unless the user wants shadcn-copied source. Storybook / details: package README, `src/docs/installation.mdx`. Maintainer workflows → `build-alpha-component`.
