import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Button from "../../../../Components/Button"
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
            <div className="flex flex-row gap-20">
                <div className="flex flex-row mt-10 gap-10">
                    <div className="w-150 h-120 rounded-md bg-white p-4 flex items-center justify-center">
                        <img className="max-w-full max-h-full object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gjYOrS7JKHXirTmaMlueUrAiraVbYtmrKyExRAhZo65BB0RvVhbxM38&s=10" alt=""/>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="w-35 h-7 rounded-full bg-greenBg">
                            <p className="text-md text-green text-center font-bold">Eletrônicos</p>
                        </div>
                        <div className="flex flex-col gap-6 mt-3">
                            <div className="w-120 flex items-center justify-between">
                                <p className="text-4xl font-bold">AirPods Pro (2° Geração)</p>
                                <div className="w-20 h-5 rounded-full bg-amber-100">
                                    <h5 className="text-xs text-yellow-600 text-center">Usado</h5>
                                </div>
                            </div>
                            <p className="text-5xl text-green font-semibold">R$ 299.99</p>
                            <hr className="w-120 self-center border-text-secondary" />
                            <p>Som incrível, cancelamento de ruído e muito mais conforto.</p>
                            <Button children={" 🛒 Comprar agora"} className="w-70 h-15 self-center mt-4"/>
                        </div>
                    </div>
                </div>
            
                <div className="bg-cards w-70 h-60 rounded-md mt-10 flex flex-col">
                    <div className="flex flex-row mt-5 ml-3 items-center gap-10">
                        <img src="https://i.ytimg.com/vi/nkl98s8I8bw/oar2.jpg?sqp=-oaymwEiCJAEENAFSFqQAgHyq4qpAxEIARUAAAAAJQAAyEI9AICiQw==&rs=AOn4CLC0x-Lldjoz4TRoGWzmlWe3I7cCaQ&usqp=CCk" alt="" className="w-15 h-15 rounded-full"/>
                        <div className="flex flex-col">
                            <p className="font-semibold text-2xl">Thur</p>
                            <p className="">⭐ +120 vendas</p>
                        </div>
                    </div>
                    <hr className="mt-6 w-60 self-center border-text-secondary" />
                    <div className="mt-5 flex flex-row gap-5">
                        <i className="fa-solid fa-location-dot text-green font-bold text-2xl"></i>
                        <p className="text-text-secondary truncate0">Maringá-PR</p>
                    </div>
                        <button className="mt-5 w-50 h-30 rounded-lg border border-green text-green self-center transform:transition duration-300 hover:scale-105 hover:cursor-pointer">Ver loja</button>
                </div>
            </div>
            <div className="mt-20">
                <p className="text-3xl font-bold">Descrição</p>
                <div className="w-24 h-0.5 bg-text-secondary rounded-md mt-1"></div>
                <p className="mt-3 w-180 text-xl text-text-secondary">O Sony WH-1000XM5 traz o que há de mais avançado em tecnologia de cancelamento de ruído, gerando uma experiência sonora impecável.</p>
            </div>
        </div>
    )
}