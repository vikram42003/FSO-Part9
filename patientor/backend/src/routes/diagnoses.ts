import express, { Response } from "express";

import { Diagnosis } from "../types";

import { getDiagnosesData } from "../services/diagnosisService";

const router = express.Router();

router.get("/diagnoses", (_req, res: Response<Diagnosis[]>) => {
  res.json(getDiagnosesData());
});

export default router;
