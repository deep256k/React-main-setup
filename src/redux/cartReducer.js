import { REMOVE_FROM_CART, ADD_TO_CART } from "./constant";

export const cartData = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      state.push(action.payload);
      return [...state];
    case REMOVE_FROM_CART:
      state = state.filter((item) => item.id !== action.payload);
      return [...state];
    default:
      return state;
  }
};
