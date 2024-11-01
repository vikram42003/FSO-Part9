import { SyntheticEvent, useState } from "react";
import patientsService from "../../services/patients";
import { Diagnosis, EntryType, HealthCheckRating, Patient } from "../../types";
import { Alert, Box, Button, Divider, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AxiosError } from "axios";

interface AddEntryFormProps {
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnosis: Diagnosis[];
}

const AddEntryForm = ({ patient, setPatient, diagnosis }: AddEntryFormProps) => {
  const [errorNotif, setErrorNotif] = useState<string>("");

  const [formType, setFormType] = useState<EntryType>(EntryType.Hospital);
  const [description, setDesciption] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

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
            required
            fullWidth
            value={dischargeDate}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
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
            fullWidth
            value={sickLeaveStart}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setSickLeaveStart(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="sick leave end date"
            fullWidth
            value={sickLeaveEnd}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
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
            diagnosisCodes: diagnosisCodes ? [...diagnosisCodes] : undefined,
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
            diagnosisCodes: diagnosisCodes ? [...diagnosisCodes] : undefined,
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
            diagnosisCodes: diagnosisCodes ? [...diagnosisCodes] : undefined,
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
    setDiagnosisCodes([]);
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
          required
          fullWidth
          value={date}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
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

        <InputLabel id="diagnosisCodes">Diagnosis codes</InputLabel>
        <Select
          labelId="diagnosisCodes"
          multiple
          fullWidth
          label="diag"
          style={{ marginBottom: "1rem" }}
          value={diagnosisCodes}
          // Here 'e' will always be an array because material ui docs say so (link - https://mui.com/material-ui/react-select/#multiple-select)
          // i would have used the correct type for this case but its not working in an inline arrow fuction and i dont want to create a separate
          // handler function cause its 3:16 am, i've been at this for like 6 consecutive hours and im tired i wanna get this done and go to sleep :(
          onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
        >
          {diagnosis.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}: {d.name}
            </MenuItem>
          ))}
        </Select>

        {typeSpecificInputFields}

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddEntryForm;
