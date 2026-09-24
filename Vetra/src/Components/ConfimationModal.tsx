import Button from "./Button"

interface ConfimationModalProps{
    children: React.ReactNode
    title: string
    confirmText: string
    cancelText: string
    OnConfirm: () => void
    OnCancel: () => void
}

export default function ConfimationModal({ children, title, confirmText, cancelText, OnConfirm, OnCancel }: ConfimationModalProps){
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex w-120 h-130 flex-col items-center justify-center gap-6 rounded-md bg-card-accent p-6 text-center shadow-card">
                <span className="text-lg font-semibold text-text">{title}</span>
                <span className="text-sm text-text-secondary">{children}</span>
                <div className="flex flex-row gap-4">
                    <Button onClick={OnConfirm}>{confirmText}</Button>
                    <Button onClick={OnCancel}>{cancelText}</Button>
                </div>
            </div>
        </div>
    )
}