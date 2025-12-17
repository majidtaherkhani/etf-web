import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://etf-service-th2v.onrender.com', // Python Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
