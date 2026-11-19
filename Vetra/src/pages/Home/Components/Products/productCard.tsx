import Button from "../../../../Components/Button"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../../../../services/ProductsApi"
import { useEffect, useState } from "react"
interface ProductCardPropos {
    product_id :number
}
export default function ProductCard({product_id} :ProductCardPropos){
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        getProducts(product_id)
            .then(setProduct)
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, [product_id])
    const navigate = useNavigate()
    if (loading || !product) {
        return (
            <div className="flex flex-col bg-white h-90 w-65 rounded-xl p-2 shadow-card animate-pulse">
                <div className="bg-gray-200 w-full h-38 rounded-md" />

                <div className="mt-3 flex flex-col gap-2">
                    <div className="flex flex-row gap-30 items-center">
                        <div className="w-20 h-3 rounded-full bg-gray-200" />
                        <div className="w-20 h-4 rounded-full bg-gray-200" />
                    </div>

                    <div className="w-40 h-4 rounded-md bg-gray-200" />
                    <div className="w-24 h-6 rounded-md bg-gray-200" />
                </div>

                <hr className="border-border my-3" />

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="w-20 h-3 rounded-md bg-gray-200" />
                        <div className="w-28 h-3 rounded-md bg-gray-200" />
                    </div>
                </div>

                <div className="w-45 h-10 mt-4 ml-7 rounded-md bg-gray-200" />
            </div>
        )
    }
    return (
        <div className="flex flex-col bg-white h-90 w-65 rounded-xl p-2 shadow-card transition-transform duration-300 hover:scale-105">

            <div className="relative bg-white w-full h-38 flex items-center justify-center rounded-md">
                <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-md"
                />
                <button className="absolute top-2 right-2 bg-white rounded-full p-2">
                    <i className="fa-solid fa-heart text-green"></i>
                </button>
            </div>

            <div className="mt-2 flex flex-col gap-1">
                <div className="flex flex-row gap-30 items-center">
                <h5 className="text-xs text-text-secondary">
                    {product.category}
                </h5>
                
                <div className={product.condition == "Novo" ? "w-20 h-4 rounded-full bg-greenBg" : "w-20 h-4 rounded-full bg-amber-100"}>
                    <h5 className={product.condition == "Novo" ? "text-xs text-green text-center":"text-xs text-yellow-600 text-center"}>{product.condition}</h5>
                </div>
                </div>

                <h3 className="font-semibold text-sm truncate">
                    {product.title}
                </h3>

                <p className="text-lg font-bold text-green">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
            </div>

            <hr className="border-border my-1" />

            <div className="flex items-center gap-2 mt-1">
                <img
                    src={product.seller.avatar_url}
                    alt={product.seller.name}
                    className="w-8 h-8 rounded-full object-cover"
                />

                <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-xs font-semibold truncate">
                        {product.seller.name}
                    </p>

                    <span className="text-xs text-text-secondary truncate">
                        <i className="fa-solid fa-location-dot mr-1"></i>
                        {product.seller.address}
                    </span>
                </div>
            </div>
            <Button children="Ver detalhes" className="text-sm w-45 h-10 mt-4 justify ml-7" onClick={() =>  navigate(`products/${product_id}`)}/>
        </div>
    );
}