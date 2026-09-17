interface NotificationProps {
    title: string
    content: string
    buttonText: string
    onButtonClick?: () => void
}

export default function Notification({title, content, buttonText, onButtonClick}: NotificationProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 flex w-[min(380px,calc(100vw-3rem))] items-start gap-4 rounded-2xl border border-sucess/20 bg-cards p-4 shadow-[0_18px_45px_rgba(30,41,59,0.14)] animate-[toast-in_300ms_ease-out]"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sucess/15 text-lg font-bold text-sucess">
                <span aria-hidden="true">&#10003;</span>
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
                <strong className="block text-sm font-semibold text-text">{title}</strong>
                <span className="mt-1 block text-sm leading-5 text-text-secondary">{content}</span>
            </div>

            <button
                type="button"
                onClick={onButtonClick}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-card-secondary hover:text-hover focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
                {buttonText}
            </button>
        </div>
    )
}