import React, { useEffect, useState } from "react";
import ProductApi from "../../api/productApi";
import { NavLink, useParams } from "react-router-dom";
import "./relatedprduct.css"

const RelatedProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm hiện tại từ URL
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const fetchCurrentProduct = async () => {
    try {
      const response = await ProductApi.get(id); // Fetch sản phẩm hiện tại
      const currentProduct = response.data.product;
      setCurrentCategoryId(currentProduct.category_id); // Lưu lại `category_id` của sản phẩm hiện tại
    } catch (error) {
      console.log("Error fetching current product:", error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await ProductApi.getAll(); // Fetch toàn bộ danh sách sản phẩm
      const allProducts = response.data.products;

      // Lọc các sản phẩm có cùng `category_id`
      const filteredProducts = allProducts.filter(
        (product) => product.category_id === currentCategoryId && product.id !== parseInt(id)
      );

      setRelatedProducts(filteredProducts); // Lưu danh sách sản phẩm liên quan
    } catch (error) {
      console.log("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    fetchCurrentProduct(); // Lấy thông tin sản phẩm hiện tại
  }, [id]);

  useEffect(() => {
    if (currentCategoryId) {
      fetchRelatedProducts(); // Fetch sản phẩm liên quan khi `category_id` đã được xác định
    }
  }, [currentCategoryId]);

  return (
    <div>
      <div className="mt-28 bestseller">
        <h1 className="bestsellerh1">SẢN PHẨM LIÊN QUAN</h1>
      </div>
      <div className="product-container">
        {relatedProducts.length > 0 ? (
          relatedProducts.slice(0, 4).map((product) => (
            <NavLink
              key={product.id}
              to={`/products/${product.id}`}
              className="product-item"
            >
              <img src={product.images[0]} alt={product.name} />
              <h3 className="h3-textbestseller">{product.name}</h3>
              <p className="p-textprice">
                {product.sel_price.toLocaleString("vi-VN")} ₫
              </p>
            </NavLink>
          ))
        ) : (
          <p className="no-products">Không có sản phẩm liên quan nào.</p>
        )}
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

export default RelatedProduct;