import axios from "axios";

const API_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000";

export const createTransaction = async (token, data, callback) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/transaction`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback(response.data);
  } catch (error) {
    callback(false, error);
  }
};

export const getTransactionDetail = async (id, callback) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    callback(response.data.data);
  } catch (error) {
    callback(false, error);
  }
};

export const payTransaction = async (id, callback) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/v1/transaction/${id}/pay`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    callback(response.data.data);
  } catch (error) {
    callback(false, error);
  }
};

export const getTransactionHistory = async (status, callback) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/transaction?${status ? `status=${status}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    callback(response.data.data);
  } catch (error) {
    callback(false, error);
  }
};
