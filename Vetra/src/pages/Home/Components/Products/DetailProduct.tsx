import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getDetailProduct } from "../../../../services/ProductsApi"
import Button from "../../../../Components/Button"


export default function DetailProduct(){
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        setLoading(true)
        getDetailProduct(Number(id))
            .then(setProduct)
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [id])
    if (loading || !product){
        return (
            <div className="flex flex-col mb-140 ml-20 animate-pulse">
                <div className="flex flex-row gap-10 mt-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="w-4 h-4 rounded-md bg-gray-200" />
                    <div className="w-25 h-5 rounded-md bg-gray-200" />
                    <div className="w-4 h-4 rounded-md bg-gray-200" />
                    <div className="w-40 h-5 rounded-md bg-gray-200" />
                </div>

                <div className="flex flex-row gap-20">
                    <div className="flex flex-row mt-10 gap-10">
                        <div className="w-150 h-120 rounded-md bg-gray-200" />

                        <div className="flex flex-col gap-5">
                            <div className="w-35 h-7 rounded-full bg-gray-200" />
                            <div className="flex flex-col gap-6 mt-3">
                                <div className="w-120 flex items-center justify-between">
                                    <div className="w-70 h-10 rounded-md bg-gray-200" />
                                    <div className="w-20 h-5 rounded-full bg-gray-200" />
                                </div>
                                <div className="w-45 h-12 rounded-md bg-gray-200" />
                                <hr className="w-120 self-center border-text-secondary" />
                                <div className="w-100 h-5 rounded-md bg-gray-200" />
                                <div className="w-70 h-15 self-center mt-4 rounded-md bg-gray-200" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-cards w-70 h-60 rounded-md mt-10 flex flex-col">
                        <div className="flex flex-row mt-5 ml-3 items-center gap-10">
                            <div className="w-15 h-15 rounded-full bg-gray-200" />
                            <div className="flex flex-col gap-3">
                                <div className="w-25 h-6 rounded-md bg-gray-200" />
                                <div className="w-25 h-4 rounded-md bg-gray-200" />
                            </div>
                        </div>
                        <hr className="mt-6 w-60 self-center border-text-secondary" />
                        <div className="mt-5 flex flex-row gap-5 ml-3">
                            <div className="w-6 h-6 rounded-md bg-gray-200" />
                            <div className="w-30 h-5 rounded-md bg-gray-200" />
                        </div>
                        <div className="mt-5 w-50 h-10 rounded-lg bg-gray-200 self-center" />
                    </div>
                </div>

                <div className="mt-20">
                    <div className="w-30 h-8 rounded-md bg-gray-200" />
                    <div className="w-24 h-0.5 bg-gray-200 rounded-md mt-1" />
                    <div className="mt-4 w-180 h-6 rounded-md bg-gray-200" />
                </div>
            </div>
        ) 

    }
    return (
        <div className="flex flex-col mb-140 ml-20">
            <div className="flex flex-row gap-10 mt-4 items-center">
                <i className="fas fa-house trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer text-green text-2xl" onClick={() =>navigate("/")}></i>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">{product.category}</p>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">{product.title}</p>
            </div>
            <div className="flex flex-row gap-20">
                <div className="flex flex-row mt-10 gap-10">
                    <div className="w-150 h-120 rounded-md bg-white p-4 flex items-center justify-center">
                        <img className="max-w-full max-h-full object-contain" src={product.image_url} alt={product.title}/>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="w-35 h-7 rounded-full bg-greenBg">
                            <p className="text-md text-green text-center font-bold">{product.category}</p>
                        </div>
                        <div className="flex flex-col gap-6 mt-3">
                            <div className="w-120 flex items-center justify-between">
                                <p className="text-4xl font-bold">{product.title}</p>
                                <div className="w-20 h-5 rounded-full bg-amber-100">
                                    <h5 className="text-xs text-yellow-600 text-center">{product.condition}</h5>
                                </div>
                            </div>
                            <p className="text-5xl text-green font-semibold">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                            <hr className="w-120 self-center border-text-secondary" />
                            <p>{product.subtitle}</p>
                            <Button children={" 🛒 Comprar agora"} className="w-70 h-15 self-center mt-4"/>
                        </div>
                    </div>
                </div>
            
                <div className="bg-cards w-70 h-60 rounded-md mt-10 flex flex-col">
                    <div className="flex flex-row mt-5 ml-3 items-center gap-10">
                        <img src={product.seller.avatar_url} alt={product.seller.name} className="w-15 h-15 rounded-full"/>
                        <div className="flex flex-col">
                            <p className="font-semibold text-2xl">{product.seller.name}</p>
                            <p className="">⭐ +120 vendas</p>
                        </div>
                    </div>
                    <hr className="mt-6 w-60 self-center border-text-secondary" />
                    <div className="mt-5 flex flex-row gap-5">
                        <i className="fa-solid fa-location-dot text-green font-bold text-2xl"></i>
                        <p className="text-text-secondary truncate0">{product.seller.address
                            }</p>
                    </div>
                        <button className="mt-5 w-50 h-30 rounded-lg border border-green text-green self-center transform:transition duration-300 hover:scale-105 hover:cursor-pointer">Ver loja</button>
                </div>
            </div>
            <div className="mt-20">
                <p className="text-3xl font-bold">Descrição</p>
                <div className="w-24 h-0.5 bg-text-secondary rounded-md mt-1"></div>
                <p className="mt-3 w-180 text-xl text-text-secondary">{product.description}</p>
            </div>
        </div>
    )
}