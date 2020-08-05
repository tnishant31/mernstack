import React, { useState, useEffect } from "react";

import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart, addItemToCart } from "./helper/CartHelper";
import StripeCheckout from "../payments/StripeCheckout";
import BraintreePayment from "../payments/BraintreePayment";

const Cart = () => {
  // console.log("API IS ", API);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadProducts = (products) => {
    return (
      <div>
        <h2>This section is load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckOut = () => {
    return (
      <div>
        <StripeCheckout products={products} setReload={setReload} />
      </div>
    );
  };

  return (
    <Base title="Your Cart" description="Keep Adding Keep Shopping">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadProducts(products)
          ) : (
            <h3>No Products in cart</h3>
          )}
        </div>
        <div className="col-3">{loadCheckOut()}</div>
        <div className="col-3">
          <BraintreePayment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
