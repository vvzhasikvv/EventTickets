import axios from "axios";
import { notify } from "../utils/notify.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000"
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth");
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status && status !== 401) {
      notify({ type: "error", title: "Ошибка запроса", message: "Попробуйте ещё раз." });
    }
    return Promise.reject(error);
  }
);

export default api;
