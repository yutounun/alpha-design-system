import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta = {
    title: "Components/Separator",
    component: Separator,
    parameters: { layout: "padded" },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
    render: () => (
        <div className="flex w-80 flex-col gap-3">
            <p className="text-sm text-foreground-medium">Section A</p>
            <Separator />
            <p className="text-sm text-foreground-medium">Section B</p>
        </div>
    ),
}

export const Vertical: Story = {
    render: () => (
        <div className="flex h-10 items-center gap-3">
            <span className="text-sm text-foreground-medium">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm text-foreground-medium">Right</span>
        </div>
    ),
}
