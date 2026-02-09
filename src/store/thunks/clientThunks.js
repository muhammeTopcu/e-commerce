import api from "../../api/axiosInstance";
import { setRoles } from "../actions/clientActions";

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
