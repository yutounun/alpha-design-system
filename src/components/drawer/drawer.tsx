import * as React from "react"
import { XIcon } from "lucide-react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

export type DrawerProps = Omit<
    React.ComponentProps<typeof DrawerPrimitive.Root>,
    "direction"
> & {
    /** Side panels use `Sheet` instead; only vertical sheet edges are supported here. */
    direction?: "top" | "bottom"
}

function Drawer(props: DrawerProps) {
    return (
        <DrawerPrimitive.Root
            data-slot="drawer"
            {...(props as React.ComponentProps<typeof DrawerPrimitive.Root>)}
        />
    )
}

function DrawerTrigger({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
    return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
    return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
    return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
    return (
        <DrawerPrimitive.Overlay
            data-slot="drawer-overlay"
            className={cn("fixed inset-0 z-50", "bg-overlay-scrim", className)}
            {...props}
        />
    )
}

function DrawerHandle({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Handle>) {
    return (
        <DrawerPrimitive.Handle
            data-slot="drawer-handle"
            className={className}
            {...props}
        />
    )
}

function DrawerContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
    return (
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerPrimitive.Content
                data-slot="drawer-content"
                className={cn(
                    "group/drawer-content fixed z-50 flex h-auto flex-col",
                    "min-h-60 px-4",
                    "bg-background-1 shadow-lg",
                    "data-[vaul-drawer-direction=top]:inset-x-0",
                    "data-[vaul-drawer-direction=top]:top-0",
                    "data-[vaul-drawer-direction=top]:mb-24",
                    "data-[vaul-drawer-direction=top]:rounded-b-xl",
                    "data-[vaul-drawer-direction=top]:border-b",
                    "data-[vaul-drawer-direction=top]:border-border-low",
                    "data-[vaul-drawer-direction=bottom]:inset-x-0",
                    "data-[vaul-drawer-direction=bottom]:bottom-0",
                    "data-[vaul-drawer-direction=bottom]:mt-24",
                    "data-[vaul-drawer-direction=bottom]:rounded-t-xl",
                    "data-[vaul-drawer-direction=bottom]:border-t",
                    "data-[vaul-drawer-direction=bottom]:border-border-low",
                    "outline-none focus-visible:ring-3",
                    "focus-visible:ring-focus-ring",
                    className
                )}
                {...props}
            >
                <DrawerHandle
                    className={cn(
                        "mx-auto my-4 hidden h-1 w-16 shrink-0",
                        "rounded-full bg-border-medium",
                        "group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
                    )}
                />
                {children}
                <DrawerPrimitive.Close
                    data-slot="drawer-close-button"
                    className={cn(
                        "absolute top-4 right-4 rounded-md",
                        "opacity-70 transition-opacity",
                        "hover:opacity-100",
                        "focus:outline-none",
                        "focus-visible:ring-3 focus-visible:ring-focus-ring",
                        "disabled:pointer-events-none"
                    )}
                >
                    <XIcon className="size-4 text-foreground-high" />
                    <span className="sr-only">Close</span>
                </DrawerPrimitive.Close>
            </DrawerPrimitive.Content>
        </DrawerPortal>
    )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="drawer-header"
            className={cn(
                "flex flex-col gap-1.5",
                "text-center sm:text-left",
                className
            )}
            {...props}
        />
    )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="drawer-footer"
            className={cn(
                "flex flex-col-reverse gap-2",
                "sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    )
}

function DrawerTitle({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
    return (
        <DrawerPrimitive.Title
            data-slot="drawer-title"
            className={cn(
                "font-heading text-lg font-semibold",
                "text-foreground-high",
                className
            )}
            {...props}
        />
    )
}

function DrawerDescription({
    className,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
    return (
        <DrawerPrimitive.Description
            data-slot="drawer-description"
            className={cn("text-sm text-foreground-medium", className)}
            {...props}
        />
    )
}

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerHandle,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
