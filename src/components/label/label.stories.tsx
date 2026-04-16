import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@/components/input"

import { Label } from "./label"

const meta = {
    title: "Components/Label",
    component: Label,
    args: {
        children: "Email",
    },
    argTypes: {
        children: {
            control: "text",
        },
    },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        htmlFor: "label-email",
        children: "Email",
    },
    render: (args) => (
        <div className="flex max-w-sm flex-col gap-2">
            <Label {...args} />
            <Input id={args.htmlFor as string} placeholder="you@example.com" />
        </div>
    ),
}

export const Required: Story = {
    render: () => (
        <div className="flex max-w-sm flex-col gap-2">
            <Label htmlFor="label-name">
                Name{" "}
                <span className="font-normal text-foreground-medium">
                    (required)
                </span>
            </Label>
            <Input id="label-name" required placeholder="Acme Inc." />
        </div>
    ),
}

export const Invalid: Story = {
    render: () => (
        <div className="flex max-w-sm flex-col gap-2">
            <Label htmlFor="label-invalid" aria-invalid>
                Display name
            </Label>
            <Input id="label-invalid" aria-invalid placeholder="—" />
        </div>
    ),
}
