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
import History from "../pages/History/history";
import SearchPage from "../pages/SearchPage/SearchPage";
import Introduce from "../pages/Introduce/Introduce";
import AboutUs from "../pages/AboutUS/AboutUS";
import Blog from "../pages/Blog/Blog";
import ContactForm from "../pages/ContactForm/ContactForm";
import Aboutmenstyle from "../pages/Aboutmenstyle/Aboutmenstyle";
import ContactPage from "../pages/ContactPage/ContactPage";
import Aboutmenstyle1 from "../pages/Aboutmenstyle/Aboutmenstyle1";
import BlogDetail from "../pages/DetailBlog/BlogDetail";
import OrderDetailPage from "../pages/OrderDetail/orderDetail";
import Bag1 from "../pages/Bag/Bag1";
import Wishlist from "../pages/Wishlist/Wishlist";
import CategoryPage from "../pages/Categories/Categories";
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
      <Route path="/history" element={<History />} />
      <Route path="/search-page" element={<SearchPage />} />
      <Route path="/introduce" element={<Introduce />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contactform" element={<ContactForm />} />
      <Route path="/aboutmenstyle" element={<Aboutmenstyle />} />
      <Route path="/contactpage" element={<ContactPage />} />
      <Route path="/aboutmenstyle1" element={<Aboutmenstyle1 />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/order/:orderId" element={<OrderDetailPage />} />
      <Route path="/bag1" element={<Bag1 />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
    </Routes>
  );
}
