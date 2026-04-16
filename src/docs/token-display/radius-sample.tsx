import { cn } from "@/lib/utils"

import { getRadiusCssVarNames, getRadiusTokenRows } from "./parse-theme-tokens"
import { useCssVars } from "./use-css-var"

export function RadiusSample() {
    const varNames = getRadiusCssVarNames()
    const values = useCssVars(varNames)
    const rows = getRadiusTokenRows()

    return (
        <div className="flex flex-col gap-4">
            {rows.map((r) => (
                <div
                    key={r.varName}
                    className={cn(
                        "flex flex-wrap items-center gap-4",
                        "rounded-lg border border-border-low",
                        "bg-card-1 p-4"
                    )}
                >
                    <div
                        className={cn(
                            "h-16 w-28 shrink-0 border-2",
                            "border-primary bg-fill-medium"
                        )}
                        style={{ borderRadius: `var(${r.varName})` }}
                        aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                        <p className="font-mono text-sm text-foreground-high">
                            {r.varName}
                        </p>
                        <p className="font-mono text-2xs text-foreground-low">
                            {values[r.varName] || "—"}
                        </p>
                        <p className="mt-1 text-2xs text-foreground-medium">
                            Utility:{" "}
                            <span className="font-mono">{r.roundedClass}</span>
                        </p>
                    </div>
                </div>
            ))}
            <p className="text-xs text-foreground-medium">
                Tailwind maps these to utilities such as{" "}
                <span className="font-mono text-2xs">rounded-action-1</span>,{" "}
                <span className="font-mono text-2xs">rounded-action-2</span>,
                and <span className="font-mono text-2xs">rounded-full</span>{" "}
                where configured in the theme.
            </p>
        </div>
    )
}
