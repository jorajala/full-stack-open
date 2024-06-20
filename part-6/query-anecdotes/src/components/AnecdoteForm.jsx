import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request.js";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecMutation = useMutation({
    // @ts-ignore
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
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
