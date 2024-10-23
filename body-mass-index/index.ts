import express from "express";

import { ExerciseData } from "./exerciseCalculator";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || Number.isNaN(height) || !weight || Number.isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[]; target: number };

  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(Number(target))) {
    res.json({ error: "malformatted parameters" });
    return;
  }

  const data: ExerciseData = calculateExercises(daily_exercises, target);

  res.json(data);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
