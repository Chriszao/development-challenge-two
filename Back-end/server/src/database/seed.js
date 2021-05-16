const axios = require('axios');
const { addOrUpdatePatient } = require('./dynamo');

const seedData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';

  try {
    const { data: patients } = await axios.get(url);
    console.log(typeof patients);

    const patientPromises = patients.map((patient, i) =>
      addOrUpdatePatient({ ...patient, id: i })
    );
    await Promise.all(patientPromises);
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

seedData();
