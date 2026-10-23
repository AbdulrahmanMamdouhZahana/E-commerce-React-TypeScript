import {  Route, Routes } from "react-router-dom";
import Home from "../pages";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import Navbar from "../components/layout/NavBar";
import Dashboard from "../pages/Dashboard/Dashboard";
import LoginPage from "../pages/LoginPage";
import AppLayout from "../components/layout/AppLayout";
import CookieServices from "../services/CookieServices";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import DashboardProductes from "../pages/Dashboard/DashboardProductes";






interface IProps { }





const Routers = ({ }: IProps) => { 

  
    const token = CookieServices.get("jwt");

    console.log(token);
    
    

  

    return (
        <div>
            <Routes>
                
                <Route path="/" element={<AppLayout/> }>

                  <Route index element={<Home />} />
                 <Route path="/about" element={<About />} />
                 <Route path="/products" element={<Products />} />
                <Route
                     path="/products/:documentId"
                    element={<ProductPage />}
                />
                
                
                    
                </Route>

                <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route index element={<Dashboard isLogdin={ token}  />} />
                <Route path="products" element={<DashboardProductes   />} />

                </Route>


                <Route path="/login" element={<LoginPage isLogdin={ token} />}  />


        </Routes>

            
        </div>
    )
}
export default Routers;