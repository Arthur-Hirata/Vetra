
import Input from "../../../Components/Input"
import Button from "../../../Components/Button"
interface AddInfoProfileProps{
    profile :ProfileData
}

export default function AddInfo({profile} : AddInfoProfileProps){
    return (
        <div className="flex flex-col gap-3">
            <section id="overview" className="border-b border-border pb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Minha conta</p>
                    <h1 className="text-3xl font-semibold text-text sm:text-4xl">Altere suas informações</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">Atualize as suas informações de contato caso precise.</p>
            </section>
            <div className="rounded-md border border-border bg-cards p-5 shadow-card w-200 h-145">
                <div className="flex flex-col items-center justify-center w-full">

                <img src="/foto.jpg"  className="h-35 w-35 rounded-full object-cover items-center flex justify-center" />
                <Input value={profile.name} subTittle="Nome" type="text" classname="w-100"/>
                <Input value={profile.address} subTittle="Endereço" type="text" classname="w-100" />
                <Input value={profile.email} subTittle="CPF" type="text"  classname="w-100"/>
                <Input type="text" subTittle="Foto de perfil" classname="w-100"/>
                <Button children="Continuar" className="mt-5"/>
                </div>
            </div>
        </div>
    )
}