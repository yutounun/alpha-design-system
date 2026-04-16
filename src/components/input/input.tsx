import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
    [
        "flex w-full min-w-0 rounded-md border bg-background-1",
        "text-foreground-high transition-colors",
        "placeholder:text-foreground-low",
        "border-border-low",
        "focus-ring-input focus-ring-input-invalid-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-border-invalid",
        "aria-invalid:ring-3 aria-invalid:ring-invalid-ring",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium file:text-foreground-high",
    ],
    {
        variants: {
            size: {
                sm: "h-8 px-2.5 py-1.5 text-sm",
                md: "h-9 px-3 py-2 text-md",
                lg: "h-10 px-3 py-2.5 text-lg",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

/**
 * Single-line text input with size variants and invalid / disabled states aligned to design tokens.
 * Use `aria-invalid` for validation styling (for example from `FormField` or your form library).
 */
function Input({
    className,
    type = "text",
    size = "md",
    ...props
}: Omit<React.ComponentProps<"input">, "size"> &
    VariantProps<typeof inputVariants>) {
    return (
        <input
            data-slot="input"
            type={type}
            className={cn(inputVariants({ size }), className)}
            {...props}
        />
    )
}

export { Input, inputVariants }
