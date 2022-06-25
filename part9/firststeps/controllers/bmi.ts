import { calculateBmi } from '../bmi';
import express = require('express');
export const bmiRouter = express.Router();

bmiRouter.get('/', (request, response) => {
  const {height,weight} = request.query;
  
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return response.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return response.json({
    weight,
    height,
    bmi
  });
});
