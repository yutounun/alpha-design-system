import type { Meta, StoryObj } from "@storybook/react-vite"
import { ExternalLink, MoreHorizontal } from "lucide-react"
import {
    AreaChart,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
    LineChart,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    RadarChart,
    RadialBarChart,
    Area as RechartsArea,
    Bar as RechartsBar,
    Line as RechartsLine,
    Pie as RechartsPie,
    Radar as RechartsRadar,
    RadialBar as RechartsRadialBar,
    XAxis,
    YAxis,
} from "recharts"

import { Button } from "@/components/button"
import { Card, CardAction, CardContent, CardHeader } from "@/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "./chart"

const meta = {
    title: "Components/Chart",
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

const billingLineConfig = {
    current: {
        label: "Current period",
        color: "var(--color-chart-1)",
    },
    previous: {
        label: "Previous period",
        color: "var(--color-border-medium)",
    },
} satisfies ChartConfig

const mrrTrend = DATE_AXIS.map((date, i) => ({
    date,
    current: 1980 + i * 16 + (i > 4 ? 48 : 0),
    previous: 1920 + i * 9,
}))

const mrrGrowthDaily = DATE_AXIS.map((date, i) => {
    const deltas = [8, -12, 22, 5, 380, -45, 28]
    return { date, delta: deltas[i] ?? 0 }
})

const growthRate = DATE_AXIS.map((date, i) => ({
    date,
    rate: Math.max(40, 195 - i * 18 + (i === 3 ? 55 : 0)),
    compare: Math.max(35, 210 - i * 12),
}))

const netVolume = DATE_AXIS.map((date, i) => ({
    date,
    current: 1200 + Math.sin(i * 1.25) * 420 + i * 55,
    previous: 1080 + Math.cos(i * 0.9) * 360 + i * 48,
}))

export const BillingOverview: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="w-full max-w-6xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-foreground-high">
                    Billing overview
                </h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Configure
                    </Button>
                    <Button variant="outline" size="sm">
                        Give feedback
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="More actions"
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="revenue">
                <TabsList variant="line" className="w-full justify-start">
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                    <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                    <TabsTrigger value="trials">Trials</TabsTrigger>
                    <TabsTrigger value="churn">Churn</TabsTrigger>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                </TabsList>

                <TabsContent value="revenue" className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                            Last 7 days
                        </Button>
                        <Button variant="outline" size="sm">
                            Daily
                        </Button>
                        <Button variant="outline" size="sm">
                            Compare · Previous period
                        </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="gap-3 py-4">
                            <CardHeader className="pb-2">
                                <div className="grid gap-1">
                                    <span className="text-2xs text-foreground-low">
                                        MRR
                                    </span>
                                    <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                        CA$2,085.28
                                    </span>
                                    <span className="text-2xs font-medium text-success-text">
                                        +12.5%
                                    </span>
                                </div>
                                <CardAction>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Open MRR details"
                                    >
                                        <ExternalLink className="size-4" />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ChartContainer
                                    config={billingLineConfig}
                                    className="aspect-auto h-36 w-full"
                                >
                                    <LineChart
                                        accessibilityLayer
                                        data={mrrTrend}
                                        margin={{
                                            left: 4,
                                            right: 8,
                                            top: 4,
                                            bottom: 0,
                                        }}
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
                                            content={
                                                <ChartTooltipContent indicator="line" />
                                            }
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
                            </CardContent>
                        </Card>

                        <Card className="gap-3 py-4">
                            <CardHeader className="pb-2">
                                <div className="grid gap-1">
                                    <span className="text-2xs text-foreground-low">
                                        MRR growth
                                    </span>
                                    <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                        CA$312.40
                                    </span>
                                    <span className="text-2xs font-medium text-success-text">
                                        +4.1%
                                    </span>
                                </div>
                                <CardAction>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Open MRR growth details"
                                    >
                                        <ExternalLink className="size-4" />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ChartContainer
                                    config={{
                                        delta: {
                                            label: "Daily change",
                                            color: "var(--color-chart-1)",
                                        },
                                    }}
                                    className="aspect-auto h-36 w-full"
                                >
                                    <BarChart
                                        accessibilityLayer
                                        data={mrrGrowthDaily}
                                        margin={{
                                            left: 4,
                                            right: 8,
                                            top: 4,
                                            bottom: 0,
                                        }}
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
                                            content={
                                                <ChartTooltipContent indicator="dot" />
                                            }
                                        />
                                        <RechartsBar
                                            dataKey="delta"
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {mrrGrowthDaily.map((entry) => (
                                                <Cell
                                                    key={entry.date}
                                                    fill={
                                                        entry.delta >= 0
                                                            ? "var(--color-chart-1)"
                                                            : "var(--color-chart-4)"
                                                    }
                                                />
                                            ))}
                                        </RechartsBar>
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="gap-3 py-4">
                            <CardHeader className="pb-2">
                                <div className="grid gap-1">
                                    <span className="text-2xs text-foreground-low">
                                        MRR growth rate
                                    </span>
                                    <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                        142.0%
                                    </span>
                                    <span className="text-2xs font-medium text-danger-text">
                                        -18.2%
                                    </span>
                                </div>
                                <CardAction>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Open growth rate details"
                                    >
                                        <ExternalLink className="size-4" />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ChartContainer
                                    config={{
                                        rate: {
                                            label: "Current",
                                            color: "var(--color-chart-1)",
                                        },
                                        compare: {
                                            label: "Previous",
                                            color: "var(--color-border-medium)",
                                        },
                                    }}
                                    className="aspect-auto h-36 w-full"
                                >
                                    <LineChart
                                        accessibilityLayer
                                        data={growthRate}
                                        margin={{
                                            left: 4,
                                            right: 8,
                                            top: 4,
                                            bottom: 0,
                                        }}
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
                                            width={40}
                                            tickFormatter={(v) => `${v}%`}
                                            tick={{
                                                fill: "var(--color-foreground-low)",
                                                fontSize: 10,
                                            }}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent indicator="line" />
                                            }
                                        />
                                        <RechartsLine
                                            type="monotone"
                                            dataKey="compare"
                                            stroke="var(--color-border-medium)"
                                            strokeWidth={2}
                                            strokeDasharray="4 4"
                                            dot={false}
                                        />
                                        <RechartsLine
                                            type="monotone"
                                            dataKey="rate"
                                            stroke="var(--color-chart-1)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="gap-3 py-4">
                            <CardHeader className="pb-2">
                                <div className="grid gap-1">
                                    <span className="text-2xs text-foreground-low">
                                        ARR
                                    </span>
                                    <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                        CA$25,023.36
                                    </span>
                                    <span className="text-2xs font-medium text-success-text">
                                        +9.8%
                                    </span>
                                </div>
                                <CardAction>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Open ARR details"
                                    >
                                        <ExternalLink className="size-4" />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ChartContainer
                                    config={billingLineConfig}
                                    className="aspect-auto h-36 w-full"
                                >
                                    <LineChart
                                        accessibilityLayer
                                        data={mrrTrend.map((d) => ({
                                            date: d.date,
                                            current: d.current * 12,
                                            previous: d.previous * 12,
                                        }))}
                                        margin={{
                                            left: 4,
                                            right: 8,
                                            top: 4,
                                            bottom: 0,
                                        }}
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
                                            width={44}
                                            tick={{
                                                fill: "var(--color-foreground-low)",
                                                fontSize: 10,
                                            }}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent indicator="line" />
                                            }
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
                            </CardContent>
                        </Card>

                        <Card className="gap-3 py-4 sm:col-span-2 lg:col-span-1">
                            <CardHeader className="pb-2">
                                <div className="grid gap-1">
                                    <span className="text-2xs text-foreground-low">
                                        Net volume
                                    </span>
                                    <span className="text-xl font-semibold text-foreground-high tabular-nums">
                                        CA$18,420.00
                                    </span>
                                    <span className="text-2xs font-medium text-danger-text">
                                        -2.4%
                                    </span>
                                </div>
                                <CardAction>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Open net volume details"
                                    >
                                        <ExternalLink className="size-4" />
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ChartContainer
                                    config={billingLineConfig}
                                    className="aspect-auto h-36 w-full"
                                >
                                    <LineChart
                                        accessibilityLayer
                                        data={netVolume}
                                        margin={{
                                            left: 4,
                                            right: 8,
                                            top: 4,
                                            bottom: 0,
                                        }}
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
                                            width={40}
                                            tick={{
                                                fill: "var(--color-foreground-low)",
                                                fontSize: 10,
                                            }}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent indicator="line" />
                                            }
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
                                            type="linear"
                                            dataKey="current"
                                            stroke="var(--color-chart-1)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="usage" className="mt-6">
                    <p className="text-sm text-foreground-medium">
                        Usage tab (placeholder).
                    </p>
                </TabsContent>
                <TabsContent value="subscribers" className="mt-6">
                    <p className="text-sm text-foreground-medium">
                        Subscribers tab (placeholder).
                    </p>
                </TabsContent>
                <TabsContent value="trials" className="mt-6">
                    <p className="text-sm text-foreground-medium">
                        Trials tab (placeholder).
                    </p>
                </TabsContent>
                <TabsContent value="churn" className="mt-6">
                    <p className="text-sm text-foreground-medium">
                        Churn tab (placeholder).
                    </p>
                </TabsContent>
                <TabsContent value="collections" className="mt-6">
                    <p className="text-sm text-foreground-medium">
                        Collections tab (placeholder).
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
}

const lineConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--color-chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--color-chart-2)",
    },
} satisfies ChartConfig

const lineData = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 260, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
]

export const Line: Story = {
    render: () => (
        <ChartContainer
            config={lineConfig}
            className="min-h-64 w-full max-w-xl"
        >
            <LineChart accessibilityLayer data={lineData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis orientation="right" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <RechartsLine
                    dataKey="desktop"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                />
                <RechartsLine
                    dataKey="mobile"
                    type="monotone"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    ),
}

const barConfig = {
    desktop: { label: "Desktop", color: "var(--color-chart-1)" },
    mobile: { label: "Mobile", color: "var(--color-chart-3)" },
} satisfies ChartConfig

export const Bar: Story = {
    render: () => (
        <ChartContainer config={barConfig} className="min-h-64 w-full max-w-xl">
            <BarChart accessibilityLayer data={lineData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis orientation="right" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <RechartsBar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={[4, 4, 0, 0]}
                />
                <RechartsBar
                    dataKey="mobile"
                    fill="var(--color-mobile)"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    ),
}

const stackedConfig = {
    productA: { label: "Product A", color: "var(--color-chart-1)" },
    productB: { label: "Product B", color: "var(--color-chart-2)" },
    productC: { label: "Product C", color: "var(--color-chart-3)" },
} satisfies ChartConfig

const stackedData = [
    { month: "Jan", productA: 40, productB: 24, productC: 12 },
    { month: "Feb", productA: 30, productB: 38, productC: 18 },
    { month: "Mar", productA: 48, productB: 22, productC: 20 },
    { month: "Apr", productA: 36, productB: 44, productC: 16 },
]

export const BarStacked: Story = {
    render: () => (
        <ChartContainer
            config={stackedConfig}
            className="min-h-64 w-full max-w-xl"
        >
            <BarChart accessibilityLayer data={stackedData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis orientation="right" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <RechartsBar
                    dataKey="productA"
                    stackId="a"
                    fill="var(--color-productA)"
                    radius={[0, 0, 0, 0]}
                />
                <RechartsBar
                    dataKey="productB"
                    stackId="a"
                    fill="var(--color-productB)"
                    radius={[0, 0, 0, 0]}
                />
                <RechartsBar
                    dataKey="productC"
                    stackId="a"
                    fill="var(--color-productC)"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    ),
}

const areaConfig = {
    visitors: { label: "Visitors", color: "var(--color-chart-1)" },
} satisfies ChartConfig

const areaData = [
    { month: "Jan", visitors: 186 },
    { month: "Feb", visitors: 305 },
    { month: "Mar", visitors: 237 },
    { month: "Apr", visitors: 273 },
    { month: "May", visitors: 209 },
]

export const Area: Story = {
    render: () => (
        <ChartContainer
            config={areaConfig}
            className="min-h-64 w-full max-w-xl"
        >
            <AreaChart accessibilityLayer data={areaData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis orientation="right" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsArea
                    dataKey="visitors"
                    type="natural"
                    fill="var(--color-visitors)"
                    fillOpacity={0.25}
                    stroke="var(--color-visitors)"
                />
            </AreaChart>
        </ChartContainer>
    ),
}

const areaGradientConfig = {
    revenue: { label: "Revenue", color: "var(--color-chart-1)" },
} satisfies ChartConfig

export const AreaGradient: Story = {
    render: () => (
        <ChartContainer
            config={areaGradientConfig}
            className="min-h-64 w-full max-w-xl"
        >
            <AreaChart accessibilityLayer data={areaData}>
                <defs>
                    <linearGradient
                        id="fillRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="var(--color-revenue)"
                            stopOpacity={0.35}
                        />
                        <stop
                            offset="95%"
                            stopColor="var(--color-revenue)"
                            stopOpacity={0.05}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <YAxis orientation="right" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsArea
                    dataKey="visitors"
                    type="monotone"
                    fill="url(#fillRevenue)"
                    stroke="var(--color-revenue)"
                />
            </AreaChart>
        </ChartContainer>
    ),
}

const pieData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 120, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 90, fill: "var(--color-edge)" },
]

const pieConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "var(--color-chart-1)" },
    safari: { label: "Safari", color: "var(--color-chart-2)" },
    firefox: { label: "Firefox", color: "var(--color-chart-3)" },
    edge: { label: "Edge", color: "var(--color-chart-4)" },
} satisfies ChartConfig

