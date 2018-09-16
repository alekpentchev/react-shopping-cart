import { connect } from "react-redux";
import OrderSummary from "./OrderSummary";
import { getCartSummary } from "../../ducks/cart";
import { bindActionCreators } from "redux";
import { getOrder, submitOrder } from "../../ducks/order";

const mapStateToProps = state => ({
  cartSummary: getCartSummary(state),
  order: getOrder(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitOrder }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);
