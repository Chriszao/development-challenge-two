const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'patients-crud';

const addOrUpdatePatient = async (patient) => {
  const params = {
    TableName: TABLE_NAME,
    Item: patient,
  };

  const patients = await dynamoClient.put(params).promise();
  return patients;
};

const getPatients = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const patients = await dynamoClient.scan(params).promise();
  return patients;
};

const getPatientsById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  const patients = await dynamoClient.get(params).promise();
  return patients;
};

const deletePatient = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  const patients = await dynamoClient.delete(params).promise();

  return patients;
};

module.exports = {
  dynamoClient,
  getPatients,
  getPatientsById,
  addOrUpdatePatient,
  deletePatient,
};
