import { cn } from "@/lib/utils"

import {
    ALL_COLOR_CSS_VAR_NAMES,
    COLOR_TOKEN_GROUPS,
} from "./color-token-groups"
import { useCssVars } from "./use-css-var"

export function ColorGrid() {
    const values = useCssVars(ALL_COLOR_CSS_VAR_NAMES)

    return (
        <div className="flex flex-col gap-8">
            {COLOR_TOKEN_GROUPS.map((group) => (
                <section key={group.title}>
                    <h3
                        className={cn(
                            "mb-3 font-heading text-lg font-semibold",
                            "text-foreground-high"
                        )}
                    >
                        {group.title}
                    </h3>
                    <div
                        className={cn(
                            "grid gap-3 sm:grid-cols-2",
                            "lg:grid-cols-3 xl:grid-cols-4"
                        )}
                    >
                        {group.tokens.map((token) => (
                            <ColorSwatch
                                key={token}
                                name={token}
                                value={values[token] ?? ""}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
    return (
        <div
            className={cn(
                "flex gap-3 rounded-lg border border-border-low",
                "bg-card-1 p-3"
            )}
        >
            <div
                className={cn(
                    "size-12 shrink-0 rounded-md",
                    "border border-border-low"
                )}
                style={{ backgroundColor: `var(${name})` }}
                aria-hidden
            />
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        "truncate font-mono text-2xs",
                        "text-foreground-medium"
                    )}
                >
                    {name}
                </p>
                <p className="truncate text-xs text-foreground-low">
                    {value || "—"}
                </p>
            </div>
        </div>
    )
}
