import { DiaryEntry } from "../types";
import axios from "axios";

const baseUrl = "/api/diaries";

// function getAll(): Promise<DiaryEntry[]> {
//   const request = axios.get(baseUrl);
//   return request
//     .then((response) => response.data)
//     .then((data: DiaryEntry[]) => data);
// }

function getAll(): DiaryEntry[] {
  let asdf = fetch(baseUrl)
    .then((response) => response.json)
    .then((data) => data)
    .catch();
}

export default { getAll };
