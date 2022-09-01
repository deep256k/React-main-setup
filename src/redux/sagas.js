import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_PRODUCTS, SET_PRODUCTS } from "./constant";

function fetchMyData() {
  return fetch("http://localhost:8000/products");
}

function* fetchProducts(action) {
  let data = yield call(fetchMyData);
  //   console.log("saga called", data, action);
  data = yield data.json();
  console.log("saga called", data, action);

  yield put({ type: SET_PRODUCTS, payload: data });
}

function* fetchSaga() {
  yield takeEvery(FETCH_PRODUCTS, fetchProducts);
}

export default fetchSaga;
