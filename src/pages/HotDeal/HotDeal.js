import React from "react";
import { useState } from "react";
import ProductApi from "../../api/productApi";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const HotDeal = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await ProductApi.getAll();
      setProductList(response);
      console.log(response);
    } catch (error) {
      console.log("fail", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div>
      <div className="mt-28 bestseller">
        <h1 className="bestsellerh1">HOT DEAL</h1>
      </div>
      <div className="product-container">
        {productList.slice(11, 17).map((product) => (
          <NavLink
            key={product.id}
            to={`/products/${product.id}`}
            className="product-item"
          >
            <img
              className="transform hover:scale-110 transition"
              src={product.imgUrl}
              alt={product.name}
            />
            <h3 style={{ fontSize: "18px" ,marginTop:"40px"}} className="h3-textbestseller">
              {product.name}
            </h3>
            <p className="p-textprice">
              {product.price.toLocaleString("vi-VN")} ₫
            </p>
          </NavLink>
        ))}
      </div>
      <div className="butoon-bottom mt-9">
        <NavLink to="/shirt">
          <button className="mt-2 button text-sm fa fa-arrow-right mr-5 flex button-sell ">
            <p style={{ marginLeft: "2.3rem" }}>Xem tất cả</p>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default HotDeal;
