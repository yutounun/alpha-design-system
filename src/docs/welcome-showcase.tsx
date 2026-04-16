import { Send } from "lucide-react"

import { Button } from "@/components/button"
import { FormField } from "@/components/form-field"
import { Input } from "@/components/input"
import { Textarea } from "@/components/textarea"

// --- Button variants section ---

const BUTTON_VARIANTS = [
    { variant: "primary", label: "Primary" },
    { variant: "secondary", label: "Secondary" },
    { variant: "outline", label: "Outline" },
    { variant: "ghost", label: "Ghost" },
    { variant: "destructive", label: "Destructive" },
] as const

export function ButtonShowcase() {
    return (
        <div className="not-prose flex flex-col gap-8 rounded-xl border border-border-low bg-background-2 p-6">
            <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold tracking-wide text-foreground-low uppercase">
                    Variants
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    {BUTTON_VARIANTS.map(({ variant, label }) => (
                        <Button key={variant} variant={variant}>
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold tracking-wide text-foreground-low uppercase">
                    Sizes
                </p>
                <div className="flex flex-wrap items-end gap-2">
                    <Button size="xs">Extra small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold tracking-wide text-foreground-low uppercase">
                    States
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <Button loading>Saving…</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline">
                        <Send data-icon="inline-end" />
                        With icon
                    </Button>
                </div>
            </div>
        </div>
    )
}

// --- Form fields section ---

export function FormShowcase() {
    return (
        <div className="not-prose flex flex-col gap-4 rounded-xl border border-border-low bg-background-2 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="First name" required>
                    <Input placeholder="Jane" />
                </FormField>
                <FormField label="Last name" required>
                    <Input placeholder="Doe" />
                </FormField>
            </div>

            <FormField
                label="Email"
                description="We'll only use this for account-related notifications."
            >
                <Input type="email" placeholder="jane@example.com" />
            </FormField>

            <FormField label="Username" error="That username is already taken.">
                <Input
                    placeholder="janedoe"
                    aria-invalid="true"
                    defaultValue="janedoe"
                />
            </FormField>

            <FormField
                label="Bio"
                description="A short introduction shown on your public profile."
            >
                <Textarea placeholder="Tell us a little about yourself…" />
            </FormField>

            <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
            </div>
        </div>
    )
}
