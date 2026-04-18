import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Root surface for grouped content: border, radius, and vertical rhythm.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "flex flex-col gap-4 rounded-xl border border-border-low",
                "bg-card-1 py-6 text-foreground-high",
                "min-h-40",
                className
            )}
            {...props}
        />
    )
}

/**
 * Top section with optional title, description, and trailing action in a grid.
 * When `CardAction` is present, the header becomes two columns automatically.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "@container/card-header grid auto-rows-min",
                "grid-rows-[auto_auto] items-start gap-1.5 px-6",
                "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
                "[.border-b]:pb-6",
                className
            )}
            {...props}
        />
    )
}

/** Primary heading line for the card. */
function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
    return (
        <h3
            data-slot="card-title"
            className={cn("text-lg leading-none font-semibold", className)}
            {...props}
        />
    )
}

/** Supporting text below the title. */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-sm text-foreground-medium", className)}
            {...props}
        />
    )
}

/** Trailing control in the header (e.g. menu or icon button). */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1",
                "self-start justify-self-end",
                className
            )}
            {...props}
        />
    )
}

/** Main body; horizontal padding matches header/footer. */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6", className)}
            {...props}
        />
    )
}

/** Bottom actions or metadata row. */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center gap-2 px-6", className)}
            {...props}
        />
    )
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
}
