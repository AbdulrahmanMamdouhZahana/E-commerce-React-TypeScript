import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_API}/api`,
    // timeout: 1000,
});