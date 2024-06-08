import React from "react";
import "./product-screen.css";
import LaptopImg from "./../../images/dell5530.jpg";
import Button from "./../../components/common/Button/Button";
import Row from "../../components/common/Row/Row";
import Rating from "../../components/rating/Rating";
import Separator from "../../components/common/Separator/Separator";
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import { useParams } from "react-router-dom";

const ProductScreen = () => {
  const { id: productId } = useParams;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : error ? (
        <>error</>
      ) : (
        <Row>
          <Button title={"Go Back"} />
          <div className="product-detail-container">
            <div className="product-img-container">
              <img src={LaptopImg} className="product-img" />
            </div>
            <div className="product-detail">
              <div className="product-title">{product.name}</div>
              <Separator />
              <Rating value={4} text={"8 reviews"} />
              <Separator />
              <div className="product-price">Price: $1212</div>
              <Separator />
              <div className="product-desc">
                this is the product description
              </div>
            </div>
            <div className="cart-action">
              <div className="space-between">
                Price:<span>$20</span>
              </div>
              <Separator />
              <div className="space-between">
                Status: <span>In Stock</span>
              </div>
              <Separator />
              <div className="space-between">
                Quantity:{" "}
                <span>
                  <input type="number" style={{ width: "40px" }} />
                </span>
              </div>
              <Separator />
              <div className="space-between">
                Total Price: <span>$20</span>
              </div>
              <Separator />
              <Button title={"Add To Cart"} />
            </div>
          </div>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
