import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth/helper";

const curretTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#26ae60" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Navigation = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-secondary">
        <li className="nav-item">
          <Link style={curretTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={curretTab(history, "/products")}
            className="nav-link"
            to="/products"
          >
            Products
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={curretTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={curretTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              User Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={curretTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={curretTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={curretTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/signin");
                });
              }}
            >
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Navigation);
