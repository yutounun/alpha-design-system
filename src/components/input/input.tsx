import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"

const inputVariants = cva(
    [
        "flex w-full min-w-0 rounded-md border bg-background-1",
        "text-foreground-high transition-colors",
        "placeholder:text-foreground-low",
        "border-border-medium",
        "focus-ring-input focus-ring-input-invalid-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-border-invalid",
        "aria-invalid:ring-3 aria-invalid:ring-invalid-ring",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        "file:text-sm file:font-medium file:text-foreground-high",
    ],
    {
        variants: {
            size: {
                sm: "h-8 px-2.5 py-1.5 text-sm",
                md: "h-9 px-3 py-2 text-md",
                lg: "h-10 px-3 py-2.5 text-lg",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
    VariantProps<typeof inputVariants> & {
        /** Called when the text value changes (in addition to `onChange`). */
        onValueChange?: (value: string) => void
        /** When true, a clear control is shown while the field has a non-empty value. */
        showClear?: boolean
        /** Fired when the clear button is pressed. */
        onClear?: () => void
    }

/**
 * Single-line text input with size variants and invalid / disabled states aligned to design tokens.
 * Use `aria-invalid` for validation styling (for example from `FormField` or your form library).
 */
function Input({
    className,
    type = "text",
    size = "md",
    value,
    defaultValue,
    onChange,
    onValueChange,
    showClear = false,
    onClear,
    disabled,
    ref,
    ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
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

    const showClearButton = showClear && currentValue.length > 0 && !disabled

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
        inputRef.current?.focus()
    }

    const inputClassName = cn(
        inputVariants({ size }),
        showClear ? "pr-9" : null,
        className
    )

    if (!showClear) {
        return (
            <input
                data-slot="input"
                ref={ref}
                type={type}
                disabled={disabled}
                {...props}
                className={inputClassName}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
            />
        )
    }

    return (
        <div data-slot="input-wrapper" className="relative w-full">
            <input
                data-slot="input"
                ref={mergedRef}
                type={type}
                disabled={disabled}
                {...props}
                className={inputClassName}
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
            />
            {showClearButton && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Clear"
                    disabled={disabled}
                    onClick={handleClear}
                    className={cn(
                        "absolute top-1/2 right-2",
                        "-translate-y-1/2"
                    )}
                >
                    <X aria-hidden data-icon="inline-start" />
                </Button>
            )}
        </div>
    )
}

export { Input, inputVariants, type InputProps }
