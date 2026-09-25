import { useCallback, useEffect, useState } from "react"
import { getProfile } from "../../services/api"
import { deleteUser } from "../../services/api"
import ConfimationModal from "../../Components/ConfimationModal"
export default function Profile(){
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
    const getUserData = useCallback(async()=>{
        try{
            const data = await getProfile()
            setUserName(data.User['name'])
            setUserEmail(data.User['email'])
            setUserAddress(data.User['address'])
        }
        catch (error:unknown){
            console.log(error)
        }
    }, [])
    useEffect(()=>{
        const timeoutId = window.setTimeout(()=>{
            void getUserData()
        })
        return () => window.clearTimeout(timeoutId)
    }, [getUserData])

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
        <div className="h-screen w-full bg-background px-4 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-start">
                <aside className="w-full shrink-0 rounded-md border border-border bg-cards p-4 shadow-card lg:sticky lg:top-6 lg:w-64">
                    <div className="mb-6 border-b border-border px-2 pb-5">
                        <div className="flex items-center gap-3">
                            <img
                                src="/foto.jpg"
                                alt={`Foto de ${userName || "usuário"}`}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-text">{userName || "Seu perfil"}</p>
                                <p className="text-xs text-text-secondary">Conta pessoal</p>
                            </div>
                        </div>
                    </div>

                    <nav aria-label="Seções do perfil" className="space-y-1">
                        <a href="#overview" className="flex items-center gap-3 rounded-md bg-card-secondary px-3 py-2.5 text-sm font-semibold text-primary">
                            <i className="fa-solid fa-chart-line w-4 text-center" />
                            Visão geral
                        </a>
                        <a href="#personal-info" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text">
                            <i className="fa-solid fa-user w-4 text-center" />
                            Dados pessoais
                        </a>
                        <a href="#address" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text">
                            <i className="fa-solid fa-location-dot w-4 text-center" />
                            Endereço
                        </a>
                        <a href="#security" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text">
                            <i className="fa-solid fa-lock w-4 text-center" />
                            Segurança
                        </a>
                    </nav>
                </aside>

                <main className="min-w-0 flex-1 space-y-6">
                    <section id="overview" className="border-b border-border pb-6">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Minha conta</p>
                        <h1 className="text-3xl font-semibold text-text sm:text-4xl">Olá, {userName || "seja bem-vindo"}.</h1>
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
                                    <dd className="mt-1 font-medium text-text">{userName || "Não informado"}</dd>
                                </div>
                                <div>
                                    <dt className="text-text-secondary">E-mail</dt>
                                    <dd className="mt-1 break-all font-medium text-text">{userEmail || "Não informado"}</dd>
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
                            <p className="text-sm leading-6 text-text">{userAddress || "Nenhum endereço cadastrado."}</p>
                        </div>
                    </section>
                    <div className="flex flex-row gap-20 items-center ">
                    <section id="security" className="w-150 flex flex-col gap-4 rounded-md border border-border bg-card-accent p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-text">Segurança da conta</p>
                            <p className="mt-1 text-sm text-text-secondary">Atualize sua senha e mantenha sua conta protegida.</p>
                        </div>
                        <button type="button" className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-hover">
                            Alterar senha
                        </button>
                    </section>
                    <div>
                        <button className="bg-error text-white w-60 h-20 rounded-md border border-border transtion:transform duration-300 hover:scale-105" onClick={handleDelete}>
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
                </main>
            </div>
        </div>
    )
}