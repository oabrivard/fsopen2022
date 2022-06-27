import patientData from '../../data/patients.json';
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types';
import {v4 as uuidv4} from 'uuid';
import toNewPatientEntry from "../utils";

const getEntries = (): NonSensitivePatientEntry[] => {
  //return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
  return patientData.map(obj => {
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
  });
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const id = uuidv4();

  const newPatientEntry = {
    id,
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};
export default {
  getEntries,
  addPatient
};