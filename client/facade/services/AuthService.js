import axios from "axios";

const API_URL = "/api/auth";

const register = async (name, email, password, profilePicture) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      profilePicture,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const loginWithGoogle = () => {
    window.location.href = `${API_URL}/google`;
}

const handleGoogleCallback = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/google/callback${query}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export default {
    register,
    login,
    loginWithGoogle,
    handleGoogleCallback,
}