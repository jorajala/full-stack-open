import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request.js";
import { useNotificationDispatch } from "../NotificationContext.jsx";

const AnecdoteForm = () => {
  const noteDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecMutation = useMutation({
    // @ts-ignore
    mutationFn: createAnecdote,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
      noteDispatch({ type: "SET", payload: vars });
      setTimeout(() => {
        noteDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (err) => {
      // @ts-ignore
      noteDispatch({ type: "SET", payload: err.response.data.error });
      setTimeout(() => {
        noteDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote", content);

    newAnecMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
