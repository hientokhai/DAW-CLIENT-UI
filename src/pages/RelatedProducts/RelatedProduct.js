import React, { useEffect, useState } from "react";
import ProductApi from "../../api/productApi";
import { NavLink, useParams } from "react-router-dom";
import "./relatedprduct.css";
import productApi1 from "../../api/productApi1";

const RelatedProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm hiện tại từ URL
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // Lấy thông tin sản phẩm hiện tại
  const fetchCurrentProduct = async () => {
    try {
      const response = await ProductApi.get(id); // Lấy thông tin sản phẩm theo ID
      const currentProduct = response.data.product;
      setCurrentCategoryId(currentProduct.category_id);
    } catch (error) {
      console.log("Error fetching current product:", error);
    }
  };

  // Lấy sản phẩm liên quan
  const fetchRelatedProducts = async () => {
    try {
      const response = await productApi1.getAll(); // Gọi API
      console.log("API response:", response);
  
      const allProducts = response.data; // Dữ liệu sản phẩm nằm trực tiếp trong `data`
      console.log("All products:", allProducts);
  
      // Lọc sản phẩm dựa trên category_id và loại trừ sản phẩm hiện tại
      const filteredProducts = allProducts.filter(
        (product) => product.category_id === currentCategoryId && product.id !== parseInt(id)
      );
  
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.log("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    fetchCurrentProduct(); // Gọi API để lấy thông tin sản phẩm hiện tại
  }, [id]);

  useEffect(() => {
    if (currentCategoryId) {
      fetchRelatedProducts(); // Lấy sản phẩm liên quan khi có category_id
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
            <NavLink key={product.id} to={`/products/${product.id}`} className="product-item">
              <img src={product.images[0]?.image_url} alt={product.name} />
              <h3 className="h3-textbestseller">{product.name}</h3>
              <p className="p-textprice">{product.sel_price.toLocaleString("vi-VN")} ₫</p>
            </NavLink>
          ))
        ) : (
          <p className="no-products">Không có sản phẩm liên quan nào.</p>
        )}
      </div>
      <div className="butoon-bottom mt-9">
        <NavLink to="/shirt">
          <button className="mt-2 button text-sm fa fa-arrow-right mr-5 flex button-sell">
            <p style={{ marginLeft: "2.3rem" }}>Xem tất cả</p>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default RelatedProduct;