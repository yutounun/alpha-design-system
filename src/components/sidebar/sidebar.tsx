import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Separator } from "@/components/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/sheet"
import { Skeleton } from "@/components/skeleton"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextValue = {
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    isMobile: boolean
    toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.")
    }
    return context
}

function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
}) {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open

    const setOpen = React.useCallback(
        (value: boolean | ((v: boolean) => boolean)) => {
            const openState = typeof value === "function" ? value(open) : value
            if (setOpenProp) {
                setOpenProp(openState)
            } else {
                _setOpen(openState)
            }
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        },
        [setOpenProp, open]
    )

    const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o)
    }, [isMobile, setOpen, setOpenMobile])

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault()
                toggleSidebar()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContextValue>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        ]
    )

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    data-slot="sidebar-provider"
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style,
                        } as React.CSSProperties
                    }
                    className={cn(
                        "group/sidebar-wrapper flex min-h-svh w-full",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    )
}

function Sidebar({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
}) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
        return (
            <div
                data-slot="sidebar"
                className={cn(
                    "flex h-full w-(--sidebar-width) flex-col",
                    "bg-background-2 text-foreground-high",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-slot="sidebar"
                    data-mobile="true"
                    data-side={side}
                    side={side}
                    className={cn(
                        "w-(--sidebar-width) bg-background-2 p-0",
                        "text-foreground-high",
                        "[&>button[data-slot=sheet-close-button]]:hidden"
                    )}
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                        } as React.CSSProperties
                    }
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription>
                            Displays the mobile navigation sidebar.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex h-full w-full flex-col">
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    const dataCollapsible = state === "collapsed" ? collapsible : undefined

    return (
        <div
            data-slot="sidebar"
            data-state={state}
            data-collapsible={dataCollapsible}
            data-side={side}
            data-variant={variant}
            className={cn(
                "group peer hidden text-foreground-high md:block",
                className
            )}
            {...props}
        >
            <div
                data-slot="sidebar-gap"
                className={cn(
                    "relative h-svh w-(--sidebar-width) bg-transparent",
                    "transition-[width] duration-200 ease-linear",
                    "group-data-[state=collapsed]:group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                    "group-data-[state=collapsed]:group-data-[collapsible=offcanvas]:w-0"
                )}
            />
            <div
                data-slot="sidebar-container"
                className={cn(
                    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width)",
                    "transition-[transform,width] duration-200 ease-linear md:flex",
                    "border-border-low bg-background-2",
                    side === "left" ? "left-0 border-r" : "right-0 border-l",
                    "group-data-[state=collapsed]:group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                    side === "left" &&
                        "group-data-[state=collapsed]:group-data-[collapsible=offcanvas]:-translate-x-full",
                    side === "right" &&
                        "group-data-[state=collapsed]:group-data-[collapsible=offcanvas]:translate-x-full"
                )}
            >
                <div
                    data-sidebar="sidebar"
                    className={cn(
                        "flex h-full w-full flex-col",
                        variant === "floating" &&
                            "m-2 rounded-xl border border-border-low shadow-sm",
                        variant === "inset" &&
                            "m-2 rounded-xl border border-border-low"
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

function SidebarTrigger({
    className,
    onClick,
    ...props
}: React.ComponentProps<typeof Button>) {
    const { toggleSidebar } = useSidebar()

    return (
        <Button
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon-md"
            className={cn("size-8", className)}
            onClick={(event) => {
                onClick?.(event)
                toggleSidebar()
            }}
            {...props}
        >
            <PanelLeftIcon />
            <span className="sr-only">Toggle sidebar</span>
        </Button>
    )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
    const { toggleSidebar } = useSidebar()

    return (
        <button
            data-slot="sidebar-rail"
            type="button"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
            onClick={toggleSidebar}
            className={cn(
                "absolute inset-y-0 z-20 hidden w-4",
                "-translate-x-1/2 transition-all ease-linear",
                "after:absolute after:inset-y-0 after:inset-s-1/2 after:w-0.5",
                "after:-translate-x-1/2 hover:after:bg-border-medium",
                "group-data-[side=left]:-right-4 group-data-[side=left]:cursor-w-resize",
                "group-data-[side=right]:left-0 group-data-[side=right]:cursor-e-resize",
                "md:block",
                className
            )}
            {...props}
        />
    )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
    return (
        <main
            data-slot="sidebar-inset"
            className={cn(
                "relative flex min-h-svh flex-1 flex-col bg-background-1",
                className
            )}
            {...props}
        />
    )
}

function SidebarInput({
    className,
    ...props
}: React.ComponentProps<typeof Input>) {
    return (
        <Input
            data-slot="sidebar-input"
            className={cn("h-8 w-full bg-background-1 shadow-none", className)}
            {...props}
        />
    )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-header"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-footer"
            className={cn("mt-auto flex flex-col gap-2 p-2", className)}
            {...props}
        />
    )
}

function SidebarSeparator({
    className,
    ...props
}: React.ComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="sidebar-separator"
            className={cn("mx-2 w-auto bg-border-low", className)}
            {...props}
        />
    )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-content"
            className={cn(
                "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
                "group-data-[collapsible=icon]:overflow-hidden",
                className
            )}
            {...props}
        />
    )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-group"
            className={cn(
                "relative flex w-full min-w-0 flex-col p-2",
                className
            )}
            {...props}
        />
    )
}

