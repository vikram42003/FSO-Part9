import { useEffect, useState } from "react";

import { Entry } from "../types";

import diaryEntryService from "../services/diaryEntryService";
import NewEntryForm from "./NewEntryForm";

interface DiaryEntryProps {
  entry: Entry;
}

const DiaryEntry = ({ entry }: DiaryEntryProps) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <div>
        {entry.weather}
        <br />
        {entry.visibility}
      </div>
    </div>
  );
};

interface DiaryEntriesProps {
  setNotif: React.Dispatch<React.SetStateAction<string | null>>;
}

const DiaryEntries = ({ setNotif }: DiaryEntriesProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    diaryEntryService
      .getAll()
      .then((entriesArray) => {
        setEntries(entriesArray);
      })
      .catch((e) => {
        setNotif("Error: dirary entry fetching failed");
        setTimeout(() => {
          setNotif(null);
        }, 5000);
        console.log(e);
      });
  });

  if (!entries) return;

  return (
    <div>
      <NewEntryForm setEntries={setEntries} setNotif={setNotif}/>
      {entries.map((e) => {
        return <DiaryEntry key={e.id} entry={e} />;
      })}
    </div>
  );
};

export default DiaryEntries;
