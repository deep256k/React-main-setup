import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_PRODUCTS, SEARCH_PRODUCTS, SET_PRODUCTS } from "./constant";

function fetchMyData() {
  return fetch("http://localhost:8000/products");
}

function* fetchProductsData(action) {
  let data = yield call(fetchMyData);
  data = yield data.json();
  yield put({ type: SET_PRODUCTS, payload: data });
}

function* searchProductsData(action) {
  let products = yield fetch(
    `http://localhost:8000/products?q=${action.payload}`
  );
  products = yield products.json();
  yield put({ type: SET_PRODUCTS, payload: products });
}

function* fetchSaga() {
  yield takeEvery(FETCH_PRODUCTS, fetchProductsData);
  yield takeEvery(SEARCH_PRODUCTS, searchProductsData);
}

export default fetchSaga;
