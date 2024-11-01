import { Entry } from "../../types";

interface EntryItemProps {
  entry: Entry;
}

interface EntriesListProps {
  entries: Entry[];
}

const EntryItem = ({ entry }: EntryItemProps) => {
  const diagnosisCodesList = entry.diagnosisCodes ? (
    <ul>
      {entry.diagnosisCodes.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  ) : null;

  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      {diagnosisCodesList}
    </div>
  );
};

const EntriesList = ({ entries }: EntriesListProps) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.map((e) => (
        <EntryItem key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default EntriesList;
