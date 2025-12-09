import axios from "axios";

// Base URL of your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_API_URL,
  withCredentials : true 
});

export default api;
