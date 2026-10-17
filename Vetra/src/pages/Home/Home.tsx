import Hero from "./Components/Hero/Hero"
import Categories from "./Components/Categories/Categories"
import Products from "./Components/Products/Products"
function Home(){
    return(
        <div className="min-h-screen w-full">
            <Hero/>
            <Categories />
            <Products />
        </div>
        
    )
}
export default Home