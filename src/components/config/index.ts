import axios from "axios";
import CookieServices from "../../services/CookieServices";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}/api`,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const rawAuth = config.headers?.Authorization;
    const isInvalidAuth =
      rawAuth === "Bearer undefined" ||
      rawAuth === "Bearer null" ||
      rawAuth === "Bearer ";

    if (isInvalidAuth && config.headers) {
      delete config.headers.Authorization;
    }

    const token = CookieServices.get("jwt");
    if (
      token &&
      typeof token === "string" &&
      token.trim() !== "" &&
      token !== "undefined" &&
      token !== "null"
    ) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token.trim()}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      CookieServices.remove("jwt");
    }
    return Promise.reject(error);
  }
);