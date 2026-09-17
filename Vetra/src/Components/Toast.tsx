interface ToastProps {
    title: string
    content: string
    buttonText: string
    onButtonClick?: () => void
}

export default function Toast({title, content, buttonText, onButtonClick}: ToastProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-text/50 p-6 backdrop-blur-[2px]"
        >
            <div className="flex min-h-90 w-full max-w-lg flex-col items-center justify-center gap-30 rounded-[28px] border border-sucess/20 bg-cards px-8 py-10 text-center shadow-[0_18px_45px_rgba(30,41,59,0.22)] sm:min-h-100 sm:px-12">

                <div className="flex flex-col items-center gap-30">
                    <strong className="text-3xl font-bold text-sucess sm:text-4xl">{title}</strong>
                    <span className="text-2xl leading-7 text-text-secondary">{content}</span>
                </div>

                <button
                    type="button"
                    onClick={onButtonClick}
                    className="min-w-32 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-hover focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                    {buttonText}
                </button>

            </div>
        </div>
    )
}