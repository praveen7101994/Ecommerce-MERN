import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="main-container">
      <Header />

      <div className="second-section">
        <div className="sidebar">
          <div className="sidebar-heading">Shop by category</div>
          {[1, 1, 1, 1, 1, 1, 1, 1].map((cat, id) => (
            <div>category 1</div>
          ))}
          <div className="sidebar-heading">Price range</div>
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
