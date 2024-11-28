import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./search.css";
import { NavLink } from "react-router-dom";
import ProductApi from "../../api/productApi";
import { FaUndo } from "react-icons/fa";
import { SearchContext } from "../../context/SearchContext";
import { Helmet } from "react-helmet";
const SearchPage = () => {
  const [productList, setProductList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const { searchQuery, resetSearchQuery } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Refs for focusing filters
  const categoryRef = useRef(null);
  const colorRef = useRef(null);
  const sizeRef = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await ProductApi.getCategoriesAndVariants();
        const { categories, sizes, colors } = response.data;

        setCategories(categories);
        setSizes(sizes);
        setColors(colors);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchProductData();
  }, []);

  // Fetch product list with filters
  const fetchProductList = async () => {
    try {
      const params = {
        searchQuery,
        category: selectedCategory,
        color: selectedColor,
        size: selectedSize,
        price: selectedPrice,
        sortBy,
      };
      const response = await ProductApi.getAllSearchPage(params); // Gọi API với các tham số lọc
      setProductList(response.data);

      // Đặt selectedCategory theo query params
      if (searchParams.get("category")) {
        setSelectedCategory(searchParams.get("category"));
        setSearchParams({ query: searchParams.query });
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    fetchProductList();

    // Focus vào các bộ lọc khi thay đổi
    if (selectedCategory) categoryRef.current?.focus();
    else if (selectedColor) colorRef.current?.focus();
    else if (selectedSize) sizeRef.current?.focus();
  }, [
    searchQuery,
    selectedCategory,
    selectedColor,
    selectedSize,
    selectedPrice,
    sortBy,
  ]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedSize("");
    setSelectedPrice("");
    setSortBy("");
    setCurrentPage(1);
    resetSearchQuery();
    fetchProductList();
  };

  // Filter Handlers
  const handleCategoryChange = (event) =>
    setSelectedCategory(event.target.value);
  const handleColorChange = (color) => setSelectedColor(color.color_name);
  const handleSizeChange = (size) => setSelectedSize(size.size_name);
  const handlePriceChange = (price) => setSelectedPrice(price);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productList.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Helmet>
        <title>Tìm kiếm sản phẩm</title>
      </Helmet>
      {searchQuery && (
        <div
          style={{
            backgroundColor: "#f4f1de",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <p>
            Kết quả tìm kiếm cho: <strong>{searchQuery}</strong>
          </p>
        </div>
      )}
      <div className="sidebar-filter">
        <div className="reset">
          <h1>Bộ lọc</h1>
          <FaUndo
            className="reset-icon"
            onClick={handleResetFilters}
            title="Reset Filters"
          />
        </div>

        {/* Category Filter Dropdown */}
        <h2 className="h4-filter">Danh mục</h2>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
          ref={categoryRef} // Attach ref
        >
          <option value="" disabled>
            Danh mục
          </option>
          {categories?.map((cate) => {
            return (
              <option key={cate.id} value={cate.name}>
                {cate.name}
              </option>
            );
          })}
        </select>

        <h2 className="h4-filter">Màu sắc</h2>
        <div className="filter-options color-filter" ref={colorRef}>
          {colors.map((color) => (
            <div
              key={color.id}
              onClick={() => handleColorChange(color)}
              className={`color-option ${
                selectedColor === color.color_name ? "selected" : ""
              }`}
            >
              {color.color_name}
            </div>
          ))}
        </div>

        <h2 className="h4-filter">Kích thước</h2>
        <div className="filter-options size-filter" ref={sizeRef}>
          {sizes.map((size) => (
            <div
              key={size.id}
              onClick={() => handleSizeChange(size)}
              className={`size-option ${
                selectedSize === size.size_name ? "selected" : ""
              }`}
            >
              {size.size_name}
            </div>
          ))}
        </div>

        <h2 className="h4-filter">Theo giá</h2>
        <div className="filter-options price-filter">
          <label>
            <input
              type="radio"
              name="price"
              value="below350"
              onChange={() => handlePriceChange("below350")}
            />
            Dưới 350.000₫
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="between350And750"
              onChange={() => handlePriceChange("between350And750")}
            />
            Từ 350.000₫ - 750.000₫
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="above750"
              onChange={() => handlePriceChange("above750")}
            />
            Trên 750.000₫
          </label>
        </div>
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <NavLink to={`/products/${product.id}`}>
              <img
                src={product.imgUrl}
                alt={product.name}
                className="product-image"
              />
              <h1 className="product-name">{product.name}</h1>
              <p className="product-price">
                {new Intl.NumberFormat("vi-VN").format(product.price) + "₫"}
              </p>
              <div className="product-color-size">
                <div className="product-color">
                  {product.color.map((color, index) => (
                    <span
                      key={index}
                      className={`color-circle ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
                <div className="product-size">
                  {product.size.map((size, index) => (
                    <span
                      key={index}
                      className={`size-box ${
                        selectedSize === size ? "selected" : ""
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
