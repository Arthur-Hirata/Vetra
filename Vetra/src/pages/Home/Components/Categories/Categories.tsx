import SectionTittle from "../../../../Components/SectionTittle"
import CategoriesCard from "./CategoriesCard"
export default function Categories(){
    return (
        <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 flex flex-col">
            <SectionTittle title="Categorias" children="Encontre o que procura" refText="Ver todas as categorias"/>
            <div className="flex flex-row gap-20 mt-5 items-center justify-center ">
                <CategoriesCard image="foto.jpg" title="Eletrônicos" productsAmount="120" />
                <CategoriesCard image="foto.jpg" title="Eletrônicos" productsAmount="120" />
                <CategoriesCard image="foto.jpg" title="Eletrônicos" productsAmount="120" />
                <CategoriesCard image="foto.jpg" title="Eletrônicos" productsAmount="120" />
            </div>
        </div>
    )
}