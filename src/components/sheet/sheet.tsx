import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Sheet({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="sheet-overlay"
            className={cn("fixed inset-0 z-50", "bg-surface-deep", className)}
            {...props}
        />
    )
}

const sheetContentVariants = cva(
    [
        "fixed z-50 flex flex-col gap-4",
        "border-border-low bg-background-1 shadow-lg",
        "transition-transform duration-200 ease-out",
    ],
    {
        variants: {
            side: {
                top: [
                    "inset-x-0 top-0 border-b",
                    "rounded-b-xl",
                    "data-[state=closed]:-translate-y-full",
                ],
                bottom: [
                    "inset-x-0 bottom-0 border-t",
                    "rounded-t-xl",
                    "data-[state=closed]:translate-y-full",
                ],
                left: [
                    "inset-y-0 left-0 h-full w-3/4 border-r",
                    "sm:max-w-sm",
                    "data-[state=closed]:-translate-x-full",
                ],
                right: [
                    "inset-y-0 right-0 h-full w-3/4 border-l",
                    "sm:max-w-sm",
                    "data-[state=closed]:translate-x-full",
                ],
            },
        },
        defaultVariants: {
            side: "right",
        },
    }
)

function SheetContent({
    side = "right",
    className,
    children,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
    VariantProps<typeof sheetContentVariants>) {
    return (
        <SheetPortal>
            <SheetOverlay />
            <DialogPrimitive.Content
                data-slot="sheet-content"
                className={cn(sheetContentVariants({ side }), className)}
                {...props}
            >
                {children}
                <DialogPrimitive.Close
                    data-slot="sheet-close-button"
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
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </SheetPortal>
    )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-header"
            className={cn(
                "flex flex-col gap-1.5",
                "text-center sm:text-left",
                className
            )}
            {...props}
        />
    )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sheet-footer"
            className={cn(
                "flex flex-col-reverse gap-2",
                "sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    )
}

function SheetTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="sheet-title"
            className={cn(
                "font-heading text-lg font-semibold",
                "text-foreground-high",
                className
            )}
            {...props}
        />
    )
}

function SheetDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="sheet-description"
            className={cn("text-sm text-foreground-medium", className)}
            {...props}
        />
    )
}

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    sheetContentVariants,
}
