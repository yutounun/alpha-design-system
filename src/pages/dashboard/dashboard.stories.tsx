import { useState } from "react"
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
    Settings,
    SquareTerminal,
    User,
    Users,
    Wallet,
    X,
} from "lucide-react"
import { createPortal } from "react-dom"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    RadarChart,
    Line as RechartsLine,
    Radar as RechartsRadar,
    XAxis,
    YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
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

const areaVisits = DATE_AXIS.map((date, i) => ({
    date,
    visits: 120 + i * 15 + Math.round(Math.sin(i * 0.9) * 22),
}))

const pieShare: { channel: string; value: number; fill: string }[] = [
    { channel: "cards", value: 58, fill: "var(--color-chart-1)" },
    { channel: "links", value: 24, fill: "var(--color-chart-2)" },
    { channel: "other", value: 18, fill: "var(--color-chart-3)" },
]

const radarQuality = [
    { metric: "Latency", current: 88, baseline: 74 },
    { metric: "Success", current: 92, baseline: 85 },
    { metric: "Coverage", current: 76, baseline: 70 },
    { metric: "Errors", current: 82, baseline: 68 },
    { metric: "Cost", current: 71, baseline: 79 },
]

const barConfig = {
    delta: { label: "Daily delta", color: "var(--color-chart-1)" },
} satisfies ChartConfig

const areaConfig = {
    visits: { label: "Visits", color: "var(--color-chart-1)" },
} satisfies ChartConfig

const pieConfig = {
    value: { label: "Share" },
    cards: { label: "Cards", color: "var(--color-chart-1)" },
    links: { label: "Links", color: "var(--color-chart-2)" },
    other: { label: "Other", color: "var(--color-chart-3)" },
} satisfies ChartConfig

