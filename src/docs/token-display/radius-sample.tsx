import { cn } from "@/lib/utils"

import { useCssVars } from "./use-css-var"

const RADII = [
    { label: "action-1", varName: "--radius-action-1" },
    { label: "action-2", varName: "--radius-action-2" },
    { label: "full", varName: "--radius-full" },
] as const

const RADIUS_VAR_NAMES = RADII.map((r) => r.varName)

export function RadiusSample() {
    const values = useCssVars(RADIUS_VAR_NAMES)

    return (
        <div className="flex flex-col gap-4">
            {RADII.map((r) => (
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
