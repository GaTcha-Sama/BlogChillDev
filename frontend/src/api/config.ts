import axios from 'axios';

export const API_URL = 'http://localhost:8000/api'; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.access) {
      config.headers['Authorization'] = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);