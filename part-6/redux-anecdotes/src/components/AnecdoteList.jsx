import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter),
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));
    let content = anecdotes.filter((a) => a.id === id).pop().content;

    dispatch(setNotification(`you upvoted: ${content}`, 5));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.value - a.value)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
