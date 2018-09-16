import React from "react";
import { Layout as BaseLayout } from "antd";
import { Header, Footer } from "..";
const { Content } = BaseLayout;

const Layout = ({ children, cartSummary }) => (
  <BaseLayout className="layout">
    <Header cartSummary={cartSummary} />
    <Content style={{ padding: "0 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        {children}
      </div>
    </Content>
    <Footer />
  </BaseLayout>
);

export default Layout;
