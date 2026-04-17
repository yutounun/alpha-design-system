import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type TabsProps = Omit<
    React.ComponentProps<typeof TabsPrimitive.Root>,
    "orientation"
>

/** Root container. Horizontal tab layout only; `orientation` is not exposed. */
function Tabs({ className, ...props }: TabsProps) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            orientation="horizontal"
            className={cn("flex gap-2", "flex-col", className)}
            {...props}
        />
    )
}

const tabsListVariants = cva(
    ["group/tabs-list inline-flex w-fit shrink-0 items-center"],
    {
        variants: {
            variant: {
                /**
                 * Segmented-control look: filled container, active tab lifts
                 * as a white card with subtle shadow.
                 */
                pills: [
                    "rounded-lg border border-border-low bg-background-1 p-1",
                ],
                /**
                 * Underline look: transparent container, active tab gets a
                 * 2 px primary-coloured bottom border.
                 */
                line: ["gap-2 bg-transparent", "border-b border-border-low"],
            },
        },
        defaultVariants: {
            variant: "pills",
        },
    }
)

function TabsList({
    className,
    variant = "pills",
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            data-variant={variant}
            className={cn(tabsListVariants({ variant }), className)}
            {...props}
        />
    )
}

/**
 * Individual tab trigger. Reads the parent list's `data-variant` via the
 * named group `group/tabs-list` to apply variant-specific styles without
 * requiring an explicit variant prop on every trigger.
 */
function TabsTrigger({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                // layout
                "relative inline-flex items-center justify-center gap-2",
                // typography
                "font-heading text-md font-medium whitespace-nowrap",
                // interaction base
                "cursor-pointer transition-all outline-none select-none",
                // color — inactive
                "text-foreground-medium hover:text-foreground-high",
                // focus ring (ring only; no side-border to keep line variant clean)
                "focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-none",
                // disabled
                "disabled:pointer-events-none disabled:opacity-50",
                // icons
                "[&_svg]:pointer-events-none [&_svg]:shrink-0",
                "[&_svg:not([class*='size-'])]:size-4.5",

                // ── pills variant ─────────────────────────────────────────545
                // sizing + radius
                "group-data-[variant=pills]/tabs-list:rounded-md",
                "group-data-[variant=pills]/tabs-list:px-3 group-data-[variant=pills]/tabs-list:py-2",
                // hover fill
                "group-data-[variant=pills]/tabs-list:hover:bg-fill-low",
                // active: lifted card
                "group-data-[variant=pills]/tabs-list:data-[state=active]:bg-background-1",
                "group-data-[variant=pills]/tabs-list:data-[state=active]:text-accent-foreground",
                "group-data-[variant=pills]/tabs-list:data-[state=active]:shadow-sm",
                "group-data-[variant=pills]/tabs-list:data-[state=active]:bg-accent",

                // ── line variant ──────────────────────────────────────────
                // sizing — horizontal: pad below for the 2 px indicator
                "group-data-[variant=line]/tabs-list:px-1 group-data-[variant=line]/tabs-list:pb-2",
                // persistent bottom border so layout is stable (transparent → primary)
                "group-data-[variant=line]/tabs-list:border-b-2",
                "group-data-[variant=line]/tabs-list:border-transparent",
                // overlap the list's 1 px border to prevent double line
                "group-data-[variant=line]/tabs-list:-mb-px",
                // active: highlight
                "group-data-[variant=line]/tabs-list:data-[state=active]:border-primary",
                "group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground-high",

                className
            )}
            {...props}
        />
    )
}

/**
 * Content panel associated with a trigger. Takes up remaining space and
 * inherits text styling from the root.
 */
function TabsContent({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn(
                "flex-1 outline-none",
                "text-sm text-foreground-high",
                "focus-visible:ring-3 focus-visible:ring-focus-ring",
                "pt-2",
                className
            )}
            {...props}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
