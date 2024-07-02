import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
import { patientsData } from "../utils";

const patients = patientsData();

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => {
    if (patient.id === id) {
      return patient;
    } else {
      return undefined;
    }
  });
};

const createPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  if (typeof id !== "string") {
    console.error("ERROR: something went wrong with uuid");
    process.exit(666);
  } else {
    const newPatient = {
      id,
      ...patient,
      entries: [],
    };
    patients.push(newPatient);
    return newPatient;
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  createPatient,
};
