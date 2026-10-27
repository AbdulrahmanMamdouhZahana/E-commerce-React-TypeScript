import ProductCard from "../components/ProductCard";
import { axiosInstance } from "../components/config";
import { useQuery } from "@tanstack/react-query";


const Products = () => { 
    

    // get All Proucts 
    const getProducts = async () => { 
        const { data } = await axiosInstance.get("/products?populate=*");
        return data;
    }

      const { isError, isLoading, data } = useQuery({
        queryKey: ["products"], 
        queryFn :  getProducts , 
    })


    // get Singel Product
    

   
    
  

    const products = data?.data || []; 

    





    return (
        <div >
            <ProductCard isError={isError} isLoading={isLoading} data={products} />
            
    </div>
    )
}
export default Products;