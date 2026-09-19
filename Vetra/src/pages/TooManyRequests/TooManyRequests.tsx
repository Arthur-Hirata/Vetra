
import { useLocation } from "react-router-dom"

export default function TooManyRequests(){
    const location = useLocation();
    const waitTime = location.state?.wait_time
    return (
        <div className="flex flex-col items-center justify-center bg-background w-screen h-screen">
            <i className="fa-solid fa-triangle-exclamation text-red-700 text-8xl font-bold"></i>
            <span className="text-red-700 mt-10 font-semibold">Erro! Muitas requisições feitas, você deve esperar {waitTime} segundos para tentar novamente</span>
        </div>
    )
}