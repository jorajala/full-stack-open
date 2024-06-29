import { CoursePart, assertNever } from "../types";

const VariableContent = ({
  coursePart,
}: {
  coursePart: CoursePart;
}): JSX.Element => {
  switch (coursePart.kind) {
    case "basic":
      return <p>{coursePart.description}</p>;
    case "group":
      return <p>group project count {coursePart.groupProjectCount}</p>;
    case "background":
      return (
        <>
          <p>
            <em>{coursePart.description}</em>
            <br />
            background material {coursePart.backgroundMaterial}
          </p>
        </>
      );
    case "special":
      return (
        <p>
          <em>
            {coursePart.description}
            <br />
          </em>
          required skills: {coursePart.requirements.join(", ")}
        </p>
      );
    default:
      assertNever(coursePart);
      return <></>;
  }
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <div>
      <h4>
        {coursePart.name} {coursePart.exerciseCount}
      </h4>
      <VariableContent coursePart={coursePart} />
    </div>
  );
};

export default Part;
