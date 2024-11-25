import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './orderDetail.css';
import OrderApi from '../../api/orderApi';

const OrderDetailPage = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const fetchOrderDetail = async () => {
    try {
      const response = await OrderApi.get(orderId);
      setOrder(response.data);
    } catch (error) {
      console.log('fail', error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  // const fetchOrderDetails = (id) => {
  //   const fakeOrders = [
  //     {
  //       id: 1,
  //       createdAt: '11/12/2024',
  //       customer: 'Khải Hiên',
  //       phone_number: '0866508347',
  //       address: 'abc street',
  //       totalAmount: '525000',
  //       paymentMethod: 'VNPay',
  //       paymentStatus: 'Đã thanh toán',
  //       orderStatus: 'Chờ xác nhận',
  //       items: [
  //         {
  //           name: 'Áo thun',
  //           quantity: 2,
  //           price: 200000,
  //           imageUrl: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.9.jpg'
  //         },
  //         {
  //           name: 'Quần jeans',
  //           quantity: 1,
  //           price: 125000,
  //           imageUrl:
  //             'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2024/Quan_Jeans_Nam_sieu_nhe.xanh_dam.jpg'
  //         }
  //       ]
  //     }
  //   ];

  //   // Lấy thông tin đơn hàng từ danh sách giả lập
  //   const foundOrder = fakeOrders.find((order) => order.id === parseInt(id));
  //   if (foundOrder) {
  //     setOrder(foundOrder);
  //   } else {
  //     alert('Đơn hàng không tồn tại!');
  //     navigate(-1); // Quay lại trang trước đó nếu không tìm thấy đơn hàng
  //   }
  // };

  const handleCandelOrder = async (orderId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
    if (confirmDelete) {
      try {
        // Gọi API để cập nhật trạng thái đơn hàng
        const response = await OrderApi.updateStatus(orderId, { order_status: 4 });
        if (response && response.status === 'success') {
          alert('Đơn hàng hủy thành công');
          fetchOrderDetail();
        } else {
          alert('Không thể hủy đơn hàng.');
        }
      } catch (error) {
        console.log('Lỗi khi hủy đơn hàng:', error);
        alert('Đã xảy ra lỗi khi hủy đơn hàng.');
      }
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
            {order.order_status === 1 ? (<button onClick={() => handleCandelOrder(orderId)} style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: '4px 12px', fontSize: '80%', float: 'right' }}>Hủy đơn hàng</button>) : ''}
            <div className="order-info">
              <p><strong>Ngày tạo:</strong> {order.created_at}</p>
              <p><strong>Khách hàng:</strong> {order.customer} ({order.phone_number})</p>
              <p><strong>Địa chỉ nhận hàng:</strong> {order.address}</p>
              <p><strong>Tổng đơn hàng:</strong> {formatCurrency(order.total_order_price)}</p>
              <p><strong>Hình thức thanh toán:</strong> {order.payment_method}</p>
              <p><strong>Trạng thái thanh toán:</strong> {order.payment_status}</p>
              <p><strong>Trạng thái đơn hàng:</strong> {order.order_status === 1
                ? 'Chờ xử lý'
                : order.order_status === 2
                  ? 'Đang vận chuyển'
                  : order.order_status === 3
                    ? 'Đã giao'
                    : 'Đã hủy'}</p>
              <p><strong>Sản phẩm:</strong></p>
              <ul className="order-items">
                {order.products.map((item, index) => (
                  <li key={index} className="order-item">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      - Tên sản phẩm: {item.name} <br /> - Số lượng: {item.quantity} <br />- Giá: {formatCurrency(item.price)}
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
