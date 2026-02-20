export const SET_CART = "shoppingCart/SET_CART";
export const SET_PAYMENT = "shoppingCart/SET_PAYMENT";
export const SET_ADDRESS = "shoppingCart/SET_ADDRESS";
export const ADD_TO_CART = "shoppingCart/ADD_TO_CART";

export const setCart = (payload) => ({ type: SET_CART, payload });
export const setPayment = (payload) => ({ type: SET_PAYMENT, payload });
export const setAddress = (payload) => ({ type: SET_ADDRESS, payload });
export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
