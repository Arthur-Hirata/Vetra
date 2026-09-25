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
            <div className="flex w-120 h-90 flex-col items-center justify-center gap-6 rounded-md bg-card-accent p-6 text-center shadow-card">
                <span className="text-3xl text-error">{title}</span>
                <span className="text-2xl text-text">{children}</span>
                <div className="flex flex-row gap-4 mt-4">
                    <Button onClick={OnConfirm} className="bg-sucess">{confirmText}</Button>
                    <Button onClick={OnCancel} className="bg-red-500">{cancelText}</Button>
                </div>
            </div>
        </div>
    )
}