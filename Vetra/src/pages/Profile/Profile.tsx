import { lazy, Suspense, useEffect, useState } from "react"
import { getProfile } from "../../services/api"
import { useNavigate } from "react-router-dom"
import ProfileHome from "./ProfileComponents/ProfileHome"
type Section = "home" | "info" | "cart" | "sells"
const AddInfo = lazy(() => import("./ProfileComponents/AddProfileInfo"))
const ProfileCart = lazy(() =>import("./ProfileComponents/ProfileCart"))
const ProfleSells = lazy(() => import("./ProfileComponents/ProfileSells"))
export interface ProfileData {
    name:string
    email:string
    address : string
    CPF:string
    avatar_url :string
}


export default function Profile(){
    const [profile, setProfile] = useState<ProfileData | null> (null)
    const [section, setSection] = useState<Section>("home")
    const navigate = useNavigate()
    async function loadProfile() {
        try {
            const data = await getProfile()
            setProfile({
                name: data.User.name,
                email: data.User.email,
                address: data.User.address,
                CPF : data.User.CPF,
                avatar_url : data.User.avatar_url
            })
        } catch (error: unknown) {
            if (error instanceof Error && error.message === "Usuário não autenticado") {
                navigate("/")
            } else {
                console.error("Não foi possível carregar o perfil:", error)
            }
        }
    }
    useEffect(() => {
        void loadProfile()
    }, [navigate])


    return(
        <div className="h-screen w-full bg-background px-4 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-start">
                <aside className="w-full shrink-0 rounded-md border border-border bg-cards p-4 shadow-card lg:sticky lg:top-6 lg:w-64">
                    <div className="mb-6 border-b border-border px-2 pb-5">
                        <div className="flex items-center gap-3">
                            <img
                                src={!profile?.avatar_url ? "foto.jpg" : profile.avatar_url}
                                alt={`Foto de ${profile?.name || "usuário"}`}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-text">{profile?.name || "Seu perfil"}</p>
                                <p className="text-xs text-text-secondary">Conta pessoal</p>
                            </div>
                        </div>
                    </div>

                    <nav aria-label="Seções do perfil" className="space-y-1">
                        <a onClick={() => setSection("home")} className={section === "home" ? "flex items-center gap-3 rounded-md bg-card-secondary px-3 py-2.5 text-sm font-semibold text-primary" : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text"}>
                            <i className="fa-solid fa-chart-line w-4 text-center" />
                            Visão geral
                        </a>
                        <a onClick={() => setSection("info")} className={section === "info" ? "flex items-center gap-3 rounded-md bg-card-secondary px-3 py-2.5 text-sm font-semibold text-primary" : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text"}>
                            <i className="fa-solid fa-user w-4 text-center" />
                            Mudar informações
                        </a>
                        <a onClick={() => setSection("cart")} className={section === "cart" ? "flex items-center gap-3 rounded-md bg-card-secondary px-3 py-2.5 text-sm font-semibold text-primary" : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text"}>
                            <i className="fa-solid fa-location-dot w-4 text-center" />
                            Carrinho
                        </a>
                        <a onClick={() => setSection("sells")} className={section === "sells" ? "flex items-center gap-3 rounded-md bg-card-secondary px-3 py-2.5 text-sm font-semibold text-primary" : "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text"}>
                            <i className="fa-solid fa-lock w-4 text-center" />
                            Minhas vendas
                        </a>
                    </nav>
                </aside>
                <main>
                    {section === "home" && profile && <ProfileHome profile={profile} />}
                    {section === "info"&& (
                         <Suspense fallback={<p>Carregando seção...</p>}>
                            <AddInfo profile={profile} onProfileUpdated={loadProfile}/>
                        </Suspense>
                    )}
                    {section === "cart" && (
                         <Suspense fallback={<p>Carregando seção...</p>}>
                            <ProfileCart />
                        </Suspense>
                    )}
                    {section === "sells" && (
                        <Suspense fallback={<p>Carregando seção...</p>}>
                            <ProfleSells />
                        </Suspense>
                    )}

                </main>
    
            </div>
        </div>
    )
}