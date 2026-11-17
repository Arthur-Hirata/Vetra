import Button from "../../../../Components/Button"
import { useNavigate } from "react-router-dom"
interface ProductProps{
    product_id : number
    title:string
    picture_url : string
    price : number
    seller : string
    condition :string
    seller_picture:string
    category:string
    location:string
}
export default function ProductCard({product_id, title, picture_url, price, seller, seller_picture, category,condition, location}: ProductProps){
    const navigate = useNavigate()

    
    return (
        <div className="flex flex-col bg-white h-90 w-65 rounded-xl p-2 shadow-card transition-transform duration-300 hover:scale-105">

            <div className="relative bg-greenBg w-full h-38 flex items-center justify-center rounded-md">
                <img
                    src={picture_url}
                    alt={title}
                    className="w-full h-full object-contain rounded-md"
                />

                <button className="absolute top-2 right-2 bg-white rounded-full p-2">
                    <i className="fa-solid fa-heart text-green"></i>
                </button>
            </div>

            <div className="mt-2 flex flex-col gap-1">
                <div className="flex flex-row gap-30 items-center">
                <h5 className="text-xs text-text-secondary">
                    {category}
                </h5>
                
                <div className={condition == "Novo" ? "w-20 h-4 rounded-full bg-greenBg" : "w-20 h-4 rounded-full bg-amber-100"}>
                    <h5 className={condition == "Novo" ? "text-xs text-green text-center":"text-xs text-yellow-600 text-center"}>{condition}</h5>
                </div>
                </div>

                <h3 className="font-semibold text-sm truncate">
                    {title}
                </h3>

                <p className="text-lg font-bold text-green">
                    R$ {price.toFixed(2).replace(".", ",")}
                </p>
            </div>

            <hr className="border-border my-1" />

            <div className="flex items-center gap-2 mt-1">
                <img
                    src={seller_picture}
                    alt={seller}
                    className="w-8 h-8 rounded-full object-cover"
                />

                <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-xs font-semibold truncate">
                        {seller}
                    </p>

                    <span className="text-xs text-text-secondary truncate">
                        <i className="fa-solid fa-location-dot mr-1"></i>
                        {location}
                    </span>
                </div>
            </div>
            <Button children="Ver detalhes" className="text-sm w-45 h-10 mt-4 justify ml-7" onClick={() =>  navigate(`products/${product_id}`)}/>
        </div>
    );
}