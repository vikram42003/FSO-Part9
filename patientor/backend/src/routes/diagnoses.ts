import express, { Response } from "express";

import { Diagnoses } from "../types";

import { getDiagnosesData } from "../services/diagnosesService";

const router = express.Router();

router.get("/diagnoses", (_req, res: Response<Diagnoses[]>) => {
  res.json(getDiagnosesData());
});

export default router;