function SidebarGroupLabel({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
    const Comp = asChild ? Slot.Root : "div"

    return (
        <Comp
            data-slot="sidebar-group-label"
            className={cn(
                "flex h-8 shrink-0 items-center rounded-md px-2",
                "text-xs font-medium tracking-wide text-foreground-low",
                "uppercase outline-none",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                className
            )}
            {...props}
        />
    )
}

function SidebarGroupAction({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
    const Comp = asChild ? Slot.Root : "button"

    return (
        <Comp
            data-slot="sidebar-group-action"
            className={cn(
                "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center",
                "rounded-md p-0 outline-none",
                "text-foreground-medium",
                "hover:bg-fill-low hover:text-foreground-high",
                "focus-visible:ring-3 focus-visible:ring-focus-ring",
                "after:absolute after:-inset-2 md:after:hidden",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    )
}

function SidebarGroupContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-group-content"
            className={cn("w-full text-sm", className)}
            {...props}
        />
    )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="sidebar-menu"
            className={cn("flex w-full min-w-0 flex-col gap-1", className)}
            {...props}
        />
    )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
    return (
        <li
            data-slot="sidebar-menu-item"
            className={cn("group/menu-item relative", className)}
            {...props}
        />
    )
}

const sidebarMenuButtonVariants = cva(
    [
        "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md",
        "p-2 text-left text-sm ring-transparent outline-none",
        "transition-[width,height,padding]",
        "focus-visible:ring-3 focus-visible:ring-focus-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
        "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
    ],
    {
        variants: {
            variant: {
                default: [
                    "text-foreground-high",
                    "hover:bg-fill-low hover:text-foreground-high",
                    "data-[active=true]:bg-fill-medium",
                    "data-[active=true]:font-medium",
                ],
                outline: [
                    "border border-border-low bg-background-1 shadow-sm",
                    "hover:bg-fill-low hover:text-foreground-high",
                ],
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function SidebarMenuButton({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
    const Comp = asChild ? Slot.Root : "button"
    const { isMobile, state } = useSidebar()

    const button = (
        <Comp
            data-slot="sidebar-menu-button"
            data-active={isActive}
            data-size={size}
            className={cn(
                sidebarMenuButtonVariants({ variant, size }),
                className
            )}
            {...props}
        />
    )

    if (!tooltip) {
        return button
    }

    let tooltipProps: React.ComponentProps<typeof TooltipContent>
    if (typeof tooltip === "string") {
        tooltipProps = { children: tooltip }
    } else {
        tooltipProps = tooltip
    }

    if (isMobile || state !== "collapsed") {
        return button
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right" align="center" {...tooltipProps} />
        </Tooltip>
    )
}

function SidebarMenuAction({
    className,
    asChild = false,
    showOnHover = false,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
}) {
    const Comp = asChild ? Slot.Root : "button"

    return (
        <Comp
            data-slot="sidebar-menu-action"
            className={cn(
                "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center",
                "rounded-md p-0 outline-none",
                "text-foreground-medium",
                "hover:bg-fill-low hover:text-foreground-high",
                "focus-visible:ring-3 focus-visible:ring-focus-ring",
                "peer-data-[size=default]/menu-button:top-1.5",
                "peer-data-[size=lg]/menu-button:top-2.5",
                "peer-data-[size=sm]/menu-button:top-1",
                showOnHover &&
                    "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
                className
            )}
            {...props}
        />
    )
}

function SidebarMenuBadge({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="sidebar-menu-badge"
            className={cn(
                "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center select-none",
                "rounded-md px-1 text-xs font-medium tabular-nums",
                "text-foreground-medium",
                "peer-hover/menu-button:text-foreground-high",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    )
}

function SidebarMenuSkeleton({
    className,
    showIcon = false,
    ...props
}: React.ComponentProps<"div"> & {
    showIcon?: boolean
}) {
    const [width] = React.useState(
        () => `${Math.floor(Math.random() * 40) + 50}%`
    )

    return (
        <div
            data-slot="sidebar-menu-skeleton"
            className={cn(
                "flex h-8 items-center gap-2 rounded-md px-2",
                className
            )}
            {...props}
        >
            {showIcon ? <Skeleton className="size-4 rounded-md" /> : null}
            <Skeleton className="h-4 flex-1" style={{ width }} />
        </div>
    )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="sidebar-menu-sub"
            className={cn(
                "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1",
                "border-l border-border-low px-2.5 py-0.5",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    )
}

function SidebarMenuSubItem({
    className,
    ...props
}: React.ComponentProps<"li">) {
    return (
        <li
            data-slot="sidebar-menu-sub-item"
            className={cn("group/menu-sub-item relative", className)}
            {...props}
        />
    )
}

function SidebarMenuSubButton({
    asChild = false,
    size = "md",
    isActive = false,
    className,
    ...props
}: React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
}) {
    const Comp = asChild ? Slot.Root : "a"

    return (
        <Comp
            data-slot="sidebar-menu-sub-button"
            data-active={isActive}
            data-size={size}
            className={cn(
                "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2",
                "text-foreground-medium outline-none",
                "focus-visible:ring-3 focus-visible:ring-focus-ring",
                "data-[active=true]:bg-fill-medium data-[active=true]:text-foreground-high",
                "hover:bg-fill-low hover:text-foreground-high",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                className
            )}
            {...props}
        />
    )
}

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    sidebarMenuButtonVariants,
    useSidebar,
}
