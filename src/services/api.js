import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Login API
export const loginUser = (credentials) => API.post('/api/login', credentials);

// Admin APIs

// User API for creating requests
// export const createUserRequest = (requestData) => API.post('/api/user/requests', requestData);
export const getAllUsers = () => API.get('/api/admin/users');
export const createUser = (userData) => API.post('/api/admin/users', userData);
export const updateUser = (userId, updatedData) => API.put(`/api/admin/users/${userId}`, updatedData);
export const deleteUser = (userId) => API.delete(`/api/admin/users/${userId}`);

// User APIs
export const getUserProfile = (userId) => API.get('/api/user/profile', { params: { userId } });
export const createUserRequest = (requestData) => API.post('/api/user/requests', requestData);
export const getUserRequests = (userId) => API.get('/api/user/requests', { params: { userId } });
export const getMeals = () => API.get('/api/user/meals');
export const getMealOrders = (userId) => API.get('/api/user/meals/orders', { params: { userId } });
