import api from '../Services/api';

async function createPatient(values) {
  const data = {
    fullName: values.fullName,
    email: values.email,
    mobile: values.mobile,
    city: values.city,
    gender: values.gender,
    appointmentId: values.appointmentId,
    appointmentDate: values.appointmentDate,
    isOnline: values.isOnline,
  };

  await api.post('/patient', data);
}

export { createPatient };
