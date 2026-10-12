import ProductCard from "../../Components/productCard"
import Hero from "../../Components/Hero"
function Home(){
    return(
        <div className="h-screen w-full">

            <Hero/>


            <div id="products" className="mt-50">
            <ProductCard
                picture_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBA_kAIMyLpbt29UC3pSJ51musVOXDvW4Mr3z610VyOQ&s=10"
                price={10.99}
                seller="thursim"
                seller_picture_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBA_kAIMyLpbt29UC3pSJ51musVOXDvW4Mr3z610VyOQ&s=10"
                title="Coca-Cola"

            
            
            />

            </div>
        </div>
        
    )
}
export default Home