import { connect } from "react-redux";
import DeliveryAddress from "./DeliveryAddress";
import { getCartSummary } from "../../ducks/cart";
import { changeDeliveryAddress } from "../../ducks/order";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  cartSummary: getCartSummary(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDeliveryAddress }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddress);
