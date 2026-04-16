import * as React from "react"
import { CircleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/label"

function mergeAriaDescribedBy(
    existing: string | undefined,
    ...ids: (string | undefined)[]
) {
    const parts = [
        ...(existing?.split(/\s+/).filter(Boolean) ?? []),
        ...ids.filter((value) => Boolean(value)),
    ] as string[]
    return [...new Set(parts)].join(" ") || undefined
}

export type FormFieldProps = {
    /** Visible label; appends a required hint when `required` is true. */
    label: React.ReactNode
    /** Helper copy shown between the label and the control. */
    description?: React.ReactNode
    /** When set, shows an error message and marks the control invalid. */
    error?: React.ReactNode
    /**
     * When true, appends a visible "(required)" hint and sets `required` on the control
     * unless already present.
     */
    required?: boolean
    /** Single element such as `Input` or `Textarea`. */
    children: React.ReactElement<{
        id?: string
        required?: boolean
        "aria-describedby"?: string
        "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling"
    }>
    className?: string
    id?: string
}

/**
 * Vertical field layout: label, optional description, control, and optional error text.
 * Wires `id`, `htmlFor`, `aria-describedby`, `aria-invalid`, and `required` for basic a11y.
 */
function FormField({
    label,
    description,
    error,
    required,
    children,
    className,
    id: idProp,
}: FormFieldProps) {
    const reactId = React.useId()
    const stableSuffix = reactId.replace(/:/g, "")
    const generatedId = idProp ?? `field-${stableSuffix}`
    const controlId = children.props.id ?? generatedId
    const descriptionId = description ? `${controlId}-description` : undefined
    const errorId = error ? `${controlId}-error` : undefined
    const invalid = Boolean(error)

    const describedBy = mergeAriaDescribedBy(
        children.props["aria-describedby"],
        descriptionId,
        errorId
    )

    const control = React.cloneElement(children, {
        id: controlId,
        required: required ?? children.props.required,
        "aria-describedby": describedBy,
        "aria-invalid": invalid ? true : children.props["aria-invalid"],
    })

    return (
        <div
            data-slot="form-field"
            className={cn("flex flex-col gap-1.5", className)}
        >
            <div className="flex flex-col gap-1">
                <Label htmlFor={controlId} aria-invalid={invalid || undefined}>
                    {label}
                    {required ? (
                        <>
                            {" "}
                            <span className="font-normal text-foreground-medium">
                                (required)
                            </span>
                        </>
                    ) : null}
                </Label>
                {description ? (
                    <p
                        id={descriptionId}
                        className="text-xs text-foreground-low"
                    >
                        {description}
                    </p>
                ) : null}
            </div>
            {control}
            {error ? (
                <p
                    id={errorId}
                    role="alert"
                    className="flex items-start gap-1.5 text-sm text-danger-text"
                >
                    <CircleAlert
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0"
                    />
                    <span>{error}</span>
                </p>
            ) : null}
        </div>
    )
}

export { FormField }
