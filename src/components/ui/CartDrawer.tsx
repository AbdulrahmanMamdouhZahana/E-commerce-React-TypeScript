import { background, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"
import  { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { CloseDrawerAction } from "../../app/features/cartDrawerSlice";
import type { IProduct } from "../interfaces";
import ProductInCart from "../ProductInCart";
import { removeAllFromCartAction } from "../../app/features/cartSlice";

const  CartDrawer = ()=> {
//   const { isOpen, onOpen, onClose } = useDisclosure()
  //   const btnRef = React.useRef()
  
  const { isOpen } = useSelector((state: RootState) => state.drawer)
  const { prdouctsCart} = useSelector((state:RootState)=>state.cart)
  const dispatch = useDispatch();
  const btnRef = useRef()



  
  const onClose = () => { 
    dispatch(CloseDrawerAction())
  }

  

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{ base: "full", sm: "md" }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shop Cart</DrawerHeader>

          <DrawerBody px={{ base: 3, sm: 5 }}>


            { 
             prdouctsCart.length ?  prdouctsCart.map((product:IProduct) =>  <ProductInCart key={product.id} product={product}/>) : <h3>Your Card IS Empty</h3>

            }

            



          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' outlineColor={"red.500"} border={0} color={"red.300"} mr={3} onClick={() => { 
              dispatch(removeAllFromCartAction())
            }}>
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
    )
    
}

export default CartDrawer;