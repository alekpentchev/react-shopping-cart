import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

const displayCartSummary = ({count, priceSum}) => {
  if (count === 0) {
    return `Cart: ${count} items`
  } else {
    return `Cart: ${count} items (${priceSum} zł)`
  }
}

const Header = ({ match: { path }, cartSummary }) => (
  <Layout.Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[path]}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="/">
        <Link to="/">Shop home</Link>
      </Menu.Item>
      <Menu.Item key="/cart" style={{float: 'right'}}>
        <Link to="/cart"><Icon type="shopping-cart" /> {displayCartSummary(cartSummary)}</Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
);

export default withRouter(Header);
