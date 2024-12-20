import React, { useEffect, useState, useRef } from "react";
import ProductApi from "../../api/productApi";
import "./NewProduct.css";
import { NavLink } from "react-router-dom";

const NewProduct = () => {
  const [productList, setProductList] = useState([]);
  const productContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProductList = async () => {
    try {
      const response = await ProductApi.getAllMK();
      const products = [...response.data];
      products.sort((a, b) => b.id - a.id); //sắp xếp theo id sp có id lớn hơn đứng trước
      console.log(products);
      setProductList(products); // Lưu ds sp đã sắp xếp 
    } catch (error) {
      console.log("fail", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const scroll = (direction) => {
    if (productContainerRef.current) {
      const productWidth = productContainerRef.current.offsetWidth / 4;
      const maxIndex = productList.length - 4;

      let newIndex = currentIndex + (direction === "left" ? -1 : 1);
      newIndex = Math.max(0, Math.min(newIndex, maxIndex));

      setCurrentIndex(newIndex);
      productContainerRef.current.scrollTo({
        left: newIndex * productWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-container">
      <div className="mt-10 bestseller">
        <h1 className="bestsellerh1">Sản phẩm mới</h1>
      </div>

      <button
        className="carousel-arrow-left"
        onClick={() => scroll("left")}
        disabled={currentIndex === 0}
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
              className="transform hover:scale-110 transition h-80"
              src={product.images[0].image_url}
              alt={product.name}
            />

            <div className="product-rating">
              <span>{product.rating} ★</span>
              <span>({product.reviews})</span>
            </div>
            {product.promotion && (
              <div className="promotion-tag">
                <span>{product.promotion}</span>
              </div>
            )}

            <h3 className="h3-textbestseller">{product.name}</h3>
            {/* <p className="p-textprice">
              {product.discountPrice
                ? `${product.discountPrice.toLocaleString("vi-VN")} ₫`
                : `${product.price.toLocaleString("vi-VN")} ₫`}
            </p>
            {product.discountPrice && (
              <p className="p-text-original-price">
                {product.price.toLocaleString("vi-VN")} ₫
              </p>
            )} */}
            <p className="p-textprice">
              `${product.sel_price.toLocaleString("vi-VN")} ₫`
            </p>
          </NavLink>
        ))}
      </div>

      <button
        className="carousel-arrow-right"
        onClick={() => scroll("right")}
        disabled={currentIndex === productList.length - 4}
      >
        ❯
      </button>
    </div>
  );
};

export default NewProduct;
