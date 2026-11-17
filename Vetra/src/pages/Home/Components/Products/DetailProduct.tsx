import { useParams } from "react-router-dom"

export default function DetailProduct(){
    const {id} = useParams<{id:string}>()
    return (
        <div>{id}</div>
    )
}