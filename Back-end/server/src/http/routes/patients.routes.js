const { Router } = require('express');
const {
  getPatients,
  getPatientsById,
  addOrUpdatePatient,
  deletePatient,
} = require('../../database/dynamo');

const patientsRouter = Router();

// patientsRouter.get('/', (request, response) => {
//   response.send('Hello World');
// });

patientsRouter.get('/patients', async (request, response) => {
  try {
    const patient = await getPatients();
    response.json(patient);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      err: 'Something went wrong on server',
    });
  }
});

patientsRouter.get('/patients/:id', async (request, response) => {
  const { id } = request.params;
  const parsedId = Number(id);
  try {
    const patient = await getPatientsById(parsedId);
    response.json(patient);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      err: 'Something went wrong on server',
    });
  }
});

patientsRouter.post('/patients', async (request, response) => {
  const patient = request.body;
  try {
    await addOrUpdatePatient(patient);

    return response.json(patient);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      err: 'Something went wrong on server',
    });
  }
});

patientsRouter.put('/patients/:id', async (request, response) => {
  const patient = request.body;

  const { id } = request.params;

  const parsedId = Number(id);

  patient.id = parsedId;
  try {
    const updatedPatient = await addOrUpdatePatient(patient);
    console.log(updatedPatient);
    return response.json(updatedPatient);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      err: 'Something went wrong on server',
    });
  }
});

patientsRouter.delete('/patients/:id', async (request, response) => {
  const { id } = request.params;
  const parsedId = Number(id);
  try {
    const patient = await deletePatient(parsedId);
    response.json(patient);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      err: 'Something went wrong on server',
    });
  }
});

module.exports = patientsRouter;
