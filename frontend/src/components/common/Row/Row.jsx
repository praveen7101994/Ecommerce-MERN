import React from "react";
import "./row.css";

const Row = (props) => {
  return (
    <div {...props} className="row">
      {props.children}
    </div>
  );
};

export default Row;
