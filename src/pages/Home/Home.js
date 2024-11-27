import React, { useEffect, useState } from "react";
import "./home.css";
import category from "../../asset/img/danhmuc.webp";
import { NavLink } from "react-router-dom";
import BestSeller from "../Best Seller/BestSeller";
import FeaturedProduct from "../Featured/Featured";
import CategoryPage from "../Category/Category";
import Features from "../Features/Features";
import { Helmet } from 'react-helmet';
import SlideshowAPI from "../../api/slideshowApi";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideshowImages, setSlideshowImages] = useState([]); // State to store slideshow images

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SlideshowAPI.getAll();
        // Lọc ra các hình ảnh có trạng thái is_active
        const activeSlides = response.data.filter(slide => slide.is_active === 1);
        setSlideshowImages(activeSlides); // Set only active slides
        // Đặt currentIndex về 0 nếu có hình ảnh
        if (activeSlides.length > 0) {
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching slideshow data:", error);
      }
    };

    fetchData();

    // Bắt đầu interval tự động
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5 giây

    // Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slideshowImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
  };

  return (
    <div>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div className="slideshow-container">
        <button className="prev" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="slide">
          {slideshowImages.length > 0 && slideshowImages[currentIndex] ? ( // Kiểm tra nếu có hình ảnh
            <NavLink to={slideshowImages[currentIndex].link_url}>
              <img
                src={slideshowImages[currentIndex].image_url}
                alt={slideshowImages[currentIndex].title}
                className="img-fluid"
              />
              <div className="caption">{slideshowImages[currentIndex].description}</div>
            </NavLink>
          ) : (
            <div>No images available</div> // Thông báo nếu không có hình ảnh
          )}
        </div>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
      <Features />
      <div>
        <BestSeller />
      </div>
      <div>
        <FeaturedProduct />
      </div>
      {/* Các danh mục khác */}
      <div className="category-banner">
        <img src={category} alt="category" />
      </div>
      <CategoryPage />
    </div>
  );
};

export default Home;