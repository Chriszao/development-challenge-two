import api from './api';

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

  const response = await api.post('/patient', data);
  try {
    if (response.status === 200) {
      alert('Usuário cadastrado!');
    }
  } catch (error) {
    alert('Erro ao cadastrar');
    console.log(error);
  }
}

export { createPatient };
