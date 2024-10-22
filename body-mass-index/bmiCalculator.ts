const calculateBmi = (height: number, weight: number): string => {
  const bmi = Number((weight / ((height / 100) * (height / 100))).toFixed(1));

  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return "Normal range";
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30.0 && bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi >= 35.0 && bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const h = Number(process.argv[2]);
  const w = Number(process.argv[3]);

  if (process.argv.length != 4 || Number.isNaN(h) || Number.isNaN(w)) {
    throw new Error(
      "Invalid arguments. The arguments should be 'npm run calculateBmi <height> <weight>' and nothing else"
    );
  }

  console.log(calculateBmi(h, w));
} catch (e) {
  console.log(e);
}
