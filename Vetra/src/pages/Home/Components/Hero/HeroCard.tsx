interface HeroCardProps {
    icon: string
    title: string
    children: string
}

export default function HeroCard({ icon, title, children }: HeroCardProps) {
    return (
        <div className="flex min-h-32 w-full max-w-sm items-center gap-5 rounded-2xl border border-border bg-cards p-6 shadow-card">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-greenBg text-green">
                <i className={`${icon} text-xl`} aria-hidden="true" />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
                <h2 className="font-semibold text-text">{title}</h2>
                <p className="text-sm leading-6 text-text-secondary">{children}</p>
            </div>
        </div>
    )
}