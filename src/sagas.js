import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  PRODUCTS_LOAD_SUCCEEDED,
  PRODUCTS_LOAD_FAILED,
  PRODUCTS_LOAD_REQUESTED
} from "./ducks/products";
import {
  ORDER_CREATE_REQUESTED,
  ORDER_CREATE_SUCCEEDED,
  ORDER_CREATE_FAILED,
  ORDER_CHANGE_DELIVERY_ADDRESS_REQUESTED,
  ORDER_CHANGE_DELIVERY_ADDRESS_SUCCEEDED,
  ORDER_CHANGE_DELIVERY_ADDRESS_FAILED,
  ORDER_CHANGE_DELIVERY_METHOD_REQUESTED,
  ORDER_CHANGE_DELIVERY_METHOD_SUCCEEDED,
  ORDER_CHANGE_DELIVERY_METHOD_FAILED,
  ORDER_SUBMIT_REQUESTED,
  ORDER_SUBMIT_SUCCEEDED,
  ORDER_SUBMIT_FAILED,
  getOrderNumber
} from "./ducks/order";
import shopApi from "./shopApi";

function* fetchProducts(action) {
  try {
    const payload = yield call(shopApi.getProducts);
    const {
      data: { products }
    } = payload;
    yield put({ type: PRODUCTS_LOAD_SUCCEEDED, payload: { products } });
  } catch (e) {
    yield put({ type: PRODUCTS_LOAD_FAILED, message: e.message });
  }
}

function* createOrder(action) {
  try {
    const payload = yield call(shopApi.createOrder, action.payload.products);
    const {
      data: { orderNumber }
    } = payload;
    yield put({
      type: ORDER_CREATE_SUCCEEDED,
      payload: { orderNumber, products: action.payload.products }
    });
  } catch (e) {
    yield put({ type: ORDER_CREATE_FAILED, message: e.message });
  }
}

function* changeDeliveryAddress(action) {
  try {
    const orderNumber = yield select(getOrderNumber);
    const { payload } = action;
    yield call(shopApi.changeDeliveryAddress, orderNumber, payload);
    yield put({
      type: ORDER_CHANGE_DELIVERY_ADDRESS_SUCCEEDED,
      payload
    });
  } catch (e) {
    yield put({
      type: ORDER_CHANGE_DELIVERY_ADDRESS_FAILED,
      message: e.message
    });
  }
}

function* changeDeliveryMethod(action) {
  try {
    const orderNumber = yield select(getOrderNumber);
    const { deliveryMethod } = action.payload;
    yield call(shopApi.changeDeliveryMethod, orderNumber, deliveryMethod);
    yield put({
      type: ORDER_CHANGE_DELIVERY_METHOD_SUCCEEDED,
      payload: { deliveryMethod }
    });
  } catch (e) {
    yield put({
      type: ORDER_CHANGE_DELIVERY_METHOD_FAILED,
      message: e.message
    });
  }
}

function* submitOrder(action) {
  try {
    const orderNumber = yield select(getOrderNumber);
    yield call(shopApi.submitOrder, orderNumber);
    yield put({
      type: ORDER_SUBMIT_SUCCEEDED
    });
  } catch (e) {
    yield put({
      type: ORDER_SUBMIT_FAILED,
      message: e.message
    });
  }
}

export default function*() {
  yield takeLatest(PRODUCTS_LOAD_REQUESTED, fetchProducts);
  yield takeLatest(ORDER_CREATE_REQUESTED, createOrder);
  yield takeLatest(
    ORDER_CHANGE_DELIVERY_ADDRESS_REQUESTED,
    changeDeliveryAddress
  );
  yield takeLatest(
    ORDER_CHANGE_DELIVERY_METHOD_REQUESTED,
    changeDeliveryMethod
  );
  yield takeLatest(ORDER_SUBMIT_REQUESTED, submitOrder);
}
