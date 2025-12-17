import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://etf-service-th2v.onrender.com/etf/analyze', // Python Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
