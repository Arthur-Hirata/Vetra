import Input from "../../Components/Input"
import Button from "../../Components/Button"


export default function Login(){
    return(
        <div className="bg-background w-full min-h-screen flex items-center justify-center px-6">
            <div className="bg-cards w-120 h-125 rounded-[28px] shadow-card border border-border flex flex-col items-center justify-start pt-10">
                <span className="text-center text-4xl font-semibold tracking-[0.28em] text-text uppercase">
                    <span className="">Login</span>
                </span>
                <div className="flex flex-col mt-10 gap-3 items-start justify-start w-full px-10">
                    <div className="flex flex-col gap-4">
                        <Input placeholder="Digite seu e-mail" subTittle="E-mail" type="text"/>
                        <Input placeholder="Digite sua senha" type="password" subTittle="Senha" />
                    </div>
                    <a href=""><span className="text-blue-500 flex text-sm hover:cursor-pointer">Não tem uma conta? Crie agora.</span></a>
                    <div className="flex flex-row gap-3">
                        <input type="checkbox" />
                        <span className="text-sm">Manter-se conectado</span>
                    </div>
                </div>
                <Button children={"Login"} className="mt-15 w-50 h-10" />
            </div>
        </div>
    )
}