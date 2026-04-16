# Alpha Design System

**Alpha Design System** is a React component library and token layer for building accessible product UI. It ships with **Storybook** as the single place to browse components, read MDX documentation, and watch **design tokens** update live when you switch theme or light/dark mode in the toolbar.

If you landed here from GitHub, the fastest way to understand the system is to run Storybook locally: you get interactive controls, accessibility checks, and docs pages (including a **Welcome** overview and token galleries) without wiring anything into an app first.

## Why open Storybook?

- **See components in isolation** — Button, Input, Textarea, Label, and FormField with variants, sizes, loading states, and composition patterns (`asChild`, form layouts).
- **Token-driven visuals** — Colors, typography, and radius resolve from CSS variables; switch **Theme** and **Mode** in the Storybook toolbar to compare Theme 1 / Theme 2 and light / dark without touching code.
- **Documentation in one surface** — MDX pages explain adoption, token usage, and guardrails next to live Canvas examples.

```bash
npm install
npm run storybook
```

Then open **http://localhost:6006** (default port). Start from **Welcome** in the sidebar, then explore **Components** and **Design Tokens**.

## Overview

| Area | What it is |
| --- | --- |
| **Stack** | React 19, TypeScript, Vite 8, Tailwind CSS 4, Radix primitives, CVA, Storybook 10 |
| **Styling** | Semantic tokens in `src/styles/theme.css` and Tailwind `@theme` — prefer tokens over ad-hoc colors and `dark:` sprawl |
| **Accessibility** | Radix-based patterns, Storybook a11y addon, and components wired for labels, hints, and invalid states |
| **Testing** | Vitest with the Storybook project (`npm run test:storybook`) |

Components live under `src/components/`. Docs and token showcases live under `src/docs/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server for the app shell |
| `npm run storybook` | Storybook dev server on port **6006** |
| `npm run build-storybook` | Static Storybook build |
| `npm run test:storybook` | Vitest (Storybook project) |
| `npm run build` | Production build (`tsc` + Vite) |
| `npm run lint` | ESLint |

## Adopting in your own project (short version)

1. Load the theme stylesheet (e.g. `src/styles/theme.css` via your CSS entry).
2. Import components from the paths used in this repo (see stories for examples).
3. Mirror `data-theme` / `.dark` on the document root if you want the same theme switching as Storybook.

For token naming and conventions, the design-token reference used in this workspace is documented in-repo (see `src/docs/` and related scripts under `scripts/`).

## License

This repository is **private** (`"private": true` in `package.json`). Adjust licensing and distribution when you publish or open-source it.

---

_Built with Vite + React + TypeScript. ESLint is configured for type-aware rules where applicable; extend `eslint.config.js` as your product grows._
