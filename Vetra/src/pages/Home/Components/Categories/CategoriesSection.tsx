import { useNavigate, useParams } from "react-router-dom"
import { categories } from "../../../../data/categories"
export default function CategorySection(){
    const navigate = useNavigate()
    const {categorySlug} = useParams()
    const category = categories.find(
        item => item.slug === categorySlug
    )
    const categoryId = category?.id
    const categoryName = category?.name
    console.log(categoryId)
    return (
        <div className="flex flex-col mb-140 ml-20">
            <div className="flex flex-row gap-10 mt-4 items-center">
                <i className="fas fa-house trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer text-green text-2xl" onClick={() =>navigate("/")}></i>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">Categorias</p>
                <p>{'>'}</p>
                <p className="text-green trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">{categoryName}</p>
            </div>
        </div>
    )
}