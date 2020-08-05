import React, { useState, useEffect } from "react";

import "../styles.css";
import Base from "./Base";
import ImageHelper from "./helper/ImageHelper";
import { getProduct } from "./helper/coreapicalls";

const ViewProduct = () => {
  // console.log("API IS ", API);

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.title : "A photo from Images Bazzar";
  const cartAuthor = product ? product.author : "My Author";
  const cartDescription = product ? product.description : "Product Description";
  const cartPublisher = product ? product.publisher : "My Publisher";
  const cartPrice = product ? product.price : "0.00";

  const loadProduct = () => {
    getProduct(product)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const addToBasket = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const leftPanel = () => {
    return (
      <div className="card">
        <ImageHelper product={product} />
      </div>
    );
  };

  const rightPanel = () => {
    return (
      <div className="card">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          <blockquote class="blockquote mb-1">
            <span className="badge badge-info mr-2">Author:</span> {cartAuthor}
            <span className="badge badge-info mr-2">Publisher:</span>
            {cartPublisher}
            <span className="badge badge-info mr-2">Price: ₹ </span>
            {cartPrice}
            <span className="badge badge-info mr-2">Description:</span>
            <footer class="blockquote-footer">{cartDescription}</footer>
            <button
              className="btn btn-block btn-outline-primary mt-2 mb-2"
              onClick={addToBasket}
            >
              Add to Cart
            </button>
          </blockquote>
        </div>
      </div>
    );
  };

  return (
    <Base title="Current Product" description="Know more about this product">
      <div className="row text-center">
        {getRedirect(redirect)}
        <div className="col-3">{leftPanel()}</div>
        <div className="col-9">{rightPanel()}</div>
      </div>
    </Base>
  );
};

export default ViewProduct;
