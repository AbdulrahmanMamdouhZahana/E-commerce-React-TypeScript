import { createStandaloneToast } from "@chakra-ui/react";
import type { IProduct } from "../components/interfaces";
const {toast} = createStandaloneToast();

export const AddQuantity = (prdouctsCart: IProduct[] = [], product: IProduct): IProduct[] => {

    const existed = prdouctsCart.find(item => item.id == product.id);
  
    if (existed) {
     toast({
  title: "Added Product To Card",
  description: "This Product is alredy in cart quantity will be increased  ",
  status: "success",
  duration: 500,
  isClosable: true,
     })
        
        
        
     return prdouctsCart.map((item) => item.id == product.id ? {...item , quantity: item.quantity +1}: item )
    }

      toast({
  title: "Added Product To Card",
  status: "success",
  duration: 500,
  isClosable: true,
     })
        

  
    return [...prdouctsCart, {...product  , quantity:1}]
    


}
 
export const shortChar = (char:string) => { 

   if (char.length >= 15) {

// console.log(char);


      return char.slice(0, 10) + `...`;
   } else { 
      return char
   }

   


}