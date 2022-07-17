import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating, EntryType } from "../types";
import { useStateValue, setLastPatient } from "../state";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { assertNever } from '../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ lastPatient, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (!id || !lastPatient) return;

      console.log("Submitting new value");
      console.log(values);

      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      lastPatient.entries.push(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };  

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (!id) {
          throw new Error('Missing id');
        }

        if (lastPatient?.id === id) {
          console.log(`fetched patient ${id} from cache`);
          return;
        }

        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setLastPatient(patientFromApi));
        console.log(`fetched patient ${id} from server`);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const entryStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  };

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        assertNever(gender);
    }
  };

  const DiagnosisCodes = ({ codes }: { codes: string[] | undefined }) => codes ? <ul>
    {codes.map(c => <li key={c}>{c} - {diagnoses[c].name}</li>)}
  </ul> : null;

  const Hospital = ({ entry }: { entry: HospitalEntry }) => <div>discharge : {entry.discharge.criteria} ({entry.discharge.date})</div>;

  const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => <div>
    <div>employed by {entry.employerName}</div>
    {entry.sickLeave ? <div>{`on leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}</div> : null}
  </div>;

  const getHealthCheckRating = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return "Healthy";
      case HealthCheckRating.LowRisk:
        return "LowRisk";
      case HealthCheckRating.HighRisk:
        return "HighRisk";
      case HealthCheckRating.CriticalRisk:
        return "CriticalRisk";
      default:
        assertNever(healthCheckRating);
    }
  };

  const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => <div>{getHealthCheckRating(entry.healthCheckRating)}</div>;

  const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case EntryType.HealthCheck:
        return <HealthCheck entry={entry} />;
      case EntryType.Hospital:
        return <Hospital entry={entry} />;
      case EntryType.OccupationalHealthcare:
        return <OccupationalHealthcare entry={entry} />;
      default:
        assertNever(entry);
    }
  };

  const Entries = ({ entries }: { entries: Entry[] }) => <div>
    <h3>entries</h3>
    {entries.map(e => <div key={e.id} style={entryStyle}>
      <p>{e.date} - {e.description}</p>
      <EntryDetails entry={e} />
      <DiagnosisCodes codes={e.diagnosisCodes} />
      diagnosed by {e.specialist}
    </div>)}
  </div>;

  if (!lastPatient) return null;

  return (
    <div>
      <h2>{lastPatient.name} {genderIcon(lastPatient.gender)}</h2>
      <div>ssn: {lastPatient.ssn}</div>
      <div>occupation: {lastPatient.occupation}</div>
      {lastPatient.entries && lastPatient.entries.length > 0 ? <Entries entries={lastPatient.entries} /> : null}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;