import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Mail, Settings, User } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/components/button"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./dropdown-menu"

const meta = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
    parameters: { layout: "centered" },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const doc = within(document.body)

        await step("Menu opens on trigger click", async () => {
            await userEvent.click(
                canvas.getByRole("button", { name: "Open menu" })
            )
            await expect(
                doc.getByRole("menuitem", { name: "Profile" })
            ).toBeInTheDocument()
        })
    },
}

export const InsetWithCheckboxes: Story = {
    render: () => {
        const [statusBar, setStatusBar] = React.useState(true)
        const [push, setPush] = React.useState(false)

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel inset>View</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        checked={statusBar}
                        onCheckedChange={setStatusBar}
                    >
                        Show status bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={push}
                        onCheckedChange={setPush}
                    >
                        Push notifications
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel inset>Other</DropdownMenuLabel>
                    <DropdownMenuItem inset>
                        Keyboard shortcuts…
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
}

export const Submenu: Story = {
    render: () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Layout</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Compact density</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Mail />
                            <span>Invite</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <Settings />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
}
