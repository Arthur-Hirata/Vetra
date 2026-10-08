import { useState } from "react"
import { deleteUser } from "../../../services/api"
import ConfimationModal from "../../../Components/ConfimationModal"
import type { ProfileData } from "../Profile"

interface ProfileHomeProps {
    profile: ProfileData
}

export default function ProfileHome({ profile }: ProfileHomeProps){
        const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
    
        function handleDelete(){
            setIsDeleteModalOpen(true)
        }
        async function  deletar() {
            try{
                await deleteUser()
                setIsDeleteModalOpen(false)
                
    
            }catch(error:unknown){
                console.log(error)
            }
        }
        function onCancel(){
            setIsDeleteModalOpen(false)
        }
    
    return(
        <div >
             <section id="overview" className="border-b border-border pb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Minha conta</p>
                    <h1 className="text-3xl font-semibold text-text sm:text-4xl">Olá, {profile.name || "seja bem-vindo"}.</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">Gerencie suas informações pessoais e preferências da conta.</p>
            </section>
            
             <section className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-md border border-border bg-cards p-5 shadow-card">
                                        <div className="mb-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-text-secondary">Perfil</p>
                                                <h2 className="mt-1 text-lg font-semibold text-text">Dados pessoais</h2>
                                            </div>
                                            <i className="fa-solid fa-user text-xl text-primary" />
                                        </div>
                                        <dl id="personal-info" className="space-y-4 text-sm">
                                            <div>
                                                <dt className="text-text-secondary">Nome</dt>
                                                <dd className="mt-1 font-medium text-text">{profile.name || "Não informado"}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-text-secondary">E-mail</dt>
                                                <dd className="mt-1 break-all font-medium text-text">{profile.email || "Não informado"}</dd>
                                            </div>
                                        </dl>
                                    </div>
            
                                    <div id="address" className="rounded-md border border-border bg-cards p-5 shadow-card">
                                        <div className="mb-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-text-secondary">Entrega</p>
                                                <h2 className="mt-1 text-lg font-semibold text-text">Meu endereço</h2>
                                            </div>
                                            <i className="fa-solid fa-location-dot text-xl text-primary" />
                                        </div>
                                        <p className="text-sm leading-6 text-text">{profile.address || "Nenhum endereço cadastrado."}</p>
                                    </div>
                                </section>
                                <div className="flex flex-row gap-20 items-center ">
                                <section id="security" className="w-150 flex flex-col gap-4 rounded-md border border-border bg-card-accent p-5 sm:flex-row sm:items-center sm:justify-between mt-6">
                                    <div>
                                        <p className="text-sm font-semibold text-text">Segurança da conta</p>
                                        <p className="mt-1 text-sm text-text-secondary">Atualize sua senha e mantenha sua conta protegida.</p>
                                    </div>
                                    <button type="button" className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-hover">
                                        Alterar senha
                                    </button>
                                </section>
                                <div>
                                    <button className="bg-error text-white w-60 h-20 rounded-md border mt-5 border-border transtion:transform duration-300 hover:scale-105" onClick={handleDelete}>
                                        <i className="fas fa-trash"></i> Excluir conta</button>
                                            {isDeleteModalOpen && <ConfimationModal 
                                                OnConfirm={deletar}
                                                OnCancel={onCancel}
                                                title="Cuidado!"
                                                children="Essa ação não pode ser desfeita, tem certeza que deseja exluir sua conta"
                                                confirmText="Deletar"
                                                cancelText="Cancelar"
                                            
                                            />}
                                    </div>
                                </div>
        </div>
    )

}