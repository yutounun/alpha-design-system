import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "./progress"

const meta = {
    title: "Components/Progress",
    component: Progress,
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100, step: 1 },
            description:
                "0–100 when determinate. Clear or set to `null` in Controls for indeterminate (may require story-specific handling).",
        },
    },
    decorators: [
        (Story) => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        value: 60,
    },
}

export const Indeterminate: Story = {
    args: {
        value: null,
    },
    argTypes: {
        value: { control: false },
    },
}

export const Animated: Story = {
    argTypes: {
        value: { control: false },
    },
    render: function AnimatedRender() {
        const [progress, setProgress] = useState(0)

        useEffect(() => {
            const id = window.setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 0 : prev + 5))
            }, 400)
            return () => window.clearInterval(id)
        }, [])

        return <Progress value={progress} />
    },
}
