import React, { useState } from "react";
import { userApi } from "../../api/userApi";
import logologin from "../../asset/logo/logo_header.png";
import "./signin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Import useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn form gửi dữ liệu đi
    try {
      const users = await userApi();

      const authenticated = users.find(
        (user) => user.username === username && user.password === password
      );

      if (authenticated) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("id", authenticated.id); // Lưu id vào localStorage

        setMessage("Đăng nhập thành công");
        navigate("/"); // Use useNavigate to navigate to user page
      } else {
        setMessage("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="login-container">
        <img style={{ width: "24%" }} src={logologin} alt="" />

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Đăng nhập
          </button >
          {/* Nút đăng nhập vằng gg */}
          <div style={{ marginTop: "20px" }}>
            <GoogleLogin
              onSuccess={(response) => {
                const userObject = jwtDecode(response.credential);
                localStorage.setItem("signup", JSON.stringify(userObject));
                localStorage.setItem("id", userObject.sub);
                setMessage(`Đăng nhập thành công với Gmail: ${userObject.email}`);
              }}
              onError={() => setMessage("Đăng nhập Google thất bại")}
            />
          </div>
          <div className="form-message">{message}</div>
          <span>
            <p className="text-red-500">
              Bạn chưa có tài khoản hãy đăng ký ngay{" "}
              <NavLink to="/signup">
                <button className="form-button2 ml-3">Đăng ký</button>
              </NavLink>
            </p>
          </span>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Signin;
