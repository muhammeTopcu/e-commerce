import axios from "axios";

const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export const setAuthToken = (token) => {
  if (!token) return;
  api.defaults.headers.common.Authorization = token;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};

export default api;
