import React from 'react';
import { Link } from 'react-router-dom';
import "./Introduce.css";

// Import ảnh từ thư mục src
import companyImage from '../../asset/img/image1.png';
import blogImage from '../../asset/img/image2.png';  // Thêm ảnh thứ hai

const Introduce = () => {
    return (
        <div className="contact-page">
            <h1>Trang Liên Hệ</h1>
            <div className="split-container">
                {/* Phần giới thiệu công ty */}
                <div className="section">
                    <Link to="/about">
                        <img src={companyImage} alt="Company Image" className="contact-image" />
                        <div className="text-overlay">
                            <h2>Giới thiệu về công ty</h2>
                            <p>
                                Chúng tôi là một công ty chuyên cung cấp các sản phẩm chất lượng cao trong lĩnh vực
                                thời trang. Mục tiêu của chúng tôi là mang lại cho khách hàng những sản phẩm tốt nhất
                                với dịch vụ hoàn hảo.
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Phần blog */}
                <div className="section">
                    <Link to="/blog">
                        <img src={blogImage} alt="Blog Image" className="contact-image" />
                        <div className="text-overlay">
                            <h2>Bài viết blog</h2>
                            <p>
                                Khám phá các bài viết về sản phẩm, mẹo mua sắm, và các xu hướng thời trang mới nhất.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Introduce;
