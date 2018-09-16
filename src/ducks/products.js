import { find } from "lodash";

export const PRODUCTS_LOAD_REQUESTED = "products/load/requested";
export const PRODUCTS_LOAD_SUCCEEDED = "products/load/succeeded";
export const PRODUCTS_LOAD_FAILED = "products/load/failed";

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case PRODUCTS_LOAD_SUCCEEDED:
      return [...state, ...action.payload.products];
    default:
      return state;
  }
};

export const fetchProducts = () => ({
  type: PRODUCTS_LOAD_REQUESTED
});

export default productsReducer;

export const getProducts = state => state.products;
export const getProduct = (state, id) => find(state.products, { id });
