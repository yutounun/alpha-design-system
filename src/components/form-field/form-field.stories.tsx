import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@/components/input"
import { Textarea } from "@/components/textarea"

import { FormField } from "./form-field"

const meta = {
    title: "Components/FormField",
    component: FormField,
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <FormField label="Email" description="We will never share your email.">
            <Input type="email" placeholder="you@example.com" />
        </FormField>
    ),
}

export const RequiredError: Story = {
    render: () => (
        <div className="max-w-md">
            <FormField
                label="Name"
                required
                description="Name of the product or service, visible to customers."
                error="Name is required."
            >
                <Input placeholder="" />
            </FormField>
        </div>
    ),
}

export const WithTextarea: Story = {
    render: () => (
        <div className="max-w-md">
            <FormField
                label="Description"
                description="Shown on the public listing."
                error="Description must be at least 10 characters."
            >
                <Textarea placeholder="Short summary" />
            </FormField>
        </div>
    ),
}
