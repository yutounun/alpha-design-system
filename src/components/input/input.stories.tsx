import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "./input"

const meta = {
    title: "Components/Input",
    component: Input,
    args: {
        placeholder: "Type something…",
    },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
    args: {
        defaultValue: "alpha-design-system",
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: "Read only",
    },
}

export const Invalid: Story = {
    args: {
        "aria-invalid": true,
        placeholder: "Required",
    },
}

export const AllSizes: Story = {
    parameters: {
        layout: "padded",
    },
    render: () => (
        <div className="flex max-w-sm flex-col gap-3">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
        </div>
    ),
}
