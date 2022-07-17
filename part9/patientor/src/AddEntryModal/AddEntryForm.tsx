import { useStateValue } from "../state";
import { Grid, Button, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, HealthCheckRatingOption, DiagnosisSelection } from "../components/FormField";
import { HealthCheckRating, EntryType, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../types";
import { assertNever } from '../types';
import React from "react";

//type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type ET = {
  type: EntryType
};
export type EntryFormValues = ET & Omit<HospitalEntry,"type" | "id"> & Omit<HealthCheckEntry, "type" | "id"> & Omit<OccupationalHealthcareEntry, "type" | "id">; // UnionOmit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        discharge: {
          date:"",
          criteria:""
        },
        healthCheckRating: HealthCheckRating.Healthy,
        employerName:"",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        const getEntryFields = (type: EntryType) => {
          switch(type) {
            case EntryType.HealthCheck:
              return <SelectField label="Health check rating" name="healthCheckRating" options={healthCheckRatingOptions} />;
            case EntryType.Hospital:
              return <div>
                <Field
                  label="Date of discharge"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>;
            case EntryType.OccupationalHealthcare:
              return <div>
                <Field
                  label="Employer name"
                  placeholder="Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </div>;
            default:
              assertNever(type);
            }
        };

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <RadioGroup row name="type" defaultValue={EntryType.HealthCheck} value={values.type} onChange={(event) => setFieldValue("type", event.currentTarget.value)}>
              <FormControlLabel value={EntryType.HealthCheck} control={<Radio />} label="Health check" />
              <FormControlLabel value={EntryType.Hospital} control={<Radio />} label="Hospital" />
              <FormControlLabel value={EntryType.OccupationalHealthcare} control={<Radio />} label="Occupational Healthcare" />
            </RadioGroup>
            <div>{getEntryFields(values.type)}</div>
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

