import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("🔗 API_BASE_URL =", API_BASE_URL);

// ✅ Fetch all chaiwalas
export const getChaiwalas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chaiwalas`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chaiwalas:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch chaiwalas');
  }
};

// ✅ Add a new chaiwala
export const addChaiwala = async (newChaiwala) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chaiwalas`, newChaiwala);
    return response.data.data;
  } catch (error) {
    console.error('Error adding chaiwala:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add chaiwala');
  }
};

// ✅ Delete a chaiwala
export const deleteChaiwala = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/chaiwalas/${id}`);
    return response.data.message;
  } catch (error) {
    console.error('Error deleting chaiwala:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete chaiwala');
  }
};

// ✅ Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.data; // Only users array
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};
