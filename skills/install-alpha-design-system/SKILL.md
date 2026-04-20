---
name: install-alpha-design-system
description: >-
    Install alpha-design-system in a consumer app: add package, import styles.css, import components.
    Peers React 18–19, Tailwind v4. Optional shadcn registry URL. Use when wiring the DS into Next/Vite.
---

# install-alpha-design-system

**Peers:** `react` / `react-dom` `>=18 <20`, `tailwindcss` **v4** (~`^4.2`). Optional: `recharts` for Chart — ask if they need it.

## Tailwind on Vite

If the app uses **Vite**, install Tailwind v4 with the **@tailwindcss/vite** plugin using the official flow first: [Installing Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite) (`tailwindcss`, `@tailwindcss/vite`, plugin in `vite.config`). After that build succeeds, **replace** `src/index.css` using the sections **Vite: clean the starter template**, **Vite: theme.css from this repo**, and **Vite: src/index.css** below (do not keep the Vite default `index.css` content or a separate `App.css`).

## npm (default)

```bash
pnpm add alpha-design-system
```

## Vite: clean the starter template

- Delete `src/App.css`.
- In `src/App.tsx`, remove `import "./App.css"` and replace the default demo JSX (logos, counters, etc.) with your app shell.
- Open `src/index.css` and remove all Vite starter rules (`:root { … }`, `body`, `a`, `h1`, `button`, `.logo`, etc.) so the file is ready for the snippet under **Vite: src/index.css**.

## Vite: theme.css from this repo

Copy [`src/styles/theme.css`](https://github.com/yutounun/alpha-design-system/blob/main/src/styles/theme.css) from this design system repo into the consumer app as `src/styles/theme.css` (create `src/styles` if needed). That file already includes `@import "tailwindcss"` and the DS tokens; you do not import `alpha-design-system/styles.css` again in `index.css` when using this copy.

## Vite: src/index.css

Use only these lines in `src/index.css` (paths relative to that file):

```css
@import "./styles/theme.css";
@source "../node_modules/alpha-design-system/dist/**/*.js";
```

- **`@source`**: Tailwind v4 scans the published JS under `node_modules` so classes used inside `alpha-design-system` are not purged. Adjust `../` if the CSS entry lives somewhere other than `src/index.css` (e.g. deeper folders need more `..` segments until `node_modules` is reached).
- If resolution fails, ensure `alpha-design-system` is installed and the path matches your layout (`node_modules/alpha-design-system/dist/**/*.js`).

## Next.js / App Router (and other setups)

Global CSS entry (e.g. `app/globals.css`):

```css
@import "tailwindcss";
/* Path is relative to THIS file — add/remove `..` until it reaches project node_modules */
@source "../node_modules/alpha-design-system/dist/**/*.js";

@import "alpha-design-system/styles.css";
```

Examples: `src/index.css` → `@source "../node_modules/alpha-design-system/dist/**/*.js";` · `src/app/globals.css` → `@source "../../node_modules/alpha-design-system/dist/**/*.js";`

## Imports and Button example

```tsx
// Prefer subpath imports so the bundler only resolves components you use:
import { Button } from "alpha-design-system/button";
// Root barrel re-exports all public components — use only when you import many pieces:
// import { Button } from "alpha-design-system";
```

```tsx
import { Button } from "alpha-design-system/button";

export function App() {
    return (
        <div className="p-6">
            <Button variant="primary">Click me</Button>
        </div>
    );
}
```

Variants, sizes, loading, and `asChild`: see Storybook or `src/components/button` in this repo.

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
