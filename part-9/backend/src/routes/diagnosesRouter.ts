import express from "express";
import { getEntries } from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  console.log("GET /");
  res.send(getEntries());
});

export default diagnosesRouter;
