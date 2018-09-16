import React, { Component } from "react";
import { Card, Button, InputNumber } from "antd";

const { Meta } = Card;

class ProductItem extends Component {
  state = { selectedQuantity: 1 };

  onChangeQuantity = async selectedQuantity => {
    this.setState({selectedQuantity})
  }

  render() {
    const { product, onAddToCart } = this.props;
    const { id, title, price, image } = product;

    return (
      <Card
        style={{ width: 240 }}
        coverable
        cover={
          <img
            alt={title}
            src={`${process.env.PUBLIC_URL}/images/${image}`}
            style={{ padding: 10 }}
          />
        }
        actions={[
          <InputNumber min={1} max={10} defaultValue={1} size="large" onChange={this.onChangeQuantity} />,
          <Button type="primary" icon="shopping-cart" size="large" onClick={() => onAddToCart(id, this.state.selectedQuantity)}>
            Buy
          </Button>
        ]}
      >
        <Meta title={title} description={`Price: ${price}zł`} />
      </Card>
    );
  }
}

export default ProductItem;
