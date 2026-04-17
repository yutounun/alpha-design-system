import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "./skeleton"

const meta = {
    title: "Components/Skeleton",
    component: Skeleton,
    parameters: { layout: "centered" },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => <Skeleton className="h-10 w-48" />,
}

export const CardPlaceholder: Story = {
    render: () => (
        <div className="flex w-72 flex-col gap-3 rounded-xl border border-border-low p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    ),
}
