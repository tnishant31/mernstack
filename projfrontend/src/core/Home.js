import React, { useState, useEffect } from "react";

import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
  // console.log("API IS ", API);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts()
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
    loadAllProducts();
  }, []);

  return (
    <Base
      title="Home Page"
      description="A page to find everything you need to get started."
    >
      <div className="row text-center">
        <h1 className="text-white">Latest in the store</h1>
        <div className="row">
          {products.slice(0, 6).map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-outline-warning btn-block btn-sm"
          onClick="/products"
        >
          View All Products
        </button>
      </div>
    </Base>
  );
}
