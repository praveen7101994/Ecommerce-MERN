import React from "react";
import "./../App.css";
import Rating from "../components/rating/Rating";
import LaptopImg from "./../images/dell5530.jpg";
import { Link, useParams } from "react-router-dom";

const HomeScreen = () => {
  const { id: productId } = useParams();
  console.log({ productId });
  return (
    <div className="product-container">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((product) => (
        <Link to="/product/56">
          <div className="product">
            <img className="product-img" src={LaptopImg} />
            <div>Awesome product title here</div>
            <div className="price-rating">
              <div className="price">$250</div>
              <div className="rating">
                <Rating value={3.5} text="100" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeScreen;
