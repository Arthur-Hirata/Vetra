import Input from "../../Components/Input"
import Button from "../../Components/Button"
import Toast from "../../Components/Toast"
import { useState } from "react"
import { register } from "../../services/api"
import { useNavigate } from "react-router-dom"
export default function AccountCreate(){
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const [toast, setToast] = useState(false)
    async function createAcc (){
        setNameError("")
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
        let isValid = true
        if (userName.trim()===""){
            setNameError("Insira um nome válido")
            isValid = false
        }
        if(userEmail.trim() === "" || !regex.test(userEmail)){
            isValid = false
            setEmailError("Insira um e-mail válido")
        }
        if (userPassword.trim() === "" || userPassword.trim().length < 8){
            isValid = false
            setPasswordError("A senha precisa ter ao menos 8 caracteres")
        }
        if (userPassword.trim() !== confirmPassword.trim()){
            setConfirmPasswordError("As senhas precisam ser iguais")
            setPasswordError("As senhas precisam ser iguais")
            isValid = false
        }
        if (isValid){
            try{
                const data = await register(userEmail, userPassword, userName)
                console.log(data)
                setToast(true)
            }catch (error){
                console.log(error)
            }
        }
    }
    return(
        <div className="bg-background w-full min-h-screen flex items-center justify-center px-6">
            
            <div className="bg-cards w-120 h-160 rounded-[28px] shadow-card border border-border flex flex-col items-center justify-start pt-10">
            <span className="text-center text-4xl font-semibold tracking-[0.28em] text-text uppercase">
                    <span className="">Criar</span>
                </span>
                <div className="flex flex-col mt-3 gap-4">
                    <Input placeholder="Digite seu Nome" subTittle="Nome" type="text"  onChange={(e)=> setUserName(e.target.value)} classname={nameError ? "border-red-600" :""} spanError={nameError}/>
                    <Input placeholder="Digite seu e-mail" subTittle="E-mail" type="text" onChange={(e) => setUserEmail(e.target.value)}  classname={emailError ? "border-red-600" : ""} spanError={emailError}/>
                    <Input placeholder="Digite sua senha" subTittle="Senha" type="password" onChange={(e) => setUserPassword(e.target.value)} classname={passwordError ? "border-red-600" : ""} spanError={passwordError}/>
                    <Input placeholder="Confirme sua senha" subTittle="Confirme sua senha" type="password" onChange={(e) => setConfirmPassword(e.target.value)} classname={confirmPasswordError ? "border-red-600" : ""} spanError={confirmPasswordError} />
                </div>
                <Button children="Criar" onClick={createAcc} className="mt-15 w-50 h-10" />
                {toast && <Toast title="Sucesso" content="Sua conta foi criada com sucesso" buttonText="Continuar" onButtonClick={()=> navigate("/")}/>}
            </div>
        </div>
    )
}