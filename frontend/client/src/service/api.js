import axios from 'axios';

// 🔹 Use the correct backend URL (update if needed)
const API_BASE_URL = process.env.REACT_APP_API_URL; // Replace with your actual backend URL

// ✅ Fetch all chaiwalas from the backend
export const getChaiwalas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chaiwalas`);
    return response.data.data; // Extract only the relevant data
  } catch (error) {
    console.error('Error fetching chaiwalas:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch chaiwalas');
  }
};

// ✅ Add a new chaiwala
export const addChaiwala = async (newChaiwala) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chaiwalas`, newChaiwala);
    return response.data.data; // Extract and return the added chaiwala
  } catch (error) {
    console.error('Error adding chaiwala:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add chaiwala');
  }
};

// ✅ Delete a chaiwala by ID
export const deleteChaiwala = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/chaiwalas/${id}`);
    return response.data.message; // Return success message
  } catch (error) {
    console.error('Error deleting chaiwala:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete chaiwala');
  }
};
