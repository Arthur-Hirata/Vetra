interface CategoriesCardProps{
    image:string
    title:string
    productsAmount:string
    ref?:string
}

export default function CategoriesCard({image, title, productsAmount, ref}:CategoriesCardProps){
    return (
        <div className="bg-cards w-60 h-60  rounded-md object-cover">
            <div className="bg-greenBg w-60 h-40 flex items-center justify-center rounded-md">
                <img src={image} alt="" className="w-30 h-30"/>
            </div>
            <div className="flex flex-col gap-2 ml-4 mt-3">
                <span className="font-bold">{title}</span>
                <div className="flex flex-row gap-20">
                    <span className="text-gray-400">{productsAmount}+ produtos</span>
                    <div>
                        <div className="w-7 h-7 flex justify-center items-center rounded-full bg-whiteGreen text-white transition:transform duration-300 hover:scale-105 hover:cursor-pointer">
                            <a href={ref}><i className="fas fa-arrow-right text-sm"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}