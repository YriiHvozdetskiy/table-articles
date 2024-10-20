import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   timeout: 10000,
});

axiosInstance.interceptors.request.use(
   (config) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default axiosInstance;
