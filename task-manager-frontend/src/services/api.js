import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Change to your backend URL

// Axios instance with Authorization header if a token exists
const apiClient = axios.create({
  baseURL: API_URL
});

const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const registerUser = (data) => apiClient.post('/register', data);
export const loginUser = (data) => apiClient.post('/login', data);
export const getTasks = () => apiClient.get('/tasks');
export const createTask = (data) => apiClient.post('/tasks', data);
export const updateTask = (id, data) => apiClient.put(`/tasks/${id}`, data);
export const deleteTask = (id) => apiClient.delete(`/tasks/${id}`);

export default setAuthToken;
