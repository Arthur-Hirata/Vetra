import Input from "../../Components/Input"
import Button from "../../Components/Button"
export default function AccountCreate(){
    function createAcc(){

    }
    return(
        <div className="bg-background w-full min-h-screen flex items-center justify-center px-6">
            <div className="bg-cards w-120 h-130 rounded-[28px] shadow-card border border-border flex flex-col items-center justify-start pt-10">
            <span className="text-center text-4xl font-semibold tracking-[0.28em] text-text uppercase">
                    <span className="">Criar</span>
                </span>
                <div className="flex flex-col mt-3 gap-4">
                    <Input placeholder="Digite seu e-mail" subTittle="E-mail" type="text" />
                    <Input placeholder="Digite sua senha" subTittle="Senha" type="password" />
                    <Input placeholder="Confirme sua senha" subTittle="Confirme sua senha" type="password" />

                </div>
                <Button children="Criar" onClick={createAcc} className="mt-15 w-50 h-10" />
            </div>
        </div>
    )
}