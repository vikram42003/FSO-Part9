import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";
import diagnosisService from "./services/diagnosis";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchInfo = async () => {
      try {
        const patients = await patientService.getAll();
        setPatients(patients);
        const diagnosis = await diagnosisService.getAll();
        setDiagnosis(diagnosis);
      } catch (e) {
        console.log("Could not fetch patient and diagnosis data\n", e);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfoPage diagnosis={diagnosis} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
