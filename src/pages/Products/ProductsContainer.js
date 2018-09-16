import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Products from "./Products";
import { getProducts } from "../../ducks/products";
import { addToCart, getCartSummary } from "../../ducks/cart";

const mapStateToProps = state => ({
  products: getProducts(state),
  cartSummary: getCartSummary(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addToCart }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
