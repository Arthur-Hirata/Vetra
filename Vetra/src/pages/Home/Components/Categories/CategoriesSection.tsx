import { useNavigate, useParams } from "react-router-dom"
import { categories } from "../../../../data/categories"
import { getCategory } from "../../../../services/ProductsApi"
import ProductCard from "../Products/productCard"
import { useEffect, useState } from "react"
export default function CategorySection(){
    const navigate = useNavigate()
    const [products, setProducts] = useState<any[]>([])
    const {categorySlug} = useParams()
    const [sortOrder, setSortOrder] = useState<"lowest" | "highest">("lowest")
    const category = categories.find(
        item => item.slug === categorySlug
    )
    const categoryId = category?.id
    const categoryName = category?.name
    useEffect(()=>{
        if (!categoryId) return 
        getCategory(Number(categoryId))
        .then(setProducts)
        .catch((error) => console.log(error))
    }, [categoryId])
    const sortedProdutcs = [...products].sort((a, b) => {
        if (sortOrder == "lowest"){
            return a.price - b.price
        }
        return b.price - a.price
    })

    return (
        <div className="flex flex-col mb-140 ml-20 mr-20">
            <div className="flex flex-row gap-10 mt-4 items-center">
                <i className="fas fa-house trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer text-green text-2xl" onClick={() =>navigate("/")}></i>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">Categorias</p>
                <p>{'>'}</p>
                <p className="text-green trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">{categoryName}</p>
            </div>
            <div className="relative overflow-hidden bg-card-secondary rounded-2xl px-8 py-9 mt-10">

                <div className="relative z-10 flex flex-col gap-3">
                    <span className="text-green text-sm font-semibold uppercase tracking-wider">
                        Categoria
                    </span>

                    <h1 className="text-4xl font-bold text-text">
                        {categoryName}
                    </h1>

                    <p className="text-text-secondary max-w-lg">
                        {category?.categoryDesc}
                    </p>
                </div>
                <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full bg-secondary/30"></div>
                <div className="absolute right-32 -bottom-24 w-48 h-48 rounded-full bg-green/10"></div>
            </div>

            
            <div className="flex items-center justify-between mt-8">

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-text">
                        Produtos
                    </h2>

                    <p className="text-sm text-text-secondary">
                        Explore os produtos desta categoria
                    </p>
                </div>

                <select className="bg-white border border-border rounded-lg px-4 py-2.5 text-sm text-text outline-none focus:border-green cursor-pointer"
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value as "lowest" | "highest")}
                                >
                    <option value="lowest">Menor preço</option>
                    <option value="highest">Maior preço</option>
                </select>

            </div>
            <div className="mt-14 grid grid-cols-4">
                {sortedProdutcs.map((product) => (
                    <ProductCard
                    product_id={product.id}
                        key={product.id}
                                />
                ))}
            </div>
        </div>
    )
}