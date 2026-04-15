import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronRight, Plus } from "lucide-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Button } from "./button"

const variantOptions = [
    "default",
    "outline",
    "secondary",
    "ghost",
    "destructive",
    "link",
] as const

const sizeOptions = [
    "default",
    "xs",
    "sm",
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
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
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
                <Button size="icon" aria-label="Add (default)">
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

export const WithIcon: Story = {
    render: (args) => (
        <Button {...args}>
            <Plus data-icon="inline-start" />
            Add item <ChevronRight data-icon="inline-end" />
        </Button>
    ),
    args: {
        variant: "default",
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
