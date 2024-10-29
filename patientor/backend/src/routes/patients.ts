import express, { Response } from "express";

import { NonSensitivePatient, Patient } from "../types";

import { addPatient, getAllPatients, getPatient } from "../services/PatientsService";
import { toNewPatient } from "../utility/utils";
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
    let errorMessage = "something went wrong";
    if (e instanceof z.ZodError) {
      errorMessage += " Error: " + e.errors[0].message;
    } else if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
