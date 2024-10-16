import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import BestSeller from "../pages/Best Seller/BestSeller";
import Shirt from "../pages/Shirt/Shirt";
import Trousers from "../pages/Trousers/Trousers";
import Bag from "../pages/Bag/Bag";
import Glasses from "../pages/Glasses/Glasses";
import Hat from "../pages/Hat/Hat";
import LakStudio from "../pages/LakStudio/LakStudio";
import Shoes from "../pages/Shoes/Shoes";
import Accessory from "../pages/Accessory/Accessory";
import Products from "../pages/Products/Products";
import Pay from "../pages/pay/pay";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import User from "../pages/User/User";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/bestseller" element={<BestSeller />} />
      <Route path="/shirt" element={<Shirt />} />
      <Route path="/trouser" element={<Trousers />} />
      <Route path="/bag" element={<Bag />} />
      <Route path="/glasses" element={<Glasses />} />
      <Route path="/hat" element={<Hat />} />
      <Route path="/lakstudio" element={<LakStudio />} />
      <Route path="/shoes" element={<Shoes />} />
      <Route path="/accessory" element={<Accessory />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}
