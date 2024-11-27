import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./cart.css";
import { Helmet } from 'react-helmet';
export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  const itemsPerPage = 4; // Số sản phẩm mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Get initial cart from localStorage
  const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const [cart, setCart] = useState(getCartFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (location.state && location.state.product) {
      const item = location.state.product;
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = cart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + item.quantity };
          }
          return cartItem;
        });
        setCart(updatedCart);
      } else {
        setCart([...cart, item]);
      }
    }
  }, [cart, location.state]);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleIncrement = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    navigate("/pay", { state: { cart } });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPages = Math.ceil(cart.length / itemsPerPage);
  const paginatedCart = cart.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteAll = () => {
    setCart([]);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">Giỏ hàng</h2>
          <button onClick={handleDeleteAll} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold text-sm">
            Xóa hết
          </button>
        </div>
        {paginatedCart.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between items-center mb-4 pb-4 border-b sm:border-b-0 sm:pb-0">
            <img className="w-36 h-36 object-cover rounded-lg sm:mr-6 mb-4 sm:mb-0" src={item.images[0]} alt={item.name} />
            <div className="flex-1 flex flex-col justify-between sm:flex-row sm:items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold" style={{ fontWeight: "500", fontSize: "14px" }}>
                  {item.name}
                </h3>
                <p className="text-gray-600">{item.color} / {item.size}</p>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <button onClick={() => handleDecrement(item.id)} className="border rounded" style={{ padding: "2px 10px", borderRadius: "50%" }}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)} className="border rounded" style={{ padding: "2px 10px", borderRadius: "50%" }}>+</button>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">{new Intl.NumberFormat("vi-VN").format(item.sel_price) + "₫"}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 cursor-pointer">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <div className="flex justify-between items-center">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
              Trước
            </button>
            <div className="pagination-buttons flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageClick(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-orange-400 text-black' : 'text-white'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
              Sau
            </button>
          </div>
        </div>
      </div>

      {
        cart.length > 0 && (
          <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between font-semibold mb-4">
              <span>Tổng giá trị sản phẩm:</span>
              <span>{totalPrice.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-end">
              <NavLink to="/" className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-10 font-semibold text-sm">
                Tiếp tục mua sắm
              </NavLink>
              <button onClick={handleCheckout} className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500">
                Thanh toán
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}