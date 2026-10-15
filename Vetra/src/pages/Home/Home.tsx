import Hero from "./Components/Hero/Hero"
import Categories from "./Components/Categories/Categories"
function Home(){
    return(
        <div className="min-h-screen w-full">
            <Hero/>
            <Categories />
        </div>
        
    )
}
export default Home