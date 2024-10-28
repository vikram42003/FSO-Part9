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
        <label htmlFor="date">date: </label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <br />

        <div>
          <label>visibility: </label>

          <input
            type="radio"
            name="visibility"
            id="great"
            value="great"
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label htmlFor="great">great</label>

          <input
            type="radio"
            name="visibility"
            id="good"
            value="good"
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label htmlFor="good">good</label>

          <input type="radio" name="visibility" id="ok" value="ok" onChange={(e) => setVisibility(e.target.value)} />
          <label htmlFor="ok">ok</label>

          <input
            type="radio"
            name="visibility"
            id="poor"
            value="poor"
            onChange={(e) => setVisibility(e.target.value)}
          />
          <label htmlFor="poor">poor</label>

          <br />
        </div>

        <div>
          <label>weather: </label>

          <input type="radio" name="weather" id="sunny" value="sunny" onChange={(e) => setWeather(e.target.value)} />
          <label htmlFor="sunny">sunny</label>

          <input type="radio" name="weather" id="rainy" value="rainy" onChange={(e) => setWeather(e.target.value)} />
          <label htmlFor="rainy">rainy</label>

          <input type="radio" name="weather" id="cloudy" value="cloudy" onChange={(e) => setWeather(e.target.value)} />
          <label htmlFor="cloudy">cloudy</label>

          <input type="radio" name="weather" id="stormy" value="stormy" onChange={(e) => setWeather(e.target.value)} />
          <label htmlFor="stormy">stormy</label>

          <input type="radio" name="weather" id="windy" value="windy" onChange={(e) => setWeather(e.target.value)} />
          <label htmlFor="windy">windy</label>

          <br />
        </div>

        <label htmlFor="comment">comment: </label>
        <input id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
