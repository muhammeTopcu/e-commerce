export const SET_CATEGORIES = "product/SET_CATEGORIES";
export const SET_PRODUCT_LIST = "product/SET_PRODUCT_LIST";
export const SET_TOTAL = "product/SET_TOTAL";
export const SET_FETCH_STATE = "product/SET_FETCH_STATE";
export const SET_LIMIT = "product/SET_LIMIT";
export const SET_OFFSET = "product/SET_OFFSET";
export const SET_FILTER = "product/SET_FILTER";
export const SET_SORT = "product/SET_SORT";

export const setCategories = (payload) => ({ type: SET_CATEGORIES, payload });
export const setProductList = (payload) => ({ type: SET_PRODUCT_LIST, payload });
export const setTotal = (payload) => ({ type: SET_TOTAL, payload });
export const setFetchState = (payload) => ({ type: SET_FETCH_STATE, payload });
export const setLimit = (payload) => ({ type: SET_LIMIT, payload });
export const setOffset = (payload) => ({ type: SET_OFFSET, payload });
export const setFilter = (payload) => ({ type: SET_FILTER, payload });
export const setSort = (payload) => ({ type: SET_SORT, payload });
