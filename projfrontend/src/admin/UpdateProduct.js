import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    author: [],
    description: "",
    publisher: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    title,
    author,
    description,
    publisher,
    price,
    stock,
    photo,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preLoad = (productId) => {
    getProduct(productId)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          console.log(data);
          setValues({
            ...values,
            title: data.title,
            author: data.author,
            description: data.description,
            publisher: data.publisher,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            photo: data.photo,
            formData: new FormData(),
          });
          preLoadCategories();
          console.log("CATE: ", categories);
        }
      })
      .catch((err) => console.log(err));
  };

  const preLoadCategories = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ categories: data, formData: new FormData() });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preLoad(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  const onUpdate = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            title: "",
            author: [],
            description: "",
            publisher: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} updated successfully :) </h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} does not updated :( </h4>
      </div>
    );
  };
  const createProductForm = () => {
    return (
      <form>
        <h4 className=" mt-4">Update this product</h4>
        <div className="form-group">
          <input
            onChange={handleChange("title")}
            name="photo"
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("author")}
            type="text"
            name="photo"
            className="form-control"
            placeholder="Author"
            value={author}
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("description")}
            name="photo"
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("publisher")}
            name="photo"
            type="text"
            className="form-control"
            placeholder="Publisher"
            value={publisher}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("price")}
            type="number"
            name="photo"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>Select Category</option>
            {categories &&
              categories.map((cate, index) => {
                return (
                  <option key={index} value={cate._id}>
                    {cate.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("stock")}
            name="photo"
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
          />
        </div>

        <span>Upload a photo</span>
        <div className="form-group">
          <lable className="btn btn-block btn-info">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="Upload a photo"
            />
          </lable>
        </div>

        <button
          type="submit"
          className="btn btn-outline-success mb-3"
          onClick={onUpdate}
        >
          Update this product
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Update or Edit product"
      description="You can update or edit any product here"
      className="container bg-info p-4"
    >
      <Link to="/admin/products" className="btn btn-small btn-warning m-3">
        Go back to all products
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
      <Link to="/admin/products" className="btn btn-small btn-warning m-3">
        Go back to all products
      </Link>
    </Base>
  );
};

export default UpdateProduct;
