/**
 * Parses `src/styles/theme.css` at build time (via `?raw`) so token docs stay in sync with the theme.
 * Mirrors grouping rules in `scripts/build-design-tokens-json.py` for colors.
 */
import themeCssRaw from "@/styles/theme.css?raw"

export type ColorTokenGroup = {
    title: string
    tokens: readonly string[]
}

const COLOR_CATEGORY_ORDER = [
    "background",
    "card",
    "brand",
    "foreground",
    "border",
    "fill",
    "focus",
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
    "informative",
    "link",
    "cta",
    "cancel",
    "badge",
    "chart",
    "skeleton",
    "surface",
    "interaction",
    "other",
] as const

const COLOR_CATEGORY_TITLE: Record<
    (typeof COLOR_CATEGORY_ORDER)[number],
    string
> = {
    background: "Background colors",
    card: "Card surfaces",
    brand: "Brand",
    foreground: "Text and foreground on surfaces",
    border: "Borders",
    fill: "Fills and tinted surfaces",
    focus: "Focus states",
    primary: "Primary (Stripe purple)",
    secondary: "Secondary (magenta)",
    danger: "Danger and validation error",
    success: "Success",
    warning: "Warning",
    informative: "Informative",
    link: "Links",
    cta: "CTA accent",
    cancel: "Cancel and neutral",
    badge: "Badges",
    chart: "Charts and data visualization",
    skeleton: "Skeleton loading",
    surface: "Surface depth",
    interaction: "Interaction (hover and active)",
    other: "Other",
}

function extractAtThemeBlock(css: string): string {
    const marker = "@theme"
    const start = css.indexOf(marker)
    if (start === -1) {
        return ""
    }
    const braceStart = css.indexOf("{", start)
    if (braceStart === -1) {
        return ""
    }
    let depth = 0
    for (let i = braceStart; i < css.length; i++) {
        const ch = css[i]
        if (ch === "{") depth++
        else if (ch === "}") {
            depth--
            if (depth === 0) {
                return css.slice(braceStart + 1, i)
            }
        }
    }
    return ""
}

/**
 * Property names in first-seen order inside the `@theme` block (stable for type scale ordering).
 */
function tokenNamesInThemeOrder(themeBlock: string): string[] {
    const re = /^\s+(--[a-z0-9*-]+)\s*:/gim
    const seen = new Set<string>()
    const ordered: string[] = []
    let m: RegExpExecArray | null
    while ((m = re.exec(themeBlock)) !== null) {
        const name = m[1]
        if (!seen.has(name)) {
            seen.add(name)
            ordered.push(name)
        }
    }
    return ordered
}

function colorCategoryFor(name: string): (typeof COLOR_CATEGORY_ORDER)[number] {
    if (!name.startsWith("--color-")) return "other"
    if (name.startsWith("--color-background")) return "background"
    if (name.startsWith("--color-card")) return "card"
    if (name === "--color-brand") return "brand"
    if (
        name.startsWith("--color-foreground") ||
        name.startsWith("--color-inv-foreground")
    ) {
        return "foreground"
    }
    if (name.startsWith("--color-border")) return "border"
    if (
        name.startsWith("--color-fill") ||
        name.startsWith("--color-inv-fill")
    ) {
        return "fill"
    }
    if (name.startsWith("--color-focus") || name === "--color-inv-focus") {
        return "focus"
    }
    if (name.startsWith("--color-primary")) return "primary"
    if (name.startsWith("--color-secondary")) return "secondary"
    if (
        name.startsWith("--color-danger") ||
        name.startsWith("--color-invalid")
    ) {
        return "danger"
    }
    if (name.startsWith("--color-success")) return "success"
    if (name.startsWith("--color-warning")) return "warning"
    if (name.startsWith("--color-informative")) return "informative"
    if (
        name === "--color-link" ||
        name === "--color-visited" ||
        name === "--color-inv-link-hover" ||
        name === "--color-inv-link-active"
    ) {
        return "link"
    }
    if (name.startsWith("--color-cta")) return "cta"
    if (name.startsWith("--color-cancel")) return "cancel"
    if (name.startsWith("--color-badge")) return "badge"
    if (name.startsWith("--color-chart")) return "chart"
    if (name === "--color-skeleton") return "skeleton"
    if (name === "--color-surface-deep" || name === "--color-overlay-scrim")
        return "surface"
    if (
        name.startsWith("--color-transparent") ||
        name.startsWith("--color-inv-transparent")
    ) {
        return "interaction"
    }
    if (name.startsWith("--color-inv-primary") && !name.includes("muted")) {
        return "interaction"
    }
    if (name.startsWith("--color-inv-primary-muted")) return "interaction"
    if (name.startsWith("--color-")) return "interaction"
    return "other"
}

const THEME_BLOCK = extractAtThemeBlock(themeCssRaw)
const ORDERED_NAMES = tokenNamesInThemeOrder(THEME_BLOCK)

