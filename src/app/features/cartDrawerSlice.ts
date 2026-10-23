import { createSlice } from "@reduxjs/toolkit";


interface IInitialState { 

isOpen: boolean,
onOpen:  boolean  ,
 onClose: boolean , 
   
}


const initialState :IInitialState = {
isOpen: false,
    onOpen: false,
    onClose: false

}

export const cartDrawre = createSlice({
    name: "drawer", 
    initialState, 
    reducers: {
    
            OpenDrawerAction: (state:IInitialState ) => { 
            state.isOpen = true 
             state.onOpen = true   
        }, 
            CloseDrawerAction: (state:IInitialState ) => { 
            state.isOpen = false 
             state.onClose = false   
        }
    }
})

 export const { CloseDrawerAction, OpenDrawerAction } = cartDrawre.actions; 

export default cartDrawre.reducer;