import api from '../Services/api';

async function updatePatient(values) {
  await api.put(`/patient/${values.id}`, values);
}

export { updatePatient };
