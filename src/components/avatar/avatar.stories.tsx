import type { Meta, StoryObj } from "@storybook/react-vite"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const meta = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: { layout: "centered" },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback>AB</AvatarFallback>
        </Avatar>
    ),
}

export const WithImage: Story = {
    render: () => (
        <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
}

export const RoundedFull: Story = {
    render: () => (
        <Avatar className="size-10 rounded-full">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
}
