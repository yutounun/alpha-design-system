import type { Preview } from "@storybook/react-vite"

import "../src/styles/index.css"

const preview: Preview = {
    tags: ["autodocs"],

    parameters: {
        layout: "centered",

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
