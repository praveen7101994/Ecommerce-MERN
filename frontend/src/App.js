import React from "react";
import "./App.css";
import ShopLogo from "./images/shoplogo.jpg";
import CartLogo from "./images/shopping-cart.png";
import UserLogo from "./images/user.png";
import LaptopImg from "./images/dell5530.jpg";
import Rating from "./components/Rating";

const App = () => {
  return (
    <div className="main-container">
      <div className="header">
        <div className="header-left">
          <img src={ShopLogo} className="shop-logo" />
        </div>
        <div className="header-middle">
          <input
            className="search-input"
            type="text"
            placeholder="search your product here"
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="header-right">
          <img src={CartLogo} className="cart-logo" />
          <img src={UserLogo} className="shop-logo" />
        </div>
      </div>
      <div className="second-section">
        <div className="sidebar">
          <div className="sidebar-heading">Shop by category</div>
          {[1, 1, 1, 1, 1, 1, 1, 1].map((cat, id) => (
            <div>category 1</div>
          ))}
          <div className="sidebar-heading">Price range</div>
        </div>
        <div className="main">
          <div className="product-container">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((product) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
