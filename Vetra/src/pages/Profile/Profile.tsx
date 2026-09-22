import { useCallback, useEffect } from "react"
import { getProfile } from "../../services/api"
export default function Profile(){
    const getUserData = useCallback(async()=>{
        try{
            const data = await getProfile()
            console.log(data)
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

            </div>
        </div>
    )
}