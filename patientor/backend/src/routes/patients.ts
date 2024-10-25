import express, { Response } from "express";

import { NonSensitivePatient } from "../types";
import { getAllPatients } from "../services/PatientsService";

const router = express.Router();

router.get("/patients", (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(getAllPatients());
});

export default router;
