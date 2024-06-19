import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    console.log("addAnecdote", event.target);
    let content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(addAnecdote(content));
    dispatch(setNotification(`you added: ${content}`, 5));
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
