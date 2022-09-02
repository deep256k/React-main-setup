import { SET_PRODUCTS } from "./constant";

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
};
