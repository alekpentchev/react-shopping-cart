import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout, DeliveryMethodForm } from "../../components";

class DeliveryMethod extends Component {
  onBackButtonPress = () => {
    this.props.history.goBack();
  };

  onFormSubmit = values => {
    const { deliveryMethod } = values;
    this.props.changeDeliveryMethod(deliveryMethod);
    this.props.clearCart();
    this.props.history.push("/summary");
  };

  render() {
    const { cartSummary, deliveryAddress } = this.props;

    if (deliveryAddress.country === null) {
      return <Redirect to="/address" />;
    }

    return (
      <Layout cartSummary={cartSummary}>
        <h2>Select delivery method</h2>
        <DeliveryMethodForm
          onBackButtonPress={this.onBackButtonPress}
          onFormSubmit={this.onFormSubmit}
        />
      </Layout>
    );
  }
}

export default DeliveryMethod;
