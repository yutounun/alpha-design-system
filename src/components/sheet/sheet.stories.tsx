import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/components/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./sheet"

const meta = {
    title: "Components/Sheet",
    component: Sheet,
    parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Sheet title</SheetTitle>
                    <SheetDescription>
                        Supporting description for the sheet panel.
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const doc = within(document.body)

        await step("Opens on trigger click", async () => {
            await userEvent.click(
                canvas.getByRole("button", { name: "Open sheet" })
            )
            await expect(
                doc.getByRole("dialog", { name: "Sheet title" })
            ).toBeVisible()
        })
    },
}

export const LeftSide: Story = {
    render: () => (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open left</Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Left panel</SheetTitle>
                    <SheetDescription>
                        Content from the left edge.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    ),
}
