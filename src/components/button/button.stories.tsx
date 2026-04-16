import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronRight, Plus } from "lucide-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Button } from "./button"

const variantOptions = [
    "primary",
    "outline",
    "secondary",
    "ghost",
    "destructive",
    "link",
] as const

const sizeOptions = [
    "xs",
    "sm",
    "md",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
] as const

const meta = {
    title: "Components/Button",
    component: Button,
    args: {
        children: "Button",
    },
    argTypes: {
        variant: {
            control: "select",
            options: variantOptions,
        },
        size: {
            control: "select",
            options: sizeOptions,
        },
        loading: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: "Submit",
        onClick: fn(),
    },
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement)

        await step("Focus moves to the button via Tab", async () => {
            await userEvent.tab()
            const button = canvas.getByRole("button", { name: "Submit" })
            await expect(button).toHaveFocus()
        })

        await step("Click invokes the handler", async () => {
            const button = canvas.getByRole("button", { name: "Submit" })
            await userEvent.click(button)
            await expect(args.onClick).toHaveBeenCalled()
        })
    },
}

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Outline",
    },
}

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary",
    },
}

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Ghost",
    },
}

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Destructive",
    },
}

export const Link: Story = {
    args: {
        variant: "link",
        children: "Link",
    },
}

export const AllSizes: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="flex flex-col items-start gap-4">
            <p className="text-sm font-medium text-foreground-medium">
                Text sizes
            </p>
            <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Get Started</Button>
                <Button size="sm">Get Started</Button>
                <Button size="md">Get Started</Button>
                <Button size="lg">Get Started</Button>
            </div>
            <p className="text-sm font-medium text-foreground-medium">
                Icon sizes
            </p>
            <div className="flex flex-wrap items-center gap-2">
                <Button size="icon-xs" aria-label="Add (xs)">
                    <Plus />
                </Button>
                <Button size="icon-sm" aria-label="Add (sm)">
                    <Plus />
                </Button>
                <Button size="icon-md" aria-label="Add (md)">
                    <Plus />
                </Button>
                <Button size="icon-lg" aria-label="Add (lg)">
                    <Plus />
                </Button>
            </div>
        </div>
    ),
}

export const Disabled: Story = {
    args: {
        disabled: true,
        onClick: fn(),
        children: "Disabled",
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole("button", { name: "Disabled" })
        await expect(button).toBeDisabled()
        // Disabled buttons use pointer-events: none; user-event cannot click them.
        await expect(args.onClick).not.toHaveBeenCalled()
    },
}

export const Loading: Story = {
    render: () => {
        const [loading, setLoading] = useState(false)

        return (
            <div className="flex max-w-md flex-col gap-3">
                <p className="text-sm text-foreground-medium">
                    Click to load for 2 seconds. Only the spinner is visible;
                    width matches the idle label.
                </p>
                <Button
                    loading={loading}
                    onClick={() => {
                        setLoading(true)
                        window.setTimeout(() => setLoading(false), 2000)
                    }}
                >
                    Submit
                </Button>
            </div>
        )
    },
}

export const WithIcon: Story = {
    render: (args) => (
        <Button {...args}>
            <Plus data-icon="inline-start" />
            Add item <ChevronRight data-icon="inline-end" />
        </Button>
    ),
    args: {
        variant: "primary",
    },
}

export const AsChild: Story = {
    render: (args) => (
        <Button {...args} asChild>
            <a href="https://storybook.js.org" target="_blank" rel="noreferrer">
                Open Storybook
            </a>
        </Button>
    ),
}
