import { API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${API}products`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = ({ product }) => {
  return fetch(`${API}product/${product._id}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
