
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../Components/Button";
export default function TooManyRequests(){
    const navigate = useNavigate()
    const location = useLocation();
    const remainigSeconds = location.state?.wait_time
    const [seconds, setSeconds] = useState(remainigSeconds)
    const isDisable = seconds > 0
    useEffect(()=>{
        if (seconds <=0){
            return
        }
        const timer = setInterval(()=>{
            setSeconds((prev:number)=>prev-1)
        }, 1000)
        return () => clearInterval(timer)
    }, [seconds])
    
    const handleRetry = () =>{
        navigate("/")
    }
    return (
        <div className="flex flex-col items-center justify-center bg-background w-screen h-screen">
            <i className="fa-solid fa-triangle-exclamation text-red-700 text-8xl font-bold"></i>
            <span className="text-red-700 mt-10 font-semibold">Erro! Muitas requisições feitas, você deve esperar {seconds} segundos para tentar novamente</span>
            <Button children={"Voltar"} className={"mt-13 h-10 text-xl w-50"} onClick={handleRetry} disabled={isDisable}/>
        </div>
    )
}