// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  const data = localStorage.getItem('data');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.token) {
        config.headers.Authorization = `Bearer ${parsedData.token}`;
      }
    }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
