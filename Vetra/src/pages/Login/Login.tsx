import Input from "../../Components/Input"
import Button from "../../Components/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../services/AuthApi"
import Toast from "../../Components/Toast"


interface ApiError extends Error {
    data?:{
        wait_time?: number
        message?: string
    }
}
export default function Login(){
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const[field, setField] = useState(false)
    const [toast, setToast] = useState(false)


    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError]= useState("")
    async function handleLogin(){
        let isValid = true
        setEmailError("")
        setPasswordError("")
        if (userEmail.trim() === ""){
            setEmailError("Este campo precisa ser preenchido")
            isValid = false
        }
        if (userPassword.trim() === ""){
            setPasswordError("Este campo precisa ser preenchido")
            isValid = false
        }
        if (isValid){
            const rememberUser = field ? true : false
            try {
                const data = await login(userEmail, userPassword, rememberUser);
                if (data.message === "Usuário loggado com sucesso"){
                    setUserEmail("")
                    setUserPassword("")
                    setToast(true)
                }
            }catch (error:unknown){
                if (error instanceof Error){
                    if (error.message === "Senha incorreta"){
                        setUserPassword("")
                        setPasswordError("Senha incorreta")
                    }
                    if (error.message === "Usuário não encontrado"){
                        setUserEmail("")
                        setEmailError("Usuário não encontrado")
                    }
                    if (error.message === "Too many requests"){
                        const apiError = error as ApiError
                        navigate("/too-many-requests", {
                            state: {    
                                wait_time: apiError.data?.wait_time
                            }
                        })
                    }
                    
                }
            }
            
        }
    }
    return(
        <div className="bg-background w-full min-h-screen flex items-center justify-center px-6">
            <div className="bg-cards w-120 h-130 rounded-[28px] shadow-card border border-border flex flex-col items-center justify-start pt-10">
                <span className="text-center text-4xl font-semibold tracking-[0.28em] text-text uppercase">
                    <span className="">Login</span>
                </span>
                <div className="flex flex-col mt-10 gap-3 items-start justify-start w-full px-10">
                    <div className="flex flex-col gap-4">
                        <Input placeholder="Digite seu e-mail" subTittle="E-mail" type="text" onChange={(e)=> setUserEmail(e.target.value)} classname={emailError ? "border-red-600 w-100" : "w-100"} spanError={emailError} value={userEmail}/>
                        <Input placeholder="Digite sua senha" type="password" subTittle="Senha" onChange={(e) => setUserPassword(e.target.value) } classname={passwordError ? "border-red-600 w-100" : " w-100"} spanError={passwordError} value={userPassword}/>
                    </div>
                    <span className="text-blue-500 flex text-sm hover:cursor-pointer" onClick={()=> navigate('/create')}>Não tem uma conta? Crie agora.</span>
                    <label className="relative flex cursor-pointer items-center gap-3 text-text">
                        <input
                            type="checkbox"
                            checked={field}
                            onChange={(e) => setField(e.target.checked)}
                            className="peer size-4 appearance-none rounded border-2 border-border bg-input transition-colors checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <span className="text-sm">Manter-se conectado</span>
                        <span className="pointer-events-none absolute left-1 top-1/2 hidden -translate-y-1/2 text-xs font-bold text-white peer-checked:block">✓</span>
                    </label>
                </div>
                <Button children={"Login"} className="mt-15 w-50 h-10"  onClick={handleLogin}/>
                {toast && <Toast title="Sucesso" content="Login feito com sucesso." buttonText="Continuar" onButtonClick={()=> navigate("/")} />}
            </div>
        </div>
    )
}