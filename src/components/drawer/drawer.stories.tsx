import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/components/button"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./drawer"

const meta = {
    title: "Components/Drawer",
    component: Drawer,
    parameters: { layout: "centered" },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <Button variant="outline">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Drawer title</DrawerTitle>
                    <DrawerDescription>
                        Supporting description for the drawer panel.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const doc = within(document.body)

        await step("Opens on trigger click", async () => {
            await userEvent.click(
                canvas.getByRole("button", { name: "Open drawer" })
            )
            await expect(
                doc.getByRole("dialog", { name: "Drawer title" })
            ).toBeVisible()
        })
    },
}

export const LeftSide: Story = {
    render: () => (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Button variant="outline">Open left</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Left panel</DrawerTitle>
                    <DrawerDescription>
                        Content from the left edge.
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    ),
}
