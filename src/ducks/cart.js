import { combineReducers } from "redux";
import { getProduct } from "./products";

const CART_ADD_ITEM = "cart/add_item";
const CART_REMOVE_ITEM = "cart/remove_item";
const CART_CHANGE_QUANTITY = "cart/change_quantity";
const CART_CLEAR = "cart/clear";

const productIds = (state = [], action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      if (state.indexOf(action.payload.productId) !== -1) return state;
      return [...state, action.payload.productId];
    case CART_REMOVE_ITEM:
      return [
        ...state.slice(0, state.indexOf(action.payload.productId)),
        ...state.slice(state.indexOf(action.payload.productId) + 1)
      ];
    case CART_CLEAR:
      return [];
    default:
      return state;
  }
};

const quantityById = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CART_ADD_ITEM:
      newState = { ...state };
      newState[action.payload.productId] = newState[action.payload.productId]
        ? newState[action.payload.productId] + action.payload.quantity
        : action.payload.quantity;
      return newState;
    case CART_CHANGE_QUANTITY:
      newState = { ...state };
      newState[action.payload.productId] = action.payload.quantity;
      return newState;
    case CART_REMOVE_ITEM:
      newState = { ...state };
      delete newState[action.payload.productId];
      return newState;
    case CART_CLEAR:
      return {};
    default:
      return state;
  }
};

const cartReducer = combineReducers({
  productIds,
  quantityById
});

export default cartReducer;

export const addToCart = (productId, quantity) => ({
  type: CART_ADD_ITEM,
  payload: { productId, quantity }
});

export const changeQuantity = (productId, quantity) => ({
  type: CART_CHANGE_QUANTITY,
  payload: { productId, quantity }
});

export const removeFromCart = productId => ({
  type: CART_REMOVE_ITEM,
  payload: { productId }
});

export const clearCart = () => ({
  type: CART_CLEAR
});

export const getQuantityById = (state, id) => state.cart.quantityById[id];
export const getCart = state => {
  const cart = [];
  state.cart.productIds.map(id => {
    cart.push({
      product: getProduct(state, id),
      quantity: getQuantityById(state, id)
    });
    return id;
  });
  return cart;
};
export const getCartSummary = state => {
  let priceSum = 0;
  const cart = getCart(state);

  cart.map(item => {
    priceSum += item.product.price * item.quantity;
    return item;
  });

  return { count: cart.length, priceSum: Math.round(priceSum * 100) / 100 };
};