const radarConfig = {
    current: { label: "Current", color: "var(--color-chart-1)" },
    baseline: { label: "Baseline", color: "var(--color-border-medium)" },
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

function MiniAreaChart({
    className,
    heightClass = "h-40",
}: {
    className?: string
    heightClass?: string
}) {
    return (
        <ChartContainer
            config={areaConfig}
            className={cn("aspect-auto w-full", heightClass, className)}
        >
            <AreaChart
                accessibilityLayer
                data={areaVisits}
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
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    dataKey="visits"
                    type="monotone"
                    fill="var(--color-visits)"
                    fillOpacity={0.22}
                    stroke="var(--color-visits)"
                />
            </AreaChart>
        </ChartContainer>
    )
}

function MiniPieChart({
    className,
    heightClass = "h-40",
}: {
    className?: string
    heightClass?: string
}) {
    return (
        <ChartContainer
            config={pieConfig}
            className={cn("aspect-auto w-full", heightClass, className)}
        >
            <PieChart accessibilityLayer>
                <ChartTooltip
                    content={
                        <ChartTooltipContent nameKey="channel" hideLabel />
                    }
                />
                <Pie
                    data={pieShare}
                    dataKey="value"
                    nameKey="channel"
                    innerRadius={36}
                    outerRadius={56}
                    strokeWidth={1}
                />
            </PieChart>
        </ChartContainer>
    )
}

function MiniRadarChart({
    className,
    heightClass = "min-h-44",
}: {
    className?: string
    heightClass?: string
}) {
    return (
        <ChartContainer
            config={radarConfig}
            className={cn("aspect-auto w-full", heightClass, className)}
        >
            <RadarChart accessibilityLayer data={radarQuality}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsRadar
                    dataKey="baseline"
                    fill="var(--color-baseline)"
                    fillOpacity={0.12}
                    stroke="var(--color-baseline)"
                />
                <RechartsRadar
                    dataKey="current"
                    fill="var(--color-current)"
                    fillOpacity={0.28}
                    stroke="var(--color-current)"
                />
            </RadarChart>
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
    return createPortal(
        <div className="pointer-events-none fixed right-4 bottom-4 z-200 w-80 max-w-[calc(100vw-2rem)]">
            <Card className="pointer-events-auto gap-3 border border-border-low py-4 shadow-lg">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
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
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Close setup guide"
                            >
                                <X />
                            </Button>
                        </CardAction>
                    </div>
                    <CardDescription>
                        Complete the checklist to finish onboarding.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
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

function DashboardHeaderSearch() {
    const [search, setSearch] = useState("")

    return (
        <SearchComboboxRoot
            shouldFilter
            label="Search"
            className={cn(
                "relative z-50 overflow-visible border-0 bg-transparent",
                "p-0 shadow-none",
                "**:data-[slot=search-combobox-input-wrap]:border-0"
            )}
        >
            <SearchComboboxInput
                placeholder="Search"
                value={search}
                onValueChange={setSearch}
                aria-label="Search"
                className="rounded-md border border-border-medium"
            />
            <SearchComboboxList
                className={cn(
                    "absolute top-full right-0 left-0 z-50 mt-1",
                    "max-h-80 overflow-y-auto rounded-md border",
                    "border-border-low bg-background-1 p-1 shadow-md"
                )}
            >
                <SearchComboboxEmpty>No results</SearchComboboxEmpty>
                <SearchComboboxGroup heading="Go to">
                    <SearchComboboxItem
                        value="balances"
                        keywords={["balance", "balances", "money"]}
                    >
                        Balances
                    </SearchComboboxItem>
                    <SearchComboboxItem
                        value="reports-balance"
                        keywords={["report", "balance", "reports"]}
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
                        value="transactions-activity"
                        keywords={["transactions", "activity", "all"]}
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
                        value="help-payouts"
                        keywords={["help", "payouts", "payout"]}
                    >
                        <HelpCircle aria-hidden className="size-4" />
                        <span>Help: Payouts</span>
                    </SearchComboboxItem>
                </SearchComboboxGroup>
                <SearchComboboxFooter value="view-all-results">
                    View all results
                </SearchComboboxFooter>
            </SearchComboboxList>
        </SearchComboboxRoot>
    )
}

export const StripeDashboard: Story = {
    render: () => (
        <>
            <div className="flex min-h-svh flex-col bg-background-1">
                <div
                    className="flex h-8 shrink-0 items-center justify-center bg-brand px-4 text-xs text-inv-foreground-high"
                    role="status"
                >
                    You&apos;re testing in a sandbox. Data may be simulated.
                </div>

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
                                                        Sandbox environment
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
                                                <span>Transactions</span>
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
                                                <span>Product catalog</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>

                            <SidebarGroup>
                                <SidebarGroupLabel>Shortcuts</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Subscriptions">
                                                <CreditCard />
                                                <span>Subscriptions</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Billing overview">
                                                <Banknote />
                                                <span>Billing overview</span>
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
                                                <span>Payment Links</span>
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
                                <SidebarGroupLabel>Products</SidebarGroupLabel>
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
                            <div className="relative mx-auto max-w-xl flex-1">
                                <DashboardHeaderSearch />
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon-md"
                                    aria-label="Command palette"
                                >
                                    <span className="text-2xs font-medium text-foreground-medium">
                                        {"\u2318"}K
                                    </span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-md"
                                    aria-label="Help"
                                >
                                    <HelpCircle />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-md"
                                    aria-label="Notifications"
                                >
                                    <Bell />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-md"
                                    aria-label="Settings"
                                >
                                    <Settings />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon-md"
                                    aria-label="Create"
                                >
                                    <Plus />
                                </Button>
                                <Avatar className="size-8">
                                    <AvatarImage src="" alt="" />
                                    <AvatarFallback className="text-xs">
                                        AR
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </header>

                        <div className="flex-1 space-y-8 overflow-auto p-6">
                            <section className="space-y-4">
                                <h1 className="font-heading text-2xl font-semibold text-foreground-high">
                                    Today
                                </h1>
                                <div className="grid gap-4 lg:grid-cols-3">
                                    <Card className="gap-4 py-5 lg:col-span-2">
                                        <CardHeader className="pb-0">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <CardTitle className="text-base">
                                                        Gross volume
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Yesterday · CA$0.00
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

                                    <Card className="gap-3 py-4">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="text-base">
                                                    Recommendations
                                                </CardTitle>
                                                <CardAction>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        aria-label="Dismiss"
                                                    >
                                                        <X />
                                                    </Button>
                                                </CardAction>
                                            </div>
                                            <CardDescription>
                                                Finish setup to go live faster.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3 text-sm">
                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-primary-text"
                                            >
                                                Use Payment Links to sell
                                                without code
                                            </Button>
                                            <Separator />
                                            <div className="space-y-2">
                                                <p className="text-2xs font-medium tracking-wide text-foreground-low uppercase">
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
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-border-low bg-card-1 px-6 py-4">
                                        <div>
                                            <p className="text-2xs text-foreground-low">
                                                CAD balance
                                            </p>
                                            <p className="text-xl font-semibold tabular-nums">
                                                CA$12,119.12
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="link" size="sm">
                                                View
                                            </Button>
                                            <Button variant="link" size="sm">
                                                Payouts
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-dashed border-border-low bg-background-1 px-6 py-4">
                                        <div>
                                            <p className="text-2xs text-foreground-low">
                                                Payout schedule
                                            </p>
                                            <p className="text-sm text-foreground-medium">
                                                Manual · Next review in 2 days
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Configure
                                        </Button>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            <section className="space-y-4">
                                <h2 className="font-heading text-xl font-semibold text-foreground-high">
                                    Chart gallery
                                </h2>
                                <p className="text-sm text-foreground-medium">
                                    Five chart types plus one empty state
                                    (sample data for Storybook only).
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    <Card className="gap-3 py-4">
                                        <CardHeader className="pb-0">
                                            <CardTitle className="text-sm font-medium">
                                                Line — gross trend
                                            </CardTitle>
                                            <CardDescription>
                                                Current vs previous period
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <MiniLineChart
                                                data={grossVolumeSeries}
                                                heightClass="h-36"
                                            />
                                        </CardContent>
                                    </Card>

                                    <Card className="gap-3 py-4">
                                        <CardHeader className="pb-0">
                                            <CardTitle className="text-sm font-medium">
                                                Bar — daily net change
                                            </CardTitle>
                                            <CardDescription>
                                                Positive and negative days
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <MiniBarChart heightClass="h-36" />
                                        </CardContent>
                                    </Card>

                                    <Card className="gap-3 py-4">
                                        <CardHeader className="pb-0">
                                            <CardTitle className="text-sm font-medium">
                                                Area — traffic
                                            </CardTitle>
                                            <CardDescription>
                                                Smoothed visit volume
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <MiniAreaChart heightClass="h-36" />
                                        </CardContent>
                                    </Card>

                                    <Card className="gap-3 py-4">
                                        <CardHeader className="pb-0">
                                            <CardTitle className="text-sm font-medium">
                                                Pie — checkout mix
                                            </CardTitle>
                                            <CardDescription>
                                                Share by payment surface
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <MiniPieChart heightClass="h-36" />
                                        </CardContent>
                                    </Card>

                                    <Card className="gap-3 py-4">
                                        <CardHeader className="pb-0">
                                            <CardTitle className="text-sm font-medium">
                                                Radar — health snapshot
                                            </CardTitle>
                                            <CardDescription>
                                                Current vs baseline
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <MiniRadarChart heightClass="min-h-40" />
                                        </CardContent>
                                    </Card>

                                    <Card className="gap-3 py-8">
                                        <CardHeader>
                                            <CardTitle className="text-sm font-medium">
                                                No data
                                            </CardTitle>
                                            <CardDescription>
                                                Waiting for first events
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex min-h-36 items-center justify-center rounded-lg border border-dashed border-border-low bg-background-2 text-sm text-foreground-low">
                                                No data
                                            </div>
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
                                            <Button variant="outline" size="sm">
                                                Date range · Last 7 days
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Daily
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Compare · Previous period
                                            </Button>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                Add
                                            </Button>
                                            <Button variant="outline" size="sm">
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
                                                            Failed payments
                                                        </span>
                                                        <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                                            3
                                                        </span>
                                                        <span className="text-2xs font-medium text-success-text">
                                                            -18% vs previous
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
                                                data={newCustomersSeries}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="table" className="mt-0">
                                        <Card>
                                            <CardContent className="py-12 text-center text-sm text-foreground-medium">
                                                Table view is a placeholder for
                                                this showcase story.
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
                                            Last 7 days · ranked by gross volume
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-border-low bg-background-2 text-sm text-foreground-low">
                                            No customers yet
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t border-border-low">
                                        <Button
                                            variant="link"
                                            className="h-auto p-0"
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
            <SetupGuidePortal />
        </>
    ),
}
