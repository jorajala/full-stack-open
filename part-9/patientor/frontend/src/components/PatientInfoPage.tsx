import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Diagnosis, Patient } from "../types";
import { useParams } from "react-router-dom";

const PatientInfoPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient>();

  const id = useParams().id;

  if (id === undefined) {
    return <div>invalid id</div>;
  }

  useEffect(() => {
    const fetchPatientList = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    fetchPatientList();
  }, []);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>
        ssn: {patient?.ssn} <br /> gender: {patient?.gender} <br />
        occupation: {patient?.occupation}
      </p>
      <h3>entries</h3>
      {patient?.entries.map((entry) => {
        return (
          <div>
            <p>
              {entry.date} <em>{entry.description}</em>
            </p>
            <ul>
              {entry.diagnosisCodes?.map((diagnosisCode, index) => {
                const tunk = diagnoses.find(
                  (diagnosis) => diagnosis.code === diagnosisCode
                );
                const name = tunk?.name;

                return (
                  <li key={index}>
                    {diagnosisCode} {name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;
