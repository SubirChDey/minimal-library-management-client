import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/Navbar/Navbar"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    )
}

export default MainLayout