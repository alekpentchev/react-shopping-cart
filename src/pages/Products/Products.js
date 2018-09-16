import React, { Component } from "react";
import { Layout, ProductsList } from "../../components";

class Products extends Component {
  render() {
    const { products, addToCart, cartSummary } = this.props;
    return (
      <Layout cartSummary={cartSummary}>
        <ProductsList products={products} onAddToCart={addToCart} />
      </Layout>
    );
  }
}

export default Products;
