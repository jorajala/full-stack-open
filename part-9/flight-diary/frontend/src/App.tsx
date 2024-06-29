import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import "./App.css";
import Diary from "./components/Diary";
import diaryService from "./services/diary";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>();

  useEffect(() => {
    setDiaries(diaryService.getAll());
  }, []);

  return (
    <div>
      <Diary />
    </div>
  );
}

export default App;
