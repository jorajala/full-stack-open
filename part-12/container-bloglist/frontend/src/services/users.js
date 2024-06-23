import axios from "axios";
import { API_BASEURL } from "../config.js";

const apiUrl = `${API_BASEURL}/users`;

const getAll = () => {
  const request = axios.get(apiUrl);
  return request.then((response) => response.data);
};

export default { getAll };
