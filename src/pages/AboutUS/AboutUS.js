import React, { useEffect, useState } from 'react';
import "./AboutUS.css";
import { Helmet } from 'react-helmet';
import AboutApi from '../../api/AboutApi';

const AboutUs = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await AboutApi.getAll(); // Gọi API để lấy thông tin
                setAboutData(response.data); // Lưu dữ liệu vào state
            } catch (err) {
                setError(err); // Lưu lỗi nếu có
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn tất
            }
        };

        fetchAboutData();
    }, []); // Chạy một lần khi component được mount

    if (loading) {
        return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Hiển thị thông báo lỗi nếu có
    }

    return (
        <div id="about-us" className="container mx-auto p-6">
            <Helmet>
                <title>Giới thiệu</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">Giới thiệu</h1>
            {/* Hiển thị thông tin từ aboutData */}
            {aboutData && (
                <div>
                    <h2 className="text-xl font-semibold">{aboutData.shop_name}</h2>
                    <p>{aboutData.description}</p>
                    <p><strong>Địa chỉ:</strong> {aboutData.address}</p>
                    <p><strong>Số điện thoại:</strong> {aboutData.phone_number}</p>
                    <p><strong>Email:</strong> {aboutData.email}</p>
                    <p><strong>Website:</strong> {aboutData.website}</p>
                    <p><strong>Lĩnh vực kinh doanh:</strong> {aboutData.business_area}</p>
                    <p><strong>Chính sách:</strong> {aboutData.policies}</p>

                    {/* Thêm phần hiển thị logo header */}
                    {aboutData.logo_header_url && (
                        <img src={aboutData.logo_header_url} alt="Logo header" className="w-48 h-auto" />
                    )}

                    {/* Thêm phần hiển thị logo footer */}
                    {aboutData.logo_footer_url && (
                        <img src={aboutData.logo_footer_url} alt="Logo footer" className="w-48 h-auto" />
                    )}

                    {/* Thêm phần hiển thị mạng xã hội */}
                    <div className="mt-4">
                        <ul className="flex space-x-4">
                            {aboutData.social_facebook && (
                                <li>
                                    <a href={aboutData.social_facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                            )}
                            {aboutData.social_instagram && (
                                <li>
                                    <a href={aboutData.social_instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                            )}
                            {aboutData.social_twitter && (
                                <li>
                                    <a href={aboutData.social_twitter} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                            )}
                            {aboutData.social_linkedin && (
                                <li>
                                    <a href={aboutData.social_linkedin} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Thêm các thông tin khác nếu cần */}
                </div>
            )}
        </div>
    );
};

export default AboutUs;
