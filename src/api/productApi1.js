import axiosClient from './axiosClient';

const productApi1 = {
    getAll: (params) => {
        const url = 'http://127.0.0.1:8000/api/products/';
        return axiosClient.get(url, { params });
    },

    updateProductQuantity: (id, quantity) => {
        const url = `http://127.0.0.1:8000/api/products/${id}`; // Đường dẫn đến API cập nhật sản phẩm
        return axiosClient.post(url, { quantity }); // Gửi số lượng mới trong body
    },
};

export default productApi1;