import { takeEvery, put } from "redux-saga/effects";
import { FETCH_PRODUCTS, SET_PRODUCTS } from "./constant";

function* fetchProducts() {
  let data = yield fetch("http://localhost:8000/products");
  data = yield data.json();
  //   console.log("saga called", data);
  yield put({ type: SET_PRODUCTS, payload: data });
}

function* fetchSaga() {
  yield takeEvery(FETCH_PRODUCTS, fetchProducts);
}

export default fetchSaga;
