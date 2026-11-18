import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function DetailProduct(){
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    console.log(id)
    return (
        <div className="flex flex-col mb-140 ml-20">
            <div className="flex flex-row gap-10 mt-4 items-center">
                <i className="fas fa-house trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer text-green text-2xl" onClick={() =>navigate("/")}></i>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">Eletrônicos</p>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">Fone de ouvido</p>
            </div>
            <div className="flex flex-row gap-30">
                <div className="flex flex-row mt-10 ">
                    <div className="w-150 h-120 rounded-md bg-white p-4 flex items-center justify-center">
                        <img className="max-w-full max-h-full object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gjYOrS7JKHXirTmaMlueUrAiraVbYtmrKyExRAhZo65BB0RvVhbxM38&s=10" alt=""/>
               
                    <div>
                        <div className="w-35 h-7 rounded-full bg-greenBg">
                            <p className="text-md text-green text-center font-bold">Eletrônicos</p>
                        </div>
                    </div>
                    </div>
                </div>
            
            <div className="bg-cards w-70 h-90 rounded-md mt-10">

            </div>
            </div>

        </div>
    )
}