import { Diagnosis } from "../types";

import data from "../../data/diagnosisData";

export const getDiagnosesData = (): Diagnosis[] => {
  return data;
};
