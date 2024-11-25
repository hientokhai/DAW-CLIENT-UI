import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import productApi1 from "../../api/productApi1"; // Sử dụng productApi1 thay vì ProductApi
import { FaUndo } from "react-icons/fa";
import { SearchContext } from "../../context/SearchContext";
import SizeApi from "../../api/sizeApi";
import ColorApi from "../../api/ColorApi";

const SearchPage = () => {
    const [productList, setProductList] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const { searchQuery, resetSearchQuery } = useContext(SearchContext);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch("https://api.example.com/colors"); // Replace with your API endpoint
                const data = await response.json();
                setColors(data);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };

        fetchColors();
    }, []);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/colors/");
                const data = await response.json();
                setColors(data);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };

        fetchColors();
    }, []);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/sizes/'); // Thay thế bằng URL API của bạn
                const data = await response.json();
                setSizes(data);
            } catch (error) {
                console.error('Error fetching sizes:', error);
            }
        };

        fetchSizes();
    }, []);

    const fetchProductList = async () => {
        try {
            const response = await productApi1.getAll(); // Lấy danh sách sản phẩm từ productApi1
            setProductList(response.data); // Giả sử response.data chứa danh sách sản phẩm
        } catch (error) {
            console.log("fail", error);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    const handleResetFilters = () => {
        setSelectedCategory("");
        setSelectedColor("");
        setSelectedSize("");
        setSelectedPrice("");
        setSortBy("");
        setCurrentPage(1);
        resetSearchQuery();
    };

    const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
    const handleSizeChange = (size) => setSelectedSize(size);
    const handlePriceChange = (price) => setSelectedPrice(price);

    const filteredProducts = productList
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => !selectedCategory || product.category === selectedCategory)
        .filter((product) => !selectedColor || product.color === selectedColor)
        .filter((product) => !selectedSize || product.size === selectedSize)
        .filter((product) => {
            if (selectedPrice === "below350") return product.sel_price < 350000;
            if (selectedPrice === "between350And750") return product.sel_price >= 350000 && product.sel_price <= 750000;
            if (selectedPrice === "above750") return product.sel_price > 750000;
            return true;
        })
        .sort((a, b) => (sortBy === "asc" ? a.sel_price - b.sel_price : b.sel_price - a.sel_price));

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {searchQuery && (
                <div style={{ backgroundColor: "#f4f1de", padding: "10px 20px", display: "flex", justifyContent: "start" }}>
                    <p>Kết quả tìm kiếm cho: <strong>{searchQuery}</strong></p>
                </div>
            )}
            <div className="sidebar-filter">
                <div className="reset">
                    <h1>Bộ lọc</h1>
                    <FaUndo className="reset-icon" onClick={handleResetFilters} title="Reset Filters" />
                </div>

                <h2 className="h4-filter">Danh mục</h2>
                <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
                    <option value="">Tất cả</option>
                    <option value="Áo nam">Áo nam</option>
                    <option value="Quần nam">Quần nam</option>
                    <option value="Giày">Giày</option>
                </select>

                <h2 className="h4-filter">Màu sắc</h2>
                <div className="filter-options color-filter">
                    {["Đen", "Đỏ", "Vàng", "Cam", "Xám", "Hồng", "Tím", "Nâu", "Trắng"].map((color) => (
                        <div key={color} onClick={() => handleColorChange(color)} className={`color-option ${selectedColor === color ? "selected" : ""}`}>
                            {color}
                        </div>
                    ))}
                </div>

                <h2 className="h4-filter">Kích thước</h2>
                <div>

                    <select>
                        <option value="">Chọn kích thước</option>
                        {sizes.map((size) => (
                            <option key={size.id} value={size.size_name}>
                                {size.size_name} - {size.description}
                            </option>
                        ))}
                    </select>
                </div>

                <h2 className="h4-filter">Theo giá</h2>
                <div className="filter-options price-filter">
                    <label>
                        <input type="radio" name="price" value="below350" onChange={() => handlePriceChange("below350")} />
                        Dưới 350.000₫
                    </label>
                    <label>
                        <input type="radio" name="price" value="between350And750" onChange={() => handlePriceChange("between350And750")} />
                        Từ 350.000₫ - 750.000₫
                    </label>
                    <label>
                        <input type="radio" name="price" value="above750" onChange={() => handlePriceChange("above750")} />
                        Trên 750.000₫
                    </label>
                </div>
            </div>

            <div className="product-grid">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <NavLink to={`/products/${product.id}`}>
                            <img src={product.imgUrl} alt={product.name} className="product-image" />
                            <h1 className="product-name">{product.name}</h1>
                            <p className="product-price">{product.sel_price.toLocaleString("vi-VN")} ₫</p>
                            <div className="product-color-size">
                                <div className="product-color">
                                    {["black", "red", "yellow"].map((color, index) => (
                                        <span
                                            key={index}
                                            className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                                            style={{ backgroundColor: color }}
                                        ></span>
                                    ))}
                                </div>
                                <div className="product-size">
                                    {["S", "XS", "M"].map((size, index) => (
                                        <span key={index} className={`size-box ${selectedSize === size ? "selected" : ""}`}>{size}</span>
                                    ))}
                                </div>
                            </div>
                        </NavLink>
                    </div>
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

export default SearchPage;