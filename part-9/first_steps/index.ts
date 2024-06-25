import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { ExerciseData, calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string") {
    const errorMsg =
      "Invalid query params; must be e.g. '?height=180&weight=80'";
    res.status(400).send({ error: errorMsg });
    return;
  } else {
    const h = Number(height);
    const w = Number(weight);
    const bmi = calculateBmi(h, w);
    res.status(200).send({ weight: w, height: h, bmi });
  }
});

app.post(
  "/exercises",
  (req: Request<unknown, unknown, ExerciseData>, res: Response) => {
    const data = req.body;

    if (!data.daily_exercises || !data.target) {
      const errorMsg = "parameters missing";
      res.status(400).send({ error: errorMsg });
      console.error("ERROR: /exercises:", errorMsg);
      return;
    }

    const arrayHasNumbers = data.daily_exercises.every(
      (value) => typeof value === "number"
    );

    if (!arrayHasNumbers || typeof data.target !== "number") {
      const errorMsg = "malformatted parameters";
      console.error("ERROR: /exercises:", errorMsg);
      res.status(400).send({ error: errorMsg });
      return;
    }

    const result = calculateExercises(data);
    console.log("calc result", result);
    res.status(200).json(result);
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
