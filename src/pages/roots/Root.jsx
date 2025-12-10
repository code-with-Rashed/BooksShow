import { Outlet } from "react-router";
import Footer from "../../components/footers/Footer";
import Navbar from "../../components/headers/Navbar";

export default function Root() {
    return (
        <>
            <Navbar></Navbar>
            <div className="max-w-6xl mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    )
}