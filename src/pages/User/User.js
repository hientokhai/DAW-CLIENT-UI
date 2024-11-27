import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { reasetpasswordApi } from "../../api/reasetpasswordApi";
import "./user.css";
import { Helmet } from 'react-helmet';
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

  return (
    <div class="main-content">
      <aside class="sidebar">
        <ul class="nav">
          <li class="nav-item">Danh sách các đơn hàng</li>
          <li class="nav-item">Danh sách sản phẩm yêu thích</li>
          <li class="nav-item">Sản phẩm đã chấm điểm</li>
        </ul>
      </aside>
      <section className="content">
        <form className="personal-info-form" action="#" method="POST">
          <div class="content">
            <h2>THÔNG TIN CÁ NHÂN</h2>
            <div class="info-group">
              <label for="name">Họ và Tên:</label>
              <p id="name">Nguyễn Văn A</p>
            </div>
            <div class="info-group">
              <label for="email">Email:</label>
              <p id="email">example@email.com</p>
            </div>
            <div class="info-group">
              <label for="phone">Số Điện Thoại:</label>
              <p id="phone">0123456789</p>
            </div>
            <div class="info-group">
              <label for="address">Địa Chỉ Giao Hàng:</label>
              <p id="address">123 Đường ABC, Quận 1, TP. HCM</p>
            </div>
            <div class="info-group">
              <label for="dob">Ngày Sinh:</label>
              <p id="dob">01/01/1990</p>
            </div>
            <div class="info-group">
              <label for="avatar">Ảnh Đại Diện:</label>
              <img id="avatar" src="https://via.placeholder.com/150" alt="Ảnh đại diện" />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default User;
