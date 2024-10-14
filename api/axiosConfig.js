import axios from "axios";
import { PORT } from "../helpers/port";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: `http://192.168.1.101:${PORT}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are included
});

// Add a request interceptor to dynamically add the Bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
