import SectionTittle from "../../../../Components/SectionTittle"
import CategoriesCard from "./CategoriesCard"
import { categories } from "../../../../data/categories"

export default function Categories(){
    return (
        <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 flex flex-col">
            <SectionTittle title="Categorias" children="Encontre o que procura" refText="Ver todas as categorias"/>
            <div className="flex flex-row gap-20 mt-5 items-center justify-center ">
                {categories.map((category) => (
                    <CategoriesCard
                        key={category.id}
                        image="foto.jpg"
                        title={category.name}
                        productsAmount="120"
                        categorySlug={category.slug}
                    />
                ))}
            </div>
        </div>
    )
}