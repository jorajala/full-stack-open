import express from "express";
import diagnosesRouter from "./routes/diagnosesRouter";
import patientsRouter from "./routes/patientsRouter";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
const HOSTNAME = "127.0.0.1";

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on port ${HOSTNAME}:${PORT}`);
});
