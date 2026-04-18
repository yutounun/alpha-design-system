import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronRight, CircleHelp } from "lucide-react"
import { fn } from "storybook/test"

import {
    SearchCombobox,
    SearchComboboxEmpty,
    SearchComboboxFooter,
    SearchComboboxGroup,
    SearchComboboxInput,
    SearchComboboxItem,
    SearchComboboxList,
    SearchComboboxRoot,
    SearchComboboxSeparator,
} from "./search-combobox"

const meta = {
    title: "Components/SearchCombobox",
    component: SearchComboboxRoot,
} satisfies Meta<typeof SearchComboboxRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <div className="mx-auto max-w-xl">
            <SearchComboboxRoot label="Search commands">
                <SearchComboboxInput placeholder="Search…" />
                <SearchComboboxList>
                    <SearchComboboxEmpty>No results</SearchComboboxEmpty>
                    <SearchComboboxItem value="settings">
                        Settings
                    </SearchComboboxItem>
                    <SearchComboboxItem value="profile">
                        Profile
                    </SearchComboboxItem>
                    <SearchComboboxItem value="billing">
                        Billing
                    </SearchComboboxItem>
                </SearchComboboxList>
            </SearchComboboxRoot>
        </div>
    ),
}

export const Grouped: Story = {
    render: function GroupedStory() {
        const [search, setSearch] = useState("")
        return (
            <div className="mx-auto max-w-xl">
                <SearchComboboxRoot shouldFilter label="Global search">
                    <SearchComboboxInput
                        placeholder="Search…"
                        value={search}
                        onValueChange={setSearch}
                    />
                    <SearchComboboxList>
                        <SearchComboboxEmpty>No results</SearchComboboxEmpty>
                        <SearchComboboxGroup heading="Go to">
                            <SearchComboboxItem
                                value="balances"
                                keywords={["balance", "balances"]}
                            >
                                Balances
                            </SearchComboboxItem>
                            <SearchComboboxItem
                                value="reports-balance"
                                keywords={["report", "balance"]}
                            >
                                <span className="flex items-center gap-1">
                                    <span>Reports</span>
                                    <ChevronRight
                                        aria-hidden
                                        className="size-4 text-foreground-low"
                                    />
                                    <span>Balance Report</span>
                                </span>
                            </SearchComboboxItem>
                            <SearchComboboxItem
                                value="transactions"
                                keywords={["transactions", "activity"]}
                            >
                                <span className="flex items-center gap-1">
                                    <span>Transactions</span>
                                    <ChevronRight
                                        aria-hidden
                                        className="size-4 text-foreground-low"
                                    />
                                    <span>All activity</span>
                                </span>
                            </SearchComboboxItem>
                        </SearchComboboxGroup>
                        <SearchComboboxSeparator />
                        <SearchComboboxGroup heading="Help">
                            <SearchComboboxItem
                                value="help-payouts"
                                keywords={["help", "payouts"]}
                            >
                                <CircleHelp aria-hidden className="size-4" />
                                <span>Help: Payouts</span>
                            </SearchComboboxItem>
                        </SearchComboboxGroup>
                    </SearchComboboxList>
                </SearchComboboxRoot>
            </div>
        )
    },
}

export const Empty: Story = {
    render: () => (
        <div className="mx-auto max-w-xl">
            <SearchComboboxRoot label="Search">
                <SearchComboboxInput value="zzzznomatch" onValueChange={fn()} />
                <SearchComboboxList>
                    <SearchComboboxEmpty>No results</SearchComboboxEmpty>
                    <SearchComboboxItem value="only">
                        Hidden by filter
                    </SearchComboboxItem>
                </SearchComboboxList>
            </SearchComboboxRoot>
        </div>
    ),
}

export const WithFooter: Story = {
    render: () => (
        <div className="mx-auto max-w-xl">
            <SearchComboboxRoot label="Search">
                <SearchComboboxInput placeholder="Search…" />
                <SearchComboboxList>
                    <SearchComboboxEmpty>No results</SearchComboboxEmpty>
                    <SearchComboboxGroup>
                        <SearchComboboxItem value="one">
                            First result
                        </SearchComboboxItem>
                    </SearchComboboxGroup>
                    <SearchComboboxGroup>
                        <SearchComboboxFooter value="view-all" onSelect={fn()}>
                            View all results
                        </SearchComboboxFooter>
                    </SearchComboboxGroup>
                </SearchComboboxList>
            </SearchComboboxRoot>
        </div>
    ),
}

export const NamespaceUsage: Story = {
    render: () => (
        <div className="mx-auto max-w-xl">
            <SearchCombobox.Root label="Search (namespace)">
                <SearchCombobox.Input placeholder="Search…" />
                <SearchCombobox.List>
                    <SearchCombobox.Empty>No results</SearchCombobox.Empty>
                    <SearchCombobox.Item value="a">Item A</SearchCombobox.Item>
                </SearchCombobox.List>
            </SearchCombobox.Root>
        </div>
    ),
}
