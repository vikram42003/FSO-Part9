import express, { Response } from "express";

import { NonSensitivePatient, Patient } from "../types";

import { addEntry, addPatient, getAllPatients, getPatient } from "../services/PatientsService";
import { toNewEntry, toNewPatient } from "../utility/utils";
import { z } from "zod";

const router = express.Router();

router.get("/patients", (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(getAllPatients());
});

router.get("/patients/:id", (req, res: Response<Patient | { error: string }>) => {
  const patient = getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.json({ error: `Error: patient with id ${req.params.id} was not found` });
  }
});

router.post("/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    let errorMessage = "";
    if (e instanceof z.ZodError) {
      if (e.issues[0].message === "Required") {
        errorMessage += ` Error: '${e.issues[0].path}' field is required`;
      } else {
        errorMessage += ` Error: ${e.issues[0].message} for '${e.issues[0].path}' field`;
      }
    } else {
      errorMessage = "something went wrong";
    }
    console.log("ERROR START\n", e, "\nERROR END");
    res.json({ error: errorMessage });
  }
});

router.post("/patients/:id/entries", (req, res) => {
  const id = req.params.id;

  if (!getPatient(id)) {
    res.json({ error: `patient with id '${id}' was not found on the server` });
  }

  try {
    const newEntry = toNewEntry(req.body);
    const entryToReturn = addEntry(id, newEntry);
    res.json(entryToReturn);
  } catch (e) {
    let errorMessage = "";
    if (e instanceof z.ZodError) {
      if (e.issues[0].message === "Required") {
        errorMessage += ` Error: '${e.issues[0].path}' field is required`;
      } else {
        errorMessage += ` Error: ${e.issues[0].message} for '${e.issues[0].path}' field`;
      }
    } else {
      errorMessage = "something went wrong";
    }
    console.log("ERROR START\n", e, "\nERROR END");
    res.json({ error: errorMessage });
  }
});

export default router;
