import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: "",
    loading: false,
    getRedirect: false,
    createdCategory: "",
    formData: "",
  });

  const {
    name,
    error,
    loading,
    getRedirect,
    createdCategory,
    formData,
  } = values;

  const preLoad = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, name: data.name, formData: new FormData() });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/categories" className="btn btn-small btn-warning mb-3">
          Go back to All Categories
        </Link>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    const value = (name = event.target.value);
    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  const onUpdate = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          console.log(data);
          setValues({
            ...values,
            name: "",
            error: "",
            loading: false,
            createdCategory: data.name,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none" }}
      >
        <h4>{createdCategory} updated successfully :) </h4>
      </div>
    );
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div
          className="alert alert-danger mt-3"
          style={{ display: createdCategory ? "" : "none" }}
        >
          <h4>{createdCategory} did not updated :( </h4>
        </div>
      );
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="Romance"
          />
          <button onClick={onUpdate} className="btn btn-outline-info">
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update this Category"
      description="Update the exitsing category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
