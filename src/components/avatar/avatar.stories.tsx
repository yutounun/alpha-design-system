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
        <Avatar>
            <AvatarImage
                src="https://images.unsplash.com/photo-1559821137-4d09fb04686c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdpdGx8ZW58MHx8MHx8fDA%3D"
                alt="Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    ),
}

export const RoundedFull: Story = {
    render: () => (
        <Avatar className="rounded-full">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
    ),
}
