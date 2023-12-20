import { useState } from "react";

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    let updated = good + 1;
    setGood(updated);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    let updated = neutral + 1;
    setNeutral(updated);
    setTotal(total + 1);
  };

  const handleBad = () => {
    let updated = bad + 1;
    setBad(updated);
    setTotal(total + 1);
  };

  let stats = "";
  if (good + neutral + bad === 0) {
    stats = <p>No feedback given</p>;
  } else {
    stats = (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine
            text="avarage"
            value={(good * 1 + bad * -1) / total}
          />
          <StatisticsLine text="positive" value={(good / total) * 100} />
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text="good"></Button>
      <Button handleClick={handleNeutral} text="neutral"></Button>
      <Button handleClick={handleBad} text="bad"></Button>
      <h2>statistics</h2>
      {stats}
    </div>
  );
};

export default App;
