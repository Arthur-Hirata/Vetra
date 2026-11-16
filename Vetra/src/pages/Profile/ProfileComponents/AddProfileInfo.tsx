import { updateUser } from "../../../services/api"
import Input from "../../../Components/Input"
import Button from "../../../Components/Button"
import { useState } from "react"
import type { ProfileData } from "../Profile"
import ConfimationModal from "../../../Components/ConfimationModal"
import Notification from "../../../Components/Notification"
interface AddInfoProfileProps {
    profile: ProfileData
    onProfileUpdated:() => Promise<void>
}

export default function AddInfo({ profile, onProfileUpdated }: AddInfoProfileProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [notificationVisible, setNotificationVisible] = useState(false)
    const [userName, setUserName] = useState(profile.name ?? "")
    const [address, setAddress] = useState(profile.address ?? "")
    const [CPF, setCPF] = useState(profile.CPF ?? "")
    const [cpfError, setCPFerror] = useState("")
    const [avatar_url, setAvatar_url] = useState(profile.avatar_url ?? "")
    const regexCPF = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/
    console.log(profile)
    function HandleUpdate(){
        if (CPF){
            if (!regexCPF.test(CPF)){
                setCPFerror("Insira um CPF válido")
                return
            }
            setCPFerror("")
        }
        setIsModalOpen(true)
    }
    async function updateUserinfo() {
        try{
            await updateUser(userName, address, CPF, avatar_url)
            await onProfileUpdated()
            setIsModalOpen(false)
            setNotificationVisible(true)
        }
        catch(error:unknown){
            if (error instanceof Error){
                console.log(error.message)
            }
            setIsModalOpen(false)
        }
    }
    function onCancel(){
        setIsModalOpen(false)
    }
    return (
        <div className="flex flex-col gap-3">
            <section id="overview" className="border-b border-border pb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Minha conta</p>
                    <h1 className="text-3xl font-semibold text-text sm:text-4xl">Altere suas informações</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">Atualize as suas informações de contato caso precise.</p>
            </section>
            <div className="rounded-md border border-border bg-cards p-5 shadow-card w-200 h-145">
                <div className="flex flex-col items-center justify-center w-full">

                <img src={!profile?.avatar_url ? "foto.jpg" : profile.avatar_url}  className="h-35 w-35 rounded-full object-cover items-center flex justify-center" />
                <Input value={userName} subTittle="Nome" type="text" classname="w-100" onChange={(e) => setUserName(e.target.value)}/>
                <Input value={address} subTittle="  Cidade-Estado" type="text" classname="w-100" placeholder={profile.address ? "" : "Informe CEP (Cidade-Estado)"} onChange={(e) => setAddress(e.target.value)}/>
                <Input value={CPF} subTittle="CPF" type="text"  classname={cpfError ? "border-red-600 w-100" : "w-100"} placeholder={profile.CPF ? "" : "Informe seu CPF"} onChange={(e) => setCPF(e.target.value)} spanError={cpfError}/>
                <Input value={avatar_url}  type="text" subTittle="Foto de perfil" classname="w-100" placeholder={profile.avatar_url ? "" : "Adicione uma foto de perfil"} onChange={(e) => setAvatar_url(e.target.value)} />
                <Button children="Continuar" className="mt-5" onClick={HandleUpdate}/>
                </div>
                {isModalOpen && <ConfimationModal 
                    OnConfirm={updateUserinfo}
                    OnCancel={onCancel}
                    title="Cuidado!"
                    children="Confira se as suas informações alteradas estão corretas."
                    confirmText="Alterar"
                    cancelText="Voltar"                                         
                />}
            </div>
            {notificationVisible && (
                <Notification
                    title="Informações atualizadas"
                    content="Sucesso, recarrege a página para ver as alterações"
                    buttonText="Fechar"
                    onButtonClick={() => setNotificationVisible(false)}
                />
            )}
        </div>
    )
}