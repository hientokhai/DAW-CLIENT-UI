import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import React, { useEffect } from 'react'; // Thêm useEffect vào đây
import "./PaymentPage.css"; // import CSS file
import { NavLink } from "react-router-dom";
import CheckoutApi from "../../api/CheckoutApi"; // Import CheckoutApi
import { FaCheckCircle } from 'react-icons/fa';
import OrderApi from "../../api/orderApi";
import userApi from "../../api/userApi";
import productApi1 from "../../api/productApi1";

import { Helmet } from 'react-helmet';
export default function PaymentPage() {
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải
  const location = useLocation();
  const initialCart = location.state.cart;
  const [cart, setCart] = useState(initialCart); // State quản lý giỏ hàng
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const formRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State để kiểm tra thanh toán thành công
  const [errorMessage, setErrorMessage] = useState(null); // State lưu trữ thông báo lỗi
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.sel_price * item.quantity,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await CheckoutApi.createPurchase({
        product_id: productId,
        amount: amount,
        email: email,
        phone: phone,
        address: address,
      });

      if (response && response.data) {
        const paymentUrl = response.data;

        if (paymentMethod === "vnpay") {
          window.open(paymentUrl, "_blank");
          setCart([]); // Xóa giỏ hàng
          // Có thể cần thêm logic để kiểm tra trạng thái thanh toán ở đây
        } else if (paymentMethod === "cod") {
          setPaymentSuccess(true);
          setErrorMessage(null);
          setCart([]);
          await handlePayment(); // Lưu đơn hàng
        }
      } else {
        console.error('Lỗi khi gọi API:', response);
        setErrorMessage('Đã xảy ra lỗi khi thanh toán.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setErrorMessage('Đã xảy ra lỗi khi thanh toán.');
    }
  };
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi1.getAll();
        if (response.status === 'success') {
          setProducts(response.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    const fetchUser = async () => {
      try {
        const userData = await userApi();
        // Giả sử bạn muốn lấy người dùng đầu tiên trong danh sách
        setUser(userData[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (cart.length === 0) {
    return <div className="payment-page-empty">Giỏ hàng của bạn đang trống.</div>;
  }
  const shippingFee = 35000;
  const grandTotal = totalPrice + shippingFee;

  const updateProductQuantities = async () => {
    for (const item of cart) {
      const newQuantity = item.product_variants[0].quantity - item.quantity; // Calculate new quantity
      try {
        await productApi1.updateProductQuantity(item.id, newQuantity); // Update quantity in the database
      } catch (error) {
        console.error(`Error updating quantity for product ID ${item.id}:`, error);
      }
    }
  };

  const handlePayment = async () => {

    if (!user) {
      console.error('User  data is not available');
      return;
    }

    const orderData = {
      customer_name: user.username,
      total_order_price: grandTotal,
      order_status: 1, // Ví dụ: 1 cho "Đã thanh toán"
      payment_method: paymentMethod === "vnpay" ? 2 : 1, // 2 cho "VNPay", 1 cho "COD"
      payment_status: 1, // 1 cho "Đã thanh toán"
      created_at: new Date().toISOString(),
    };

    try {
      const response = await OrderApi.createOrder(orderData);
      console.log('Order created successfully:', response.data);

      // Lưu chi tiết đơn hàng
      const orderId = response.data.id; // Giả sử API trả về id của đơn hàng đã tạo
      await saveOrderDetails(orderId);

      // Cập nhật số lượng sản phẩm
      await updateProductQuantities();

      // Xóa giỏ hàng
      setCart([]); // Xóa tất cả sản phẩm trong giỏ hàng
      setPaymentSuccess(true); // Đánh dấu thanh toán thành công
      setErrorMessage(null); // Đặt thông báo lỗi thành null

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // Hàm lưu chi tiết đơn hàng
  const saveOrderDetails = async (orderId) => {
    const orderDetails = cart.map(item => ({
      product_name: item.name,
      quantity: item.quantity,
      price: item.sel_price,
      images: [item.images], // Giả sử bạn muốn lưu mảng hình ảnh
    }));

    try {
      await OrderApi.createOrderDetails(orderId, orderDetails); // Gọi API để lưu chi tiết đơn hàng
      console.log('Order details saved successfully');
    } catch (error) {
      console.error('Error saving order details:', error);
    }
  };


  if (loading) {
    return <div>Loading user data...</div>; // Hiển thị thông báo tải
  }
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
              type="text"
              className="payment-page-form-input"
              placeholder="Họ và tên"
              required
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
          <br />
          <h2 className="payment-page-text">Phương thức thanh toán</h2>
          <div className="payment-page-form-input-radio">
            <div className="payment-page-text-size">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)} />

              <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
            </div>
          </div>
          <div className="payment-page-form-input-radio">
            <div className="payment-page-text-size">
              <input
                type="radio"
                id="vnpay"
                name="paymentMethod"
                value="vnpay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="vnpay">Thanh toán qua VNPay</label>
            </div>
          </div>
          <NavLink
            to="/cart"
            className="text-blue-400 px-2 rounded-md payment-page-text-size"
          >
            Đơn hàng
          </NavLink>
          <button onClick={handlePayment} type="submit" className="payment-page-form-button">
            Hoàn tất đơn hàng
          </button>
        </form>
        {paymentSuccess && (
          <div className="payment-success-message">
            Thanh toán thành công! Cảm ơn bạn đã đặt hàng.
          </div>
        )}
        {errorMessage && (
          <div className="payment-error-message">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="payment-page-payment">
        <h2 className="payment-page-title">Payment</h2>
        <ul className="payment-page-cart">
          {cart.map((item) => (
            <li className="payment-page-cart-item" key={item.id}>
              <img
                src={item.images}
                alt={item.name}
                className="payment-page-cart-item-img"
              />
              <div className="payment-page-cart-item-info">
                <h3 className="payment-page-cart-item-name">{item.name}</h3>
                <p className="payment-page-cart-item-price">
                  Price: {item.sel_price} đ
                </p>
                <p className="payment-page-cart-item-price">
                  Size: {item.size_id}
                </p>
                <p className="payment-page-cart-item-quantity">
                  Color: {item.color_id}
                </p>
                <p className="payment-page-cart-item-quantity">
                  Quantity: {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="payment-page-cart-total-title">
          <div className="payment-page-cart-total">
            <div>
              <p>Tạm tính</p>
            </div>
            <div>
              <p>{totalPrice} đ</p>
            </div>
          </div>
          <div className="payment-page-cart-total">
            <div>
              <p>Phí vận chuyển</p>
            </div>
            <div>
              <p>{shippingFee} đ</p>
            </div>
          </div>
        </div>
        <div className="payment-page-cart-total">
          <div>
            <p>Tổng cộng:</p>
          </div>
          <div>
            <p>{grandTotal} đ</p>
          </div>
        </div>

      </div>
    </div>
  );
}