export const SET_CART = "shoppingCart/SET_CART";
export const SET_PAYMENT = "shoppingCart/SET_PAYMENT";
export const SET_ADDRESS = "shoppingCart/SET_ADDRESS";

export const setCart = (payload) => ({ type: SET_CART, payload });
export const setPayment = (payload) => ({ type: SET_PAYMENT, payload });
export const setAddress = (payload) => ({ type: SET_ADDRESS, payload });
