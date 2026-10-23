
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../components/config";


import axios from "axios";



import { createStandaloneToast } from "@chakra-ui/react";
import CookieServices from "../../services/CookieServices";

const { toast } = createStandaloneToast();



interface IInitialState {
  loading: boolean;
  data: any | null;
  error: any | null;
}

export const LoginRequest = createAsyncThunk(
  "login/LoginRequest",
  async (ApiData: { identifier: string; password: string }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/local", ApiData);

      console.log("Login response:", data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data ?? error.message
        );
      }

      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState: IInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const loginApi = createSlice({
  name: "login",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(LoginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(LoginRequest.fulfilled, (state, action) => {
        state.loading = false;
          state.data = action.payload;
                 toast({
  title: "Login successful!",
  description: "Welcome back!",
  status: "success",
  duration: 3000,
  isClosable: true,
                 })
          
          
          
          


          const date = new Date();

          const IN_DAYS = 4; 
          const EXPIRES_DATE = 1000* 60* 60 *24 * IN_DAYS

          date.setTime(date.getTime() + EXPIRES_DATE )
          const option = {path:"/" , expires : date}

          CookieServices.set("jwt", action.payload.jwt, option)
       
                          window.location.href = "/";


      })

      .addCase(LoginRequest.rejected, (state , action ) => {
        state.loading = false;
          state.error = action.payload;
          


          toast({
  title: `${action.payload.error.message}`,
  status: "error",
  duration: 5000,
  isClosable: true,
});

      });
  },
});

export default loginApi.reducer;