import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (content) => {
  let newAnecdote = { content, votes: 0 };
  axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const upvote = (anecdote) => {
  axios
    .put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    .then((res) => res.data);
};