const COLOR_GROUPS_CACHE: ColorTokenGroup[] = (() => {
    const colorNames = ORDERED_NAMES.filter((n) => n.startsWith("--color-"))
    const buckets = new Map<string, string[]>()
    for (const id of COLOR_CATEGORY_ORDER) {
        buckets.set(id, [])
    }
    for (const name of colorNames) {
        const cat = colorCategoryFor(name)
        buckets.get(cat)?.push(name)
    }
    for (const list of buckets.values()) {
        list.sort((a, b) => a.localeCompare(b))
    }
    const groups = COLOR_CATEGORY_ORDER.filter(
        (id) => (buckets.get(id)?.length ?? 0) > 0
    ).map((id) => ({
        title: COLOR_CATEGORY_TITLE[id],
        tokens: buckets.get(id) ?? [],
    }))
    const shadowNames = ORDERED_NAMES.filter((n) => n.startsWith("--shadow-"))
    if (shadowNames.length > 0) {
        groups.push({
            title: "Shadow",
            tokens: shadowNames,
        })
    }
    return groups
})()

/** Stable list for `useCssVars` dependency (colors + shadow swatches). */
const COLOR_GRID_CSS_VAR_NAMES_CACHE: readonly string[] =
    COLOR_GROUPS_CACHE.flatMap((g) => [...g.tokens])

/** Stable list for `useCssVars` (fonts, type scale, line heights). */
const TYPOGRAPHY_CSS_VAR_NAMES_CACHE: readonly string[] = (() => {
    const fonts = ORDERED_NAMES.filter(
        (n) => n.startsWith("--font-") && n !== "--font-*"
    )
    const scale = ORDERED_NAMES.filter(
        (n) =>
            n.startsWith("--text-") &&
            !n.endsWith("--line-height") &&
            n !== "--text-*"
    )
    const lh = ORDERED_NAMES.filter(
        (n) => n.startsWith("--text-") && n.endsWith("--line-height")
    )
    return [...fonts, ...scale, ...lh]
})()

const RADIUS_CSS_VAR_NAMES_CACHE: readonly string[] = ORDERED_NAMES.filter(
    (n) => n.startsWith("--radius-")
)

/** Semantic color groups derived from `theme.css` `@theme` block. */
export function getColorTokenGroups(): readonly ColorTokenGroup[] {
    return COLOR_GROUPS_CACHE
}

/** Flat list of all `--color-*` names in `@theme`. */
export function getAllColorCssVarNames(): readonly string[] {
    return ORDERED_NAMES.filter((n) => n.startsWith("--color-"))
}

/** All CSS vars shown on the Colors doc page (semantic colors + shadow tokens). */
export function getColorGridCssVarNames(): readonly string[] {
    return COLOR_GRID_CSS_VAR_NAMES_CACHE
}

export type FontTokenRow = {
    varName: string
    label: string
    className: string
}

/** `--font-*` tokens except the Tailwind reset `--font-*`. */
export function getFontTokenRows(): FontTokenRow[] {
    return ORDERED_NAMES.filter(
        (n) => n.startsWith("--font-") && n !== "--font-*"
    ).map((varName) => {
        const key = varName.slice("--font-".length)
        const label =
            key.length > 0
                ? key[0].toUpperCase() + key.slice(1).replace(/-/g, " ")
                : varName
        return {
            varName,
            label,
            className: `font-${key}`,
        }
    })
}

/** `--text-*` size tokens only (excludes `--text-*--line-height`). */
export function getTextScaleVarNames(): string[] {
    return ORDERED_NAMES.filter(
        (n) =>
            n.startsWith("--text-") &&
            !n.endsWith("--line-height") &&
            n !== "--text-*"
    )
}

/** e.g. `--text-sm` -> `text-sm` */
export function textVarToUtilityClass(varName: string): string {
    if (!varName.startsWith("--text-")) return varName
    return varName.slice(2)
}

/** All `--text-*--line-height` tokens in file order. */
export function getLineHeightVarNames(): string[] {
    return ORDERED_NAMES.filter(
        (n) => n.startsWith("--text-") && n.endsWith("--line-height")
    )
}

export type RadiusTokenRow = {
    varName: string
    label: string
    roundedClass: string
}

/** `--radius-*` tokens; maps to `rounded-*` utilities (e.g. `rounded-action-1`). */
export function getRadiusTokenRows(): RadiusTokenRow[] {
    return ORDERED_NAMES.filter((n) => n.startsWith("--radius-")).map(
        (varName) => {
            const key = varName.slice("--radius-".length)
            return {
                varName,
                label: key,
                roundedClass: `rounded-${key}`,
            }
        }
    )
}

/** All typography-related CSS vars for `useCssVars` (fonts, scale, line heights). */
export function getTypographyCssVarNames(): readonly string[] {
    return TYPOGRAPHY_CSS_VAR_NAMES_CACHE
}

/** All radius CSS var names. */
export function getRadiusCssVarNames(): readonly string[] {
    return RADIUS_CSS_VAR_NAMES_CACHE
}
