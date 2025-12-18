import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://etf-service-th2v.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
