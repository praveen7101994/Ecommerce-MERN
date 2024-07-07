import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleClickAway = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="main-container">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={
            sidebarOpen ? "sidebar sidebar-open" : "sidebar sidebar-closed"
          }
        >
          <div className="close-sidebar">
            <IconButton onClick={() => setSidebarOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="sidebar-heading">Shop by category</div>
          {[1, 1, 1, 1, 1, 1, 1, 1].map((cat, id) => (
            <div>category 1</div>
          ))}

          <div className="sidebar-heading">Price range</div>
        </div>
      </ClickAwayListener>
      <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="second-section">
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
