import { API } from "../../backend";

// Category api calls
// create
export const createCategory = (userId, token, category) => {
  return fetch(`${API}category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get all categories
// read
export const getAllCategories = () => {
  return fetch(`${API}categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// update a category
// update
export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete a category
// delete
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get a category
export const getCategory = (categoryId) => {
  return fetch(`${API}category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Product api calls
// create
export const createProduct = (userId, token, product) => {
  return fetch(`${API}product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get all products
// read
export const getAllProducts = () => {
  return fetch(`${API}products`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

// update a product
// update
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete a product
// delete
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// get a product
export const getProduct = (productId) => {
  return fetch(`${API}product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
