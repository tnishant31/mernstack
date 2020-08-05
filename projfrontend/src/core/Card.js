import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f, // function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.title : "A photo from Images Bazzar";
  const cartAuthor = product ? product.author : "My Author";
  const cartPrice = product ? product.price : "0.00";

  const addToBasket = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const viewProductDetails = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          className="btn btn-block btn-outline-primary mt-2 mb-2"
          onClick={addToBasket}
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          className="btn btn-block btn-outline-warning mt-2 mb-2"
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <a href={viewProductDetails}>
      <div className="card text-white bg-dark border border-info">
        <div className="card-header lead text-truncate">{cartTitle}</div>
        <div className="card-body">
          {getRedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-info font-weight-normal text-wrap">
            {cartAuthor}
          </p>
          <p className="btn btn-success rounded btn-sm px-4">₹ {cartPrice}</p>
          <div className="row">
            <div className="col-12">{showAddToCart(addToCart)}</div>
            <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
