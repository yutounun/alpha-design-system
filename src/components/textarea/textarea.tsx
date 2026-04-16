import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
    [
        "flex field-sizing-content min-h-20 w-full rounded-md border",
        "bg-background-1 px-3 py-2 text-foreground-high",
        "transition-colors",
        "placeholder:text-foreground-low",
        "border-border-low",
        "focus-ring-input focus-ring-input-invalid-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-border-invalid",
        "aria-invalid:ring-3 aria-invalid:ring-invalid-ring",
        "resize-y",
    ],
    {
        variants: {
            size: {
                sm: "min-h-16 text-sm",
                md: "min-h-20 text-md",
                lg: "min-h-24 text-lg",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

/**
 * Multi-line text control with the same validation and focus treatment as Input.
 */
function Textarea({
    className,
    size = "md",
    ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(textareaVariants({ size }), className)}
            {...props}
        />
    )
}

export { Textarea, textareaVariants }
