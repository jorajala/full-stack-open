import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content, id, votes) => {
  let object = { content, id, votes: 0 };
  let response = await axios.post(baseUrl, object);
  return response.data;
};

export default { getAll, createNew };
