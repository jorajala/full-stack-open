import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Notification from "./components/Notification.jsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, upvote } from "./request.js";

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecMutation = useMutation({
    // @ts-ignore
    mutationFn: upvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    console.log("upvote", anecdote);
    updateAnecMutation.mutate(anecdote);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return <div>service not available: server problem</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
