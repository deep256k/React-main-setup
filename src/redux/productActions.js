import { FETCH_PRODUCTS, SEARCH_PRODUCTS } from "./constant";

export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS,
  };
};

export const searchProducts = (searchQuery) => {
  return {
    type: SEARCH_PRODUCTS,
    payload: searchQuery,
  };
};
