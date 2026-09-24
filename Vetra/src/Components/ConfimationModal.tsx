import Button from "./Button"
interface ConfimationModalProps{
    children:string
    title:string
    confirmText: string
    cancelText:string
    OnConfirm : () => void
    OnCancel : () => void
}


export default function ConfimationModal({children, title, confirmText, cancelText,OnConfirm, OnCancel} : ConfimationModalProps){
    return(
        <div>
            <div className="w-120 h-120 rounded-md bg-card flex flex-col items-center justify-center gap-30 ">
                    <span>{title}</span>
                    <span>{children} ?</span>
                    <div className="flex flex-row gap-20">
                        <Button children={confirmText} onClick={OnConfirm}/>
                        <Button children={cancelText} onClick={OnCancel}/>
                    </div>
            </div>
        </div>
    )
}