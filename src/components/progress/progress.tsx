import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Linear progress indicator. Pass `value` (0–`max`, default 100) for determinate state;
 * omit `value` or pass `null` for indeterminate.
 */
function Progress({
    className,
    value,
    ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
    const isDeterminate = typeof value === "number"

    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                "relative h-2 w-full overflow-hidden",
                "rounded-full bg-primary-muted",
                className
            )}
            value={value}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className={cn(
                    "bg-primary transition-all",
                    isDeterminate
                        ? "h-full w-full"
                        : "h-full w-1/3 animate-pulse"
                )}
                style={
                    isDeterminate
                        ? { transform: `translateX(-${100 - value}%)` }
                        : undefined
                }
            />
        </ProgressPrimitive.Root>
    )
}

export { Progress }
