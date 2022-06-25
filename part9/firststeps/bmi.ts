export type BmiValues = {
  height: number,
  mass: number
};

export const calculateBmi = (height:number, mass:number) => {
  const bmi = mass / (height*height) * 10000;

  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi >= 18.5 && bmi < 23) {
    return "Normal range (Healthy)";
  } else if (bmi >= 23.0 && bmi < 25) {
    return "Overweight I (At risk)";
  } else if (bmi >= 25.0 && bmi < 30) {
    return "Overweight II (Moderately obese)";
  } else {
    return "Overweight III (Severely obese)";
  }
};
