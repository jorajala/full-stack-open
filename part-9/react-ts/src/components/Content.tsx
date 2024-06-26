import { Courses } from "../types";

const Content = (courses: Courses): JSX.Element => {
  return (
    <div>
      {courses.courses.map(({ name, exerciseCount }) => (
        <p>
          {name}, {exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
