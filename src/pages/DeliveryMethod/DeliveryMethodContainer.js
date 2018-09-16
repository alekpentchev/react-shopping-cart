import { connect } from "react-redux";
import DeliveryMethod from "./DeliveryMethod";
import { getCartSummary, getCart, clearCart } from "../../ducks/cart";
import {
  changeDeliveryMethod,
  getDeliveryAddress,
  createOrder
} from "../../ducks/order";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  cartSummary: getCartSummary(state),
  deliveryAddress: getDeliveryAddress(state),
  cart: getCart(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { changeDeliveryMethod, clearCart, createOrder },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryMethod);
