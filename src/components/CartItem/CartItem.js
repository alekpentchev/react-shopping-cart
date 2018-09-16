import React, { Component } from "react";
import { List, Avatar, Button } from "antd";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedQuantity: props.quantity };
  }

  decreaseQuantity = () => {
    const {
      product: { id },
      onChangeQuantity
    } = this.props;
    const { selectedQuantity } = this.state;
    if (selectedQuantity === 1) return;
    this.setState({ selectedQuantity: selectedQuantity - 1 }, () =>
      onChangeQuantity(id, this.state.selectedQuantity)
    );
  };

  increaseQuantity = () => {
    const {
      product: { id },
      onChangeQuantity
    } = this.props;
    const { selectedQuantity } = this.state;
    if (selectedQuantity === 10) return;
    this.setState({ selectedQuantity: selectedQuantity + 1 }, () =>
      onChangeQuantity(id, this.state.selectedQuantity)
    );
  };

  render() {
    const {
      product: { id, title, price, image },
      onRemoveFromCart,
      readOnly = false
    } = this.props;

    const actions = [];
    if (!readOnly) {
      actions.push(
        <div>{Math.round(price * this.state.selectedQuantity * 100) / 100}</div>
      );
      actions.push(<a onClick={() => onRemoveFromCart(id)}>remove</a>);
    }

    return (
      <List.Item actions={actions}>
        <List.Item.Meta
          avatar={<Avatar src={`${process.env.PUBLIC_URL}/images/${image}`} />}
          title={<a>{title}</a>}
          description={`Price per unit: ${price}zł`}
        />
        {!readOnly && (
          <div>
            <Button
              shape="circle"
              icon="minus"
              onClick={this.decreaseQuantity}
            />
            <strong style={{ margin: "0 10px" }}>
              {this.state.selectedQuantity}
            </strong>
            <Button
              shape="circle"
              icon="plus"
              onClick={this.increaseQuantity}
            />
          </div>
        )}
      </List.Item>
    );
  }
}

export default CartItem;
