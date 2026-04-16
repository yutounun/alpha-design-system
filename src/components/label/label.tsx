import * as React from "react"
import { Label as RadixLabel } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Accessible label built on Radix `Label.Root`. Pairs with inputs via `htmlFor` / `id`.
 * When `aria-invalid` is set (for example from a surrounding field error), text uses
 * danger color for emphasis.
 */
function Label({
    className,
    ...props
}: React.ComponentProps<typeof RadixLabel.Root>) {
    return (
        <RadixLabel.Root
            data-slot="label"
            className={cn(
                "text-sm font-medium text-foreground-high",
                "leading-none select-none",
                "aria-invalid:text-danger-text",
                className
            )}
            {...props}
        />
    )
}

export { Label }
