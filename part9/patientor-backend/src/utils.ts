import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }

  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown, fieldName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing ${fieldName}: ` + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name,'name'),
    dateOfBirth: parseDate(dateOfBirth,'dateOfBirth'),
    ssn: parseString(ssn,'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation,'occupation')
  };

  return newEntry;
};

export default toNewPatientEntry;