import React, { useState } from 'react';
import './ContactForm.css';
import { Helmet } from 'react-helmet';
const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        type: '',
        content: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện gửi dữ liệu đến server hoặc xử lý
        alert('Thông tin liên hệ đã được gửi!');
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
                    <form method="post" action="https://4menshop.com/lien-he.html" id="form" onSubmit={handleSubmit}>
                        <div className="row">
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
                        </div>
                        <div className="space20">
                            <select
                                name="type"
                                className="form-control"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Chọn chủ đề liên hệ ---</option>
                                <option value="1">Cần tư vấn mua hàng</option>
                                <option value="2">Hỏi về tình trạng đơn hàng</option>
                                <option value="3">Phàn nàn dịch vụ</option>
                                <option value="4">Chủ đề khác</option>
                            </select>
                        </div>
                        <div className="space20">
                            <textarea
                                name="content"
                                className="input-md form-control"
                                rows="6"
                                value={formData.content}
                                placeholder="Nội dung liên hệ"
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="space20">
                            <div className="g-recaptcha" data-sitekey="your-recaptcha-site-key">
                                Bạn hãy check vào check box (ô chọn) để xác thực
                            </div>
                        </div>
                        <button type="submit" className="btn-black">Gửi liên hệ</button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default ContactForm;
