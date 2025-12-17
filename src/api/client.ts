import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/', // Python Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
