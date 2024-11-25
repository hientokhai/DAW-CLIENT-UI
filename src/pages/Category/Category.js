import React, { useEffect, useState } from "react";
import ProductApi from "../../api/productApi";
import { NavLink } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "./category.css";
const CategoryPr = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await ProductApi.getAllMK();
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
      <div className="bestseller">
        <h1 className="bestsellerh1">Áo</h1>
      </div>
      <div className="product-container">
        {productList.slice(0, 6).map((product) => (
          <NavLink
            key={product.id}
            to={`/products/${product.id}`}
            className="product-item"
          >
            <img src={product.imgUrl} alt={product.name} />
            <h3 className="h3-textbestseller">{product.name}</h3>
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

export default CategoryPr;
