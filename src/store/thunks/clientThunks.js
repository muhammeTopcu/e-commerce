import api from "../../api/axiosInstance";
import { setAddressList, setCreditCards, setRoles } from "../actions/clientActions";

let rolesRequestPromise = null;

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { client } = getState();

  if (Array.isArray(client.roles) && client.roles.length > 0) {
    return client.roles;
  }

  if (rolesRequestPromise) {
    return rolesRequestPromise;
  }

  rolesRequestPromise = api
    .get("/roles")
    .then((response) => {
      const list = Array.isArray(response.data) ? response.data : [];

      const customerRole =
        list.find((role) => String(role.code || "").toLowerCase() === "customer") ||
        list.find((role) =>
          String(role.name || "").toLowerCase().includes("customer"),
        );

      const orderedList = customerRole
        ? [customerRole, ...list.filter((role) => role.id !== customerRole.id)]
        : list;

      dispatch(setRoles(orderedList));
      return orderedList;
    })
    .finally(() => {
      rolesRequestPromise = null;
    });

  return rolesRequestPromise;
};

export const fetchAddressList = () => async (dispatch) => {
  const response = await api.get("/user/address");
  const list = Array.isArray(response.data) ? response.data : [];
  dispatch(setAddressList(list));
  return list;
};

export const createAddress = (payload) => async (dispatch) => {
  await api.post("/user/address", payload);
  return dispatch(fetchAddressList());
};

export const updateAddress = (payload) => async (dispatch) => {
  await api.put("/user/address", payload);
  return dispatch(fetchAddressList());
};

export const deleteAddress = (addressId) => async (dispatch) => {
  await api.delete(`/user/address/${addressId}`);
  return dispatch(fetchAddressList());
};

export const fetchCards = () => async (dispatch) => {
  const response = await api.get("/user/card");
  const list = Array.isArray(response.data) ? response.data : [];
  dispatch(setCreditCards(list));
  return list;
};

export const createCard = (payload) => async (dispatch) => {
  await api.post("/user/card", payload);
  return dispatch(fetchCards());
};

export const updateCard = (payload) => async (dispatch) => {
  await api.put("/user/card", payload);
  return dispatch(fetchCards());
};

export const deleteCard = (cardId) => async (dispatch) => {
  await api.delete(`/user/card/${cardId}`);
  return dispatch(fetchCards());
};
