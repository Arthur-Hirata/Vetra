import SectionTittle from "../../../../Components/SectionTittle"
import ProductCard from "./productCard"
export default function Products(){
    return (
        <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 flex flex-col">
            <SectionTittle children="Destaques" title="Produtos em alta" refText="Ver todos os produtos" ref="products" />
            <div className="flex flex-row mt-10 mb-10 gap-7 self-center">
                <ProductCard product_id={1}/>
                <ProductCard product_id={2}/>
                <ProductCard product_id={1}/>
                <ProductCard product_id={1}/>
                <ProductCard product_id={1}/>
            </div>
        </div>
    )
}