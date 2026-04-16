/**
 * Grouped design color tokens from `src/styles/theme.css` for documentation.
 * Order matches docs sections; values resolve via CSS at runtime.
 */
export const COLOR_TOKEN_GROUPS = [
    {
        title: "Background & surface",
        tokens: [
            "--color-background",
            "--color-background-1",
            "--color-background-2",
            "--color-card-1",
            "--color-card-2",
            "--color-brand",
            "--color-surface-deep",
            "--color-skeleton",
        ],
    },
    {
        title: "Foreground",
        tokens: [
            "--color-foreground-high",
            "--color-foreground-medium",
            "--color-foreground-low",
            "--color-inv-foreground-high",
            "--color-inv-foreground-medium",
            "--color-inv-foreground-low",
        ],
    },
    {
        title: "Border",
        tokens: [
            "--color-border-high",
            "--color-border-medium",
            "--color-border-low",
            "--color-border-danger",
            "--color-border-danger-hover",
            "--color-border-danger-focus",
            "--color-border-invalid",
            "--color-border-invalid-muted",
            "--color-border-invalid-focus",
        ],
    },
    {
        title: "Fill & surface tints",
        tokens: [
            "--color-fill-high",
            "--color-fill-medium",
            "--color-fill-low",
            "--color-fill-danger-hover",
        ],
    },
    {
        title: "Focus & invalid ring",
        tokens: [
            "--color-focus",
            "--color-focus-ring",
            "--color-focus-ring-soft",
            "--color-invalid-ring",
            "--color-invalid-focus-ring",
            "--color-danger-ring",
        ],
    },
    {
        title: "Primary",
        tokens: [
            "--color-primary",
            "--color-primary-foreground",
            "--color-primary-muted",
            "--color-primary-text",
            "--color-primary-hover",
            "--color-primary-active",
            "--color-primary-muted-hover",
            "--color-primary-muted-active",
            "--color-primary-text-hover",
            "--color-primary-text-active",
        ],
    },
    {
        title: "Secondary",
        tokens: [
            "--color-secondary",
            "--color-secondary-foreground",
            "--color-secondary-muted",
            "--color-secondary-text",
            "--color-secondary-hover",
            "--color-secondary-active",
        ],
    },
    {
        title: "Danger",
        tokens: [
            "--color-danger",
            "--color-danger-foreground",
            "--color-danger-muted",
            "--color-danger-text",
        ],
    },
    {
        title: "Success",
        tokens: [
            "--color-success",
            "--color-success-foreground",
            "--color-success-muted",
            "--color-success-text",
            "--color-success-muted-hover",
            "--color-success-muted-active",
            "--color-success-text-hover",
            "--color-success-text-active",
        ],
    },
    {
        title: "Warning",
        tokens: [
            "--color-warning",
            "--color-warning-foreground",
            "--color-warning-muted",
            "--color-warning-text",
            "--color-warning-muted-hover",
            "--color-warning-muted-active",
            "--color-warning-hover",
            "--color-warning-active",
            "--color-warning-text-hover",
            "--color-warning-text-active",
        ],
    },
    {
        title: "Informative",
        tokens: [
            "--color-informative",
            "--color-informative-foreground",
            "--color-informative-muted",
        ],
    },
    {
        title: "Link",
        tokens: [
            "--color-link",
            "--color-visited",
            "--color-link-hover",
            "--color-link-active",
            "--color-inv-link-hover",
            "--color-inv-link-active",
        ],
    },
    {
        title: "CTA & cancel",
        tokens: [
            "--color-cta-1",
            "--color-cta-1-foreground",
            "--color-cancel",
            "--color-cancel-foreground",
        ],
    },
    {
        title: "Badges",
        tokens: [
            "--color-badge-blue",
            "--color-badge-navy",
            "--color-badge-purple",
        ],
    },
    {
        title: "Inverse fills (dark / brand)",
        tokens: [
            "--color-inv-fill-high",
            "--color-inv-fill-low",
            "--color-inv-fill-medium",
            "--color-inv-focus",
        ],
    },
    {
        title: "Interaction — transparent & fills",
        tokens: [
            "--color-transparent-hover",
            "--color-transparent-active",
            "--color-inv-transparent-hover",
            "--color-inv-transparent-active",
            "--color-fill-low-hover",
            "--color-fill-low-active",
            "--color-inv-fill-low-hover",
            "--color-inv-fill-low-active",
            "--color-fill-medium-hover",
            "--color-fill-medium-active",
            "--color-inv-fill-medium-hover",
            "--color-inv-fill-medium-active",
            "--color-inv-primary-hover",
            "--color-inv-primary-active",
            "--color-inv-primary-muted-hover",
            "--color-inv-primary-muted-active",
        ],
    },
    {
        title: "Interaction — text",
        tokens: [
            "--color-foreground-high-hover",
            "--color-foreground-high-active",
            "--color-inv-foreground-high-hover",
            "--color-inv-foreground-high-active",
        ],
    },
    {
        title: "Effects",
        tokens: ["--shadow-sm-top"],
    },
] as const

export const ALL_COLOR_CSS_VAR_NAMES: readonly string[] =
    COLOR_TOKEN_GROUPS.flatMap((g) => g.tokens)
