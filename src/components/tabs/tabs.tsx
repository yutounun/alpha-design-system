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
    ["group/tabs-list relative inline-flex w-fit shrink-0 items-center"],
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

type TabsIndicatorRect = {
    x: number
    y: number
    w: number
    h: number
}

function TabsList({
    className,
    variant = "pills",
    ref,
    children,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>) {
    const listRef = React.useRef<React.ComponentRef<
        typeof TabsPrimitive.List
    > | null>(null)
    const [indicator, setIndicator] = React.useState<TabsIndicatorRect | null>(
        null
    )
    const [ready, setReady] = React.useState(false)

    const setRefs = React.useCallback(
        (node: React.ComponentRef<typeof TabsPrimitive.List> | null) => {
            listRef.current = node
            if (typeof ref === "function") {
                ref(node)
            } else if (ref) {
                ;(ref as React.MutableRefObject<typeof node>).current = node
            }
        },
        [ref]
    )

    React.useLayoutEffect(() => {
        const list = listRef.current
        if (!list) return

        let rafId = 0

        const measure = () => {
            const active = list.querySelector(
                '[role="tab"][data-state="active"]'
            ) as HTMLElement | null
            if (!active) {
                setIndicator(null)
                return
            }
            setIndicator({
                x: active.offsetLeft,
                y: active.offsetTop,
                w: active.offsetWidth,
                h: active.offsetHeight,
            })
            requestAnimationFrame(() => {
                setReady(true)
            })
        }

        const scheduleMeasure = () => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(measure)
        }

        const ro = new ResizeObserver(scheduleMeasure)
        ro.observe(list)

        const observeAllTabs = () => {
            list.querySelectorAll('[role="tab"]').forEach((el) => {
                ro.observe(el)
            })
        }

        const moActive = new MutationObserver(scheduleMeasure)
        moActive.observe(list, {
            subtree: true,
            attributeFilter: ["data-state"],
        })

        const moTree = new MutationObserver(() => {
            observeAllTabs()
            scheduleMeasure()
        })
        moTree.observe(list, { childList: true, subtree: true })

        observeAllTabs()
        scheduleMeasure()

        return () => {
            cancelAnimationFrame(rafId)
            moActive.disconnect()
            moTree.disconnect()
            ro.disconnect()
        }
    }, [variant])

    return (
        <TabsPrimitive.List
            ref={setRefs}
            data-slot="tabs-list"
            data-variant={variant}
            className={cn(tabsListVariants({ variant }), className)}
            {...props}
        >
            {indicator ? (
                <span
                    aria-hidden
                    data-slot="tabs-indicator"
                    data-variant={variant}
                    className={cn(
                        "pointer-events-none absolute left-0 z-0",
                        ready &&
                            "transition-[transform,width,height] duration-200 ease-out motion-reduce:transition-none",
                        "data-[variant=pills]:top-0 data-[variant=pills]:rounded-md data-[variant=pills]:bg-accent data-[variant=pills]:shadow-sm",
                        "data-[variant=line]:top-auto data-[variant=line]:-bottom-px data-[variant=line]:h-0.5 data-[variant=line]:bg-primary"
                    )}
                    style={
                        variant === "line"
                            ? {
                                  transform: `translateX(${indicator.x}px)`,
                                  width: indicator.w,
                              }
                            : {
                                  transform: `translate(${indicator.x}px, ${indicator.y}px)`,
                                  width: indicator.w,
                                  height: indicator.h,
                              }
                    }
                />
            ) : null}
            {children}
        </TabsPrimitive.List>
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
                // layout (z above sliding indicator)
                "relative z-10 inline-flex items-center justify-center gap-2",
                // typography
                "font-heading text-md font-medium whitespace-nowrap",
                // interaction base — avoid transitioning background (pills hover fill)
                // so the sliding indicator does not appear after a grey cross-fade.
                "cursor-pointer transition-[color] outline-none select-none",
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
                // hover fill only when inactive so :hover on the active tab does not
                // paint grey over the accent indicator.
                "group-data-[variant=pills]/tabs-list:data-[state=inactive]:hover:bg-fill-low",
                // active: text colour (fill is the sliding indicator)
                "group-data-[variant=pills]/tabs-list:data-[state=active]:text-accent-foreground",

                // ── line variant ──────────────────────────────────────────
                // sizing — horizontal: pad below for the 2 px indicator
                "group-data-[variant=line]/tabs-list:px-1 group-data-[variant=line]/tabs-list:pb-2",
                // persistent bottom border so layout is stable (transparent → primary)
                "group-data-[variant=line]/tabs-list:border-b-2",
                "group-data-[variant=line]/tabs-list:border-transparent",
                // overlap the list's 1 px border to prevent double line
                "group-data-[variant=line]/tabs-list:-mb-px",
                // active: text colour (underline is the sliding indicator)
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
