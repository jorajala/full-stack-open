import axios from "axios";
import { API_BASEURL } from "../config.js";

const apiUrl = `${API_BASEURL}/login`;

const login = async (credentials) => {
  const response = await axios.post(apiUrl, credentials);
  return response.data;
};

export default { login };
