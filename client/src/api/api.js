import axios from "axios";

// Base URL of your backend
console.log(import.meta.env.VITE_PROD_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_API_URL,
  withCredentials : true 
});

export default api;
