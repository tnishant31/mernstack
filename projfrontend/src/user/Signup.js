import React, { useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { fname, lname, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });
    signup({ fname, lname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            fname: "",
            lname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup!"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">First Name</label>
              <input
                className="form-control"
                type="text"
                value={fname}
                onChange={handleChange("fname")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                type="text"
                value={lname}
                onChange={handleChange("lname")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button className="btn-success btn-block" onClick={onSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Your account has been created successfully :)
            <br />
            Please <Link to={"/signin"}>Sign In</Link> to continue.
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Oops something went wrong. {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Get started by Signing Up"
      description="A page for user to sign up!"
    >
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
