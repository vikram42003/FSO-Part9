import { useEffect, useState } from "react";

import { Entry } from "../types";

import diaryEntryService from "../services/diaryEntryService";

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

const DiaryEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    diaryEntryService
      .getAll()
      .then((entriesArray) => {
        setEntries(entriesArray);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  if (!entries) return;

  return (
    <div>
      {entries.map((e) => {
        return <DiaryEntry key={e.id} entry={e} />;
      })}
    </div>
  );
};

export default DiaryEntries;
