import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../components/interfaces";
import { AddQuantity } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";


const {toast} = createStandaloneToast();

interface IInitialState { 
    prdouctsCart: IProduct[]
}


const initialState :IInitialState = {
    prdouctsCart: []
}

export const cartSlice = createSlice({
    name: "cart", 
    initialState, 
    reducers: {

        AddToCartAction: (state: IInitialState, action: PayloadAction<IProduct>) => { 
            state.prdouctsCart = AddQuantity(state.prdouctsCart, action.payload);
            
        
            

        }, 
        

        removeFromCartAction: (state: IInitialState, action: PayloadAction<number>) => {
            

            state.prdouctsCart = state.prdouctsCart.filter((product) => product.id !== action.payload)

            // console.log();
            
                                   toast({
  title: "Clear Product form your Cart",
  status: "success",
  duration: 2000,
  isClosable: true,
     })


            
        },
        

                removeAllFromCartAction: (state: IInitialState ) => {
            

                    state.prdouctsCart = []
                    
                         toast({
  title: "Clear Your Cart",
  status: "success",
  duration: 1000,
  isClosable: true,
     })

            // console.log();
            


            
        }
        ,
                
        IncreaesQuantity: (state: IInitialState, action: PayloadAction<number>) => {
            state.prdouctsCart.map((product) => { 

                if (product.id == action.payload) { 
                    product.quantity = product.quantity + 1 
                                     toast({
  title: "quantity Increased ",
  status: "success",
  duration: 400,
  isClosable: true,
     })
                    
                }
            })
        }
        ,

           decreaesQuantity: (state: IInitialState, action: PayloadAction<number>) => {
            state.prdouctsCart.map((product) => { 

                if (product.id == action.payload) { 
                    product.quantity = product.quantity - 1 
                                                        toast({
  title: "quantity Decreased ",
  status: "error",
  duration: 500,
  isClosable: true,
     })
                }
            })
         }
    }
})

export const { AddToCartAction , removeFromCartAction  ,removeAllFromCartAction , IncreaesQuantity , decreaesQuantity} = cartSlice.actions; 

export default cartSlice.reducer;