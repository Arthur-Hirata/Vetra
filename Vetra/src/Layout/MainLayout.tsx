import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function MainLayout(){
    return (
        <div className="bg-background pt min-h-screen text-text font-poppins w-full border border-border flex flex-col items-center">
            <Navbar/>
            <main className="w-full">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
export default MainLayout