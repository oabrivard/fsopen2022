import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient, toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    res.send(patientService.getPatient(id));
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const id = req.params.id;
    const addedEntry = patientService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;