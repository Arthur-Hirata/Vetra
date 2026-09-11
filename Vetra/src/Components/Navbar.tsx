import Button from "./Button"


function Navbar(){
    function teste(){
        alert("oi")
    }
    return (
        <nav className="bg-cards w-full h-20 flex items-center justify-between sticky top-0 z-50">
            <div>
                <i className="fa-solid fa-store-alt text-5xl"></i>
                <a href=""><span className="ml-4 text-5xl">Vetra</span></a>
            </div>
            <div className="flex gap-20">
                <button className="transition:transform duration-300 hover:scale-105"><i className="fa-solid fa-cart-shopping"></i></button>
                <Button  children={"Login"} onClick={teste} className="mr-10"/>
            </div>
        </nav>
    )
}
export default Navbar