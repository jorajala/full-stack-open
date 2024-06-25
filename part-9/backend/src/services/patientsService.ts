import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
import { patientsData } from "../utils";

const patients = patientsData();

export const getEntries = (): Patient[] => {
  return patients;
};

export const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const createPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  if (typeof id !== "string") {
    console.error("ERROR: something went wrong with uuid");
    process.exit(666);
  } else {
    const newPatient = {
      id,
      ...patient,
    };
    patients.push(newPatient);
    return newPatient;
  }
};
