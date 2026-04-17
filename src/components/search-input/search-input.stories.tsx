import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { SearchInput } from "./search-input"

const meta = {
    title: "Components/SearchInput",
    component: SearchInput,
    args: {
        placeholder: "Search…",
        "aria-label": "Search",
    },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
    args: {
        defaultValue: "balance",
    },
}

export const WithClear: Story = {
    render: function WithClearStory() {
        const [q, setQ] = useState("balance")
        return (
            <SearchInput
                placeholder="Search…"
                value={q}
                onValueChange={setQ}
                onClear={() => setQ("")}
                aria-label="Search"
            />
        )
    },
}

export const WithEndSlot: Story = {
    render: () => (
        <SearchInput
            placeholder="Search…"
            endSlot={
                <span className="text-2xs font-medium text-foreground-medium">
                    {"\u2318"}K
                </span>
            }
            aria-label="Search"
        />
    ),
}

export const Invalid: Story = {
    args: {
        "aria-invalid": true,
        placeholder: "Required",
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: "Read only",
    },
}

export const NoStartIcon: Story = {
    args: {
        startIcon: null,
    },
}

export const AllSizes: Story = {
    render: () => (
        <div className="flex max-w-sm flex-col gap-3">
            <SearchInput
                size="sm"
                placeholder="Small"
                aria-label="Search small"
            />
            <SearchInput
                size="md"
                placeholder="Medium"
                aria-label="Search medium"
            />
            <SearchInput
                size="lg"
                placeholder="Large"
                aria-label="Search large"
            />
        </div>
    ),
}
