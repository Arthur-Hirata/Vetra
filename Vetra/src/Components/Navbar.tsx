import Button from "./Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCurrentUser } from "../services/api"
function Navbar(){
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUsername] = useState("")
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
    })
    function handleUserClick(){
        if (isAuthenticated){
            alert("loggado")
        }
        else{
            navigate("/login")
        }
    }
    return (
        <nav className="bg-cards w-full h-20 flex items-center justify-between sticky top-0 z-50">
            <div>
                <i className="fa-solid fa-store-alt text-5xl"></i>
                <a href=""><span className="ml-4 text-5xl">Vetra</span></a>
            </div>
            <div className="flex gap-20">
                <button className="transition:transform duration-300 hover:scale-105"><i className="fa-solid fa-cart-shopping"></i></button>
                <Button  children={isAuthenticated ? userName : "Login"} onClick={handleUserClick} className="mr-10"/>
            </div>
        </nav>
    )
}
export default Navbar