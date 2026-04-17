import {
    ArrowDown,
    CheckCircle,
    GitPullRequest,
    Package,
    Rocket,
    Terminal,
    Upload,
    Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"

// ── Types ────────────────────────────────────────────────────────────────────

interface Step {
    icon: React.ReactNode
    phase: string
    title: string
    description: React.ReactNode
    code?: string
    accent: "blue" | "purple" | "orange" | "teal"
}

interface PhaseGroupProps {
    label: string
    steps: Step[]
}

// ── Data ─────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
    {
        icon: <Terminal className="size-4" />,
        phase: "Local",
        title: "Edit tokens or components",
        description: (
            <>
                Modify design tokens in <code>src/styles/theme.css</code> or
                update a component under <code>src/components/</code>. Run
                Storybook to verify the change visually.
            </>
        ),
        code: "pnpm storybook",
        accent: "blue",
    },
    {
        icon: <GitPullRequest className="size-4" />,
        phase: "Local",
        title: "Create a changeset",
        description: (
            <>
                Record what changed and the semver bump type
                (patch&nbsp;/&nbsp;minor&nbsp;/&nbsp;major). This produces a
                Markdown file in <code>.changeset/</code> that drives the
                release.
            </>
        ),
        code: "pnpm changeset",
        accent: "blue",
    },
    {
        icon: <Upload className="size-4" />,
        phase: "CI",
        title: "Push & open a pull request",
        description: (
            <>
                Push your branch to GitHub and open a pull request. GitHub
                Actions runs lint, typecheck, Storybook Vitest tests, and a
                library build on every commit.
            </>
        ),
        code: "git push origin feat/your-change",
        accent: "purple",
    },
    {
        icon: <CheckCircle className="size-4" />,
        phase: "CI",
        title: "Review & merge",
        description: (
            <>
                Once CI is green and the PR is approved, merge to{" "}
                <code>main</code>. The release workflow fires automatically.
            </>
        ),
        accent: "purple",
    },
    {
        icon: <Zap className="size-4" />,
        phase: "Release",
        title: "Changesets bot opens a Release PR",
        description: (
            <>
                The <code>changesets/action</code> bot reads all pending
                changeset files, bumps the version in <code>package.json</code>,
                and opens a <em>&ldquo;chore: release&rdquo;</em> PR with a
                generated changelog entry.
            </>
        ),
        accent: "orange",
    },
    {
        icon: <Rocket className="size-4" />,
        phase: "Release",
        title: "Merge → publish to npm",
        description: (
            <>
                Merging the Release PR triggers the publish step: the library is
                built with <code>pnpm build:lib</code>, then{" "}
                <code>changeset publish</code> pushes the new version to the npm
                registry.
            </>
        ),
        code: "pnpm run release   # runs in CI",
        accent: "orange",
    },
    {
        icon: <Package className="size-4" />,
        phase: "Consumer",
        title: "Update the package",
        description: (
            <>
                In any app that depends on <code>alpha-design-system</code>,
                bump to the new version. Import the updated component or load
                the refreshed CSS tokens.
            </>
        ),
        code: "pnpm update alpha-design-system",
        accent: "teal",
    },
]

const PHASE_GROUPS: PhaseGroupProps[] = [
    { label: "Local Development", steps: STEPS.slice(0, 2) },
    { label: "CI / Pull Request", steps: STEPS.slice(2, 4) },
    { label: "Automated Release", steps: STEPS.slice(4, 6) },
    { label: "Consumer Adoption", steps: STEPS.slice(6) },
]

// ── Accent maps ───────────────────────────────────────────────────────────────

const PHASE_BG: Record<Step["accent"], string> = {
    blue: "bg-informative-muted",
    purple: "bg-primary-muted",
    orange: "bg-warning-muted",
    teal: "bg-success-muted",
}

const PHASE_ICON_BG: Record<Step["accent"], string> = {
    blue: "bg-informative-muted text-informative",
    purple: "bg-primary-muted text-primary-text",
    orange: "bg-warning-muted text-warning",
    teal: "bg-success-muted text-success-text",
}

const PHASE_BADGE: Record<Step["accent"], string> = {
    blue: "bg-informative text-informative-foreground",
    purple: "bg-primary text-primary-foreground",
    orange: "bg-warning text-warning-foreground",
    teal: "bg-success text-success-foreground",
}

const GROUP_BAR: Record<string, string> = {
    "Local Development": "bg-informative",
    "CI / Pull Request": "bg-primary",
    "Automated Release": "bg-warning",
    "Consumer Adoption": "bg-success",
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StepCard({ step, isLast }: { step: Step; isLast: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <div
                className={[
                    "w-full rounded-xl border border-border-medium p-4",
                    PHASE_BG[step.accent],
                ].join(" ")}
            >
                {/* Header */}
                <div className="mb-3 flex items-center gap-3">
                    <span
                        className={[
                            "flex size-8 shrink-0 items-center justify-center rounded-lg",
                            PHASE_ICON_BG[step.accent],
                        ].join(" ")}
                    >
                        {step.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="mb-0.5">
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full",
                                    "px-2 py-0.5 text-xs font-semibold tracking-wide uppercase",
                                    PHASE_BADGE[step.accent]
                                )}
                            >
                                {step.phase}
                            </span>
                        </div>
                        <p className="text-foreground text-sm leading-snug font-semibold">
                            {step.title}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-foreground-medium">
                    {step.description}
                </p>

                {/* Code snippet */}
                {step.code && (
                    <pre className="bg-background-3 mt-3 overflow-x-auto rounded-lg px-3 py-2 text-2xs text-foreground-medium">
                        <code>{step.code}</code>
                    </pre>
                )}
            </div>

            {/* Arrow connector */}
            {!isLast && (
                <div className="flex flex-col items-center py-1">
                    <div className="h-4 w-px bg-border-low" />
                    <ArrowDown className="size-3 text-foreground-low" />
                </div>
            )}
        </div>
    )
}

function PhaseGroup({ label, steps }: PhaseGroupProps) {
    const bar = GROUP_BAR[label] ?? "bg-border-low"
    return (
        <div className="flex gap-4">
            {/* Phase bar */}
            <div className="flex flex-col items-center gap-2 pt-6">
                <div className={`w-1 flex-1 rounded-full ${bar}`} />
            </div>

            {/* Steps */}
            <div className="flex min-w-0 flex-1 flex-col gap-0">
                <p className="mb-2 text-2xs font-semibold tracking-widest text-foreground-low uppercase">
                    {label}
                </p>
                {steps.map((step, i) => (
                    <StepCard
                        key={step.title}
                        step={step}
                        isLast={i === steps.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ReleaseFlow() {
    return (
        <div className="not-prose my-8 flex max-w-2xl flex-col gap-3">
            {PHASE_GROUPS.map((group, i) => (
                <div key={group.label} className="flex flex-col">
                    <PhaseGroup {...group} />
                    {i < PHASE_GROUPS.length - 1 && (
                        <div className="flex items-center gap-4 py-1 pl-5">
                            <div className="flex flex-col items-center">
                                <div className="h-4 w-px bg-border-low" />
                                <ArrowDown className="size-3 text-foreground-low" />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
