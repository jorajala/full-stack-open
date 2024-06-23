import axios from "axios";

const apiClient = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default apiClient;
