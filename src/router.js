import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Cart,
  Products,
  OrderSummary,
  DeliveryAddress,
  DeliveryMethod
} from "./pages";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/summary" component={OrderSummary} />
      <Route exact path="/address" component={DeliveryAddress} />
      <Route exact path="/delivery" component={DeliveryMethod} />
    </Switch>
  </BrowserRouter>
);

export default Router;
