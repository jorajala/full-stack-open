const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const addVote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "ADD",
    payload: { content, id: getId(), votes: 0 },
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  console.log("anecdoteReducer state: ", state);
  console.log("anecdoteReducer action", action);

  switch (action.type) {
    case "VOTE":
      let id = action.payload.id;
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

    case "ADD":
      return state.concat(action.payload);

    default:
      return state;
  }

  return state;
};

export default anecdoteReducer;
