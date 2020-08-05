import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheckoutUsingStripe from "react-stripe-checkout";

import { isAuthenticated } from "../auth/helper";
import { emptyCart, loadCart } from "../core/helper/CartHelper";
import { API } from "../backend";
import { createOrder } from "../core/helper/OrderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;

    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        // call further methods
        const { status } = response;
        console.log("STATUS", status);
        emptyCart();
      })
      .catch((err) => console.log(err));
  };

  const payUsingStripe = () => {
    return isAuthenticated() ? (
      <CheckoutUsingStripe
        stripeKey="pk_test_51GyYTGHKglVPKNvFQKWwVFHDFfGFcGE87CfZvMSelBEIofu7zDpCugU2ME2bIBxzjCrFsDnqtEekFIln3Z5K50Xs00sawrUSCb"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Books"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </CheckoutUsingStripe>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign In</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {payUsingStripe()}
    </div>
  );
};

export default StripeCheckout;
