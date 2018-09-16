import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import products, { fetchProducts } from "./ducks/products";
import cart from "./ducks/cart";
import order from "./ducks/order";
import sagas from "./sagas";

const rootReducer = combineReducers({
  products,
  cart,
  order
});

const saga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(saga, logger));

saga.run(sagas);

store.dispatch(fetchProducts());

export default store;
