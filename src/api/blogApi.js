import axiosClient from "./axiosClient";

const BlogApi = {
  getAll: (params) => {
    const url = "http://127.0.0.1:8000/api/blogs";
    return axiosClient.get(url, { params });
  },
    get: (id) => {
    const url = `http://localhost:8000/api/blogs/${id}`;
    return axiosClient.get(url);
    },
};

export default BlogApi;