import axios, { AxiosError, AxiosInstance } from "axios";
import { getFromLocalStorage } from "src/utils/function";
class fetHandlerAxios {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:7294",
      timeout: 5000
      // headers: {
      //   "Content-Type": "application/json",
      //   "expire-access-token": 60, // 10s
      //   "expire-refresh-token": 60 * 60 // 1 hour
      // }
    });
    this.instance.interceptors.request.use(
      (config) => {
        const access_token = getFromLocalStorage("access_token");
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

const fetHandler = new fetHandlerAxios().instance;
export default fetHandler;
