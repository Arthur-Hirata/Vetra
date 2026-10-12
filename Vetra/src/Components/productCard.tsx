interface ProductProps{
    title:string
    picture_url : string
    price : number
    seller : string
    seller_picture_url:string
}

export default function ProductCard({title, picture_url, price, seller, seller_picture_url}: ProductProps){
    return(
        <div className="bg-cards w-50 h-60 rounded-md border border-border shadow-card flex flex-col items-center transform:transition duration-300 hover:scale-105">
            <img src={picture_url} className="w-30 h-30 object-cover rounded-md mt-5" />
            <div className="relative mt-5 flex w-full justify-center px-4">
                <span className="text-center font-bold text-sm">{title}</span>
                <span className="absolute right-4 font-bold text-error mt-4">R${price}</span>
            </div>
            <div className="flex flex-row gap-5 -ml-17 mt-3 justify-center items-center">
                <img src={seller_picture_url} className="w-10 h-10 rounded-full" />
                <span className="font-semibold text-sm">{seller}</span>
            </div>
        </div>
    )
}