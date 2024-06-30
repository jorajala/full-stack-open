import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import Diary from "./components/Diary";
import diaryService from "./services/diary";
import AddEntry from "./components/AddEntry";
import ErrorNotification from "./components/ErrorNotification";

function App() {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    diaryService.getAll().then((diary: DiaryEntry[]) => setDiary(diary));
  }, []);

  const showError = async (errorText: string) => {
    setErrorText(errorText);
    const delay = 2000;
    await new Promise((r) => setTimeout(r, delay));
    setErrorText("");
  };

  const handleAdd = (newEntry: NewDiaryEntry) => {
    console.log("handleAdd", newEntry);
    diaryService
      .create(newEntry)
      .then((_entry) => {
        diaryService.getAll().then((diary: DiaryEntry[]) => setDiary(diary));
      })
      .catch((rejected) => rejected.text())
      .then((err) => {
        console.error(err);
        showError(err);
      });
  };

  return (
    <div>
      <AddEntry handleAdd={handleAdd} />
      <ErrorNotification errorText={errorText} />
      <Diary diary={diary} />
    </div>
  );
}

export default App;
