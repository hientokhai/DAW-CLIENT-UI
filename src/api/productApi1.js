import axiosClient from './axiosClient';

const productApi1 = {
    getAll: (params) => {
        const url = 'http://127.0.0.1:8000/api/products/';
        return axiosClient.get(url, { params });
    },

};

export default productApi1;