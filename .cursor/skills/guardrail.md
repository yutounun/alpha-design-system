---
name: guardrail
description: Design-system styling rules for alpha-design-system. Apply when implementing or reviewing UI. No opacity /N in className; no dark: in className; no hardcoded colors, radius, text size, or font weight; use theme.css tokens and Tailwind primitives only.
version: 1.0.0
source: project-convention
---

# Guardrail: styling rules

When implementing or changing UI in this repo, **follow every rule below**. Flag violations in review. If a token is missing, **discuss before shipping**—add it in [`src/styles/theme.css`](../../src/styles/theme.css) after agreement.

References: [`src/styles/theme.css`](../../src/styles/theme.css), [`DESIGN.md`](../../DESIGN.md)

---

## 1. No opacity modifiers in `className` (`/N`)

Do **not** use Tailwind color opacity suffixes such as `/80`, `/50`, `/20`, `/40` on utilities in `className`.

**Bad**

```tsx
className="bg-primary/80 text-foreground-high/50 ring-ring/40"
```

**Good**

- Use semantic tokens defined per state in `theme.css` (e.g. `hover:bg-primary-hover`, `text-inv-foreground-medium`).
- If you need a new alpha treatment, **propose a `--color-*` (or related) token in `theme.css` and implement only after agreement.**

**Why**: `/N` duplicates design tokens and breaks consistency across dark mode and hover/active states.

---

## 2. Colors: no hardcoded values

Do **not** use arbitrary color values in classes (`#...`, `rgb()`, `rgba()`, `hsl()`, etc.). Avoid raw colors in inline `style` unless there is no alternative (then align with the team first).

**Bad**

```tsx
className="text-[#533afd] bg-[rgba(6,27,49,0.05)]"
style={{ color: "#061b31" }}
```

**Good**

```tsx
className="text-primary-text bg-transparent-hover"
className="text-foreground-high bg-background-1"
```

- Use only utilities backed by `--color-*` in `@theme` in `theme.css` (`text-*`, `bg-*`, `border-*`, etc.).
- If a role is missing, **propose a new token** in `theme.css`, then use it.

---

## 3. Border radius: no hardcoded values

Do **not** use arbitrary radius in classes (e.g. `rounded-[8px]`, `rounded-[min(...)]`).

**Bad**

```tsx
className="rounded-[8px] rounded-[min(var(--radius-md),10px)]"
```

**Good**

- Tailwind radius **primitives**: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`, etc.
- Project tokens from `theme.css`: `--radius-action-1` (4px), `--radius-action-2` (6px), `--radius-full`—prefer matching utilities such as `rounded-action-1`, `rounded-action-2` when available.
- If the design needs a radius that does not exist, **extend `theme.css` or map to an existing primitive** after discussion.

---

## 4. Text size: no hardcoded values

Do **not** use arbitrary font sizes (e.g. `text-[0.8rem]`, `text-[14px]`).

**Bad**

```tsx
className="text-[0.8rem] text-[13px]"
```

**Good**

- Use the type scale from `theme.css` (`--text-3xs` through `--text-7xl`): `text-3xs`, `text-2xs`, `text-xs`, `text-sm`, `text-md`, `text-lg`, …
- If needed, limit to **Tailwind steps that match this project’s `@theme`** only.

If an in-between size is required, **reconcile with `DESIGN.md`, add a step in `theme.css`, then use the new utility.**

---

## 5. Font family: `theme.css` tokens only

Do **not** use arbitrary font families (e.g. `font-[system-ui]`). Only set `font-*` when the element is not default body text.

**Policy**

- Default body and most UI: **`body` already has `font-body`**—do not add redundant `font-body` (see `body { @apply font-body ... }` in `theme.css`).
- Headings / display: `font-heading` or `font-display`.
- Code: `font-mono`.

**Bad**

```tsx
className="font-[system-ui]"
```

**Good**

```tsx
className="font-heading"
className="font-display"
className="font-mono"
```

Omit extra `font-*` on normal body copy.

---

## 6. Font weight: no hardcoded values

Do **not** use arbitrary weights (e.g. `font-[300]`, `font-[450]`).

**Bad**

```tsx
className="font-[300] font-[450]"
```

**Good**

Use Tailwind weight **primitives** only: `font-thin`, `font-extralight`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, …

If the design does not map cleanly, **align with `DESIGN.md` and pick the closest primitive** after discussion.

---

## 7. No `dark:` variant in `className`

Do **not** prefix utilities with `dark:` (e.g. `dark:bg-card-1`). Semantic colors and related tokens already resolve via CSS variables. Use the same `text-*` / `bg-*` / `border-*` utilities in both modes.

**Bad**: `className="bg-background-1 dark:bg-card-1"`  
**Good**: `className="bg-background-1"`

---

## Implementation checklist

| Check                                     | Pass criteria                                     |
| ----------------------------------------- | ------------------------------------------------- |
| Color opacity `/` + number                | Not used                                          |
| `#` / `rgb` / arbitrary colors in classes | Not used (tokens only)                            |
| `rounded-[...]`                           | Not used                                          |
| `text-[...]` for font size                | Not used                                          |
| `font-[...]`                              | Not used                                          |
| `dark:*` in `className`                   | Not used (`.dark` retokens in `theme.css`)        |
| Redundant `font-body` on body copy        | Not added                                         |
| Missing token                             | Do not implement ad hoc; add to `theme.css` first |

---

## Notes for agents

- When reviewing new components, stories, or MDX, validate `className` against the table above.
- Legacy code may violate these rules; refactor in a separate change (e.g. replace `/80` with `*-hover` / `*-muted` tokens; replace `text-[...]` with `text-sm` or a theme step).
