import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:8080";

const api = axios.create({
  baseURL: apiBaseUrl,
});

export const setAuthToken = (token) => {
  if (!token) return;
  api.defaults.headers.common.Authorization = token;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

export default api;
