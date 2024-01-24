import React from "react";
import "./rating.style.css";
import FullStar from "./../../images/star-full.png";
import HalfStar from "./../../images/star-half.png";
import ZeroStar from "./../../images/star-zero.png";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        <img
          className="rating-img"
          src={value >= 1 ? FullStar : value >= 0.5 ? HalfStar : ZeroStar}
        />
        <img
          className="rating-img"
          src={value >= 2 ? FullStar : value >= 1.5 ? HalfStar : ZeroStar}
        />
        <img
          className="rating-img"
          src={value >= 3 ? FullStar : value >= 2.5 ? HalfStar : ZeroStar}
        />
        <img
          className="rating-img"
          src={value >= 4 ? FullStar : value >= 3.5 ? HalfStar : ZeroStar}
        />
        <img
          className="rating-img"
          src={value >= 5 ? FullStar : value >= 4.5 ? HalfStar : ZeroStar}
        />
        <span className="rating-text">{`${text}`}</span>
      </span>
    </div>
  );
};

export default Rating;
