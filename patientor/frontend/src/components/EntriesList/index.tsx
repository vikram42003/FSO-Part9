import { Diagnosis, Entry } from "../../types";

interface EntryItemProps {
  entry: Entry;
  diagnosis: Diagnosis[];
}

interface EntriesListProps {
  entries: Entry[];
  diagnosis: Diagnosis[];
}

const EntryItem = ({ entry, diagnosis }: EntryItemProps) => {
  const diagnosisCodesList = entry.diagnosisCodes ? (
    <ul>
      {entry.diagnosisCodes.map((d) => (
        <li key={d}>
          {d}: {diagnosis.find((diag) => diag.code === d)?.name}
        </li>
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

const EntriesList = ({ entries, diagnosis }: EntriesListProps) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.map((e) => {
        return <EntryItem key={e.id} entry={e} diagnosis={diagnosis} />;
      })}
    </div>
  );
};

export default EntriesList;
