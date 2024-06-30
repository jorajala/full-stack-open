import { DiaryEntry, NewDiaryEntry } from "../types";

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

function create(entry: NewDiaryEntry): Promise<DiaryEntry> {
  console.log("create", entry);
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data: DiaryEntry) => data);
}

export default { getAll, create };
