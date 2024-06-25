import express from "express";
import {
  createPatient,
  getNonSensitiveEntries,
} from "../services/patientsService";
import toNewPatient from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  console.log("GET /");

  res.send(getNonSensitiveEntries());
});

patientsRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body as unknown);
  const createdPatient = createPatient(newPatient);
  res.status(200).send(createdPatient);
});

export default patientsRouter;
