import { useState } from "react"

interface InputProps{
    placeholder: string
    type: string
    subTittle: string
}

export default function Input({ placeholder, type, subTittle }: InputProps) {
    const [mostrarSenha, setMostrarSenha]= useState(false)


    const initialType = type === 'password'

    const currentType = mostrarSenha ? "text" : "password"

    return (
        <div>
        <label className="flex w-full flex-col gap-2">
            <span className="text-medium font-medium text-text-secondary">{subTittle}</span>
            <input
                type={currentType}
                placeholder={placeholder}
                className="h-12 w-90 rounded-xl border border-border bg-input px-4 text-sm text-text placeholder:text-text-secondary shadow-[0_4px_12px_rgba(30,41,59,0.03)] transition-all duration-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {initialType && (
                <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                
                ><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"}></i></button>
            )}
        </label>

        </div>
    )
}