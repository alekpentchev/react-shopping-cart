import { connect } from "react-redux";
import Cart from "./Cart";
import {
  getCartSummary,
  getCart,
  changeQuantity,
  removeFromCart,
  clearCart
} from "../../ducks/cart";
import { bindActionCreators } from "redux";
import { createOrder } from "../../ducks/order";

const mapStateToProps = state => ({
  cartSummary: getCartSummary(state),
  cart: getCart(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeQuantity, removeFromCart, clearCart, createOrder }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
