import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const AppLayout = () => { 
    return (
        <div>
            <Navbar />
            <Outlet/>
        </div>
    )
}
export default AppLayout;