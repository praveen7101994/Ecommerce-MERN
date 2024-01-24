import React from "react";
import ShopLogo from "./../../images/shoplogo.jpg";
import CartLogo from "./../../images/shopping-cart.png";
import UserLogo from "./../../images/user.png";

const header = () => {
  return (
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
  );
};

export default header;
