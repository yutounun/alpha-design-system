import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { Search as SearchIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import { inputVariants } from "@/components/input/input"

const startIconClassName = [
    "pointer-events-none absolute top-1/2 left-3 size-4",
    "-translate-y-1/2 text-foreground-low",
].join(" ")

type SearchInputProps = Omit<React.ComponentProps<"input">, "size"> &
    VariantProps<typeof inputVariants> & {
        /** Called when the text value changes (in addition to `onChange`). */
        onValueChange?: (value: string) => void
        /** When set, a clear control is shown while the field has a non-empty value. */
        onClear?: () => void
        /** Left icon; defaults to `Search`. Pass `null` to omit. */
        startIcon?: React.ReactNode
        /** Optional right adornment (for example a keyboard hint). */
        endSlot?: React.ReactNode
    }

/**
 * Search field with optional leading icon, trailing clear, and end adornment slots.
 * Reuses `inputVariants` from `Input` for consistent sizing and focus rings.
 */
function SearchInput({
    className,
    type = "search",
    size = "md",
    value,
    defaultValue,
    onChange,
    onValueChange,
    onClear,
    startIcon,
    endSlot,
    disabled,
    ref,
    ...props
}: SearchInputProps & { ref?: React.Ref<HTMLInputElement> }) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const mergedRef = React.useCallback(
        (node: HTMLInputElement | null) => {
            inputRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
        },
        [ref]
    )

    const [internalValue, setInternalValue] = React.useState(() =>
        defaultValue != null ? String(defaultValue) : ""
    )
    const isControlled = value !== undefined
    const currentValue = isControlled ? String(value ?? "") : internalValue

    const showStartIcon = startIcon !== null

    const resolvedStartIcon =
        startIcon === undefined ? (
            <SearchIcon aria-hidden className="size-4" />
        ) : (
            startIcon
        )

    const showClear = Boolean(onClear) && currentValue.length > 0 && !disabled

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternalValue(event.target.value)
        onChange?.(event)
        onValueChange?.(event.target.value)
    }

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onClear?.()
        if (!isControlled && inputRef.current) {
            const el = inputRef.current
            const desc = Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype,
                "value"
            )
            desc?.set?.call(el, "")
            el.dispatchEvent(new Event("input", { bubbles: true }))
        }
    }

    const inputPadding = cn(
        showStartIcon ? "pl-9" : null,
        showClear && endSlot ? "pr-20" : null,
        showClear && !endSlot ? "pr-9" : null,
        !showClear && endSlot ? "pr-14" : null,
        !showClear && !endSlot ? "pr-3" : null
    )

    return (
        <div data-slot="search-input" className="relative w-full">
            {showStartIcon &&
                resolvedStartIcon &&
                (React.isValidElement(resolvedStartIcon) ? (
                    React.cloneElement(
                        resolvedStartIcon as React.ReactElement<{
                            className?: string
                            "aria-hidden"?: boolean
                        }>,
                        {
                            className: cn(
                                startIconClassName,
                                (
                                    resolvedStartIcon as React.ReactElement<{
                                        className?: string
                                    }>
                                ).props.className
                            ),
                            "aria-hidden": true,
                        }
                    )
                ) : (
                    <span
                        aria-hidden
                        className={cn(
                            startIconClassName,
                            "inline-flex items-center justify-center"
                        )}
                    >
                        {resolvedStartIcon}
                    </span>
                ))}
            <input
                ref={mergedRef}
                type={type}
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={cn(inputVariants({ size }), inputPadding, className)}
                {...props}
            />
            {(showClear || endSlot) && (
                <div
                    className={cn(
                        "absolute top-1/2 right-2 flex -translate-y-1/2",
                        "items-center gap-1"
                    )}
                >
                    {showClear && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Clear search"
                            disabled={disabled}
                            onClick={handleClear}
                        >
                            <X aria-hidden data-icon="inline-start" />
                        </Button>
                    )}
                    {endSlot}
                </div>
            )}
        </div>
    )
}

export { SearchInput, type SearchInputProps }
