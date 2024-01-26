import React, { useEffect, useState } from "react";
import "./../App.css";
import { useParams } from "react-router-dom";
import Product from "../components/product/Product";
import axios from "axios";

const HomeScreen = () => {
  // const { id: productId } = useParams();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default HomeScreen;
