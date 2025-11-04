import axios from 'axios';

// Usa variable de entorno o localhost como fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Para subir archivos (multipart)
export const apiMultipart = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;
