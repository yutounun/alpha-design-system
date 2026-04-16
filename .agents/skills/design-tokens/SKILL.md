---
name: design-tokens
description: Design token reference for alpha-design-system. Use when styling components to look up token names, CSS variables, Tailwind utilities, and usage. Triggers on color, typography, radius, or token selection tasks.
---

# Design tokens

## When to use

Use this skill when you are:

- Implementing or reviewing UI and need the correct semantic token
- Choosing colors, type scale steps, radii, or font stacks
- Checking whether a role already exists before adding a new variable to `theme.css`

## Primary reference

Read **[references/tokens.json](./references/tokens.json)**. It lists every custom property from [`src/styles/theme.css`](../../src/styles/theme.css) grouped by category. Each entry has:

- `token_name` — CSS custom property (e.g. `--color-primary`)
- `description` — When and how to use the token

## Relationship to guardrails

- **[`.cursor/skills/guardrail.md`](../../.cursor/skills/guardrail.md)** — Rules: no `/opacity` suffixes in class names, no hardcoded colors, radii, or font sizes; use theme tokens only.
- **This skill** — Dictionary: which token exists and what it is for.

If the right token is missing, follow guardrail policy: agree on a new token in `theme.css` before shipping ad hoc styles.

## Maintenance

After editing `src/styles/theme.css`, regenerate the JSON:

```bash
python3 scripts/build-design-tokens-json.py
```

Ensure `DESCRIPTIONS` in `scripts/build-design-tokens-json.py` includes every token name extracted from `theme.css` (the script exits with an error if any are missing).
