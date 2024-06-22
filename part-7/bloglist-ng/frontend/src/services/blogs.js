import axios from "axios";
const baseUrl = "/api/blogs";

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
  let response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const remove = (id) => {
  console.log("remove blog", `${baseUrl}/${id}`);
  let config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const addLike = async (id) => {
  let targetUrl = `${baseUrl}/${id}`;
  let get_response = await axios.get(targetUrl);
  let blog = get_response.data;
  let upvotedBlog = { ...blog, likes: blog.likes + 1 };
  let put_response = await axios.put(targetUrl, upvotedBlog);
  return put_response.data;
};

export default { setToken, create, update, getAll, remove, addLike };
