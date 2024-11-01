import { CSSProperties } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import HealingIcon from "@mui/icons-material/Healing";
import {
  Diagnosis,
  Entry,
  EntryType,
  EntryTypeHealthCheck,
  EntryTypeHospital,
  EntryTypeOccupationalHealthcare,
} from "../../types";

interface EntryItemHospitalProps {
  entry: EntryTypeHospital;
}

interface EntryItemOccupationalHealthcareProps {
  entry: EntryTypeOccupationalHealthcare;
}

interface EntryItemHealthCheck {
  entry: EntryTypeHealthCheck;
}

interface EntriesListProps {
  entries: Entry[];
  diagnosis: Diagnosis[];
}

const divStyle: CSSProperties = {
  border: "2px solid black",
  padding: "0.25rem 0.75rem",
  borderRadius: "8px",
};

const EntryItemHospital = ({ entry }: EntryItemHospitalProps) => {
  return (
    <div style={divStyle}>
      <p>
        <b>
          {entry.date} <LocalHospitalIcon />
        </b>
        <br />
        {entry.description}
      </p>
      <p>
        <b>Discharged -</b> {entry.discharge.date} - {entry.discharge.criteria}
      </p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((dc) => (
            <li key={dc}>{dc}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EntryItemOccupationalHealthcare = ({ entry }: EntryItemOccupationalHealthcareProps) => {
  return (
    <div style={divStyle}>
      <p>
        <b>
          {entry.date} <MedicalInformationIcon /> employer - {entry.employerName}
        </b>
        <br />
        {entry.description}
      </p>
      <p>
        {entry.sickLeave && (
          <>
            Sick leave period: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            <br />
          </>
        )}
        Diagnosed by {entry.specialist}
      </p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((dc) => (
            <li key={dc}>{dc}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EntryItemHealthCheck = ({ entry }: EntryItemHealthCheck) => {
  return (
    <div style={divStyle}>
      <p>
        <b>
          {entry.date} <HealingIcon />
        </b>
        <br /> {entry.description}
      </p>
      <p>Health check rating - {entry.healthCheckRating}</p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((dc) => (
            <li key={dc}>{dc}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EntriesList = ({ entries, diagnosis }: EntriesListProps) => {
  entries = entries.map((entry) => {
    if (entry.diagnosisCodes && diagnosis.length > 0) {
      entry.diagnosisCodes = entry.diagnosisCodes.map((dc) => {
        const diag = diagnosis.find((d) => d.code === dc);
        if (diag) {
          return `${diag.code}: ${diag.name}`;
        } else {
          return dc;
        }
      });
    }
    return entry;
  });

  const renderEntryType = (entry: Entry, key: string) => {
    let element;
    switch (entry.type) {
      case EntryType.Hospital:
        element = <EntryItemHospital key={key} entry={entry} />;
        break;
      case EntryType.OccupationalHealthcare:
        element = <EntryItemOccupationalHealthcare key={key} entry={entry} />;
        break;
      case EntryType.HealthCheck:
        element = <EntryItemHealthCheck key={key} entry={entry} />;
        break;
      default:
        const never: never = entry;
        return never;
    }
    return element;
  };

  return (
    <div>
      <h3>entries</h3>
      {entries.map((e) => renderEntryType(e, e.id))}
    </div>
  );
};

export default EntriesList;
