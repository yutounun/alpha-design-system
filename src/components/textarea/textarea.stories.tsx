import type { Meta, StoryObj } from "@storybook/react-vite"

import { Textarea } from "./textarea"

const meta = {
    title: "Components/Textarea",
    component: Textarea,
    args: {
        placeholder: "Add a description…",
    },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
    args: {
        defaultValue: "Line one\nLine two",
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: "Cannot edit",
    },
}

export const Invalid: Story = {
    args: {
        "aria-invalid": true,
    },
}

export const AllSizes: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="flex max-w-md flex-col gap-3">
            <Textarea size="sm" placeholder="Small" />
            <Textarea size="md" placeholder="Medium" />
            <Textarea size="lg" placeholder="Large" />
        </div>
    ),
}
