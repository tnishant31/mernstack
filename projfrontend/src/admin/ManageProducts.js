import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deteleThisProduct = (productId) => {
    deleteProduct(productId, user._id, token)
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
      title="Manage Products"
      description="Edit, update pr detele a product, all at one place"
      className="conatiner"
    >
      <Link className="btn btn-warning mb-3   " to={`/admin/dashboard`}>
        <span>Go back to admin dashboard</span>
      </Link>
      <div className="bg-info text-white rounded">
        <h4 className="bg-success text-center mb-4">All products:</h4>

        <div className="row">
          <div className="col-12">
            <hr className="bg-white" />
            <h3 className="text-center text-white my-3">Total products</h3>
            <hr className="bg-white" />

            {products.map((product, index) => {
              return (
                <div key={index} className="row text-center mb-2">
                  <div className="col-4">
                    <h3 className="text-white text-center pr-2">
                      {product.title}
                    </h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-warning"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span>Update/Edit</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deteleThisProduct(product._id);
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

export default ManageProducts;
