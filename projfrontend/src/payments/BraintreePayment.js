import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import { loadCart, emptyCart } from "../core/helper/CartHelper";
import {
  processPayment,
  getMeToken,
} from "../core/helper/braintreePaymentHelper";
import { createOrder } from "../core/helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";

const BraintreePayment = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log("Information ", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showBrainTreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.lenght > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Login or Add to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("Payment Success");
            const orderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData);
            emptyCart(() => {
              console.log("Did we got a crash?");
            });

            setReload(!reload);
          })
          .catch((error) => {
            setInfo({ loading: false, success: false, error });
            console.log("Payment Failed");
          });
      })
      .catch((error) => console.log(error));
  };

  const getAmount = () => {
    let amount = 0;

    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Test BraintreePayment</h3>
      {showBrainTreeDropIn()}
    </div>
  );
};

export default BraintreePayment;
