import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { reasetpasswordApi } from "../../api/reasetpasswordApi";
import "./user.css";
import { Helmet } from 'react-helmet';
import { Button } from "antd";
import { Nav } from "react-bootstrap";
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
  // State để điều khiển modal
  const [isModalOpen, setModalOpen] = useState(false);

  // Hàm mở modal
  const showModal = () => setModalOpen(true);

  // Hàm đóng modal
  const closeModal = () => setModalOpen(false);

  return (
<<<<<<< Updated upstream
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
=======
    <div className="columns">
      <div className="sidebar sidebar-main">
        {" "}
        <div className="block block-collapsible-nav">
          <div className="title block-collapsible-nav-title">
            <strong> Tài khoản</strong>{" "}
            <span>
              Xin chào, <span className="name">Phạm Hửu Tài</span>
            </span>
          </div>
          <div
            className="content block-collapsible-nav-content"
            id="block-collapsible-nav"
          >
            <ul className="nav items">
              <li className="nav item">
                <Button><NavLink to="/wishlist">Sản phẩm yêu thích</NavLink></Button>
              </li>
            </ul>
            <ul className="nav items">
              <li className="nav item">
                <Button><NavLink to="/wishlist">Danh sách đơn hàng</NavLink></Button>
              </li>
            </ul>
            <ul className="nav items">
              <li className="nav item">
                <Button><NavLink to="/wishlist">Sản phẩm đã chấm điểm</NavLink></Button>
              </li>
            </ul>
          </div>
        </div>{" "}
      </div>
      <div className="column main">
        {" "}
        <div className="page-title-wrapper">
          <h1 className="page-title">
            <span className="base" data-ui-id="page-title-wrapper">
              Tài khoản của tôi
            </span>
          </h1>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
            alt="Avatar"
            className="avatar-image"
          />
        </div>
        <input name="form_key" type="hidden" defaultValue="rnTIcVPm7bRWr6N9" />{" "}
        <div />{" "}
        <form
          className="form form-edit-account"
          action="https://owen.vn/customer/account/editPost/"
          method="post"
          id="form-validate"
          encType="multipart/form-data"
          data-hasrequired="* Bắt buộc"
          autoComplete="off"
          noValidate="novalidate"
        >
          <fieldset className="fieldset info">
            <input name="form_key" type="hidden" defaultValue="rnTIcVPm7bRWr6N9" />{" "}
            <div className="field field-name-firstname required">
              <label htmlFor="firstname" className="label">
                <span>Họ và tên</span> 04/12/2002
              </label>{" "}
              <div className="control">
              </div>
            </div>{" "}
            <div className="field field-name-firstname required">
              <label htmlFor="firstname" className="label">
                <span>Email</span> 04/12/2002
              </label>{" "}
              <div className="control">
              </div>
            </div>{" "}
            <div className="field field-name-firstname required">
              <label htmlFor="firstname" className="label">
                <span>Số điện thoại</span> 04/12/2002
              </label>{" "}
              <div className="control">
              </div>
            </div>{" "}
            <div className="field field-name-firstname required">
              <label htmlFor="firstname" className="label">
                <span>Địa chỉ giao hàng</span> 04/12/2002
              </label>{" "}
              <div className="control">
              </div>
            </div>{" "}
            <div className="field field-name-firstname required">
              <label htmlFor="firstname" className="label">
                <span>Ngày sinh</span> 04/12/2002
              </label>{" "}
              <div className="control">
              </div>
            </div>{" "}
          </fieldset>{" "}
          <div className="actions-toolbar">
            <div className="primary">
              <button
                type="button"
                className="action save primary"
                title="Lưu lại"
                onClick={showModal}
              >
                <span>Cập nhật</span>
              </button>
            </div>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Cập nhật Thông Tin</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Họ và Tên:</label>
                    <input type="text" id="name" name="name" placeholder="Nhập họ và tên" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Nhập email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Số Điện Thoại:</label>
                    <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Địa Chỉ Giao Hàng:</label>
                    <input type="text" id="address" name="address" placeholder="Nhập địa chỉ" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Ngày Sinh:</label>
                    <input type="date" id="dob" name="dob" />
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="action save primary">
                      Lưu Thông Tin
                    </button>
                    <button
                      type="button"
                      className="action cancel secondary"
                      onClick={closeModal}
                    >
                      Đóng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </form>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default User;
