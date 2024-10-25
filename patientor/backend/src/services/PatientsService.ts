import { v4 as uuid } from "uuid";

import patientsData from "../../data/patientsData";

import { NewPatient, NonSensitivePatient, Patient } from "../types";

export const getAllPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (patientToAdd: NewPatient): Patient => {
  const newPatient = {
    ...patientToAdd,
    id: uuid(),
  };

  patientsData.push(newPatient);
  return newPatient;
};
