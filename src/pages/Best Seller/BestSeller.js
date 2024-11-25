import React, { useEffect, useState, useRef } from "react";
import ProductApi from "../../api/productApi";
import "./bestseller.css";
import { NavLink } from "react-router-dom";
import { Helmet } from 'react-helmet';
const BestSeller = () => {
  const [productList, setProductList] = useState([]);
  const productContainerRef = useRef(null); // Reference to the product container
  const [currentIndex, setCurrentIndex] = useState(0); // Keep track of the current index

  const fetchProductList = async () => {
    try {
      const response = await ProductApi.getAllMK();
      setProductList(response);
    } catch (error) {
      console.log("fail", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  // Function to scroll the product container left or right
  const scroll = (direction) => {
    if (productContainerRef.current) {
      const productWidth = productContainerRef.current.offsetWidth / 4; // 1/4th of the container width
      const maxIndex = productList.length - 4; // Calculate max index based on product count

      let newIndex = currentIndex + (direction === "left" ? -1 : 1);
      newIndex = Math.max(0, Math.min(newIndex, maxIndex)); // Ensure index is within bounds

      setCurrentIndex(newIndex);
      productContainerRef.current.scrollTo({
        left: newIndex * productWidth, // Scroll based on product width and index
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-container">
      <div className="bestseller">
        <h1 className="bestsellerh1">Bán chạy nhất</h1>
      </div>

      <button
        className="carousel-arrow-left"
        onClick={() => scroll("left")}
        disabled={currentIndex === 0} // Disable when at the start
      >
        ❮
      </button>

      <div className="product-container" ref={productContainerRef}>
        {productList.map((product) => (
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
            {/* Rating and Promotion */}
            <div className="product-rating">
              <span>{product.rating} ★</span>
              <span>({product.reviews})</span>
            </div>
            {product.promotion && (
              <div className="promotion-tag">
                <span>{product.promotion}</span>
              </div>
            )}
            {/* Product details */}
            <h3 className="h3-textbestseller">{product.name}</h3>
            <p className="p-textprice">
              {product.discountPrice
                ? `${product.discountPrice.toLocaleString("vi-VN")} ₫`
                : `${product.price.toLocaleString("vi-VN")} ₫`}
            </p>
            {product.discountPrice && (
              <p className="p-text-original-price">
                {product.price.toLocaleString("vi-VN")} ₫
              </p>
            )}
          </NavLink>
        ))}
      </div>

      <button
        className="carousel-arrow-right"
        onClick={() => scroll("right")}
        disabled={currentIndex === productList.length - 4} // Disable when at the end
      >
        ❯
      </button>
    </div>
  );
};

export default BestSeller;
