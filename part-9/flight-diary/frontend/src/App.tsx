import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import Diary from "./components/Diary";
import diaryService from "./services/diary";

function App() {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((diary: DiaryEntry[]) => setDiary(diary));
  }, []);

  return (
    <div>
      <Diary diary={diary} />
    </div>
  );
}

export default App;
