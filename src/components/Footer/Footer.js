import "./Footer.css";
import Logo from "../../asset/logo/logo_footer.jpg";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa"; // Add your desired icons
import React, { useEffect, useState } from "react";
import Carticon from "../../asset/img/payment-icon.webp";
import axios from "axios";

export default function Footer() {
  const [siteInfo, setSiteInfo] = useState(null);

  // Fetch site information from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/site-info")
      .then((response) => {
        if (response.data.status === "success") {
          setSiteInfo(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching site info:", error);
      });
  }, []);

  // If siteInfo is null, show a loading indicator
  if (!siteInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-24">
      <footer className="footer-distributed">
        <div className="footer-left">
          <NavLink to="/home">
            <img
              style={{ maxWidth: "300px" }}
              src={siteInfo.logo_footer_url}
              alt="Logo footer"
            />
          </NavLink>
          <br />
          <p style={{ fontSize: "25px", color: "white" }}>
            MEN'S STYLE lắng nghe bạn!
          </p>
          <p className="footer-company-name">{siteInfo.description}</p>
          <p className="footer-links">
            <NavLink to="/shirt" className="link-1">
              Áo
            </NavLink>
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
              <span className="icon">
                <AiOutlineHome />
              </span>
              <span style={{ marginTop: "-20px", marginLeft: "24px" }}>
                Địa Chỉ: {siteInfo.address}
              </span>
              <br />
              <span>
                <AiOutlineMail />
                <p style={{ marginTop: "-44px", marginLeft: "24px" }}>
                  Emai: {siteInfo.email}
                </p>
              </span>
            </p>
          </div>
          <div>
            <i className="fa fa-phone" />
          </div>
          {/* Social Media Links */}
          <div className="footer-social">
            <NavLink to={siteInfo.social_facebook} target="_blank">
              <FaFacebook className="social-icon" />
            </NavLink>
            <NavLink to={siteInfo.social_twitter} target="_blank">
              <FaTwitter className="social-icon" />
            </NavLink>
            <NavLink to={siteInfo.social_instagram} target="_blank">
              <FaInstagram className="social-icon" />
            </NavLink>
            <NavLink to={siteInfo.social_linkedin} target="_blank">
              <FaLinkedin className="social-icon" />
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