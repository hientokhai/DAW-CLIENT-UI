import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Features.css';
import { FaTruck, FaUserPlus, FaDollarSign, FaSyncAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
const Features = () => {
    const [services, setServices] = useState([]); // State để lưu trữ dữ liệu dịch vụ

    // Gọi API khi component được render
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/services')
            .then(response => {
                setServices(response.data);
                console.log(response.data);
                 // Lưu dữ liệu vào state
            })
            .catch(error => {
                console.error("Có lỗi khi lấy dữ liệu", error);
            });
    }, []);

    return (
        <div className="features-container">
            {services.length > 0 ? (
                // Lặp qua danh sách dịch vụ và hiển thị từng dịch vụ
                services.slice(0, 4).map((service) => (
                    <div key={service.id} className="feature-item">
                        {/* Kiểm tra nếu id là 1, 2, 3, 4 thì hiển thị các icon tương ứng */}
                        {service.id === 1 ? (
                            <FaTruck className="feature-icon" />
                        ) : service.id === 2 ? (
                            <FaUserPlus className="feature-icon" />
                        ) : service.id === 3 ? (
                            <FaDollarSign className="feature-icon" />
                        ) : service.id === 4 ? (
                            <FaSyncAlt className="feature-icon" />
                        ) : (
                            <img src={service.icon} alt={service.name} className="feature-icon" />
                        )}
                        <span>{service.name}</span> 
                    </div>
                ))
            ) : (
                <div>Đang tải dữ liệu...</div> // Hiển thị nếu dữ liệu đang được tải
            )}
        </div>
    );
};

export default Features;