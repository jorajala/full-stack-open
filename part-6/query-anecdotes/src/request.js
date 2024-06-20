import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(baseUrl);
};

export const createAnecdote = (content) => {
  let newAnecdote = { content, votes: 0 };
  return axios.post(baseUrl, newAnecdote);
};

export const upvote = (anecdote) => {
  return axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
};
