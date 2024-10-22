interface exerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hoursArray: number[], dailyTarget: number): exerciseData => {
  const data: exerciseData = {} as exerciseData;

  data.periodLength = hoursArray.length;
  data.trainingDays = 0;
  data.success = true;

  for (const hour of hoursArray) {
    if (hour > 0) {
      data.trainingDays++;
    }

    if (hour < dailyTarget) {
      data.success = false;
    }
  }

  if (data.trainingDays >= data.periodLength * 0.8) {
    data.rating = 3;
    data.ratingDescription = "good job! you did well";
  } else if (data.trainingDays >= data.periodLength * 0.5) {
    data.rating = 2;
    data.ratingDescription = "not too bad but could do better";
  } else {
    data.rating = 1;
    data.ratingDescription = "you can do better";
  }

  data.target = dailyTarget;
  data.average = hoursArray.reduce((acc, curr) => acc + curr) / hoursArray.length;

  return data;
};

try {
  if (process.argv.length < 4) {
    throw new Error("please provide the target value and hours array delimited by space");
  }

  const target = Number(process.argv[2]);
  const hoursArray = process.argv.slice(3).map(Number);

  if (Number.isNaN(target) || hoursArray.some(isNaN)) {
    throw new Error("the arguments can only be numbers");
  }

  console.log(calculateExercises(hoursArray, target));
} catch (e) {
  console.log(e);
}
