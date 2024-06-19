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

const upvote = async (id) => {
  let get_response = await axios.get(`${baseUrl}/${id}`);
  let anecdote = get_response.data;
  console.log("upvote get", anecdote);

  let uvotedAnec = { ...anecdote, votes: anecdote.votes + 1 };
  let put_response = await axios.put(`${baseUrl}/${id}`, uvotedAnec);
  console.log("upvote put", put_response.data);
  return put_response.data;
};

export default { getAll, createNew, upvote };
