import { cn } from "@/lib/utils"

import { useCssVars } from "./use-css-var"

const FONT_ROWS = [
    { label: "Display", className: "font-display", varName: "--font-display" },
    { label: "Heading", className: "font-heading", varName: "--font-heading" },
    { label: "Body", className: "font-body", varName: "--font-body" },
    { label: "Mono", className: "font-mono", varName: "--font-mono" },
] as const

const TEXT_STEPS = [
    { step: "3xs", className: "text-3xs" },
    { step: "2xs", className: "text-2xs" },
    { step: "xs", className: "text-xs" },
    { step: "sm", className: "text-sm" },
    { step: "md", className: "text-md" },
    { step: "lg", className: "text-lg" },
    { step: "xl", className: "text-xl" },
    { step: "2xl", className: "text-2xl" },
    { step: "3xl", className: "text-3xl" },
    { step: "4xl", className: "text-4xl" },
    { step: "5xl", className: "text-5xl" },
    { step: "6xl", className: "text-6xl" },
    { step: "7xl", className: "text-7xl" },
] as const

const TYPO_VAR_NAMES: readonly string[] = [
    "--font-display",
    "--font-heading",
    "--font-body",
    "--font-mono",
    ...TEXT_STEPS.map((s) => `--text-${s.step}`),
    "--text-3xs--line-height",
    "--text-2xs--line-height",
]

export function TypographySample() {
    const values = useCssVars(TYPO_VAR_NAMES)

    return (
        <div className="flex flex-col gap-8">
            <section>
                <h3
                    className={cn(
                        "mb-3 font-heading text-lg font-semibold",
                        "text-foreground-high"
                    )}
                >
                    Font families
                </h3>
                <div className="flex flex-col gap-3">
                    {FONT_ROWS.map((row) => (
                        <div
                            key={row.varName}
                            className={cn(
                                "rounded-lg border border-border-low",
                                "bg-card-1 p-4"
                            )}
                        >
                            <p className="text-xs font-medium text-foreground-medium">
                                {row.label}
                            </p>
                            <p
                                className={cn(
                                    row.className,
                                    "mt-1 text-lg text-foreground-high"
                                )}
                            >
                                The quick brown fox jumps over the lazy dog.
                            </p>
                            <p
                                className={cn(
                                    "mt-2 font-mono text-2xs",
                                    "text-foreground-low"
                                )}
                            >
                                {row.varName}: {values[row.varName] || "—"}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3
                    className={cn(
                        "mb-3 font-heading text-lg font-semibold",
                        "text-foreground-high"
                    )}
                >
                    Type scale
                </h3>
                <div className="flex flex-col gap-2">
                    {TEXT_STEPS.map((s) => {
                        const varName = `--text-${s.step}`
                        return (
                            <div
                                key={s.step}
                                className={cn(
                                    "flex flex-wrap items-baseline gap-3",
                                    "rounded-lg border border-border-low",
                                    "bg-card-1 px-3 py-2"
                                )}
                            >
                                <span
                                    className={cn(
                                        "w-10 shrink-0 font-mono text-2xs",
                                        "text-foreground-medium"
                                    )}
                                >
                                    {s.step}
                                </span>
                                <span
                                    className={cn(
                                        s.className,
                                        "text-foreground-high"
                                    )}
                                >
                                    Alpha design system
                                </span>
                                <span
                                    className={cn(
                                        "ml-auto font-mono text-2xs",
                                        "text-foreground-low"
                                    )}
                                >
                                    {values[varName] || "—"}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <p className="mt-3 text-xs text-foreground-medium">
                    Line-height tokens:{" "}
                    <span className="font-mono text-2xs">
                        --text-3xs--line-height:{" "}
                        {values["--text-3xs--line-height"] || "—"};{" "}
                        --text-2xs--line-height:{" "}
                        {values["--text-2xs--line-height"] || "—"}
                    </span>
                </p>
            </section>
        </div>
    )
}
