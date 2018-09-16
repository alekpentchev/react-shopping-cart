import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8081/"
});

const getProducts = async () => client.get("/products");

const createOrder = async (products = []) =>
  client.post("/order/create", { products });

const changeDeliveryAddress = async (orderNumber, address) =>
  client.post(`/order/${orderNumber}/deliveryAddress`, address);

const changeDeliveryMethod = async (orderNumber, deliveryMethod) =>
  client.post(`/order/${orderNumber}/deliveryMethod`, { deliveryMethod });

const submitOrder = async orderNumber =>
  client.post(`/order/${orderNumber}/submit`);

const getOrder = async orderNumber => client.get(`/order/${orderNumber}`);

export default {
  getProducts,
  createOrder,
  changeDeliveryAddress,
  changeDeliveryMethod,
  submitOrder,
  getOrder
};
