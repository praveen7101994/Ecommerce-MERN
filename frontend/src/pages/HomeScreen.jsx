import React, { useEffect } from "react";
import "./../App.css";
import Product from "../components/Product/Product";
import axios from "axios";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="product-container">
      {products && products.map((product) => <Product product={product} />)}
    </div>
  );
};

export default HomeScreen;
