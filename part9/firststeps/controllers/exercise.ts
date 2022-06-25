import { calculateExercises, Measures } from '../exercise';
import express = require('express');
export const exerciseRouter = express.Router();

exerciseRouter.post('/', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const {daily_exercises,target} = request.body;
  
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return response.status(400).json({
      error: 'malformatted parameters'
    });
  }

  try {

    const measures: Measures = daily_exercises.map(e => {
      if (!isNaN(Number(e))) {
        return Number(e);
      } else { 
        throw new Error(`measure ${e} is not a number`);
      }
    });

    const result = calculateExercises(Number(target), measures);
    return response.json(result);
    
  } catch (error: unknown) {

    let errorMessage = 'Something bad happened.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
      return response.status(400).json({
      error: errorMessage
    });

  }
});
