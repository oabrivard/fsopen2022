import patientData from '../../data/patients.json';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import {v4 as uuidv4} from 'uuid';
import toNewPatient from "../utils";

const getPatients = (): NonSensitivePatient[] => {
  //return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
  return patientData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
  });
};

const getPatient = (id: string): NonSensitivePatient => {
  const fields = patientData.find(p => p.id===id);
  if (!fields) {
    throw new Error('Incorrect patient ID ' + id);
  }

  const object = toNewPatient(fields) as Patient;
  object.id = id;
  return object;
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