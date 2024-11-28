import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { reasetpasswordApi } from "../../api/reasetpasswordApi";
import "./user.css";
import { Helmet } from 'react-helmet';
import { Button } from "antd";
import { NavLink } from "react-router-dom";
function User() {
  const username = localStorage.getItem("username");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState(
    localStorage.getItem("password")
  );
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [id, setid] = useState(localStorage.getItem("id") || "");

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handlePasswordChangeButtonClick = () => {
    setChangingPassword(true);
  };

  const handleNewPasswordChange = (event) => {
    setNewPasswordValue(event.target.value);
  };

  const handleSaveButtonClick = async () => {
    try {
      const id = localStorage.getItem("id");
      if (!id) {
        console.log("User ID is null"); // Handle error here
        return;
      }
      const response = await reasetpasswordApi.updatePassword(
        id,
        newPasswordValue
      );
      if (response.status === 200) {
        setPasswordValue(newPasswordValue); // Lưu mật khẩu mới vào state
        setNewPasswordValue("");
        setChangingPassword(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000); // Auto hide message after 3 seconds

        // Cập nhật mật khẩu mới vào localStorage
        localStorage.setItem("password", newPasswordValue);
      } else {
        console.log(response.data); // Handle error response here
      }
    } catch (error) {
      console.log(error); // Handle error here
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar_url: "",
    name: "",
    email: "",
    address: "",
    phone_number: "",
  });

  // Open modal and set user info (mock data or fetched from API)
  const handleEditClick = () => {
    setUserInfo({
      avatar_url: "https://via.placeholder.com/150",
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      address: "123 Main St",
      phone_number: "0123456789",
    });
    setShowModal(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Info:", userInfo);
    setShowModal(false);
  };

  return (
    <div className="container">
      <aside class="sidebar">
        <ul class="nav-user">
          <li className="nav-item">
            <NavLink to="" className="nav-link">
              <Button>
                Danh sách đơn hàng
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="" className="nav-link">
              <Button>
                Sản phẩm dã chấm điểm
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/wishlist" className="nav-link">
              <Button>
                Sản phẩm yêu thích
              </Button>
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="profile-user">
        <h1 className="title">Thông tin người dùng</h1>
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
          alt="Avatar"
          className="avatar-image"
        />
        <p className="username">Họ và tên: </p>
        <p className="username">Email: </p>
        <p className="username">Địa chỉ giao hàng: </p>
        <p className="username">Số điện thoại: </p>
        <button onClick={handleEditClick} className="edit-button">
          Chỉnh sửa
        </button>
        <div className="password-container">
          <label htmlFor="password-input" className="password-label">
            Mật khẩu:
          </label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              value={passwordValue}
              // onChange={handlePasswordChange}
              readOnly={!passwordVisible}
              id="password-input"
              className="password-input"
            />
            <button
              className={`toggle-password ${passwordVisible ? "visible" : ""}`}
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </button>
            <button
              className="change-password-button"
              onClick={handlePasswordChangeButtonClick}
            >
              Thay đổi mật khẩu
            </button>
          </div>
        </div>
        {changingPassword && (
          <div className="new-password-container">
            <label htmlFor="new-password-input" className="password-label">
              Mật khẩu mới:
            </label>
            <div className="password-input-container">
              <input
                type="password"
                value={newPasswordValue}
                onChange={handleNewPasswordChange}
                id="new-password-input"
                className="password-input"
              />
            </div>
            <button className="save-button" onClick={handleSaveButtonClick}>
              Lưu thông tin
            </button>
          </div>
        )}
        {showSuccessMessage && (
          <div className="success-message">Thay đổi mật khẩu thành công</div>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chỉnh sửa thông tin cá nhân</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="avatar">Ảnh đại diện:</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, avatar_url: URL.createObjectURL(e.target.files[0]) })
                  }
                />
                {userInfo.avatar_url && (
                  <img src={userInfo.avatar_url} alt="Avatar" className="avatar-preview" />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Họ và tên:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ giao hàng:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Số điện thoại:</label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={userInfo.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Lưu
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
