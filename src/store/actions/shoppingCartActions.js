export const SET_CART = "shoppingCart/SET_CART";
export const SET_PAYMENT = "shoppingCart/SET_PAYMENT";
export const SET_ADDRESS = "shoppingCart/SET_ADDRESS";
export const ADD_TO_CART = "shoppingCart/ADD_TO_CART";
export const INCREMENT_CART_ITEM = "shoppingCart/INCREMENT_CART_ITEM";
export const DECREMENT_CART_ITEM = "shoppingCart/DECREMENT_CART_ITEM";
export const REMOVE_CART_ITEM = "shoppingCart/REMOVE_CART_ITEM";
export const TOGGLE_CART_ITEM_CHECKED = "shoppingCart/TOGGLE_CART_ITEM_CHECKED";

export const setCart = (payload) => ({ type: SET_CART, payload });
export const setPayment = (payload) => ({ type: SET_PAYMENT, payload });
export const setAddress = (payload) => ({ type: SET_ADDRESS, payload });
export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
export const incrementCartItem = (payload) => ({ type: INCREMENT_CART_ITEM, payload });
export const decrementCartItem = (payload) => ({ type: DECREMENT_CART_ITEM, payload });
export const removeCartItem = (payload) => ({ type: REMOVE_CART_ITEM, payload });
export const toggleCartItemChecked = (payload) => ({
  type: TOGGLE_CART_ITEM_CHECKED,
  payload,
});
