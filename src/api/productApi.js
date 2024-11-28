import axiosClient from "./axiosClient";

const ProductApi = {
  getAllMK: (params) => {
    const url = "http://localhost:8000/api/products";
    return axiosClient.get(url, { params });
  },
  getAllSearchPage: (params) => {
    const url = "http://localhost:8000/api/customer/products/";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `http://localhost:8000/api/product-detail/${id}`;
    return axiosClient.get(url);
  },
  getCategoriesAndVariants: async () => {
    const url = "http://127.0.0.1:8000/api/products/variant-list";
    return axiosClient.get(url);
  },
};

export default ProductApi;
