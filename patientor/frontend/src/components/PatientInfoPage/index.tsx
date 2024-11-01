import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import patientsService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import maleSvg from "../../images/male-symbol-svgrepo-com.svg";
import femaleSvg from "../../images/female-gender-sign-svgrepo-com.svg";
import EntriesList from "../EntriesList";
import AddEntryForm from "../AddEntryForm";

interface PatientInfoPageProps {
  diagnosis: Diagnosis[];
}

const PatientInfoPage = ({ diagnosis }: PatientInfoPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<string>();

  useEffect(() => {
    async function getInfo() {
      if (id) {
        const data = await patientsService.get(id);
        setPatient(data);
      } else {
        console.log("Parameter :id is missing. ID is ", id);
      }
    }
    getInfo();
  }, [id]);

  if (!patient) return <div>loading info...</div>;

  const svg = patient.gender === "male" ? maleSvg : femaleSvg;

  return (
    <div>
      <CssBaseline />
      <Container>
        <h2>
          {patient.name} <img src={svg} height={20} />
        </h2>
        <p>
          Ssn: {patient.ssn}
          <br />
          Occupation: {patient.occupation}
          <br />
          {patient.dateOfBirth && `Date of Birth: ${patient.dateOfBirth}`}
        </p>
        <AddEntryForm diagnosis={diagnosis} patient={patient} setPatient={setPatient} />
        {patient.entries && patient.entries.length > 0 && (
          <EntriesList entries={patient.entries} diagnosis={diagnosis} />
        )}
      </Container>
    </div>
  );
};

export default PatientInfoPage;
