import { DiaryEntry } from "../types";
import DiaryRow from "./DiaryRow";

const Diary = ({ diary }: { diary: DiaryEntry[] }) => {
  return (
    <div>
      {diary.map((entry) => (
        <DiaryRow entry={entry} />
      ))}
    </div>
  );
};

export default Diary;
