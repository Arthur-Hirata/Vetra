import Input from "../../Components/Input"



export default function Login(){
    return(
        <div className="bg-background w-full min-h-screen flex items-center justify-center px-6">
            <div className="bg-cards w-120 h-150 rounded-[28px] shadow-card border border-border flex flex-col items-center justify-start pt-10">
                <span className="text-center text-4xl font-semibold tracking-[0.28em] text-text uppercase">
                    <span className="">Login</span>
                </span>
                <div className="flex flex-col mt-10 gap-20 items-start justify-start w-full px-10">
                    <Input placeholder="Digite seu e-mail" subTittle="E-mail" type="text"/>
                </div>
            </div>
        </div>
    )
}