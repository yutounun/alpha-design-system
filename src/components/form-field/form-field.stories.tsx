import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@/components/input"
import { Textarea } from "@/components/textarea"

import { FormField } from "./form-field"

const meta = {
    title: "Composables/FormField",
    component: FormField,
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: "Email",
        description: "We will never share your email.",
        children: <Input type="email" placeholder="you@example.com" />,
    },
}

export const RequiredError: Story = {
    args: {
        label: "Name",
        required: true,
        description: "Name of the product or service, visible to customers.",
        error: "Name is required.",
        children: <Input placeholder="" />,
    },
    decorators: [
        (Story) => (
            <div className="max-w-md">
                <Story />
            </div>
        ),
    ],
}

export const WithTextarea: Story = {
    args: {
        label: "Description",
        description: "Shown on the public listing.",
        error: "Description must be at least 10 characters.",
        children: <Textarea placeholder="Short summary" />,
    },
    decorators: [
        (Story) => (
            <div className="max-w-md">
                <Story />
            </div>
        ),
    ],
}
