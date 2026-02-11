import api, { clearAuthToken, setAuthToken } from "../../api/axiosInstance";
import { setUser } from "../actions/clientActions";

let verifyPromise = null;

export const loginUser =
  ({ email, password, remember }) =>
  async (dispatch) => {
    const response = await api.post("/login", { email, password });
    const data = response.data || {};
    const user = data.user || data;
    const token = data.token || data.accessToken;

    dispatch(setUser(user));

    if (token) {
      setAuthToken(token);
      if (remember) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }

    return user;
  };

export const verifyStoredToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    clearAuthToken();
    return null;
  }

  if (verifyPromise) {
    return verifyPromise;
  }

  setAuthToken(token);

  verifyPromise = api
    .get("/verify")
    .then((response) => {
      const data = response.data || {};
      const user = data.user || data;
      const renewedToken = data.token || data.accessToken || token;

      dispatch(setUser(user));
      setAuthToken(renewedToken);
      localStorage.setItem("token", renewedToken);

      return user;
    })
    .catch((error) => {
      localStorage.removeItem("token");
      clearAuthToken();
      dispatch(setUser({}));
      throw error;
    })
    .finally(() => {
      verifyPromise = null;
    });

  return verifyPromise;
};
