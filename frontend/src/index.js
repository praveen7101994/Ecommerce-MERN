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
import AdminRoute from "./components/AdminRoute/AdminRoute";
import PaymentScreen from "./pages/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen/OrderScreen";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import OrderListScreen from "./pages/OrderListScreen/OrderListScreen";

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
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* Admin routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider deferLoading={true}>
      <Provider store={store}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
