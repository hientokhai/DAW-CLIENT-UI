import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './orderDetail.css';

const OrderDetailPage = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  const fetchOrderDetails = (id) => {
    const fakeOrders = [
      {
        id: 1,
        createdAt: '11/12/2024',
        customer: 'Khải Hiên',
        phone_number: '0866508347',
        address: 'abc street',
        totalAmount: '525000',
        paymentMethod: 'VNPay',
        paymentStatus: 'Đã thanh toán',
        orderStatus: 'Chờ xác nhận',
        items: [
          {
            name: 'Áo thun',
            quantity: 2,
            price: 200000,
            imageUrl: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.9.jpg'
          },
          {
            name: 'Quần jeans',
            quantity: 1,
            price: 125000,
            imageUrl:
              'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_Jeans_Nam_sieu_nhe.xanh_dam.jpg'
          }
        ]
      }
    ];

    // Lấy thông tin đơn hàng từ danh sách giả lập
    const foundOrder = fakeOrders.find((order) => order.id === parseInt(id));
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      alert('Đơn hàng không tồn tại!');
      navigate(-1); // Quay lại trang trước đó nếu không tìm thấy đơn hàng
    }
  };

  return (
    <div className="order-detail-container">
      <div className="order-header">
        <h1>Chi Tiết Đơn Hàng #{orderId}</h1>
      </div>
      <div className="order-body">
        {order ? (
          <>
            <div className="order-info">
              <p><strong>Ngày tạo:</strong> {order.createdAt}</p>
              <p><strong>Khách hàng:</strong> {order.customer} ({order.phone_number})</p>
              <p><strong>Địa chỉ nhận hàng:</strong> {order.address}</p>
              <p><strong>Tổng đơn hàng:</strong> {formatCurrency(order.totalAmount)}</p>
              <p><strong>Hình thức thanh toán:</strong> {order.paymentMethod}</p>
              <p><strong>Trạng thái thanh toán:</strong> {order.paymentStatus}</p>
              <p><strong>Trạng thái đơn hàng:</strong> {order.orderStatus}</p>
              <p><strong>Sản phẩm:</strong></p>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      {item.name} - Số lượng: {item.quantity} - Giá: {formatCurrency(item.price)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>Quay lại</button>
          </>
        ) : (
          <p>Đang tải thông tin đơn hàng...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;
