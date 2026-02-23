import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_CHECKED,
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      if (!product?.id) return state;

      const existingIndex = state.cart.findIndex(
        (item) => item?.product?.id === product.id,
      );

      if (existingIndex === -1) {
        return {
          ...state,
          cart: [...state.cart, { count: 1, checked: true, product }],
        };
      }

      const updatedCart = state.cart.map((item, index) =>
        index === existingIndex ? { ...item, count: item.count + 1 } : item,
      );

      return { ...state, cart: updatedCart };
    }
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item?.product?.id === action.payload
            ? { ...item, count: item.count + 1 }
            : item,
        ),
      };
    case DECREMENT_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item?.product?.id === action.payload
            ? { ...item, count: Math.max(1, item.count - 1) }
            : item,
        ),
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item?.product?.id !== action.payload),
      };
    case TOGGLE_CART_ITEM_CHECKED:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item?.product?.id === action.payload
            ? { ...item, checked: !item.checked }
            : item,
        ),
      };
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
}
