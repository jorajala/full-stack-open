import { NewPatient, Patient } from "./types";
import { Gender } from "./types";
//import ogPatientsData from "../data/patients";
import fullPatientsData from "../data/patients-full";

const toNewPatient = (object: unknown): NewPatient => {
  console.log("toNewPatient", object);

  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "name" in object &&
      "occupation" in object &&
      "ssn" in object &&
      "dateOfBirth" in object &&
      "gender" in object
    )
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  const newPatient = {
    name: parseName(object.name),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries: [],
  };
  return newPatient;
};

export const patientsData = (): Patient[] => {
  const patients = fullPatientsData.map((p) => {
    const gender = parseGender(p.gender);
    return {
      ...p,
      gender,
    };
  });

  return patients;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing occupation");
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export default toNewPatient;
