import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import HomeScreen from "./pages/HomeScreen";
import reportWebVitals from "./reportWebVitals";
import ProductScreen from "./pages/ProductScreen/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./pages/CartScreen/CartScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import { SnackbarProvider } from "./components/common/snackbar/SnackbarProvider";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import ShippingScreen from "./pages/ShippingScreen/ShippingScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PaymentScreen from "./pages/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen/OrderScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* private routes */}
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/Payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
