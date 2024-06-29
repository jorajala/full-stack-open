import { DiaryEntry } from "../types";

const DiaryRow = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>
        visibility: {entry.visibility}
        <br />
        weather: {entry.weather}
      </p>
    </div>
  );
};

export default DiaryRow;
