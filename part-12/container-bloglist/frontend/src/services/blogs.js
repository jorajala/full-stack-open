import axios from "axios";
//const baseUrl = "/api/blogs";
import { API_BASEURL } from "../config.js";

const apiUrl = `${API_BASEURL}/blogs`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  let config = {
    headers: { Authorization: token },
  };
  console.log("createblog", config, newObject);
  console.log(token);
  let response = await axios.post(apiUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${apiUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(apiUrl);
  return request.then((response) => response.data);
};

const remove = (id) => {
  console.log("remove blog", `${apiUrl}/${id}`);
  let config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${apiUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const addLike = async (id) => {
  let targetUrl = `${apiUrl}/${id}`;
  let get_response = await axios.get(targetUrl);
  let blog = get_response.data;
  let upvotedBlog = { ...blog, likes: blog.likes + 1 };
  let put_response = await axios.put(targetUrl, upvotedBlog);
  return put_response.data;
};

export default { setToken, create, update, getAll, remove, addLike };