export const Pie: Story = {
    render: () => (
        <ChartContainer config={pieConfig} className="min-h-72 w-full max-w-sm">
            <PieChart accessibilityLayer>
                <ChartTooltip
                    content={
                        <ChartTooltipContent nameKey="browser" hideLabel />
                    }
                />
                <RechartsPie
                    data={pieData}
                    dataKey="visitors"
                    nameKey="browser"
                />
            </PieChart>
        </ChartContainer>
    ),
}

export const Donut: Story = {
    render: () => (
        <ChartContainer config={pieConfig} className="min-h-72 w-full max-w-sm">
            <PieChart accessibilityLayer>
                <ChartTooltip
                    content={
                        <ChartTooltipContent nameKey="browser" hideLabel />
                    }
                />
                <RechartsPie
                    data={pieData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={56}
                    outerRadius={80}
                    strokeWidth={2}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy ?? 0) - 6}
                                            className="fill-foreground-high text-lg font-semibold"
                                        >
                                            685
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy ?? 0) + 14}
                                            className="fill-foreground-low text-2xs"
                                        >
                                            visitors
                                        </tspan>
                                    </text>
                                )
                            }
                            return null
                        }}
                    />
                </RechartsPie>
            </PieChart>
        </ChartContainer>
    ),
}

const radarData = [
    { metric: "Latency", current: 92, baseline: 78 },
    { metric: "Uptime", current: 88, baseline: 95 },
    { metric: "Errors", current: 72, baseline: 65 },
    { metric: "Throughput", current: 85, baseline: 70 },
    { metric: "Saturation", current: 68, baseline: 74 },
]

