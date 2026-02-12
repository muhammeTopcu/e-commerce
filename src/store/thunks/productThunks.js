import api from "../../api/axiosInstance";
import { setCategories, setFetchState } from "../actions/productActions";

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
