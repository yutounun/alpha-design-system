import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Placeholder block for loading layouts. Animate with `animate-pulse` by default.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn("rounded-md bg-skeleton", "animate-pulse", className)}
            {...props}
        />
    )
}

export { Skeleton }
