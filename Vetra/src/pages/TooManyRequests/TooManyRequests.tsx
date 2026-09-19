
import { useLocation } from "react-router-dom"

export default function TooManyRequests(){
    const location = useLocation();
    const waitTime = location.state?.waitTime
    console.log(waitTime)
    return (
        <div>

            fodase 1q2341asd
            <h1>{waitTime}</h1>
        </div>
    )
}