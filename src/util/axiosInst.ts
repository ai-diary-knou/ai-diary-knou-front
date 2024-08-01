import axios from "axios";
import { API_URL } from "../constant/api";

const axiosInst = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

axiosInst.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("Authorization");
  if (token && token !== "null") {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, null);

export default axiosInst;
