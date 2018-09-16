import _ from "lodash";

class Basket {
  _products;

  constructor() {
    this._products = [];
  }

  add(product) {
    this._products.push(product);
  }

  remove(product) {
    const index = _.findIndex(this._products, product);
    this._products.splice(index, 1);
  }

  hasProduct(product) {
    return _.findIndex(this._products, product) !== -1;
  }

  products() {
    return this._products;
  }
}

export default Basket;
