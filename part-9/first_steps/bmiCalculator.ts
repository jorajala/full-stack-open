const parseArguments = (args: string[]): [height: number, weight: number] => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [Number(args[2]), Number(args[3])];
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi < 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi > 17.0 && bmi < 18.5) {
    return "Underweight (Mild thinness) ";
  } else if (bmi > 18.4 && bmi < 25.0) {
    return "Normal range ";
  } else if (bmi > 24.9 && bmi < 30.0) {
    return "Overweight (Pre-obese) ";
  } else if (bmi > 29.9 && bmi < 35.0) {
    return "Obese (Class I) ";
  } else if (bmi > 34.9 && bmi < 40) {
    return "Obese (Class II) ";
  } else {
    return "Obese (Class III) ";
  }
};

try {
  const [value1, value2] = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
