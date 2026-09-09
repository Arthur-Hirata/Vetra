import Button from "../Components/Button"


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
            <input
                type="text"
                placeholder="Buscar produtos"
                aria-label="Buscar produtos"
                className="w-90 h-10 rounded-2xl border border-text-secondary/30 bg-background px-4 text-center text-text placeholder:text-text-secondary transition-colors  focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button  children={"Login"} onClick={teste} className="mr-10"/>
        </nav>
    )
}
export default Navbar