import { lazy, Suspense, useCallback, useEffect, useState } from "react"
import { getProfile } from "../../services/api"
import { useNavigate } from "react-router-dom"
import ProfileHome from "./ProfileComponents/ProfileHome"
type Section = "home" | "info" | "cart" | "sells"
const AddInfo = lazy(() => import("./ProfileComponents/AddProfileInfo"))
const ProfileCart = lazy(() =>import("./ProfileComponents/ProfileCart"))
const ProfleSells = lazy(() => import("./ProfileComponents/ProfileSells"))
export default function Profile(){
    const [section, setSection] = useState<Section>("home")
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const getUserData = useCallback(async()=>{
        try{
            const data = await getProfile()
            setUserName(data.User['name'])
        }
        catch (error:unknown){
            if (error instanceof Error){
                if (error.message === "Usuário não autenticado"){
                    navigate("/")
                }
            }
        }
    },[])
    useEffect(()=>{
        const timeoutId = window.setTimeout(()=>{
            void getUserData()
        })
        return () => window.clearTimeout(timeoutId)
    }, [getUserData])

    
    


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
                        <a onClick={() => setSection("home")} className="flex items-center gap-3 rounded-md bg-card-secondary px-3 py-2.5 text-sm font-semibold text-primary">
                            <i className="fa-solid fa-chart-line w-4 text-center" />
                            Visão geral
                        </a>
                        <a onClick={() => setSection("info")} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text">
                            <i className="fa-solid fa-user w-4 text-center" />
                            Mudar informações
                        </a>
                        <a onClick={() => setSection("cart")} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text">
                            <i className="fa-solid fa-location-dot w-4 text-center" />
                            Carrinho
                        </a>
                        <a onClick={() => setSection("sells")} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-card-secondary hover:text-text">
                            <i className="fa-solid fa-lock w-4 text-center" />
                            Minhas vendas
                        </a>
                    </nav>
                </aside>
                <main>
                    {section === "home" && <ProfileHome/>}
                    {section === "info"&& (
                         <Suspense fallback={<p>Carregando seção...</p>}>
                            <AddInfo />
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