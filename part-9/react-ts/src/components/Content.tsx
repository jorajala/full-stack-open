import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <Part key={index} coursePart={coursePart} />
      ))}
    </div>
  );
};

export default Content;
