import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://booking-com15.p.rapidapi.com",
  timeout: 10000, // 10 seconds timeout
  headers: {
   'x-rapidapi-key': 'e69b1d9aaamsh38aed9486984dcbp13046cjsn570e6053a69b',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
    "Content-Type": "application/json",
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
