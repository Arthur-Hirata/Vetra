import { useCallback, useEffect, useState } from "react"
import { getProfile } from "../../services/api"
export default function Profile(){
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userAddress, setUserAddress] = useState("")
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
    return(
        <div className="bg-background flex items-center justify-center h-screen">
            <div className="bg-card-accent w-200 h-170 flex items-center justify-center rounded-md">
                    <span>{userName}</span>
                    <span>{userEmail}</span>
                    <span>{userAddress}</span>
            </div>
        </div>
    )
}