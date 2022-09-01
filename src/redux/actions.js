import { DECREASE_COUNTER, FETCH_PRODUCTS, INCREASE_COUNTER } from "./constant";

export const increaseCounter = () => {
  return {
    type: INCREASE_COUNTER,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREASE_COUNTER,
    payload: 5,
  };
};

export const fetchData = () => {
  return {
    type: FETCH_PRODUCTS,
  };
};
