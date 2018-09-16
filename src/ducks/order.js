import { combineReducers } from "redux";

export const ORDER_CREATE_REQUESTED = "order/create/requested";
export const ORDER_CREATE_SUCCEEDED = "order/create/succeeded";
export const ORDER_CREATE_FAILED = "order/create/failed";

export const ORDER_SUBMIT_REQUESTED = "order/submit/requested";
export const ORDER_SUBMIT_SUCCEEDED = "order/submit/succeeded";
export const ORDER_SUBMIT_FAILED = "order/submit/failed";

export const ORDER_CHANGE_DELIVERY_ADDRESS_REQUESTED = "order/change_delivery_address/requested";
export const ORDER_CHANGE_DELIVERY_ADDRESS_SUCCEEDED = "order/change_delivery_address/succeeded";
export const ORDER_CHANGE_DELIVERY_ADDRESS_FAILED = "order/change_delivery_address/failed";

export const ORDER_CHANGE_DELIVERY_METHOD_REQUESTED = "order/change_delivery_method/requested";
export const ORDER_CHANGE_DELIVERY_METHOD_SUCCEEDED = "order/change_delivery_method/succeeded";
export const ORDER_CHANGE_DELIVERY_METHOD_FAILED = "order/change_delivery_method/failed";

const orderNumber = (state = null, action) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCEEDED:
      return action.payload.orderNumber;
    case ORDER_SUBMIT_SUCCEEDED:
      return null;
    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCEEDED:
      return action.payload.products;
    case ORDER_SUBMIT_SUCCEEDED:
      return [];
    default:
      return state;
  }
};

const deliveryAddress = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CHANGE_DELIVERY_ADDRESS_SUCCEEDED:
      return action.payload;
    case ORDER_SUBMIT_SUCCEEDED:
      return {};
    default:
      return state;
  }
};

const deliveryMethod = (state = null, action) => {
  switch (action.type) {
    case ORDER_CHANGE_DELIVERY_METHOD_SUCCEEDED:
      return action.payload.deliveryMethod;
    case ORDER_SUBMIT_SUCCEEDED:
      return null;
    default:
      return state;
  }
};

const orderReducer = combineReducers({
  orderNumber,
  products,
  deliveryAddress,
  deliveryMethod
});

export default orderReducer;

export const createOrder = products => ({
  type: ORDER_CREATE_REQUESTED,
  payload: { products }
});

export const changeDeliveryAddress = payload => ({
  type: ORDER_CHANGE_DELIVERY_ADDRESS_REQUESTED,
  payload
});

export const changeDeliveryMethod = deliveryMethod => ({
  type: ORDER_CHANGE_DELIVERY_METHOD_REQUESTED,
  payload: { deliveryMethod }
});

export const submitOrder = () => ({ type: ORDER_SUBMIT_REQUESTED });

export const getOrder = state => state.order;
export const getOrderNumber = state => state.order.orderNumber;
export const getDeliveryAddress = state => state.order.deliveryAddress;
