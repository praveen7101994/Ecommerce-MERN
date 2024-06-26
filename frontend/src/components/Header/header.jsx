import React from "react";
import ShopLogo from "./../../images/shoplogo.jpg";
// import CartLogo from "./../../images/shopping-cart.png";
// import UserLogo from "./../../images/user.png";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserMenu from "./../UserMenu/UserMenu";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  console.log(
    "cartItems",
    cartItems.reduce((acc, item) => acc + item.qty, 0)
  );
  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleHomeIcon = () => {
    navigate("/");
  };
  return (
    <div className="header">
      <div className="header-left" onClick={handleHomeIcon}>
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
        {/* <img src={CartLogo} className="cart-logo" /> */}
        <IconButton aria-label="delete" onClick={handleCartClick}>
          <Badge
            badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)}
            color="primary"
          >
            <ShoppingCartIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
        {/* <img src={UserLogo} className="shop-logo" /> */}
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
