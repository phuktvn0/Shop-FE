import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";

const routerGuard = () => {
  const token = window.localStorage.getItem("userInfo");
  return !!token;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/search/:keyword" element={<HomeScreen />} exact />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart/:id?"
          element={
            routerGuard() ? <CartScreen /> : <Navigate replace to="/login" />
          }
        />

        <Route
          path="/profile"
          element={
            routerGuard() ? <ProfileScreen /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/shipping"
          element={
            routerGuard() ? (
              <ShippingScreen />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/payment"
          element={
            routerGuard() ? <PaymentScreen /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/placeorder"
          element={
            routerGuard() ? (
              <PlaceOrderScreen />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/order/:id"
          element={
            routerGuard() ? <OrderScreen /> : <Navigate replace to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
