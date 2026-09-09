import Button from "../Components/Button"


function Navbar(){
    function teste(){
        alert("oi")
    }
    return (
        <nav className="bg-cards w-full h-20 flex items-center justify-between">
            <div>
                <i className="fa-solid fa-store-alt text-5xl"></i>
                <span className="ml-4 text-5xl">Vetra</span>
            </div>
            <Button  children={"Login"} onClick={teste} className="mr-10"/>
        </nav>
    )
}
export default Navbar