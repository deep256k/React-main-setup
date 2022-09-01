import { DECREASE_COUNTER, INCREASE_COUNTER, SET_PRODUCTS } from "./constant";

const intialstate = {
  counter: 0,
  productData: [],
};

export const counterData = (state = intialstate, action) => {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    case DECREASE_COUNTER:
      return {
        ...state,
        counter: state.counter - action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        productData: action.payload,
      };
    default:
      return state;
  }
};
