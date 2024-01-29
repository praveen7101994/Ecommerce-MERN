import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { products } from "./data/products.js";
import connectDB from "./config/connectDB.js";
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(port, () => console.log(`server running on port ${port}`));
