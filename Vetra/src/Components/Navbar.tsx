import Button from "./Button"
import HoverSpan from "./HoverSpan"
import Input from "./Input"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { getCurrentUser } from "../services/api"
import { Logout } from "../services/api"

function Navbar(){
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUsername] = useState("")
    const [menuOpen, setMenuOpen] = useState(false)
    const [avatar, setAvatarUrl] = useState("")
    const validateSession = useCallback(async () => {
        try{
            const data = await getCurrentUser()
            setUsername(data.user["name"])
            setAvatarUrl(data.user['user_avatar'])
            setIsAuthenticated(true)
        }catch{
            setUsername("")
            setIsAuthenticated(false)
        }

    }, [])
    useEffect(()=>{
        const timeoutId = window.setTimeout(() => {
            void validateSession()
        }, 0)

        return () => window.clearTimeout(timeoutId)
    }, [validateSession])
    function handleUserClick(){
        if (isAuthenticated){
            setMenuOpen(menuOpen ? false : true)
        }
        else{
            navigate("/login")
        }
    }
    async function handleLogout(){
        setMenuOpen(false)
        try{
            await Logout()
            await validateSession()

        }catch(error:unknown){
            console.log(error)
        }
    }
    return (
        <nav className="relative z-50 flex h-20 w-full items-center border-b border-border bg-cards px-4 sm:px-6">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
                <a href="/" className="flex shrink-0 items-center gap-2 text-green" aria-label="Vetra - Início">
                    <i className="fa-solid fa-store-alt text-2xl sm:text-3xl" aria-hidden="true" />
                    <span className="text-2xl font-semibold sm:text-3xl">Vetra</span>
                </a>

                <div className="hidden items-center gap-6 lg:flex">
                    <HoverSpan message="Início" />
                    <HoverSpan message="Produtos" />
                    <HoverSpan message="Categorias" />
                    <HoverSpan message="Vender" />
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                    <div className="relative hidden sm:block sm:w-44 md:w-56 lg:w-64">
                        <i className="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary" aria-hidden="true" />
                        <Input placeholder="Procure pelo produto que deseja" type="text" classname="w-full pl-9 placeholder:text-xs" />
                    </div>
                    <button aria-label="Favoritos" className="text-error transition-transform duration-300 hover:scale-105">
                        <i className="fa-solid fa-heart" aria-hidden="true" />
                    </button>
                    <button aria-label="Carrinho" className="transition-transform duration-300 hover:scale-105">
                        <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
                    </button>
                    <Button onClick={handleUserClick} className="flex items-center justify-center gap-2 px-2">
                    {isAuthenticated ?(
                        <>
                            <img src={avatar || "/foto.jpg"} alt={`Foto de ${userName}`} className="h-5 w-5 shrink-0 rounded-full object-cover" />
                            <span className="truncate">{userName}</span>
                        </>
                    ): (
                        "Login"
                    )}

                    </Button>
                </div>
                <div
            className={`absolute right-5 top-16 z-50 w-42 origin-top-right rounded-md
             border border-border bg-cards py-2 shadow-card
            transition-all duration-200 ease-out
        ${
            menuOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
>
    <button
        onClick={() => navigate("/profile")}
        className="w-full px-4 py-2 text-center text-text transition-colors hover:bg-card-secondary"
    >
        Perfil
    </button>

    <hr className="border-border" />

    <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-center text-error transition-colors hover:bg-card-secondary"
    >
        Sair
    </button>
</div>
            </div>
        </nav>
    )
}
export default Navbar