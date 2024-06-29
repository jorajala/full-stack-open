import { DiaryEntry } from "../types";
import DiaryRow from "./DiaryRow";

const Diary = ({ diary }: { diary: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diary.map((entry) => (
        <DiaryRow entry={entry} />
      ))}
    </div>
  );
};

export default Diary;
