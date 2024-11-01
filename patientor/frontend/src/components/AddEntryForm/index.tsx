import { SyntheticEvent, useState } from "react";
import patientsService from "../../services/patients";
import { EntryType, HealthCheckRating, Patient } from "../../types";
import { Alert, Box, Button, Divider, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AxiosError } from "axios";

interface AddEntryFormProps {
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const AddEntryForm = ({ patient, setPatient }: AddEntryFormProps) => {
  const [errorNotif, setErrorNotif] = useState<string>("");

  const [formType, setFormType] = useState<EntryType>(EntryType.Hospital);
  const [description, setDesciption] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");

  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");

  const [healthCheck, setHealthCheck] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  if (!patient) return <div>loading data...</div>;

  let typeSpecificInputFields;
  switch (formType) {
    case EntryType.Hospital:
      typeSpecificInputFields = (
        <>
          <TextField
            label="discharge date"
            placeholder="YYYY-MM-DD"
            required
            fullWidth
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="criteria"
            required
            fullWidth
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </>
      );
      break;
    case EntryType.OccupationalHealthcare:
      typeSpecificInputFields = (
        <>
          <TextField
            label="employer name"
            required
            fullWidth
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="sick leave start date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveStart}
            onChange={(e) => setSickLeaveStart(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="sick leave end date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveEnd}
            onChange={(e) => setSickLeaveEnd(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </>
      );
      break;
    case EntryType.HealthCheck:
      typeSpecificInputFields = (
        <>
          <InputLabel id="health-check">health check rating</InputLabel>
          <Select
            labelId="health-check"
            value={healthCheck}
            label="health-check"
            onChange={(e) => setHealthCheck(e.target.value as HealthCheckRating)}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
          </Select>
        </>
      );
      break;
    default:
      const never: never = formType;
      return never;
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      let newEntry;
      switch (formType) {
        case EntryType.Hospital:
          newEntry = await patientsService.createEntry(patient.id, {
            date,
            type: formType,
            specialist,
            description,
            diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(" ") : undefined,
            discharge: {
              date: dischargeDate,
              criteria,
            },
          });
          break;
        case EntryType.OccupationalHealthcare:
          newEntry = await patientsService.createEntry(patient.id, {
            date,
            type: formType,
            specialist,
            description,
            diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(" ") : undefined,
            employerName,
            sickLeave:
              sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined,
          });
          break;
        case EntryType.HealthCheck:
          newEntry = await patientsService.createEntry(patient.id, {
            date,
            type: formType,
            specialist,
            description,
            diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(" ") : undefined,
            healthCheckRating: healthCheck,
          });
          break;
        default:
          const never: never = formType;
          return never;
      }

      setPatient({ ...patient, entries: [...(patient.entries || []), newEntry] });
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorNotif(e.response?.data?.error || "An unknown error occurred");
      } else {
        setErrorNotif("An error occurred");
      }
      console.log("ERROR", e);
      setTimeout(() => {
        setErrorNotif("");
      }, 5000);
    }

    setDesciption("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes("");
    setDischargeDate("");
    setCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
    setHealthCheck(HealthCheckRating.Healthy);
  };

  return (
    <>
      {errorNotif && <Alert severity="error">{errorNotif}</Alert>}
      <Box component="form" sx={{ p: 2, border: "1px dashed grey" }}>
        <h3>New {formType} entry</h3>

        <InputLabel id="entry-type">entry type</InputLabel>
        <Select
          labelId="entry-type"
          value={formType}
          label="entry-type"
          onChange={(e) => setFormType(e.target.value as EntryType)}
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value={EntryType.Hospital}>Hospital</MenuItem>
          <MenuItem value={EntryType.OccupationalHealthcare}>Occupational Healthcare</MenuItem>
          <MenuItem value={EntryType.HealthCheck}>Health Check</MenuItem>
        </Select>
        <Divider />

        <TextField
          label="description"
          required
          fullWidth
          value={description}
          onChange={(e) => setDesciption(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="date"
          placeholder="YYYY-MM-DD"
          required
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="specialist"
          required
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="diagnosis codes (separated by space)"
          fullWidth
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {typeSpecificInputFields}

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddEntryForm;
