import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface IInitialState { 

    isOnline : boolean , 
   
}


const initialState :IInitialState = {
isOnline: true,


}

export const internetConnection = createSlice({
    name: "internet", 
    initialState, 
    reducers: {

        IsOnlineAction:(state: IInitialState, actions:PayloadAction<boolean>)=> { 
            state.isOnline = actions.payload; 
        }
    
    }
})

 export const { IsOnlineAction } = internetConnection.actions; 

export default internetConnection.reducer;