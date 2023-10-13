import axios from "axios";
import { VITE_API_ENDPOINT } from "@/configs/enviroment";

import type { AxiosInstance } from "axios";

const ABIRequest: AxiosInstance = axios.create({
  baseURL: VITE_API_ENDPOINT,
});

const setInterceptor = (axiosInstance: AxiosInstance): AxiosInstance => {
  return axiosInstance;
};

setInterceptor(ABIRequest);

export default ABIRequest;