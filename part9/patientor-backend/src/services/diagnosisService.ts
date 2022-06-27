import diagnosisData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const getEntries = (): DiagnosisEntry[] => {
  return diagnosisData;
};

export default {
  getEntries
};