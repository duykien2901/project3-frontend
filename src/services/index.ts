import axios, { AxiosRequestConfig } from "axios";
import { config } from "src/config";
import { getToken } from "src/libs/helpers/token";

const axiosInstance = axios.create({
  baseURL: config.api.restUrl,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig = {}) => {
    const { headers = {} } = config;
    headers["Authorization"] = `Bearer ` + getToken();
    return {
      ...config,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  },
  (err: any) => {
    Promise.reject(err);
  }
);

export default axiosInstance;
