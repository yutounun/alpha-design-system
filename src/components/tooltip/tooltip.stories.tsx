import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/components/button"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./tooltip"

const meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    decorators: [
        (Story) => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
    parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip copy</TooltipContent>
        </Tooltip>
    ),
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const doc = within(document.body)

        await step("Tooltip appears on hover", async () => {
            const trigger = canvas.getByRole("button", { name: "Hover me" })
            await userEvent.hover(trigger)
            await expect(await doc.findByRole("tooltip")).toHaveTextContent(
                "Tooltip copy"
            )
        })
    },
}
