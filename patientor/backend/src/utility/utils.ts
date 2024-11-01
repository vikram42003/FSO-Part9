import z from "zod";

import { Gender, NewPatient, EntryType, HealthCheckRating } from "../types";

const EntryBaseSchema = z.object({
  id: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const EntryTypeHospitalSchema = EntryBaseSchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

const EntryTypeOccupationalHealthcareSchema = EntryBaseSchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
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

const EntrySchema = z.discriminatedUnion("type", [
  EntryTypeHospitalSchema,
  EntryTypeOccupationalHealthcareSchema,
  EntryTypeHealthCheckSchema,
]);

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).optional(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};
