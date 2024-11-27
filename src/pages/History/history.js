import React, { useState, useEffect } from "react";
import { Link  } from "react-router-dom"; // Import Link để chuyển hướng
import "./History.css";
import OrderApi from "../../api/orderApi";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const History = () => {
  const [orders, setOrders] = useState([]); // Danh sách tất cả đơn hàng
  const [filteredOrders, setFilteredOrders] = useState([]); // Danh sách đơn hàng sau khi lọc
  const [filterStatus, setFilterStatus] = useState(0); // Trạng thái đang lọc (0 = Tất cả)
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [showRatingModal, setShowRatingModal] = useState(false); // Trạng thái hiển thị pop-up
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng đang được đánh giá
  const [rating, setRating] = useState(0); // Đánh giá của người dùng

  // Mã trạng thái đơn hàng
  const statusMapping = {
    0: "Tất cả",
    1: "Chờ thanh toán",
    2: "Vận chuyển",
    3: "Hoàn thành",
    4: "Đã hủy",
  };

  // Hàm tải dữ liệu từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await OrderApi.getAll();
        const ordersData = response?.data || []; // Nếu `response.data` không tồn tại, gán mảng rỗng
        setOrders(ordersData);
        setFilteredOrders(ordersData); // Hiển thị tất cả đơn hàng ban đầu
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Hàm lọc đơn hàng theo trạng thái
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === 0) {
      setFilteredOrders(orders); // Hiển thị tất cả
    } else {
      setFilteredOrders(orders.filter((order) => order.order_status === status));
    }
  };

  // Hàm mở pop-up đánh giá
  const handleRatingClick = (order) => {
    setSelectedOrder(order);
    setShowRatingModal(true); // Hiển thị pop-up đánh giá
  };

  // Hàm đóng pop-up
  const closeRatingModal = () => {
    setShowRatingModal(false);
    setSelectedOrder(null);
    setRating(0); // Reset rating khi đóng pop-up
  };

  // Hàm xử lý đánh giá
  const handleRatingSubmit = () => {
    // Xử lý logic lưu đánh giá ở đây (gửi lên API, lưu vào state, v.v.)
    console.log(`Đánh giá cho đơn hàng ${selectedOrder.id}: ${rating}`);
    closeRatingModal(); // Đóng pop-up sau khi submit
  };

  return (
    <div className="history-container">
      <h1 className="history-text-title">Lịch sử Đơn hàng</h1>

      {/* Tabs trạng thái */}
      <div className="status-tabs">
        {Object.keys(statusMapping).map((key) => (
          <button
            key={key}
            className={`status-tab ${filterStatus === parseInt(key) ? "active" : ""}`}
            onClick={() => handleFilterChange(parseInt(key))}
          >
            {statusMapping[key]}
          </button>
        ))}
      </div>

      {/* Kiểm tra trạng thái loading */}
      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : (
        <div className="order-list">
          {/* Kiểm tra có dữ liệu hay không */}
          {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div className="order-item" key={index}>
                {/* Thông tin chi tiết sản phẩm */}
                <div className="order-details">
                  {Array.isArray(order.order_details) &&
                    order.order_details.map((product, idx) => (
                      <div key={idx} className="product-info">
                        {/* Phần bên trái: hình ảnh, tên sản phẩm và số lượng */}
                        <div className="product-left">
                          {Array.isArray(product.images) && product.images.length > 0 ? (
                            product.images.map((imageUrl, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={imageUrl}
                                alt={product.product_name}
                                className="product-image-history"
                              />
                            ))
                          ) : (
                            <div className="no-image">Không có ảnh</div>
                          )}
                          <div>
                            <div className="product-name">{product.product_name}</div>
                            <div className="product-quantity">Số lượng: {product.quantity}</div>
                            <Link to={`/order/${order.id}`}>Xem chi tiết</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Tổng tiền và trạng thái */}
                <div className="order-footer">
                  <div className="order-total">Tổng cộng: {order.total_order_price}</div>

                  {/* Nút đánh giá cho đơn hoàn thành */}
                  {order.order_status === 3 && (
                    <button
                      className="rate-button-danhgia"
                      onClick={() => handleRatingClick(order)}
                    >
                      Đánh giá
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-orders">Không có đơn hàng phù hợp.</div>
          )}
        </div>
      )}
      <Button><NavLink to="/user">Trở lại</NavLink></Button>

      {/* Pop-up đánh giá */}
      {showRatingModal && (
        <div className="rating-modal-danhgia">
          <div className="rating-modal-content-danhgia">
            <span className="close-danhgia" onClick={closeRatingModal}>&times;</span>
            <h3>Đánh giá cho đơn hàng {selectedOrder.id}</h3>
            <div className="rating-stars-danhgia">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-danhgia ${rating >= star ? "filled" : ""}`}
                  onClick={() => setRating(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <button onClick={handleRatingSubmit}>Gửi đánh giá</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default History;