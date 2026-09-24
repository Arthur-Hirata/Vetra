import Button from "./Button"
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
        <nav className="bg-cards w-full h-20 flex items-center justify-between top-0 z-50 relative">
            <div>
                <i className="fa-solid fa-store-alt text-5xl"></i>
                <a href=""><span className="ml-4 text-5xl">Vetra</span></a>
            </div>
            <div className="flex gap-20">
                <button className="transition:transform duration-300 hover:scale-105"><i className="fa-solid fa-cart-shopping"></i></button>
                <Button onClick={handleUserClick} className="mr-10 flex items-center justify-center gap-2 px-2">
                    {isAuthenticated ?(
                        <>
                            <img src={avatar || "/foto.jpg"} alt={`Foto de ${userName}`} className="h-6 w-6 shrink-0 rounded-full object-cover" />
                            <span className="truncate">{userName}</span>
                        </>
                    ): (
                        "Login"
                    )}

                </Button>
                <div
    className={`absolute right-4 top-16 z-50 w-42 origin-top-right rounded-md
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