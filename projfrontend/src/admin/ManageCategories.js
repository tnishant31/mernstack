import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deteleThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preLoad();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base
      title="Manage Categories"
      description="You can manage a category here"
      className="container"
    >
      <Link className="btn btn-warning mb-3   " to={`/admin/dashboard`}>
        <span>Go back to admin dashboard</span>
      </Link>
      <div className="bg-info text-white rounded">
        <h4 className="bg-success text-center mb-4">All categories:</h4>

        <div className="row">
          <div className="col-12">
            <hr className="bg-white" />
            <h3 className="text-center text-white my-3">Total categories</h3>
            <hr className="bg-white" />

            {categories.map((category, index) => {
              return (
                <div key={index} className="row text-center mb-2">
                  <div className="col-4">
                    <h3 className="text-white text-center pr-2">
                      {category.name}
                    </h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-warning"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span>Update/Edit</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deteleThisCategory(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Link className="btn btn-warning mt-3" to={`/admin/dashboard`}>
        <span>Go back to admin dashboard</span>
      </Link>
    </Base>
  );
};

export default ManageCategories;
