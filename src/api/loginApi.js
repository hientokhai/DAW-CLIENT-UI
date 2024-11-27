import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/login";

export const loginApi = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Đăng nhập không thành công");
  }
};
