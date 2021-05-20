import api from '../Services/api';

async function deletePatient(id) {
  await api.delete(`/patient/${id}`);
}

export { deletePatient };
