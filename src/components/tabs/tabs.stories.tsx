import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bell, Code, Settings } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
    title: "Components/Tabs",
    component: Tabs,
    args: {
        defaultValue: "account",
    },
    parameters: {
        layout: "padded",
    },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// ─── Pills (default) ──────────────────────────────────────────────────────────

export const Pills: Story = {
    render: (args) => (
        <Tabs {...args} className="w-96">
            <TabsList variant="pills">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <p className="text-sm text-foreground-medium">
                    Manage your account settings and preferences.
                </p>
            </TabsContent>
            <TabsContent value="password">
                <p className="text-sm text-foreground-medium">
                    Change your password here. After saving, you will be logged
                    out.
                </p>
            </TabsContent>
            <TabsContent value="billing">
                <p className="text-sm text-foreground-medium">
                    View and manage your billing information.
                </p>
            </TabsContent>
        </Tabs>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)

        await step("First tab is active by default", async () => {
            const trigger = canvas.getByRole("tab", { name: "Account" })
            await expect(trigger).toHaveAttribute("data-state", "active")
        })

        await step("Clicking Password tab activates it", async () => {
            await userEvent.click(canvas.getByRole("tab", { name: "Password" }))
            await expect(
                canvas.getByRole("tab", { name: "Password" })
            ).toHaveAttribute("data-state", "active")
        })
    },
}

// ─── Line ─────────────────────────────────────────────────────────────────────

export const Line: Story = {
    render: (args) => (
        <Tabs {...args} className="w-full max-w-lg">
            <TabsList variant="line">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <p className="text-sm text-foreground-medium">
                    Manage your account settings and preferences.
                </p>
            </TabsContent>
            <TabsContent value="password">
                <p className="text-sm text-foreground-medium">
                    Change your password here. After saving, you will be logged
                    out.
                </p>
            </TabsContent>
            <TabsContent value="billing">
                <p className="text-sm text-foreground-medium">
                    View and manage your billing information.
                </p>
            </TabsContent>
        </Tabs>
    ),
}

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
    parameters: { layout: "padded" },
    render: (args) => (
        <div className="flex flex-col gap-8">
            <Tabs {...args} className="w-full max-w-md">
                <TabsList variant="pills">
                    <TabsTrigger value="account">
                        <Settings />
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="api">
                        <Code />
                        API
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="pt-3">
                    <p className="text-sm text-foreground-medium">
                        Account settings
                    </p>
                </TabsContent>
                <TabsContent value="notifications" className="pt-3">
                    <p className="text-sm text-foreground-medium">
                        Notification preferences
                    </p>
                </TabsContent>
                <TabsContent value="api" className="pt-3">
                    <p className="text-sm text-foreground-medium">
                        API access and tokens
                    </p>
                </TabsContent>
            </Tabs>

            <Tabs {...args} className="w-full max-w-md">
                <TabsList variant="line">
                    <TabsTrigger value="account">
                        <Settings />
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="api">
                        <Code />
                        API
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="pt-4">
                    <p className="text-sm text-foreground-medium">
                        Account settings
                    </p>
                </TabsContent>
                <TabsContent value="notifications" className="pt-4">
                    <p className="text-sm text-foreground-medium">
                        Notification preferences
                    </p>
                </TabsContent>
                <TabsContent value="api" className="pt-4">
                    <p className="text-sm text-foreground-medium">
                        API access and tokens
                    </p>
                </TabsContent>
            </Tabs>
        </div>
    ),
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const WithDisabled: Story = {
    render: (args) => (
        <Tabs {...args} className="w-96">
            <TabsList variant="pills">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password" disabled>
                    Password
                </TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <p className="text-sm text-foreground-medium">
                    Manage your account settings.
                </p>
            </TabsContent>
            <TabsContent value="password">
                <p className="text-sm text-foreground-medium">
                    This tab is disabled.
                </p>
            </TabsContent>
            <TabsContent value="billing">
                <p className="text-sm text-foreground-medium">
                    View billing information.
                </p>
            </TabsContent>
        </Tabs>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const disabledTab = canvas.getByRole("tab", { name: "Password" })
        await expect(disabledTab).toBeDisabled()
    },
}

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
    parameters: { layout: "padded" },
    render: () => (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <p className="text-xs font-medium tracking-wide text-foreground-low uppercase">
                    Pills
                </p>
                <Tabs defaultValue="account" className="w-full max-w-md">
                    <TabsList variant="pills">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-3">
                        <p className="text-sm text-foreground-medium">
                            Account settings
                        </p>
                    </TabsContent>
                    <TabsContent value="password" className="pt-3">
                        <p className="text-sm text-foreground-medium">
                            Password settings
                        </p>
                    </TabsContent>
                    <TabsContent value="billing" className="pt-3">
                        <p className="text-sm text-foreground-medium">
                            Billing settings
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-xs font-medium tracking-wide text-foreground-low uppercase">
                    Line
                </p>
                <Tabs defaultValue="account" className="w-full max-w-md">
                    <TabsList variant="line">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="pt-4">
                        <p className="text-sm text-foreground-medium">
                            Account settings
                        </p>
                    </TabsContent>
                    <TabsContent value="password" className="pt-4">
                        <p className="text-sm text-foreground-medium">
                            Password settings
                        </p>
                    </TabsContent>
                    <TabsContent value="billing" className="pt-4">
                        <p className="text-sm text-foreground-medium">
                            Billing settings
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    ),
}
