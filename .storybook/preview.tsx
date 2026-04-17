import { useEffect, type ReactNode } from "react"
import type { Preview } from "@storybook/react-vite"

import "../src/styles/index.css"
import "./docs-tables.css"
import "./themes/theme2.css"

function StorybookThemeRoot({
    theme,
    colorScheme,
    children,
}: {
    theme: string
    colorScheme: string
    children: ReactNode
}) {
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        document.documentElement.classList.toggle(
            "dark",
            colorScheme === "dark"
        )
    }, [theme, colorScheme])

    return <>{children}</>
}

const preview: Preview = {
    tags: ["autodocs"],

    globalTypes: {
        theme: {
            description: "Design theme",
            toolbar: {
                title: "Theme",
                icon: "paintbrush",
                items: [
                    { value: "theme1", title: "Theme 1" },
                    { value: "theme2", title: "Theme 2" },
                ],
                dynamicTitle: true,
            },
        },
        colorScheme: {
            description: "Color scheme",
            toolbar: {
                title: "Mode",
                icon: "sun",
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                ],
                dynamicTitle: true,
            },
        },
    },

    initialGlobals: {
        theme: "theme1",
        colorScheme: "light",
    },

    decorators: [
        (Story, context) => {
            const theme = (context.globals.theme as string) ?? "theme1"
            const colorScheme =
                (context.globals.colorScheme as string) ?? "light"

            return (
                <StorybookThemeRoot theme={theme} colorScheme={colorScheme}>
                    <Story />
                </StorybookThemeRoot>
            )
        },
    ],

    parameters: {
        layout: "centered",

        options: {
            storySort: {
                order: [
                    "Getting Started",
                    [
                        "Overview",
                        "Installation",
                        "Skills",
                        "MCP Server",
                        "Changelog",
                    ],
                    "Design Tokens",
                    ["Colors", "Typography", "Border Radius"],
                    "Components",
                ],
            },
        },

        docs: {
            // Story canvas: bottom panel with generated usage source (replaces addon-storysource).
            codePanel: true,
            canvas: {
                // Docs tab: Canvas block source expanded by default.
                sourceState: "shown",
            },
        },

        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            test: "todo",
        },
    },
}

export default preview
