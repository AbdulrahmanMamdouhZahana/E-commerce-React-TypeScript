
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../components/config";


import axios from "axios";



import { createStandaloneToast } from "@chakra-ui/react";
import CookieServices from "../../services/CookieServices";

const { toast } = createStandaloneToast();

export interface ILoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    [key: string]: unknown;
  };
}

export interface ILoginError {
  error: {
    message: string;
    status?: number;
    name?: string;
  };
}

interface IInitialState {
  loading: boolean;
  data: ILoginResponse | null;
  error: ILoginError | null;
}

export const LoginRequest = createAsyncThunk<
  ILoginResponse,
  { identifier: string; password: string },
  { rejectValue: ILoginError }
>(
  "login/LoginRequest",
  async (ApiData: { identifier: string; password: string }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/local", ApiData);

      console.log("Login response:", data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        if (errorData && typeof errorData === "object" && "error" in errorData) {
          return thunkAPI.rejectWithValue(errorData as ILoginError);
        }
        return thunkAPI.rejectWithValue({
          error: { message: error.message }
        });
      }

      return thunkAPI.rejectWithValue({
        error: { message: "Something went wrong" }
      });
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

      .addCase(LoginRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;

        toast({
          title: `${action.payload?.error?.message ?? "Login failed"}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  },
});

export default loginApi.reducer;