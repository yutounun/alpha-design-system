import { Construction } from "lucide-react"

type ComingSoonProps = {
    /** Card heading (English; MDX pages may use Japanese copy in description). */
    title: string
    description: string
    /** Optional link (e.g. GitHub Issues) shown below the description. */
    issueHref?: string
    issueLabel?: string
}

/** Placeholder panel for docs pages that are not ready yet. */
export function ComingSoon({
    title,
    description,
    issueHref,
    issueLabel = "GitHub Issues",
}: ComingSoonProps) {
    return (
        <div className="not-prose flex flex-col gap-4 rounded-xl border border-border-low bg-background-2 p-8">
            <div className="flex items-start gap-4">
                <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border-low bg-background text-foreground-low"
                    aria-hidden
                >
                    <Construction className="size-6" strokeWidth={1.75} />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                    <p className="text-xs font-semibold tracking-wide text-foreground-low uppercase">
                        Coming soon
                    </p>
                    <h2 className="text-foreground text-xl font-semibold tracking-tight">
                        {title}
                    </h2>
                    <p className="text-foreground-2 text-sm leading-relaxed">
                        {description}
                    </p>
                    {issueHref ? (
                        <p className="text-sm">
                            <a
                                href={issueHref}
                                className="text-foreground hover:decoration-foreground font-medium underline decoration-border-medium underline-offset-4"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {issueLabel}
                            </a>
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
