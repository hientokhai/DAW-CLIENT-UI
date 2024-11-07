import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "./PaymentPage.css"; // import CSS file
import { NavLink} from "react-router-dom";

export default function PaymentPage() {
  const location = useLocation();
  const cart = location.state.cart;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const formRef = useRef(null);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi thông tin thanh toán tới server ở đây
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Cart:", cart);
    console.log("Total Price:", totalPrice);
    // Chuyển hướng về trang chủ sau khi thanh toán thành công
    navigate("/");
  };

  return (
    <div className="payment-page-container">
      <div className="payment-page-shoppinginformation">
        <h1 className="payment-page-title">Customer Information</h1>
        <h2 className="payment-page-text">Thông tin giao hàng</h2>
        <div className="payment-page-link">
        <p className="payment-page-text-size">Bạn đã có tài khoản?</p>
        <NavLink
              to="/signin"
              className="text-blue-400 px-2 rounded-md payment-page-text-size"
              >
              Đăng nhập
            </NavLink>
        </div>
      <form ref={formRef} onSubmit={handleSubmit} className="payment-page-form">
        <label className="payment-page-form-label">
          <input
            type="hoten"
            className="payment-page-form-input"
            placeholder="Họ và tên"
          />
        </label>
        <br />
        <label className="payment-page-form-label">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="payment-page-form-input-email"
            placeholder="Email"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="payment-page-form-input-phone"
            placeholder="Số điện thoại"
          />
        </label>
        <br />
        <label className="payment-page-form-label">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="payment-page-form-textarea"
            placeholder="Địa chỉ"
          />
        </label>
        <label className="payment-page-select">
          <div>
            <select className="payment-page-select-option">
              <option value="0">Chọn tỉnh / thành</option>
            </select>
          </div>
          <div>
          <select className="payment-page-select-option">
            <option value="0">Chọn quận / huyện</option>
          </select>
          </div>
          <div>
          <select className="payment-page-select-option">
            <option value="0">Chọn phường / xã</option>
          </select>
          </div>
        </label>
        <br />
        <h2 className="payment-page-text">Phương thức vận chuyển</h2>
        <div className="payment-page-form-input-radio">
          <div className="payment-page-text-size">
          <input
            type="radio"
          />
          Giao hàng tận nơi
          </div>
          <div>
            35.000đ
          </div>
        </div>
        <br/>
        <h2 className="payment-page-text">Phương thức thanh toán</h2>
        <div className="payment-page-form-input-radio">
          <div className="payment-page-text-size">
          <input
            type="radio"
          />
          Thanh toán khi nhận hàng (COD)
          </div>
        </div>
        <div className="payment-page-form-input-radio">
          <div className="payment-page-text-size">
          <input
            type="radio"
          />
          Thanh toán qua ví MoMo
          </div>
        </div>
        <div className="payment-page-form-input-radio ">
          <div className="payment-page-text-size">
          <input
            type="radio"
          />
          Chuyển khoản ngân hàng
          </div>
        </div>
        <NavLink
              to="/cart"
              className="text-blue-400 px-2 rounded-md payment-page-text-size"
              >
              Đơn hàng
            </NavLink>
        <button type="submit" className="payment-page-form-button">
          Hoàn tất đơn hàng
        </button>
      </form>
      </div>

      <div className="payment-page-payment">
      <h2 className="payment-page-title">Payment</h2>
      <ul className="payment-page-cart">
        {cart.map((item) => (
          <li className="payment-page-cart-item" key={item.id}>
            <img
              src={item.imgUrl}
              alt={item.name}
              className="payment-page-cart-item-img"
            />
            <div className="payment-page-cart-item-info">
              <h3 className="payment-page-cart-item-name">{item.name}</h3>
              <p className="payment-page-cart-item-price">
                Price: {item.price}
              </p>
              <p className="payment-page-cart-item-quantity">
                Quantity: {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="payment-page-cart-sale">
        <div>
          <input
            type="hoten"
            className="payment-page-cart-sale-item"
            placeholder="Mã giảm giá"
          />
        </div>
        <div>
        <button type="submit" className="payment-page-cart-button">
          Sử dụng
        </button>
        </div>
      </div>
      <div className="payment-page-cart-total-title">
      <div className="payment-page-cart-total">
        <div>
          <p>Tạm tính</p>
        </div>
        <div>
        <p>550.000 đ</p>
        </div>
      </div>
      <div className="payment-page-cart-total">
        <div>
          <p>Phí vận chuyển</p>
        </div>
        <div>
        <p>35.000 đ</p>
        </div>
      </div>
      </div>
      <div className="payment-page-cart-total">
        <div><p className="payment-page-total-price">Total Price:</p></div>
        <div><p className="payment-page-total-price">{totalPrice} đ</p></div>
      </div>
      </div>
    </div>
  );
}