import { cn } from "@/lib/utils"

import {
    getFontTokenRows,
    getLineHeightVarNames,
    getTextScaleVarNames,
    getTypographyCssVarNames,
    textVarToUtilityClass,
} from "./parse-theme-tokens"
import { useCssVars } from "./use-css-var"

export function TypographySample() {
    const values = useCssVars(getTypographyCssVarNames())
    const fontRows = getFontTokenRows()
    const textSteps = getTextScaleVarNames()
    const lineHeightVars = getLineHeightVarNames()

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
                    {fontRows.map((row) => (
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
                    {textSteps.map((varName) => {
                        const utility = textVarToUtilityClass(varName)
                        const step = varName.replace(/^--text-/, "")
                        return (
                            <div
                                key={varName}
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
                                    {step}
                                </span>
                                <span
                                    className={cn(
                                        utility,
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
                {lineHeightVars.length > 0 ? (
                    <p className="mt-3 text-xs text-foreground-medium">
                        Line-height tokens:{" "}
                        <span className="font-mono text-2xs">
                            {lineHeightVars.map((vn, i) => (
                                <span key={vn}>
                                    {i > 0 ? "; " : ""}
                                    {vn}: {values[vn] || "—"}
                                </span>
                            ))}
                        </span>
                    </p>
                ) : null}
            </section>
        </div>
    )
}