const radarConfig = {
    current: { label: "Current", color: "var(--color-chart-1)" },
    baseline: { label: "Baseline", color: "var(--color-border-medium)" },
} satisfies ChartConfig

export const Radar: Story = {
    render: () => (
        <ChartContainer
            config={radarConfig}
            className="min-h-80 w-full max-w-md"
        >
            <RadarChart accessibilityLayer data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <RechartsRadar
                    dataKey="baseline"
                    fill="var(--color-baseline)"
                    fillOpacity={0.15}
                    stroke="var(--color-baseline)"
                />
                <RechartsRadar
                    dataKey="current"
                    fill="var(--color-current)"
                    fillOpacity={0.35}
                    stroke="var(--color-current)"
                />
            </RadarChart>
        </ChartContainer>
    ),
}

const radialData = [
    {
        goal: "conversion",
        value: 72,
        fill: "var(--color-chart-1)",
    },
]

const radialConfig = {
    value: { label: "Score", color: "var(--color-chart-1)" },
} satisfies ChartConfig

export const RadialBar: Story = {
    render: () => (
        <ChartContainer
            config={radialConfig}
            className="mx-auto aspect-square min-h-64 max-w-xs"
        >
            <RadialBarChart
                accessibilityLayer
                data={radialData}
                innerRadius={32}
                outerRadius={110}
                startAngle={90}
                endAngle={-270}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-fill-low last:fill-card-1"
                    polarRadius={[86, 74]}
                />
                <RechartsRadialBar
                    dataKey="value"
                    cornerRadius={6}
                    background
                />
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            </RadialBarChart>
        </ChartContainer>
    ),
}
