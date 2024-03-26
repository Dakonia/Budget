// Api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Замените на ваш базовый URL
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('token/refresh/', {
          refresh: refreshToken
        });
        const newAccessToken = response.data.access;
        localStorage.setItem('token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
