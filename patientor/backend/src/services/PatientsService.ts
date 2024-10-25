import patientsData from "../../data/patientsData";

import { NonSensitivePatient } from "../types";

export const getAllPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
