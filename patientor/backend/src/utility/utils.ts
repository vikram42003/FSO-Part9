import z from "zod";

import { Gender, NewPatient, EntryType, HealthCheckRating, NewEntry } from "../types";

const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(1),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

const EntryBaseSchema = z.object({
  date: z.string().date(),
  specialist: z.string().min(1),
  description: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

const EntryTypeHospitalSchema = EntryBaseSchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string().min(1),
  }),
});

const EntryTypeOccupationalHealthcareSchema = EntryBaseSchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string().min(1),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const EntryTypeHealthCheckSchema = EntryBaseSchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const entrySchema = z.discriminatedUnion("type", [
  EntryTypeHospitalSchema,
  EntryTypeOccupationalHealthcareSchema,
  EntryTypeHealthCheckSchema,
]);

export const toNewEntry = (object: unknown): NewEntry => {
  return entrySchema.parse(object);
};
