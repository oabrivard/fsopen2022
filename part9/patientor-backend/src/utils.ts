import { NewPatient, Gender, Patient, NonSensitivePatient, EntryWithoutId, HealthCheckRating } from './types';

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

type NewPatientFields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name,'name'),
    dateOfBirth: parseDate(dateOfBirth,'dateOfBirth'),
    ssn: parseString(ssn,'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation,'occupation'),
    entries: []
  };

  return newPatient;
};

export const toNonSensitivePatient = (patient: Patient): NonSensitivePatient => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {ssn, entries, ...nonSensitivePatient} = patient;
  return nonSensitivePatient as NonSensitivePatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

export const toNewEntry = (data: unknown) : EntryWithoutId => {
  const newEntry = data as EntryWithoutId;

  const sharedProps = {
    id: "",
    description: parseString(newEntry.description,'description'),
    date: parseDate(newEntry.date,'date'),
    specialist: parseString(newEntry.specialist,'specialist'),
    diagnosisCodes: newEntry.diagnosisCodes
  };

  switch (newEntry.type) {
    case "OccupationalHealthcare":
      const sickLeave = !newEntry.sickLeave ? undefined : {
        startDate: parseDate(newEntry.sickLeave.startDate,'sickLeaveStartDate'),
        endDate: parseDate(newEntry.sickLeave.endDate,'sickLeaveEndDate')
      };
      return {
        ...sharedProps,
        type: "OccupationalHealthcare",
        employerName: parseString(newEntry.employerName,'employerName'),
        sickLeave
      };
    case "Hospital":
      return {
        ...sharedProps,
        type: "Hospital",
        discharge: {
          criteria: parseString(newEntry.discharge.criteria,'dischargeCriteria'),
          date: parseDate(newEntry.discharge.date,'dischargeDate')
        }
      };
    case "HealthCheck":
      return {
        ...sharedProps,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating)
      };
    default:
      throw new Error('Incorrect or missing entry type: ' + data);
  }
};