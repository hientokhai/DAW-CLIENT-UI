import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../asset/logo/logo_header.png";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import CategoryApi from "../../api/CategoryApi";
import './header.css'
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]); // State để lưu danh mục
  const { searchQuery, updateSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryApi.getAll(); // Gọi API để lấy danh mục
        setCategories(data.data); // Giả sử dữ liệu trả về nằm trong thuộc tính 'data'
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Chỉ gọi một lần khi component được mount

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-page?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/home">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <NavLink className="nav" to="/home">
              Trang chủ
            </NavLink>
          </li>

          {/* Danh mục menu với danh sách từ API */}
          <li
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink className="nav" to="#">
              Danh mục
            </NavLink>

            {isDropdownVisible && (
              <div className="dropdown-content">
                {categories.map((category) => (
                  <div key={category.id} className="category-group">
                    <NavLink className="category" to={`/${category.slug}`}>
                      {category.name}
                    </NavLink>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="subcategory-content">
                        {category.subcategories.map((subcategory) => (
                          <NavLink key={subcategory.id} className="subcategory" to={`/${subcategory.slug}`}>
                            {subcategory.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
          <li>
            <NavLink className="nav" to="/introduce">
              Giới thiệu
            </NavLink>
          </li>
          <li>
            <NavLink className="nav" to="/contactform">
              Liên hệ
            </NavLink>
          </li>
        </ul>
        {/* Tìm kiếm */}
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <button type="submit" className="search-icon">
            <AiOutlineSearch />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>

        <div className="user-menu-container">
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              transition: "box-shadow 0.3s ease"
            }}
          >
            <FaUserAlt style={{ color: "#fff", fontSize: "30px" }} />
          </button>
          <div className="user-menu">
            {isLoggedIn ? (
              <>
                <NavLink className="text-slate-950" to="/user" style={{ backgroundColor: "#a3b4a2", color: "black", marginBottom: "12px" }}>
                  Thông tin
                </NavLink>
                <button className="text-slate-950" onClick={handleLogout} style={{ textTransform: "uppercase" }}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signin">
                  <button
                    className="self-center px-3 py-3 rounded text-white hover:text-green-200 transition-colors duration-300"
                    onClick={handleLogin}
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    Đăng nhập
                  </button>
                </NavLink>

                <NavLink to="/signup">
                  <button className="self-center px-3 py-3 rounded text-white hover:text-green-200 transition-colors duration-300" style={{
                    textTransform: "uppercase", margin: "0"
                  }}>
                    Đăng ký
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Giỏ hàng */}
        <div className="cart-container items-center flex-shrink-0 hidden lg:flex cart-font ml-1">
          <button className="cart-button" onClick={handleCartClick}>
            <FaCartShopping className="cart-icon" />
          </button>
          <div className="cart-info">
            <span className="cart-quantity">10</span>
            <span className="cart-total">305.000₫</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;