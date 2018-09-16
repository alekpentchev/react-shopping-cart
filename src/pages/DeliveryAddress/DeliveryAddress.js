import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Layout, AddressForm } from "../../components";

class DeliveryAddress extends Component {
  onBackButtonPress = () => {
    this.props.history.goBack();
  };

  onFormSubmit = values => {
    this.props.changeDeliveryAddress(values);
    this.props.history.push("/delivery");
  };

  render() {
    const { cartSummary } = this.props;

    if (cartSummary.count === 0) {
      return <Redirect to="/" />;
    }

    return (
      <Layout cartSummary={cartSummary}>
        <h2>Enter your delivery address</h2>
        <AddressForm
          onBackButtonPress={this.onBackButtonPress}
          onFormSubmit={this.onFormSubmit}
        />
      </Layout>
    );
  }
}

export default DeliveryAddress;
