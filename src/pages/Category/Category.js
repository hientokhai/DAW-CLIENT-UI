import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import ProductApi from "../../api/productApi";
import { NavLink } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "./category.css";
import { Helmet } from "react-helmet";
const CategoryPr = () => {
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
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const colorRef = useRef(null);
  const sizeRef = useRef(null);
  const { slug } = useParams();
  useEffect(() => {
    // If a category slug is present in the URL, 
    // set the selectedCategory based on the slug
    if (slug) {
      const categoryName = slug.replace(/-/g, ' '); // Replace hyphens with spaces
      setSelectedCategory(categoryName);
    }
  }, [slug]);
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
  const fetchProductList = async () => {
    try {
      const response = await ProductApi.getAllMK();
      setProductList(response.data);
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
  }, [searchQuery, selectedCategory, selectedColor, selectedSize, selectedPrice, sortBy]);
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
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    navigate(`/category/${event.target.value.toLowerCase().replace(/\s+/g, '-')}`); // Navigate to the category page
  };
  const handleColorChange = (color) => setSelectedColor(color.color_name);
  const handleSizeChange = (size) => setSelectedSize(size.size_name);
  const handlePriceChange = (price) => setSelectedPrice(price);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productList.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
            <img
              className="transform hover:scale-110 transition h-80"
              src={product.images[0].image_url}
              alt={product.name}
            />
            <h3 className="h3-textbestseller">{product.name}</h3>
            <p className="p-textprice">
              {product.sel_price.toLocaleString("vi-VN")} ₫
            </p>
          </NavLink>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Sau
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;