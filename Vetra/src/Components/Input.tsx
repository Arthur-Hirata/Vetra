import { useState, type ChangeEvent } from "react"

interface InputProps{
    placeholder?: string
    type: string
    subTittle?: string
    classname?: string
    spanError?:string
    value?:string
    onChange?: (event : ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ placeholder, type, subTittle, classname, spanError, value, onChange }: InputProps) {
    const [inputType, setInputType] = useState('password')
    const baseInputClasses = 'h-12 rounded-xl border border-border bg-input px-4 text-sm text-text placeholder:text-text-secondary shadow-[0_4px_12px_rgba(30,41,59,0.03)] transition-all duration-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10'
    const inputWidthClass = classname ?? 'w-full'

    if (type === 'password'){

        return(
            <div>
            <label className="flex w-full flex-col gap-2">
            <span className="text-medium font-medium text-text-secondary">{subTittle}</span>
            <div className="flex flex-row">
            <input
                type={inputType}
                value={value}
                placeholder={placeholder}
                className={`${baseInputClasses} shrink-0 ${inputWidthClass}`}
                onChange={onChange}
            />
            <button  className="-ml-10 mt-1"type="button" onClick={() => setInputType(inputType === 'password' ? "text" : "password")}><i className={inputType === "password" ? "fas fa-eye-slash" : "fas fa-eye"}></i></button>
            </div>
            <span className="text-[12px] text-red-600 -mt-1">{spanError}</span>
        </label>
            </div>
        )
    }
    return (
        <div>
            <label className="flex w-full flex-col gap-2" >
                <span className="text-medium font-medium text-text-secondary">{subTittle}</span>
                <input
                type={type}
                value={value}
                placeholder={placeholder}
                className={`${baseInputClasses} ${inputWidthClass}`}
                onChange={onChange}
            />
            <span className="text-[10px] text-red-600 -mt-1">{spanError}</span>
            </label>
        </div>
    )







}