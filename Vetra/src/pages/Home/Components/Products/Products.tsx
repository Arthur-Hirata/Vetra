import SectionTittle from "../../../../Components/SectionTittle"
import ProductCard from "./productCard"
export default function Products(){
    return (
        <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6 flex flex-col">
            <SectionTittle children="Destaques" title="Produtos em alta" refText="Ver todos os produtos"  />
            <div className="flex flex-row mt-10 mb-10">
                <ProductCard title="AirPods Pro (2° Geração) " category="Eletrônicos" price={249.99} picture_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gjYOrS7JKHXirTmaMlueUrAiraVbYtmrKyExRAhZo65BB0RvVhbxM38&s=10" location="Maringá-PR" seller="thur" seller_picture="https://i.ytimg.com/vi/nkl98s8I8bw/oar2.jpg?sqp=-oaymwEiCJAEENAFSFqQAgHyq4qpAxEIARUAAAAAJQAAyEI9AICiQw==&rs=AOn4CLC0x-Lldjoz4TRoGWzmlWe3I7cCaQ&usqp=CCk"/>

            </div>
        </div>
    )
}