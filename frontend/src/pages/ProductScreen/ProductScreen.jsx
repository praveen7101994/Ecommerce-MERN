import React, { useState } from "react";
import "./product-screen.css";
import LaptopImg from "./../../images/dell5530.jpg";
import Button from "./../../components/common/Button/Button";
import Row from "../../components/common/Row/Row";
import Rating from "../../components/rating/Rating";
import Separator from "../../components/common/Separator/Separator";
import { useGetProductDetailsQuery } from "../../slices/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const countInStock = product?.countInStock;

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const handleQty = (e) => {
    const value = e.target.value;
    if (value > countInStock) {
      alert(`Only ${countInStock} items the stock available`);
      return;
    }
    setQty(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : error ? (
        <>error</>
      ) : (
        <Row>
          <Button title={"Go Back"} onClick={() => navigate(-1)} />
          <div className="product-detail-container">
            <div className="product-img-container">
              <img src={LaptopImg} className="product-img" />
            </div>
            <div className="product-detail">
              <div className="product-title">{product.name}</div>
              <Separator />
              <Rating value={4} text={`${product.numReviews} reviews`} />
              <Separator />
              <div className="product-price">Price: {`$${product.price}`}</div>
              <Separator />
              <div className="product-desc">{`${product.description}`}</div>
            </div>
            <div className="cart-action">
              <div className="space-between">
                Price:<span>{`$${product.price}`}</span>
              </div>
              <Separator />
              <div className="space-between">
                Status:{" "}
                <span>
                  {countInStock > 0
                    ? `In Stock (${countInStock})`
                    : "Out of stock"}
                </span>
              </div>
              <Separator />
              <div className="space-between">
                Quantity:{" "}
                <span>
                  <input
                    type="number"
                    onChange={handleQty}
                    style={{ width: "40px" }}
                    value={qty}
                    // max={countInStock}
                  />
                </span>
              </div>
              <Separator />
              <div className="space-between">
                Total Price: <span>${qty * product.price}</span>
              </div>
              <Separator />
              <Button
                onClick={handleAddToCart}
                title={"Add To Cart"}
                disabled={countInStock === 0 ? true : false}
              />
            </div>
          </div>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
