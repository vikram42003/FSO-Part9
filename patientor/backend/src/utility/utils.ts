import { Gender, NewPatient } from "../types";

export const toNewPatient = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    // the validators should throw some error and the caller of toNewPatient will catch it
    const newPatient: NewPatient = {
      name: validateString(object.name),
      dateOfBirth: validateDate(object.dateOfBirth),
      ssn: validateString(object.ssn),
      gender: validateGender(object.gender),
      occupation: validateString(object.occupation),
    };

    return newPatient;
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const validateString = (str: unknown): string => {
  if (isString(str)) {
    return str;
  } else {
    throw new Error(`Incorrect data: '${str}' should be a string`);
  }
};

const validateDate = (date: unknown): string => {
  if (isString(date) && Boolean(Date.parse(date))) {
    return date;
  } else {
    throw new Error(`Incorrect data: '${date}' should be a string representing a valid date`);
  }
};

const validateGender = (gender: unknown): Gender => {
  if (
    isString(gender) &&
    Object.values(Gender)
      .map((g) => g.toString())
      .includes(gender)
  ) {
    return gender as Gender;
  } else {
    throw new Error(`Incorrect data: invalid gender '${gender}'. the gender should be either male or female or other`);
  }
};
