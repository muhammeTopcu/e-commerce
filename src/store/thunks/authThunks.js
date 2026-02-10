import api from "../../api/axiosInstance";
import { setUser } from "../actions/clientActions";

export const loginUser =
  ({ email, password, remember }) =>
  async (dispatch) => {
    const response = await api.post("/login", { email, password });
    const data = response.data || {};
    const user = data.user || data;

    dispatch(setUser(user));

    const token = data.token || data.accessToken;
    if (remember && token) {
      localStorage.setItem("token", token);
    }

    return user;
  };
