import type { Meta, StoryObj } from "@storybook/react-vite"
import {
    Building2,
    Calendar,
    ChevronsUpDown,
    Home,
    Inbox,
    Info,
    Layers,
    LogOut,
    Search,
    Settings,
    User,
} from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { Button } from "@/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from "./sidebar"

const meta = {
    title: "Components/Sidebar",
    component: SidebarProvider,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SidebarProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        aria-label="Open organization menu"
                                        className="data-[state=open]:bg-fill-low"
                                    >
                                        <Avatar className="size-8 rounded-md">
                                            <AvatarImage src="" alt="" />
                                            <AvatarFallback className="rounded-md text-xs">
                                                AD
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                Alpha Design
                                            </span>
                                            <span className="truncate text-xs text-foreground-medium">
                                                Sandbox
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4 text-foreground-low" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-72"
                                    align="start"
                                    side="right"
                                    sideOffset={8}
                                >
                                    <div className="flex flex-col items-center gap-2 px-2 py-3">
                                        <Avatar className="size-12 rounded-md">
                                            <AvatarImage src="" alt="" />
                                            <AvatarFallback className="rounded-md">
                                                SI
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-foreground-high">
                                                Example Inc
                                            </p>
                                            <p className="text-xs text-foreground-medium">
                                                Example Inc
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Exit sandbox
                                        </Button>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Settings />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <Layers />
                                            Switch sandbox
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                Sandbox A
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Sandbox B
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Sandbox C
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <Building2 />
                                            Other accounts
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                Acme Corp
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Beta LLC
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User />
                                        Yuto Ichihara
                                        <Info className="ml-auto size-4" />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem variant="destructive">
                                        <LogOut />
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Platform</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip="Home">
                                        <Home />
                                        <span>Home</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip="Inbox">
                                        <Inbox />
                                        <span>Inbox</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip="Calendar">
                                        <Calendar />
                                        <span>Calendar</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip="Search">
                                        <Search />
                                        <span>Search</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border-low px-4">
                    <SidebarTrigger />
                    <span className="font-heading text-md font-medium">
                        Dashboard
                    </span>
                </header>
                <div className="p-6">
                    <p className="text-sm text-foreground-medium">
                        Main content area.
                    </p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
}

export const Collapsible: Story = {
    render: () => (
        <SidebarProvider defaultOpen>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <span className="px-2 text-xs font-medium text-foreground-low">
                        Brand
                    </span>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip="Home">
                                        <Home />
                                        <span>Home</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b border-border-low px-4">
                    <SidebarTrigger />
                </header>
            </SidebarInset>
        </SidebarProvider>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)

        await step("Sidebar starts expanded", async () => {
            const sidebar = canvasElement.querySelector(
                '[data-slot="sidebar"]:not([data-mobile])'
            )
            await expect(sidebar).toHaveAttribute("data-state", "expanded")
        })

        await step("Trigger collapses sidebar", async () => {
            await userEvent.click(
                canvas.getByRole("button", { name: "Toggle sidebar" })
            )
            const sidebar = canvasElement.querySelector(
                '[data-slot="sidebar"]:not([data-mobile])'
            )
            await expect(sidebar).toHaveAttribute("data-state", "collapsed")
        })
    },
}

export const WithSubmenu: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Projects</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Home />
                                        <span>Overview</span>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                href="#"
                                                data-active
                                            >
                                                Reports
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton href="#">
                                                Metrics
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <div className="p-4">
                    <p className="text-sm text-foreground-medium">
                        Nested items use SidebarMenuSub.
                    </p>
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
}

export const Loading: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Loading</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuSkeleton showIcon />
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuSkeleton showIcon />
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuSkeleton />
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <div className="p-4 text-sm text-foreground-medium">
                    Skeleton rows
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
}

export const SandboxSwitcher: Story = {
    render: () => (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <Home />
                                        <span>Home</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="border border-border-low bg-background-1 data-[state=open]:bg-fill-low"
                                        aria-label="Open organization and account menu"
                                    >
                                        <Avatar className="size-8 rounded-md">
                                            <AvatarImage src="" alt="" />
                                            <AvatarFallback className="rounded-md text-xs">
                                                SI
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                Example Inc
                                            </span>
                                            <span className="truncate text-xs text-foreground-medium">
                                                SOZO Intuition Systems…
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4 text-foreground-low" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-72"
                                    align="start"
                                    side="top"
                                    sideOffset={8}
                                >
                                    <div className="flex flex-col items-center gap-2 px-2 py-3">
                                        <Avatar className="size-12 rounded-md">
                                            <AvatarImage src="" alt="" />
                                            <AvatarFallback className="rounded-md">
                                                SI
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-foreground-high">
                                                Example Inc
                                            </p>
                                            <p className="text-xs text-foreground-medium">
                                                Example Inc
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Exit sandbox
                                        </Button>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Settings />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <Layers />
                                            Switch sandbox
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                Sandbox A
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Sandbox B
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Sandbox C
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <Building2 />
                                            Other accounts
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                Acme Corp
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Beta LLC
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User />
                                        Yuto Ichihara
                                        <Info className="ml-auto size-4" />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem variant="destructive">
                                        <LogOut />
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="p-6 text-sm text-foreground-medium">
                    Footer opens organization / sandbox switcher (dropdown,
                    portal).
                </div>
            </SidebarInset>
        </SidebarProvider>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const doc = within(document.body)

        await step("Opens menu from footer trigger", async () => {
            await userEvent.click(
                canvas.getByRole("button", {
                    name: "Open organization and account menu",
                })
            )
            await expect(
                doc.getByRole("menuitem", { name: /Settings/i })
            ).toBeInTheDocument()
            await expect(
                doc.getByRole("button", { name: /Exit sandbox/i })
            ).toBeInTheDocument()
            await expect(
                doc.getByRole("menuitem", { name: /Sign out/i })
            ).toBeInTheDocument()
        })

        await step("Switch sandbox submenu shows options", async () => {
            const subTrigger = doc.getByRole("menuitem", {
                name: /Switch sandbox/i,
            })
            await userEvent.hover(subTrigger)
            await expect(
                await doc.findByRole("menuitem", { name: "Sandbox A" })
            ).toBeInTheDocument()
        })
    },
}
