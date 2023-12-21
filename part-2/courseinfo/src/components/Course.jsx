const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Total = ({ parts }) => {
  let exercises = parts.map((part) => part.exercises);
  let sum = exercises.reduce((acc, val) => acc + val, 0);
  return <h4>Number of exercises {sum}</h4>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
