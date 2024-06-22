import React from "react";
import Rating from "../Rating/Rating";
import LaptopImg from "./../../images/dell5530.jpg";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const { _id: id, name, price, rating, numReviews = "" } = product;
  return (
    <>
      <Link to={`/product/${id}`}>
        <div className="product">
          <img className="product-img" src={LaptopImg} />
          <div>{name}</div>
          <div className="price-rating">
            <div className="price">{price}</div>
            <div className="rating">
              <Rating value={rating} text={`${numReviews}review`} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
