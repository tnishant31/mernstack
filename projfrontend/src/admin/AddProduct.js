import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
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

  const preLoad = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          console.log(data);
          setValues({ ...values, categories: data, formData: new FormData() });
          console.log("CATE: ", categories); // Marked as bug
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preLoad();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
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
        <h4>{createdProduct} created successfully :) </h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} does not created :( </h4>
      </div>
    );
  };
  const createProductForm = () => {
    return (
      <form>
        <h4 className=" mt-4">Add a product</h4>
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
          onClick={onSubmit}
        >
          Create this product
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Add a new product"
      description="You can add new product here"
      className="container bg-info p-4"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
      <Link to="/admin/dashboard" className="btn btn-small btn-warning m-3">
        Go back to admin dashboard
      </Link>
    </Base>
  );
};

export default AddProduct;
