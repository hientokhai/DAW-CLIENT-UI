import React, { useState } from "react";
import { registerApi } from "../../api/registerApi";
import logologin from "../../asset/logo/LK.png";
import "./signup.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn form gửi dữ liệu đi

    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
    if (!email || !username || !password || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp");
      return;
    }

    try {
      const userData = { email, username, password };
      const user = await registerApi(userData);

      // Lưu trang đăng ký vào localStorage
      localStorage.setItem("signup", JSON.stringify(user));
      localStorage.setItem("id", user.id); // Lưu id vào localStorage

      setMessage(`Đăng ký thành công với email: ${user.email}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <img style={{ width: "24%" }} src={logologin} />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-input"
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Xác nhận mật khẩu:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="form-input"
          />
        </div>
        <button className="form-button" type="submit">
          Đăng ký
        </button>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default Signup;
