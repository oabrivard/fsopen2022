import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import {v4 as uuidv4} from 'uuid';
import {toNonSensitivePatient} from "../utils";

const getPatients = (): NonSensitivePatient[] => {
  //return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
  return patientData.map(p => toNonSensitivePatient(p));
};

const getPatient = (id: string): Patient => {
  const patient = patientData.find(p => p.id===id);
  if (!patient) {
    throw new Error('Incorrect patient ID ' + id);
  }

  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id = uuidv4();

  const newPatient = {
    id,
    ...entry
  };

  patientData.push(newPatient);
  return newPatient;
};
export default {
  getPatients,
  getPatient,
  addPatient
};