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
  data.success = true;
  data.target = dailyTarget;
  data.trainingDays = 0;

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

  data.average = hoursArray.reduce((acc, curr) => acc + curr) / hoursArray.length;

  return data;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
