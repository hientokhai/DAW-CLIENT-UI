import axiosClient from "./axiosClient";

const ProductApi = {
  getAll: (params) => {
    const url = "https://641855f875be53f451dca0ae.mockapi.io/api/products";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `http://localhost:8000/api/product-detail/${id}`;
    return axiosClient.get(url);
  },
};

export default ProductApi;
