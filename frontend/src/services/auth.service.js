/* disable eslint no-undef */

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000";

export const login = (data, callback) => {
  axios
    .post(`${API_URL}/api/v1/auth/login`, data)
    .then((res) => {
      callback(true, res.data.data.token);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const register = (data, callback) => {
  axios
    .post(`${API_URL}/api/v1/auth/register`, data)
    .then((res) => {
      callback(true, res.data.data.token);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getUsername = (token) => {
  const decoded = jwtDecode(token);
  return decoded.user;
};

export const getDetailUser = async (token, callback) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    callback(response.data.data.user);
  } catch (error) {
    callback(false, error);
  }
};

export const topUp = async (token, amount, callback) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/user/topup`,
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    callback(response.data.data.user);
  } catch (error) {
    callback(false, error);
  }
};

export const getVouchers = async (callback) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/user/voucher`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    callback(response.data.data);
  } catch (error) {
    callback(false, error);
  }
};
