import Button from "./Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCurrentUser } from "../services/api"
function Navbar(){
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUsername] = useState("")
    const [menuOpen, setMenuOpen] = useState(false)
    useEffect(()=>{
        async function ValidateSession() {
            try{
                const data = await getCurrentUser()
                setUsername(data.user["name"])
                setIsAuthenticated(true)
            }catch{
                console.log("usuário nao autenticado")
                setUsername("")
                setIsAuthenticated(false)
            }

        }
        ValidateSession()
    }, [])
    function handleUserClick(){
        if (isAuthenticated){
            setMenuOpen(menuOpen ? false : true)
            
            console.log("loggado")
        }
        else{
            navigate("/login")
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
                <Button  children={isAuthenticated ? userName : "Login"} onClick={handleUserClick} className="mr-10"/>
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
        onClick={() => navigate("/account")}
        className="w-full px-4 py-2 text-center text-text transition-colors hover:bg-card-secondary"
    >
        Perfil
    </button>

    <hr className="border-border" />

    <button
        onClick={() => setMenuOpen(false)}
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