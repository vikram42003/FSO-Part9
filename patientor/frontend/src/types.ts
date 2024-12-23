export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface EntryBase {
  id: string;
  date: string;
  type: EntryType;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface EntryTypeHospital extends EntryBase {
  type: EntryType.Hospital;
  discharge: { date: string; criteria: string };
}

export interface EntryTypeOccupationalHealthcare extends EntryBase {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface EntryTypeHealthCheck extends EntryBase {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export type Entry = EntryTypeHospital | EntryTypeOccupationalHealthcare | EntryTypeHealthCheck;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
