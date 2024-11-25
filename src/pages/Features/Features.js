import React from 'react';
import './Features.css';
import { FaTruck, FaUserPlus, FaDollarSign, FaSyncAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
const Features = () => {
    return (
        <div className="features-container">
            <div className="feature-item">
                <FaTruck className="feature-icon" />
                <span>Freeship đơn từ 399K</span>
            </div>
            <div className="feature-item">
                <FaUserPlus className="feature-icon" />
                <span>Cộng dồn Membership đến 15%</span>
            </div>
            <div className="feature-item">
                <FaDollarSign className="feature-icon" />
                <span>Thanh toán COD</span>
            </div>
            <div className="feature-item">
                <FaSyncAlt className="feature-icon" />
                <span>Đổi trả trong 15 ngày</span>
            </div>
        </div>
    );
};

export default Features;
