import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function MainLayout(){
    return (
        <div className="bg-background pt min-h-screen text-text font-poppins w-full border border-border flex flex-col items-center">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
export default MainLayout