export const SET_USER = "client/SET_USER";
export const SET_ADDRESS_LIST = "client/SET_ADDRESS_LIST";
export const SET_CREDIT_CARDS = "client/SET_CREDIT_CARDS";
export const SET_ROLES = "client/SET_ROLES";
export const SET_THEME = "client/SET_THEME";
export const SET_LANGUAGE = "client/SET_LANGUAGE";

export const setUser = (payload) => ({ type: SET_USER, payload });
export const setAddressList = (payload) => ({ type: SET_ADDRESS_LIST, payload });
export const setCreditCards = (payload) => ({
  type: SET_CREDIT_CARDS,
  payload,
});
export const setRoles = (payload) => ({ type: SET_ROLES, payload });
export const setTheme = (payload) => ({ type: SET_THEME, payload });
export const setLanguage = (payload) => ({ type: SET_LANGUAGE, payload });
