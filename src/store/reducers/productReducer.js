import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_SORT,
  SET_PRODUCT_DETAIL,
  SET_PRODUCT_DETAIL_FETCH_STATE,
} from "../actions/productActions";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 16,
  offset: 0,
  filter: "",
  sort: "",
  fetchState: "NOT_FETCHED",
  productDetail: null,
  productDetailFetchState: "NOT_FETCHED",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };
    case SET_PRODUCT_DETAIL_FETCH_STATE:
      return { ...state, productDetailFetchState: action.payload };
    default:
      return state;
  }
}
