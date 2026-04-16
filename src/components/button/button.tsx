import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    [
        "group/button inline-flex shrink-0 items-center justify-center",
        "rounded-lg border border-transparent",
        "text-sm font-medium whitespace-nowrap",
        "transition-all outline-none select-none",
        "focus-visible:border-focus focus-visible:ring-3 focus-visible:ring-focus-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-border-invalid aria-invalid:ring-3 aria-invalid:ring-invalid-ring",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "cursor-pointer",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground hover:bg-primary-hover",
                outline: [
                    "border-border-low bg-background-1 hover:bg-fill-low hover:text-foreground-high",
                    "aria-expanded:bg-fill-low aria-expanded:text-foreground-high",
                ],
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
                ghost: "hover:bg-fill-low hover:text-foreground-high",
                destructive: [
                    "border-border-danger bg-danger-muted text-danger hover:border-border-danger-hover hover:bg-fill-danger-hover",
                    "focus-visible:border-border-danger-focus focus-visible:ring-danger-ring",
                ],
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                xs: [
                    "gap-1 px-2 py-1.5 text-xs in-data-[slot=button-group]:rounded-lg",
                    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
                ],
                sm: [
                    "gap-1 px-2.5 py-1.5 text-sm in-data-[slot=button-group]:rounded-lg",
                    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                ],
                md: "gap-1.5 px-4 py-2 text-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                lg: "gap-1.5 px-3 py-3 text-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                "icon-xs":
                    "size-6 rounded-action-1 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                "icon-sm":
                    "size-7 rounded-action-2 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-4",
                "icon-md": "size-8 [&_svg:not([class*='size-'])]:size-4",
                "icon-lg": "size-9 [&_svg:not([class*='size-'])]:size-5",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

function Button({
    className,
    variant = "primary",
    size = "md",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot.Root : "button"

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
