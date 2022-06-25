import {Target, Measures, calculateExercises} from './exercise';

type TargetAndMeasures = {
  target: Target,
  measures: Measures
};

const parseTargetAndMeasures = (args: Array<string>): TargetAndMeasures => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided target was not a number!');
  }

  const target = Number(args[2]);

  const measures = args.slice(3).map(arg => {
    if (!isNaN(Number(arg))) {
      return Number(arg);
    } else { 
      throw new Error('Provided measures were not numbers!');
    }
  });

  return {
    target,
    measures
  };
};

try {
  const {target, measures} = parseTargetAndMeasures(process.argv);
  console.log(calculateExercises(target, measures));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

