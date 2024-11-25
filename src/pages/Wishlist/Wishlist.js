import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./wishlist.css"; // Ensure the CSS file is renamed if necessary
import { Helmet } from 'react-helmet';
export default function Wishlist() {
    const navigate = useNavigate();
    const location = useLocation();

    const itemsPerPage = 4; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Get initial wishlist from localStorage
    const getWishlistFromLocalStorage = () => {
        const wishlist = localStorage.getItem("wishlist");
        return wishlist ? JSON.parse(wishlist) : [];
    };

    const [wishlist, setWishlist] = useState(getWishlistFromLocalStorage());

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        if (location.state && location.state.product) {
            const item = location.state.product;
            const existingItem = wishlist.find((wishlistItem) => wishlistItem.id === item.id);
            if (!existingItem) {
                setWishlist([...wishlist, item]);
            }
        }
    }, [wishlist, location.state]);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setWishlist(updatedWishlist);
    };

    const totalPages = Math.ceil(wishlist.length / itemsPerPage);
    const paginatedWishlist = wishlist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Helmet>
                <title>Danh sách yêu thích</title>
            </Helmet>
            {/* Nội dung chi tiết đơn hàng */}
            <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-6">Danh sách yêu thích</h2>
                    <button onClick={() => setWishlist([])} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold text-sm">
                        Xóa hết
                    </button>
                </div>
                {paginatedWishlist.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between items-center mb-4 pb-4 border-b sm:border-b-0 sm:pb-0">
                        <img className="w-36 h-36 object-cover rounded-lg sm:mr-6 mb-4 sm:mb-0" src={item.images[0]} alt={item.name} />
                        <div className="flex-1 flex flex-col justify-between sm:flex-row sm:items-center">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold" style={{ fontWeight: "500", fontSize: "14px" }}>
                                    {item.name}
                                </h3>
                                <p className="text-gray-600">{item.color} / {item.size}</p>
                            </div>
                            <div className="flex items-center">
                                <button onClick={() => removeFromWishlist(item.id)} className="text-red-500 hover:text-red-600 cursor-pointer">
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
        </div>
    );
}