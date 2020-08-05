import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const AdminDashBoard = () => {
  const {
    user: { fname, lname, email, role },
  } = isAuthenticated();

  const adminLeftPanel = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-info text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create a Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-info">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Create a Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightPanel = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-info mr-2">Name:</span>
            {fname} {""}
            {lname}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage all your products"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftPanel()}</div>
        <div className="col-9">{adminRightPanel()}</div>
      </div>
    </Base>
  );
};
export default AdminDashBoard;
