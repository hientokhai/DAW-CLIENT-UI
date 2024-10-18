import React, { useEffect, useState } from "react";
import "./home.css";
import imgCollections from "../../asset/img/collection.webp"
import imgCollections2 from "../../asset/img/collection2.webp"
import outlet from "../../asset/img/outlet.webp"
import { NavLink } from "react-router-dom";
import BestSeller from "../Best Seller/BestSeller";

const images = [
  {
    src: imgCollections,
    alt: "image-collection",
    link: "/shirt",
    caption: "",
  },
  {
    src: imgCollections2,
    alt: "image-collection2",
    link: "/trouser",
    caption: "",
  },
  {
    src: outlet,
    alt: "outlet",
    link: "",
    caption: "",
  },
  // {
  //   src: image6,
  //   alt: "image-6",
  //   link: "",
  //   caption: (
  // <h1>
  //   Áo / TOP
  //   <br />
  //   <p>SHOP NOW</p>
  // </h1>
  // ),
  // },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Sử dụng useEffect để tự động chuyển đổi ảnh
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); // Chuyển đổi ảnh mỗi 5 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <div>
      <div className="slideshow-container">
        <button className="prev" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="slide">
          <NavLink to={images[currentIndex].link}>
            <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="img-fluid" />
            <div className="caption">{images[currentIndex].caption}</div>
          </NavLink>
        </div>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
      <div>
        <BestSeller />
      </div>
    </div>
  );
};

export default Home;
