import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import RadioEntries from "./RadioEntries";

const AddEntry = ({ handleAdd }: { handleAdd: Function }) => {
  const [formDate, setFormDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [formComment, setFormComment] = useState<string>("");

  const handleButton = (event: React.MouseEvent) => {
    console.log("handleButton", event.currentTarget.parentElement);

    let newEntry: NewDiaryEntry = {
      date: formDate,
      visibility: visibility,
      weather: weather,
      comment: formComment,
    };

    handleAdd(newEntry);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form>
        date{" "}
        <input
          type="date"
          id="addform-date"
          onChange={(event) => {
            setFormDate(event.currentTarget.value);
          }}
        />
        <br />
        <RadioEntries setVisibility={setVisibility} setWeather={setWeather} />
        comment{" "}
        <input
          id="addform-comment"
          onChange={(event) => {
            setFormComment(event.currentTarget.value);
          }}
        />
        <br />
        <button id="addform-button" type="button" onClick={handleButton}>
          add
        </button>
      </form>
    </div>
  );
};

export default AddEntry;
