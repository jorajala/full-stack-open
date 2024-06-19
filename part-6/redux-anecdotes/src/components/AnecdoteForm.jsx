import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    console.log("addAnecdote", event.target);
    let content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    let newAnecdote = await anecdoteService.createNew(content);
    console.log("newAnec", newAnecdote);
    dispatch(addAnecdote(newAnecdote));
    dispatch({
      type: "notification/setNotification",
      payload: `you added: ${content}`,
    });
    setTimeout(
      () =>
        dispatch({
          type: "notification/setNotification",
          payload: null,
        }),
      5000,
    );
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
