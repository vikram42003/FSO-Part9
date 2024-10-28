import { SyntheticEvent, useState } from "react";
import diaryEntryService from "../services/diaryEntryService";
import { Entry } from "../types";
import { AxiosError } from "axios";

interface NewEntryFormProps {
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setNotif: React.Dispatch<React.SetStateAction<string | null>>;
}

const NewEntryForm = ({ setEntries, setNotif }: NewEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleAddEntry = (e: SyntheticEvent) => {
    e.preventDefault();
    diaryEntryService
      .addEntry({ date, visibility, weather, comment })
      .then((newEntry) => {
        setEntries((prev) => [...prev, newEntry]);
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((e: unknown) => {
        if (e instanceof AxiosError) {
          setNotif(e.response?.data);
          setTimeout(() => {
            setNotif(null);
          }, 5000);
        }
        console.log(e);
      });
  };

  return (
    <div>
      <form onSubmit={handleAddEntry}>
        <label htmlFor="date">date </label>
        <input id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <br />

        <label htmlFor="visibility">visibility </label>
        <input id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
        <br />

        <label htmlFor="weather">weather </label>
        <input id="weather" value={weather} onChange={(e) => setWeather(e.target.value)} />
        <br />

        <label htmlFor="comment">comment </label>
        <input id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;