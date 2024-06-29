import { DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

function getAll(): Promise<DiaryEntry[]> {
  return fetch(baseUrl)
    .then((response) => response.json())
    .then((data: DiaryEntry[]) => data)
    .catch((e) => {
      console.error("getAll", e);
      let asdf: DiaryEntry[] = [];
      return asdf;
    });
}

export default { getAll };
