import api from "../../api/axiosInstance";
import {
  setCategories,
  setFetchState,
  setProductDetail,
  setProductDetailFetchState,
  setProductList,
  setTotal,
} from "../actions/productActions";

let categoriesPromise = null;

export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const { product } = getState();

  if (Array.isArray(product.categories) && product.categories.length > 0) {
    return product.categories;
  }

  if (categoriesPromise) {
    return categoriesPromise;
  }

  dispatch(setFetchState("FETCHING"));

  categoriesPromise = api
    .get("/categories")
    .then((response) => {
      const categories = Array.isArray(response.data) ? response.data : [];
      dispatch(setCategories(categories));
      dispatch(setFetchState("FETCHED"));
      return categories;
    })
    .catch((error) => {
      dispatch(setFetchState("FAILED"));
      throw error;
    })
    .finally(() => {
      categoriesPromise = null;
    });

  return categoriesPromise;
};

export const fetchProducts = (options = {}) => async (dispatch, getState) => {
  const { product } = getState();
  const {
    categoryId,
    limit = product.limit,
    offset = product.offset,
    filter = product.filter,
    sort = product.sort,
  } = options;

  dispatch(setFetchState("FETCHING"));

  const params = new URLSearchParams();
  if (limit !== undefined && limit !== null) params.set("limit", String(limit));
  if (offset !== undefined && offset !== null) params.set("offset", String(offset));
  if (filter) params.set("filter", String(filter));
  if (sort) params.set("sort", String(sort));
  if (categoryId) params.set("category", String(categoryId));

  const url = params.toString() ? `/products?${params.toString()}` : "/products";

  return api
    .get(url)
    .then((response) => {
      const data = response.data || {};
      const products = Array.isArray(data.products) ? data.products : [];
      const total = Number(data.total) || 0;

      dispatch(setProductList(products));
      dispatch(setTotal(total));
      dispatch(setFetchState("FETCHED"));

      return data;
    })
    .catch((error) => {
      dispatch(setFetchState("FAILED"));
      throw error;
    });
};

export const fetchProductById = (productId) => async (dispatch) => {
  if (!productId) return null;

  dispatch(setProductDetailFetchState("FETCHING"));

  return api
    .get(`/products/${productId}`)
    .then((response) => {
      const product = response?.data || null;
      dispatch(setProductDetail(product));
      dispatch(setProductDetailFetchState("FETCHED"));
      return product;
    })
    .catch((error) => {
      dispatch(setProductDetail(null));
      dispatch(setProductDetailFetchState("FAILED"));
      throw error;
    });
};
