import axios from "axios";

const API_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000";

export const getProducts = async (callback) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/product`);
    callback(response.data.data);
  } catch (error) {
    callback(false, error);
  }
};

export const getDetailProducts = async (id, callback) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/product/${id}`);
    callback(response.data.data);
  } catch (error) {
    callback(false, error);
  }
};
