import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontal } from "lucide-react"
import { expect, within } from "storybook/test"

import { Button } from "@/components/button"
import { FormField } from "@/components/form-field"
import { Input } from "@/components/input"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./card"

const meta = {
    title: "Components/Card",
    component: Card,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                    Short supporting copy for this card.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground-medium">
                    Main content goes here. Use tokens for typography and
                    spacing.
                </p>
            </CardContent>
            <CardFooter className="border-t border-border-low">
                <Button variant="outline" size="sm">
                    Cancel
                </Button>
                <Button size="sm" className="ml-auto">
                    Save
                </Button>
            </CardFooter>
        </Card>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole("heading", { name: "Card title", level: 3 })
        ).toBeVisible()
    },
}

export const WithAction: Story = {
    render: () => (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                    Choose what you want to hear about.
                </CardDescription>
                <CardAction>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="More options"
                    >
                        <MoreHorizontal />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-foreground-medium">
                    Header uses a two-column grid when action is present.
                </p>
            </CardContent>
        </Card>
    ),
}

export const ContentOnly: Story = {
    render: () => (
        <Card className="w-80">
            <CardContent className="pt-6">
                <p className="text-sm text-foreground-medium">
                    Only body content, no header or footer.
                </p>
            </CardContent>
        </Card>
    ),
}

export const WithForm: Story = {
    render: () => (
        <Card className="w-96">
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Enter your email to continue.</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <FormField label="Email" required>
                        <Input type="email" autoComplete="email" />
                    </FormField>
                    <Button type="submit">Continue</Button>
                </form>
            </CardContent>
        </Card>
    ),
}

export const Grid: Story = {
    render: () => (
        <div className="grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>High-level metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground-medium">
                        Summary content for the first tile.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Activity</CardTitle>
                    <CardDescription>Recent events</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground-medium">
                        Summary content for the second tile.
                    </p>
                </CardContent>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Workspace preferences</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground-medium">
                        Summary content for the third tile.
                    </p>
                </CardContent>
            </Card>
        </div>
    ),
}
