import React, { useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai"; // Import search icon
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../asset/logo/logo_header.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    // Handle user login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Handle user logout
    setIsLoggedIn(false);
  };

  // Function to show/hide dropdown on hover
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Handle search action (e.g., redirect to search page or filter products)
  };

  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/home">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
      </div>
      <nav className="nav">
        {" "}
        <ul className="nav-links">
          <li>
            <NavLink className="nav" to="/home">
              Trang chủ
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="nav" to="/shirt">
              Sản phẩm
            </NavLink>
          </li> */}

          {/* Danh mục menu with hover effect */}
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
                <NavLink className="category" to="/shirt">Áo Nam</NavLink>
                <NavLink className="category" to="/trouser">Quần Nam</NavLink>
                <NavLink className="category" to="/shoes">Giày</NavLink>
              </div>
            )}
          </li>
          <li>
            <NavLink className="nav" to="/accessory">
              Giới thiệu
            </NavLink>
          </li>
          <li>
            <NavLink className="nav" to="/accessory">
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
            {isLoggedIn ? (<>
              <NavLink className="text-slate-950" to="/user" style={{ backgroundColor: "#a3b4a2", color: "black", marginBottom: "12px" }}>
                Thông tin
              </NavLink>
              <button className="text-slate-950" onClick={handleLogout} style={{ textTransform: "uppercase" }}>
                Đăng xuất
              </button></>) : (
              <> {/* Đăng nhập, đăng ký */}
                <NavLink to="/signin">
                  <button
                    className="self-center px-3 py-3 rounded text-white  hover:text-green-200 transition-colors duration-300"
                    onClick={handleLogin}
                    style={{
                      textTransform: "uppercase",
                      // backgroundColor: "#386150"
                    }}
                  >
                    Đăng nhập
                  </button>
                </NavLink>

                <NavLink to="/signup">
                  <button className="self-center px-3 py-3 rounded text-white  hover:text-green-200 transition-colors duration-300" style={{
                    textTransform: "uppercase", margin: "0"
                  }}>
                    Đăng ký
                  </button>
                </NavLink></>
            )}
          </div>
        </div>

        {/* Giỏ hàng */}
        <div className="items-center flex-shrink-0 hidden lg:flex cart-font ml-1">
          {/* <NavLink to="/cart">
            <button
              style={{
                marginLeft: "20px",
                backgroundColor: "transparent",
                border: "none",
                transition: "box-shadow 0.3s ease"
              }}
            >
              <BsCartPlusFill style={{ color: "#fff", fontSize: "30px" }} />
            </button>
          </NavLink> */}

          <button
            style={{
              marginLeft: "20px",
              backgroundColor: "transparent",
              border: "none",
              transition: "box-shadow 0.3s ease"
            }}
          >
            <FaCartShopping style={{ color: "#fff", fontSize: "30px" }} />
          </button>
        </div>

      </nav>
    </header>
  );
}

export default Header;
