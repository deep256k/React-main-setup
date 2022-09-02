import { combineReducers } from "@reduxjs/toolkit";
import { cartData } from "./cartReducer";
import { productReducer } from "./productReducer";

export default combineReducers({
  cartData,
  productReducer,
});