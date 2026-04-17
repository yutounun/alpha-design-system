import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Root container. Radix sets `data-orientation` automatically based on the
 * `orientation` prop ("horizontal" | "vertical"), which child components use
 * for orientation-aware styling.
 */
function Tabs({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn(
                "flex gap-2",
                "data-[orientation=horizontal]:flex-col",
                "data-[orientation=vertical]:flex-row",
                className
            )}
            {...props}
        />
    )
}

const tabsListVariants = cva(
    [
        "group/tabs-list inline-flex shrink-0 items-center",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    ],
    {
        variants: {
            variant: {
                /**
                 * Segmented-control look: filled container, active tab lifts
                 * as a white card with subtle shadow.
                 */
                pills: ["rounded-lg bg-background-2 p-1"],
                /**
                 * Underline look: transparent container, active tab gets a
                 * 2 px primary-coloured bottom border.
                 */
                line: [
                    "gap-1 bg-transparent",
                    "data-[orientation=horizontal]:border-b data-[orientation=horizontal]:border-border-low",
                    "data-[orientation=vertical]:border-r data-[orientation=vertical]:border-border-low",
                ],
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
                "relative inline-flex items-center justify-center gap-1.5",
                // typography
                "text-sm font-medium whitespace-nowrap",
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
                "[&_svg:not([class*='size-'])]:size-4",

                // ── pills variant ─────────────────────────────────────────
                // sizing + radius
                "group-data-[variant=pills]/tabs-list:rounded-md",
                "group-data-[variant=pills]/tabs-list:px-3 group-data-[variant=pills]/tabs-list:py-1",
                // hover fill
                "group-data-[variant=pills]/tabs-list:hover:bg-fill-low",
                // active: lifted card
                "group-data-[variant=pills]/tabs-list:data-[state=active]:bg-background-1",
                "group-data-[variant=pills]/tabs-list:data-[state=active]:text-foreground-high",
                "group-data-[variant=pills]/tabs-list:data-[state=active]:shadow-sm",
                "group-data-[variant=pills]/tabs-list:data-[state=active]:border group-data-[variant=pills]/tabs-list:data-[state=active]:border-border-low",

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
                className
            )}
            {...props}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
