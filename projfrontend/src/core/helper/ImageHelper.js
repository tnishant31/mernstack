import React from "react";

import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}product/photo/${product._id}`
    : `https://d3nn873nee648n.cloudfront.net/900x600/16366/220-SM693771.jpg`;
  console.log(imageURL);
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};
export default ImageHelper;
