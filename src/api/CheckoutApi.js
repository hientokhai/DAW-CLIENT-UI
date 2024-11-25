import axiosClient from './axiosClient'; // Đảm bảo bạn đã import axiosClient

const CheckoutApi = {
    // Thay đổi phương thức createPurchase
    createPurchase: (data) => {
        const url = 'http://127.0.0.1:8000/api/purchase';
        return axiosClient.post(url, data); // Sử dụng phương thức post
    },
};

export default CheckoutApi;