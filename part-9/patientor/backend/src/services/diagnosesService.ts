import diagnosisData from "../../data/diagnoses";
import { Diagnosis } from "../types";

export const getEntries = () => {
  return diagnosisData as Diagnosis[];
};

export const getNonSensitiveEntries = () => {
  return diagnosisData as Diagnosis[];
};
