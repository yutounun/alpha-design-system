import { useEffect, useState } from "react"

/**
 * Reads resolved CSS custom property values from the document root and
 * re-reads when `data-theme` or `class` on `<html>` changes (Storybook toolbar).
 */
export function useCssVars(
    varNames: readonly string[]
): Record<string, string> {
    const [values, setValues] = useState<Record<string, string>>(() =>
        readCssVars(varNames)
    )

    useEffect(() => {
        const read = () => {
            setValues(readCssVars(varNames))
        }

        read()

        const observer = new MutationObserver(read)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme", "class"],
        })

        return () => observer.disconnect()
    }, [varNames])

    return values
}

function readCssVars(varNames: readonly string[]): Record<string, string> {
    if (typeof document === "undefined") {
        return {}
    }

    const style = getComputedStyle(document.documentElement)
    const next: Record<string, string> = {}

    for (const name of varNames) {
        next[name] = style.getPropertyValue(name).trim()
    }

    return next
}
