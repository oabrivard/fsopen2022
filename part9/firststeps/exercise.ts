type Rating = 1 | 2 | 3;
type RatingDescription = 'bad' | 'medium' | 'good';
export type Measures = Array<number>;
export type Target = number;

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

export const calculateExercises = (target: Target, measures: Measures) => {
  const average = measures.reduce((acc,e) => acc + e, 0) / measures.length;
  const rating: Rating = average < 1 ? 1 : average > 3 ? 3 : 2;
  const ratingDescription:RatingDescription = rating === 1 ? 'bad' : rating === 3 ? 'good' : 'medium';

  return {
    periodLength: measures.length,
    trainingDays: measures.filter(e => e > 0).length,
    success: measures.filter(e => e >= target).length == measures.length,
    rating,
    ratingDescription,
    target,
    average
  } as Result;
};
