import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import CategoryApi from "../../api/CategoryApi";
import axios from "axios";
import "./header.css";

// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

function Header() {
  //Logo Header VT
  const [logoHeaderUrl, setLogoHeaderUrl] = useState(null);
  useEffect(() => {
    const fetchLogoHeader = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/site-info"); // Gọi API
        setLogoHeaderUrl(response.data.data.logo_header_url);
      } catch (error) {
        console.error("Error fetching logo header URL:", error);
      }
    };

    fetchLogoHeader();
  }, []);

  //login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hàm xử lý khi người dùng submit form đăng nhập
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  const handleLogin = (email, password) => {
    axios
      .post("http://127.0.0.1:8000/api/login", { email, password })
      .then((response) => {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(response.data)); 
        // console.log(response.data);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false); // Đóng modal khi đăng nhập thành công
      })
      .catch((error) => {
        console.error("Error logging in", error);
        alert("Đăng nhập thất bại!");
      });
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]); // State để lưu danh mục
  const { searchQuery, updateSearchQuery } = useContext(SearchContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Modal đăng ký
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); //Modal đăng nhập
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

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

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
  const handleHeartClick = () => {
    navigate("/wishlist");
  };

  const handleOpenModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true); // Mở modal đăng ký
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false); // Đóng modal đăng ký
  };
  return (
    <header className="header">
      <div className="logo-container">
        <NavLink to="/home">
          <img src={logoHeaderUrl} alt="logo" className="logo" />
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
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <div className="subcategory-content">
                          {category.subcategories.map((subcategory) => (
                            <NavLink
                              key={subcategory.id}
                              className="subcategory"
                              to={`/${subcategory.slug}`}
                            >
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
              transition: "box-shadow 0.3s ease",
            }}
          >
            <FaUserAlt style={{ color: "#fff", fontSize: "30px" }} />
          </button>
          <div className="user-menu">
            {isLoggedIn ? (
              <>
                <NavLink
                  className="text-slate-950"
                  to="/user"
                  style={{
                    backgroundColor: "#a3b4a2",
                    color: "black",
                    marginBottom: "12px",
                  }}
                >
                  Thông tin
                </NavLink>
                <NavLink
                  className="text-slate-950"
                  to="/history"
                  style={{
                    backgroundColor: "#a3b4a2",
                    color: "black",
                    marginBottom: "12px",
                  }}
                >
                  Lịch sử đơn hàng
                </NavLink>
                <button
                  className="text-slate-950"
                  onClick={handleLogout}
                  style={{ textTransform: "uppercase" }}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                {" "}
                {/* Đăng nhập, đăng ký */}
                <button
                  className="self-center px-3 py-3 rounded text-white hover:text-green-200 transition-colors duration-300"
                  onClick={handleOpenModal}
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  Đăng nhập
                </button>
                {/* <NavLink to="/signup">
                  <button
                    className="self-center px-3 py-3 rounded text-white hover:text-green-200 transition-colors duration-300"
                    style={{
                      textTransform: "uppercase",
                      margin: "0",
                    }}
                  >
                    Đăng ký
                  </button>
                </NavLink> */}
              </>
            )}
          </div>
        </div>

        {/* Modal đăng nhập */}
        {isLoginModalOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu:</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Đăng nhập
            </button>
          </form>
          <div className="modal-footer">
            <button onClick={handleOpenSignupModal} className="signup-link">
              Đăng ký
            </button>
            <NavLink to="/forgot-password" className="forgot-password-link">
              Quên mật khẩu?
            </NavLink>
          </div>
          {/* Nút Đóng Modal */}
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="close-modal"
          >
            ✖
          </button>
        </div>
      </div>
    )}


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
        {/* Yeu thích*/}
        <div className="cart-container items-center flex-shrink-0 hidden lg:flex cart-font ml-1">
          <button className="cart-button" onClick={handleHeartClick}>
            <FaHeart className="cart-icon" />
          </button>
          <div className="cart-info">
            {/* <span className="cart-quantity">10</span>
            <span className="cart-total">305.000₫</span> */}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
