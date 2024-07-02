import express from "express";
import patients from "../services/patientsService";
import toNewPatient from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  console.log("GET /");

  res.send(patients.getNonSensitiveEntries());
});

patientsRouter.get("/:id", (req, res) => {
  console.log("GET id /", req.body);

  const id = req.params.id;
  const patient = patients.getPatient(id);

  // let patient = patients.getPatient(req.params.id);

  if (patient === undefined) {
    res.status(404).send({ error: `id '${id}' not found` });
  } else {
    res.status(200).send(patient);
  }
});

patientsRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body as unknown);
  const createdPatient = patients.createPatient(newPatient);
  res.status(200).send(createdPatient);
});

export default patientsRouter;
