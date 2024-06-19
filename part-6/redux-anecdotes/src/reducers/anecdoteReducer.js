import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      let id = action.payload;
      let targetAnecdote = state.find((n) => n.id === id);
      let updatedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1,
      };

      let newState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote,
      );
      let sortedState = newState.toSorted((a, b) => b.votes - a.votes);

      return sortedState;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addAnecdote, addVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
