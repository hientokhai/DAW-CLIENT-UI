import React, { useState } from "react";
import "./ContactForm.css";
import { Helmet } from "react-helmet";
import axios from "axios";
const ContactForm = () => {

  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này");
      return;
    }
    const userData = await JSON.parse(localStorage.getItem("userData"));

    await axios.post("http://127.0.0.1:8000/api/contacts", {
      user_id: userData.user.id,
      ...formData,
    });

    alert("Thông tin liên hệ đã được gửi!");
  };

  return (
    <div className="contact-form">
      <Helmet>
        <title>Liên hệ</title>
      </Helmet>
      <div className="contact-form-container">
        {/* Contact Form */}
        <div className="contact-form-left">
          <h5 className="heading space40">GỬI LIÊN HỆ VỀ MEN'S STYLE</h5>
          <form
            method="post"
            action="https://4menshop.com/lien-he.html"
            id="form"
            onSubmit={handleSubmit}
          >
            {/* <div className="row">
              <div className="col-md-6 space20">
                <input
                  type="text"
                  className="input-md form-control"
                  name="fullname"
                  value={formData.fullname}
                  placeholder="Nhập họ tên"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 space20">
                <input
                  type="email"
                  className="input-md form-control"
                  name="email"
                  value={formData.email}
                  placeholder="Email của bạn"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 space20">
                <input
                  type="text"
                  className="input-md form-control"
                  name="phone"
                  value={formData.phone}
                  placeholder="Điện thoại"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space20">
              <input
                type="text"
                className="input-md form-control"
                name="address"
                value={formData.address}
                placeholder="Địa chỉ"
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="space20">
              <select
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              >
                <option value="">--- Chọn chủ đề liên hệ ---</option>
                <option value="Cần tư vấn mua hàng">Cần tư vấn mua hàng</option>
                <option value="Hỏi về tình trạng đơn hàng">
                  Hỏi về tình trạng đơn hàng
                </option>
                <option value="Phàn nàn dịch vụ">Phàn nàn dịch vụ</option>
                <option value="Chủ đề khác">Chủ đề khác</option>
              </select>
            </div>
            <div className="space20">
              <textarea
                name="message"
                className="input-md form-control"
                rows="6"
                value={formData.message}
                placeholder="Nội dung liên hệ"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="space20">
              <div
                className="g-recaptcha"
                data-sitekey="your-recaptcha-site-key"
              >
                Bạn hãy check vào check box (ô chọn) để xác thực
              </div>
            </div>
            <button type="submit" className="btn-black">
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
