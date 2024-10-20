import React from "react";
import "./Footer.css";
import Logo from "../../asset/logo/logo_footer.jpg";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Add your desired icons
import { FaYoutube, FaTiktok } from "react-icons/fa";
import Carticon from "../../asset/img/payment-icon.webp";

export default function Footer() {
  return (
    <div className="mt-24">
      <footer className="footer-distributed">
        <div className="footer-left">
          <NavLink to="/home">
            <img
              style={{ maxWidth: "300px" }}
              src={Logo}
              alt="Logo footer"
            />
          </NavLink>
          <br />
          <p style={{ fontSize: "25px", color: "white" }}>
            MEN'S STYLE lắng nghe bạn!
          </p>
          <p className="footer-company-name">
            Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.
          </p>
          <p className="footer-links">
            <NavLink to="/shirt" className="link-1">Áo</NavLink>
            <NavLink to="/trouser">Quần</NavLink>
            <NavLink to="/shoes">Giày</NavLink>
            <NavLink to="/lakstudio">LakStudio</NavLink>
            <NavLink to="/bag">Túi</NavLink>
            <NavLink to="/glasses">Kính</NavLink>
          </p>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker" />
            <p style={{ marginTop: "66px" }}>
              <span className="icon"><AiOutlineHome /></span>
              <span style={{ marginTop: "-20px", marginLeft: "24px" }}>
                Địa chỉ: 276 Phố Huế, Hai Bà Trưng, Hà Nội
              </span>
              <br />
              <span>
                <AiOutlineMail />
                <p style={{ marginTop: "-44px", marginLeft: "24px" }}>
                  Email: tuannhatcv@gmail.com
                </p>
              </span>
            </p>
          </div>
          <div>
            <i className="fa fa-phone" />
          </div>
          {/* Social Media Links */}
          <div className="footer-social">
            <NavLink to="https://www.facebook.com" target="_blank">
              <FaFacebook className="social-icon" />
            </NavLink>
            <NavLink to="https://www.twitter.com" target="_blank">
              <FaTwitter className="social-icon" />
            </NavLink>
            <NavLink to="https://www.youtube.com" target="_blank">
              <FaYoutube className="social-icon" />
            </NavLink>
            <NavLink to="https://www.tiktok.com" target="_blank">
              <FaTiktok className="social-icon" />
            </NavLink>
            <NavLink to="https://www.instagram.com" target="_blank">
              <FaInstagram className="social-icon" />
            </NavLink>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>Chứng nhận</span>
            Các chứng nhận của công ty
          </p>
          <div className="footer-icons">
            <img src={Carticon} alt="cart-icon" />
          </div>
        </div>
      </footer>
    </div>
  );
}
