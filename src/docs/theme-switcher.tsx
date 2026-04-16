import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"

function readThemeFromDom(): string {
    return document.documentElement.getAttribute("data-theme") ?? "theme1"
}

function readModeFromDom(): "light" | "dark" {
    return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
}

/**
 * In-doc Theme / Mode controls (Storybook toolbar uses the same `data-theme` and `.dark` on `<html>`).
 */
export function ThemeSwitcher({ className }: { className?: string }) {
    const [theme, setTheme] = React.useState<string>(() => readThemeFromDom())
    const [mode, setMode] = React.useState<"light" | "dark">(() =>
        readModeFromDom()
    )

    React.useEffect(() => {
        const sync = () => {
            setTheme(readThemeFromDom())
            setMode(readModeFromDom())
        }
        const observer = new MutationObserver(sync)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme", "class"],
        })
        return () => observer.disconnect()
    }, [])

    return (
        <div
            className={cn(
                "not-prose mb-6 flex flex-wrap items-end gap-6",
                className
            )}
        >
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-foreground-medium">
                    Theme
                </span>
                <Tabs
                    value={theme}
                    onValueChange={(next) => {
                        document.documentElement.setAttribute(
                            "data-theme",
                            next
                        )
                        setTheme(next)
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="theme1">Theme 1</TabsTrigger>
                        <TabsTrigger value="theme2">Theme 2</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-foreground-medium">
                    Mode
                </span>
                <Tabs
                    value={mode}
                    onValueChange={(next) => {
                        const m = next as "light" | "dark"
                        document.documentElement.classList.toggle(
                            "dark",
                            m === "dark"
                        )
                        setMode(m)
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="light">Light</TabsTrigger>
                        <TabsTrigger value="dark">Dark</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}
