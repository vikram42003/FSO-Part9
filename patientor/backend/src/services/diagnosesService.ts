import { Diagnoses } from "../types";

import data from "../../data/diagnosesData";

export const getDiagnosesData = (): Diagnoses[] => {
  return data;
};
