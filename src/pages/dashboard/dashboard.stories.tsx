import { useEffect, useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
    Banknote,
    Bell,
    Building2,
    ChevronRight,
    ChevronsUpDown,
    CreditCard,
    FileText,
    HelpCircle,
    Home,
    Info,
    Layers,
    LogOut,
    Maximize2,
    Package,
    Plus,
    Radar as RadarIcon,
    Receipt,
    Search,
    Settings,
    SquareTerminal,
    User,
    Users,
    Wallet,
    X,
} from "lucide-react"
import { createPortal } from "react-dom"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LineChart,
    Line as RechartsLine,
    XAxis,
    YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import { Button } from "@/components/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/chart"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/drawer"
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
import { Progress } from "@/components/progress"
import {
    SearchComboboxEmpty,
    SearchComboboxFooter,
    SearchComboboxGroup,
    SearchComboboxInput,
    SearchComboboxItem,
    SearchComboboxList,
    SearchComboboxRoot,
    SearchComboboxSeparator,
} from "@/components/search-combobox"
import { Separator } from "@/components/separator"
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
    SidebarProvider,
    SidebarTrigger,
} from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip"

const meta = {
    title: "Pages/Dashboard",
    parameters: { layout: "fullscreen" },
    /** No generated Docs tab for this showcase-only story. */
    tags: ["!autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const DATE_AXIS = [
    "Apr 11",
    "Apr 12",
    "Apr 13",
    "Apr 14",
    "Apr 15",
    "Apr 16",
    "Apr 17",
] as const

const lineCompareConfig = {
    current: {
        label: "Current period",
        color: "var(--color-chart-1)",
    },
    previous: {
        label: "Previous period",
        color: "var(--color-border-medium)",
    },
} satisfies ChartConfig

const todaySparkline = DATE_AXIS.map((date, i) => ({
    date,
    current: 40 + i * 12 + (i > 4 ? 80 : 0),
    previous: 30 + i * 8,
}))

const grossVolumeSeries = DATE_AXIS.map((date, i) => ({
    date,
    current: 980 + Math.sin(i * 1.1) * 180 + i * 45,
    previous: 920 + Math.cos(i * 0.9) * 140 + i * 38,
}))

const mrrSeries = DATE_AXIS.map((date, i) => ({
    date,
    current: 1980 + i * 16 + (i > 4 ? 48 : 0),
    previous: 1920 + i * 9,
}))

const netVolumeSeries = DATE_AXIS.map((date, i) => ({
    date,
    current: 820 + Math.sin(i * 1.25) * 220 + i * 55,
    previous: 780 + Math.cos(i * 0.85) * 190 + i * 42,
}))

const newCustomersSeries = DATE_AXIS.map((date, i) => ({
    date,
    current: 3 + (i % 4) + (i > 3 ? 2 : 0),
    previous: 2 + (i % 3),
}))

const subscribersSparkline = DATE_AXIS.map((date, i) => ({
    date,
    current: 34 + Math.floor(i / 2),
    previous: 32 + Math.floor(i / 3),
}))

const barDailyDelta = DATE_AXIS.map((date, i) => ({
    date,
    delta: [8, -12, 22, 5, 38, -15, 28][i] ?? 0,
}))

const barConfig = {
    delta: { label: "Daily delta", color: "var(--color-chart-1)" },
} satisfies ChartConfig

type MiniLineChartProps = {
    data: Array<Record<string, string | number>>
    className?: string
    heightClass?: string
}

function MiniLineChart({
    data,
    className,
    heightClass = "h-28",
}: MiniLineChartProps) {
    return (
        <ChartContainer
            config={lineCompareConfig}
            className={cn("aspect-auto w-full", heightClass, className)}
        >
            <LineChart
                accessibilityLayer
                data={data}
                margin={{ left: 4, right: 8, top: 4, bottom: 0 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={6}
                    tick={{
                        fill: "var(--color-foreground-low)",
                        fontSize: 10,
                    }}
                />
                <YAxis
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    width={36}
                    tick={{
                        fill: "var(--color-foreground-low)",
                        fontSize: 10,
                    }}
                />
                <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                />
                <RechartsLine
                    type="monotone"
                    dataKey="previous"
                    stroke="var(--color-border-medium)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                />
                <RechartsLine
                    type="monotone"
                    dataKey="current"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    )
}

function MiniBarChart({
    className,
    heightClass = "h-40",
}: {
    className?: string
    heightClass?: string
}) {
    return (
        <ChartContainer
            config={barConfig}
            className={cn("aspect-auto w-full", heightClass, className)}
        >
            <BarChart
                accessibilityLayer
                data={barDailyDelta}
                margin={{ left: 4, right: 8, top: 4, bottom: 0 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={6}
                    tick={{
                        fill: "var(--color-foreground-low)",
                        fontSize: 10,
                    }}
                />
                <YAxis
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    width={32}
                    tick={{
                        fill: "var(--color-foreground-low)",
                        fontSize: 10,
                    }}
                />
                <ChartTooltip
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="delta" radius={[4, 4, 0, 0]}>
                    {barDailyDelta.map((entry) => (
                        <Cell
                            key={entry.date}
                            fill={
                                entry.delta >= 0
                                    ? "var(--color-chart-1)"
                                    : "var(--color-chart-4)"
                            }
                        />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}

type KpiLineCardProps = {
    label: string
    value: string
    delta: string
    deltaPositive?: boolean
    data: Array<Record<string, string | number>>
    chartHeightClass?: string
}

function KpiLineCard({
    label,
    value,
    delta,
    deltaPositive = true,
    data,
    chartHeightClass,
}: KpiLineCardProps) {
    return (
        <Card className="gap-3 py-4">
            <CardHeader className="pb-2">
                <div className="grid gap-1">
                    <span className="text-2xs text-foreground-low">
                        {label}
                    </span>
                    <span className="text-xl font-semibold text-foreground-high tabular-nums">
                        {value}
                    </span>
                    <span
                        className={
                            deltaPositive
                                ? "text-2xs font-medium text-success-text"
                                : "text-2xs font-medium text-danger-text"
                        }
                    >
                        {delta}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <MiniLineChart data={data} heightClass={chartHeightClass} />
            </CardContent>
        </Card>
    )
}

function SetupGuidePortal() {
    const [open, setOpen] = useState(true)
    if (!open) return null

    return createPortal(
        <div className="pointer-events-none fixed right-4 bottom-4 z-10 w-80 max-w-[calc(100vw-2rem)]">
            <Card className="pointer-events-auto gap-3 border border-border-low py-4 shadow-lg">
                <CardHeader className="px-4">
                    <CardTitle className="text-base">Setup guide</CardTitle>
                    <CardAction className="flex gap-0">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Expand setup guide"
                        >
                            <Maximize2 />
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Close setup guide"
                            onClick={() => setOpen(false)}
                        >
                            <X />
                        </Button>
                    </CardAction>
                    <CardDescription>
                        Complete the checklist to finish onboarding.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-4">
                    <Progress value={40} aria-label="Setup progress" />
                    <div>
                        <p className="text-2xs font-medium text-foreground-low">
                            Next
                        </p>
                        <Button variant="link" className="h-auto p-0 text-sm">
                            Create a one-off product
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>,
        document.body
    )
}

function DashboardSearchComboboxSuggestions({
    onSelectItem,
    isMobile = false,
}: {
    onSelectItem: () => void
    isMobile?: boolean
}) {
    return (
        <div className={cn(isMobile && "flex flex-col gap-4 py-4")}>
            <SearchComboboxEmpty>No results</SearchComboboxEmpty>
            <SearchComboboxGroup heading="Go to">
                <SearchComboboxItem
                    isMobile={isMobile}
                    value="balances"
                    keywords={["balance", "balances", "money"]}
                    onSelect={onSelectItem}
                >
                    Balances
                </SearchComboboxItem>
                <SearchComboboxItem
                    isMobile={isMobile}
                    value="reports-balance"
                    keywords={["report", "balance", "reports"]}
                    onSelect={onSelectItem}
                >
                    <span className="flex items-center gap-1">
                        <span>Reports</span>
                        <ChevronRight
                            aria-hidden
                            className="size-4 text-foreground-low"
                        />
                        <span>Balance Report</span>
                    </span>
                </SearchComboboxItem>
                <SearchComboboxItem
                    isMobile={isMobile}
                    value="transactions-activity"
                    keywords={["transactions", "activity", "all"]}
                    onSelect={onSelectItem}
                >
                    <span className="flex items-center gap-1">
                        <span>Transactions</span>
                        <ChevronRight
                            aria-hidden
                            className="size-4 text-foreground-low"
                        />
                        <span>All activity</span>
                    </span>
                </SearchComboboxItem>
            </SearchComboboxGroup>
            <SearchComboboxSeparator alwaysRender />
            <SearchComboboxGroup heading="Help">
                <SearchComboboxItem
                    isMobile={isMobile}
                    value="help-payouts"
                    keywords={["help", "payouts", "payout"]}
                    onSelect={onSelectItem}
                >
                    <HelpCircle aria-hidden className="size-4" />
                    <span>Help: Payouts</span>
                </SearchComboboxItem>
            </SearchComboboxGroup>
            <SearchComboboxGroup>
                <SearchComboboxFooter
                    value="view-all-results"
                    onSelect={onSelectItem}
                >
                    View all results
                </SearchComboboxFooter>
            </SearchComboboxGroup>
        </div>
    )
}

function DashboardHeaderSearch() {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onPointerDown = (event: PointerEvent) => {
            const root = rootRef.current
            if (root && !root.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("pointerdown", onPointerDown, true)
        return () =>
            document.removeEventListener("pointerdown", onPointerDown, true)
    }, [open])

    const closePanel = () => setOpen(false)

    return (
        <div ref={rootRef} className="relative w-full">
            <SearchComboboxRoot
                shouldFilter
                label="Search"
                className={cn(
                    "relative z-50 overflow-visible border-0 bg-transparent",
                    "p-0 shadow-none",
                    "**:data-[slot=search-combobox-input-wrap]:border-0"
                )}
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.preventDefault()
                        closePanel()
                    }
                }}
            >
                <SearchComboboxInput
                    placeholder="Search"
                    value={search}
                    onValueChange={setSearch}
                    aria-label="Search"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    className="rounded-md border border-border-medium"
                    onFocus={() => setOpen(true)}
                    onClick={() => setOpen(true)}
                />
                {open ? (
                    <SearchComboboxList
                        className={cn(
                            "absolute top-full right-0 left-0 z-50 mt-1",
                            "max-h-80 overflow-y-auto rounded-md border",
                            "border-border-low bg-background-1 p-1 shadow-md"
                        )}
                    >
                        <DashboardSearchComboboxSuggestions
                            onSelectItem={closePanel}
                        />
                    </SearchComboboxList>
                ) : null}
            </SearchComboboxRoot>
        </div>
    )
}

function DashboardHeaderSearchMobile() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")

    const closeDrawer = () => setOpen(false)

    return (
        <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Search"
                    className="shrink-0"
                >
                    <Search />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[calc(100vh-4rem)] px-4 pb-6">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="sr-only">Search</DrawerTitle>
                </DrawerHeader>
                <SearchComboboxRoot
                    shouldFilter
                    label="Search"
                    className={cn(
                        "relative z-50 overflow-visible border-0",
                        "bg-transparent shadow-none",
                        "**:data-[slot=search-combobox-input-wrap]:border-0"
                    )}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            event.preventDefault()
                            closeDrawer()
                        }
                    }}
                >
                    <SearchComboboxInput
                        value={search}
                        onValueChange={setSearch}
                        aria-label="Search"
                        aria-expanded
                        aria-haspopup="listbox"
                        className="rounded-md border border-border-medium"
                    />
                    <SearchComboboxList className="border-0 p-0 shadow-none">
                        <DashboardSearchComboboxSuggestions
                            isMobile={true}
                            onSelectItem={closeDrawer}
                        />
                    </SearchComboboxList>
                </SearchComboboxRoot>
            </DrawerContent>
        </Drawer>
    )
}

export const StripeDashboard: Story = {
    render: () => {
        const [showRecommendations, setShowRecommendations] = useState(true)
        const isMobile = useIsMobile()
        return (
            <>
                <TooltipProvider>
                    <div className="flex min-h-svh flex-col bg-background-1">
                        <SidebarProvider className="min-h-0 flex-1">
                            <Sidebar collapsible="icon">
                                <SidebarHeader>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <SidebarMenuButton
                                                        size="lg"
                                                        aria-label="Open workspace menu"
                                                        className="data-[state=open]:bg-fill-low"
                                                    >
                                                        <Avatar className="size-8 rounded-md">
                                                            <AvatarImage
                                                                src=""
                                                                alt=""
                                                            />
                                                            <AvatarFallback className="rounded-md text-xs">
                                                                AC
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                                            <span className="truncate font-semibold">
                                                                Acme Payments
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
                                                            <AvatarImage
                                                                src=""
                                                                alt=""
                                                            />
                                                            <AvatarFallback className="rounded-md">
                                                                AC
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="text-center">
                                                            <p className="text-sm font-semibold text-foreground-high">
                                                                Acme Payments
                                                            </p>
                                                            <p className="text-xs text-foreground-medium">
                                                                Sandbox
                                                                environment
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
                                                            Switch workspace
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem>
                                                                Acme Payments
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Beta Labs
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
                                                                Northwind
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Contoso
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <User />
                                                        Alex Rivera
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
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton
                                                        tooltip="Home"
                                                        isActive
                                                    >
                                                        <Home />
                                                        <span>Home</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Balances">
                                                        <Wallet />
                                                        <span>Balances</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Transactions">
                                                        <Receipt />
                                                        <span>
                                                            Transactions
                                                        </span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Customers">
                                                        <Users />
                                                        <span>Customers</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Product catalog">
                                                        <Package />
                                                        <span>
                                                            Product catalog
                                                        </span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </SidebarGroup>

                                    <SidebarGroup>
                                        <SidebarGroupLabel>
                                            Shortcuts
                                        </SidebarGroupLabel>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Subscriptions">
                                                        <CreditCard />
                                                        <span>
                                                            Subscriptions
                                                        </span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Billing overview">
                                                        <Banknote />
                                                        <span>
                                                            Billing overview
                                                        </span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Terminal">
                                                        <SquareTerminal />
                                                        <span>Terminal</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Payment Links">
                                                        <Layers />
                                                        <span>
                                                            Payment Links
                                                        </span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Radar">
                                                        <RadarIcon />
                                                        <span>Radar</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </SidebarGroup>

                                    <SidebarGroup>
                                        <SidebarGroupLabel>
                                            Products
                                        </SidebarGroupLabel>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Payments">
                                                        <CreditCard />
                                                        <span>Payments</span>
                                                        <ChevronRight className="ml-auto size-4 text-foreground-low" />
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Billing">
                                                        <FileText />
                                                        <span>Billing</span>
                                                        <ChevronRight className="ml-auto size-4 text-foreground-low" />
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Reporting">
                                                        <Layers />
                                                        <span>Reporting</span>
                                                        <ChevronRight className="ml-auto size-4 text-foreground-low" />
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="More">
                                                        <Package />
                                                        <span>More</span>
                                                        <ChevronRight className="ml-auto size-4 text-foreground-low" />
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                </SidebarContent>

                                <SidebarFooter>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Developers">
                                                <SquareTerminal />
                                                <span>Developers</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarFooter>
                            </Sidebar>

                            <SidebarInset>
                                <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border-low px-4">
                                    <SidebarTrigger />
                                    {!isMobile ? (
                                        <div className="relative mx-auto max-w-xl flex-1">
                                            <DashboardHeaderSearch />
                                        </div>
                                    ) : null}
                                    <div className="ml-auto flex shrink-0 items-center gap-1">
                                        {isMobile ? (
                                            <DashboardHeaderSearchMobile />
                                        ) : null}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-lg"
                                                    aria-label="Help"
                                                >
                                                    <HelpCircle />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Help
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-lg"
                                                    aria-label="Notifications"
                                                >
                                                    <Bell />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Notifications
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-lg"
                                                    aria-label="Settings"
                                                >
                                                    <Settings />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Settings
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-lg"
                                                    aria-label="Create"
                                                >
                                                    <Plus />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Create
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    className={cn(
                                                        "inline-flex shrink-0 rounded-full outline-none",
                                                        "focus-visible:ring-ring focus-visible:ring-3"
                                                    )}
                                                    aria-label="Account"
                                                >
                                                    <Avatar className="size-8">
                                                        <AvatarImage
                                                            src=""
                                                            alt=""
                                                        />
                                                        <AvatarFallback className="text-xs">
                                                            AR
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                Account
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </header>

                                <div className="flex-1 space-y-8 overflow-auto p-6">
                                    <section className="space-y-4">
                                        <h1 className="font-heading text-2xl font-semibold text-foreground-high">
                                            Today
                                        </h1>
                                        <div className="grid gap-4 lg:grid-cols-3">
                                            <Card
                                                className={cn(
                                                    showRecommendations
                                                        ? "lg:col-span-2"
                                                        : "lg:col-span-3"
                                                )}
                                            >
                                                <CardHeader className="pb-0">
                                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                                        <div>
                                                            <CardTitle className="text-base">
                                                                Gross volume
                                                            </CardTitle>
                                                            <CardDescription>
                                                                Yesterday ·
                                                                CA$0.00
                                                            </CardDescription>
                                                        </div>
                                                        <p className="text-2xl font-semibold text-foreground-high tabular-nums">
                                                            CA$300.00
                                                        </p>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <MiniLineChart
                                                        data={todaySparkline}
                                                        heightClass="h-32"
                                                    />
                                                </CardContent>
                                            </Card>
                                            {showRecommendations && (
                                                <Card className="gap-3 py-4">
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base">
                                                            Recommendations
                                                        </CardTitle>
                                                        <CardDescription>
                                                            Finish setup to go
                                                            live faster.
                                                        </CardDescription>
                                                        <CardAction>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon-sm"
                                                                aria-label="Dismiss"
                                                                onClick={() => {
                                                                    setShowRecommendations(
                                                                        false
                                                                    )
                                                                }}
                                                            >
                                                                <X />
                                                            </Button>
                                                        </CardAction>
                                                    </CardHeader>
                                                    <CardContent className="space-y-3 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            Use
                                                            <Button
                                                                variant="link"
                                                                size="sm"
                                                                className="h-auto p-0 text-primary-text"
                                                            >
                                                                Payment Links
                                                            </Button>
                                                            to sell without code
                                                        </div>
                                                        <Separator />
                                                        <div className="space-y-2">
                                                            <p className="uppercase">
                                                                API keys
                                                            </p>
                                                            <div className="flex items-center justify-between gap-2 text-xs">
                                                                <span className="text-foreground-medium">
                                                                    Publishable
                                                                </span>
                                                                <code className="truncate font-mono text-foreground-low">
                                                                    pk_test_••••8f2a
                                                                </code>
                                                            </div>
                                                            <div className="flex items-center justify-between gap-2 text-xs">
                                                                <span className="text-foreground-medium">
                                                                    Secret
                                                                </span>
                                                                <code className="truncate font-mono text-foreground-low">
                                                                    sk_test_••••91c4
                                                                </code>
                                                            </div>
                                                            <Button
                                                                variant="link"
                                                                size="sm"
                                                                className="h-auto p-0"
                                                            >
                                                                View docs
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        Payout schedule
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Manual · Next review in
                                                        2 days
                                                    </CardDescription>
                                                    <CardAction>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Configure
                                                        </Button>
                                                    </CardAction>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center justify-between gap-2 text-xs">
                                                        <span className="text-foreground-medium">
                                                            Payout schedule
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        CAD balance
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-xl font-semibold text-foreground-high tabular-nums">
                                                        CA$12,119.12
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </section>

                                    <Separator />

                                    <section className="space-y-4">
                                        <Tabs
                                            defaultValue="charts"
                                            className="w-full gap-4"
                                        >
                                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                <h2 className="font-heading text-xl font-semibold text-foreground-high">
                                                    Your overview
                                                </h2>
                                                <TabsList
                                                    variant="line"
                                                    className="w-full justify-start lg:w-auto"
                                                >
                                                    <TabsTrigger value="charts">
                                                        Charts
                                                    </TabsTrigger>
                                                    <TabsTrigger value="table">
                                                        Table
                                                    </TabsTrigger>
                                                </TabsList>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Date range · Last 7 days
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Daily
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Compare · Previous
                                                        period
                                                    </Button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>

                                            <TabsContent
                                                value="charts"
                                                className="mt-0"
                                            >
                                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                                    <Card className="gap-3 py-8">
                                                        <CardHeader>
                                                            <CardTitle className="text-sm font-medium">
                                                                Payments
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="flex min-h-36 items-center justify-center rounded-lg border border-dashed border-border-low bg-background-2 text-sm text-foreground-low">
                                                                No data
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <KpiLineCard
                                                        label="Gross volume"
                                                        value="CA$1,032.19"
                                                        delta="-44.35%"
                                                        deltaPositive={false}
                                                        data={grossVolumeSeries}
                                                    />

                                                    <KpiLineCard
                                                        label="MRR"
                                                        value="CA$2,085.28"
                                                        delta="+3.12%"
                                                        data={mrrSeries}
                                                    />

                                                    <KpiLineCard
                                                        label="Net volume"
                                                        value="CA$892.40"
                                                        delta="-2.10%"
                                                        deltaPositive={false}
                                                        data={netVolumeSeries}
                                                    />

                                                    <Card className="gap-3 py-4">
                                                        <CardHeader className="pb-2">
                                                            <div className="grid gap-1">
                                                                <span className="text-2xs text-foreground-low">
                                                                    Failed
                                                                    payments
                                                                </span>
                                                                <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                                                    3
                                                                </span>
                                                                <span className="text-2xs font-medium text-success-text">
                                                                    -18% vs
                                                                    previous
                                                                </span>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="pt-0">
                                                            <MiniBarChart heightClass="h-32" />
                                                        </CardContent>
                                                    </Card>

                                                    <KpiLineCard
                                                        label="New customers"
                                                        value="18"
                                                        delta="+12.5%"
                                                        data={
                                                            newCustomersSeries
                                                        }
                                                    />
                                                </div>
                                            </TabsContent>

                                            <TabsContent
                                                value="table"
                                                className="mt-0"
                                            >
                                                <Card>
                                                    <CardContent className="py-12 text-center text-sm text-foreground-medium">
                                                        Table view is a
                                                        placeholder for this
                                                        showcase story.
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>
                                    </section>

                                    <div className="grid gap-4 lg:grid-cols-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-base">
                                                    Top customers by spend
                                                </CardTitle>
                                                <CardDescription>
                                                    Last 7 days · ranked by
                                                    gross volume
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-border-low bg-background-2 text-sm text-foreground-low">
                                                    No customers yet
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    variant="outline"
                                                    size="md"
                                                >
                                                    View all customers
                                                </Button>
                                            </CardFooter>
                                        </Card>

                                        <Card className="gap-3 py-4">
                                            <CardHeader className="pb-2">
                                                <div className="grid gap-1">
                                                    <span className="text-2xs text-foreground-low">
                                                        Active subscribers
                                                    </span>
                                                    <span className="text-2xl font-semibold text-foreground-high tabular-nums">
                                                        37
                                                    </span>
                                                    <span className="text-2xs font-medium text-success-text">
                                                        +5.7% vs previous period
                                                    </span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <MiniLineChart
                                                    data={subscribersSparkline}
                                                    heightClass="h-32"
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </SidebarInset>
                        </SidebarProvider>
                    </div>
                </TooltipProvider>
                <SetupGuidePortal />
            </>
        )
    },
}
