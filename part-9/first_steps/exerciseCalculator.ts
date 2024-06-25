type ExerciseResult = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

export type ExerciseData = { target: number; daily_exercises: number[] };

const parseArguments = (args: string[]): ExerciseData => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.slice(2).forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error(`${arg} is not a number`);
    }
  });

  const dailyHours = args.slice(3).map((arg) => Number(arg));

  return {
    target: Number(args[2]),
    daily_exercises: dailyHours,
  };
};

const calculateRating = (
  target: number,
  average: number
): [rating: number, description: string] => {
  const midStart = target * 0.95;
  const midEnd = target * 1.3;

  if (average < midStart) {
    return [1, "those are rookie numbers"];
  } else if (average > midEnd) {
    return [3, "stonks!"];
  } else {
    return [2, "p deece"];
  }
};

export const calculateExercises = (data: ExerciseData): ExerciseResult => {
  console.log("calc", data);
  const target = data.target;
  const periodLength = data.daily_exercises.length;
  const trainingDays = data.daily_exercises.filter((hours) => hours > 0).length;
  const sumHours = data.daily_exercises.reduce((acc, val) => acc + val);
  const average = sumHours / periodLength;
  const success = average >= target;
  const [rating, ratingDescription] = calculateRating(target, average);
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const data = parseArguments(process.argv);
  console.log(calculateExercises(data));
} catch (error: unknown) {
  let errorMessage = "An error occurred";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
