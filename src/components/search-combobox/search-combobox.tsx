import type { ComponentProps } from "react"
import { Command } from "cmdk"
import { Search as SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { inputVariants } from "@/components/input/input"

type CommandRootProps = ComponentProps<typeof Command>

function SearchComboboxRoot({
    className,
    label = "Search",
    ...props
}: CommandRootProps) {
    return (
        <Command
            data-slot="search-combobox"
            label={label}
            className={cn(
                "overflow-hidden rounded-md border border-border-low",
                "bg-background-1 shadow-md",
                className
            )}
            {...props}
        />
    )
}

function SearchComboboxInput({
    className,
    ...props
}: ComponentProps<typeof Command.Input>) {
    return (
        <div
            data-slot="search-combobox-input-wrap"
            className="relative border-b border-border-low"
        >
            <SearchIcon
                aria-hidden
                className={cn(
                    "pointer-events-none absolute top-1/2 left-3",
                    "size-4 -translate-y-1/2 text-foreground-low"
                )}
            />
            <Command.Input
                className={cn(
                    inputVariants({ size: "md" }),
                    "rounded-none border-0 bg-background-1",
                    "pr-3 pl-9",
                    className
                )}
                {...props}
            />
        </div>
    )
}

function SearchComboboxList({
    className,
    ...props
}: ComponentProps<typeof Command.List>) {
    return (
        <Command.List
            className={cn(
                "max-h-80 overflow-y-auto p-1",
                "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
                "[&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:font-semibold",
                "[&_[cmdk-group-heading]]:text-foreground-low",
                className
            )}
            {...props}
        />
    )
}

function SearchComboboxEmpty({
    className,
    ...props
}: ComponentProps<typeof Command.Empty>) {
    return (
        <Command.Empty
            className={cn(
                "px-2 py-6 text-center text-sm text-foreground-low",
                className
            )}
            {...props}
        />
    )
}

function SearchComboboxGroup({
    className,
    ...props
}: ComponentProps<typeof Command.Group>) {
    return <Command.Group className={className} {...props} />
}

function SearchComboboxItem({
    className,
    ...props
}: ComponentProps<typeof Command.Item>) {
    return (
        <Command.Item
            className={cn(
                "flex cursor-default items-center gap-2",
                "rounded-sm px-2 py-1.5 text-sm outline-none",
                "text-foreground-high select-none",
                "aria-selected:bg-fill-low",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                className
            )}
            {...props}
        />
    )
}

function SearchComboboxSeparator({
    className,
    ...props
}: ComponentProps<typeof Command.Separator>) {
    return (
        <Command.Separator
            className={cn("mx-1 h-px bg-border-low", className)}
            {...props}
        />
    )
}

function SearchComboboxFooter({
    className,
    children,
    ...props
}: ComponentProps<typeof Command.Item>) {
    return (
        <Command.Item
            className={cn(
                "mt-1 border-t border-border-low",
                "bg-fill-low px-2 py-2",
                "text-sm font-semibold text-primary-text",
                className
            )}
            {...props}
        >
            {children}
        </Command.Item>
    )
}

const SearchCombobox = {
    Root: SearchComboboxRoot,
    Input: SearchComboboxInput,
    List: SearchComboboxList,
    Empty: SearchComboboxEmpty,
    Group: SearchComboboxGroup,
    Item: SearchComboboxItem,
    Separator: SearchComboboxSeparator,
    Footer: SearchComboboxFooter,
}

export {
    SearchCombobox,
    SearchComboboxRoot,
    SearchComboboxInput,
    SearchComboboxList,
    SearchComboboxEmpty,
    SearchComboboxGroup,
    SearchComboboxItem,
    SearchComboboxSeparator,
    SearchComboboxFooter,
}
