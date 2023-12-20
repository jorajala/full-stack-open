import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const MostUpvoted = (props) => {
  console.log(props);
  let result = "No votes yet";
  let points = [...props.points];
  let initialValue = 0;
  let sum = points.reduce((acc, current) => acc + current, initialValue);

  if (sum > 0) {
    let maxValue = Math.max(...props.points);
    console.log(maxValue);
    result = props.anecdotes[props.points.indexOf(maxValue)];
  }

  return <p>{result}</p>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const randomize = () => {
    let r = Math.floor(Math.random() * anecdotes.length);
    setSelected(r);
  };

  const addVote = () => {
    let asdf = [...points];
    asdf[selected] += 1;
    setPoints(asdf);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>votes: {points[selected]}</p>
      <Button handleClick={addVote} text="🖒🖒🖒🖒🖒" />
      <Button handleClick={randomize} text="random" />
      <h2>Anecdote with the most votes</h2>
      <MostUpvoted points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
