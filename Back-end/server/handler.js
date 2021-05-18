const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const patientsTable = process.env.PATIENTS_TABLE;

// Create response function
function response(statusCode, message) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(message),
  };
}

// Create a function that sort patients by Date
function sortByDate(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 1;
}

// Create a patient
module.exports.createPatient = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  if (
    !requestBody.fullName ||
    requestBody.fullName.trim() === '' ||
    !requestBody.email ||
    requestBody.email.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'Patient must have a name and email and they must not be empty.',
      })
    );
  }

  const patient = {
    id: uuidv4(),
    patientId: 1,
    fullName: requestBody.fullName,
    email: requestBody.email,
    mobile: requestBody.mobile,
    city: requestBody.city,
    gender: requestBody.gender,
    appointmentId: requestBody.appointmentId,
    appointmentDate: requestBody.appointmentDate,
    isOnline: requestBody.isOnline,
    createdAt: new Date().toISOString(),
  };

  return db
    .put({
      TableName: patientsTable,
      Item: patient,
    })
    .promise()
    .then(() => {
      callback(null, response(201, patient));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};

// Get all Patients
module.exports.getAllPatients = (event, context, callback) =>
  db
    .scan({
      TableName: patientsTable,
    })
    .promise()
    .then((result) => {
      callback(null, response(200, result.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));

// Get a number of Patients
module.exports.getPatients = (event, context, callback) => {
  const numberOfPatients = event.pathParameters.number;
  const params = {
    TableName: patientsTable,
    Limit: numberOfPatients,
  };
  return db
    .scan(params)
    .promise()
    .then((result) => {
      callback(null, response(200, result.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get a single Patient
module.exports.getPatient = (event, context, callback) => {
  const { id } = event.pathParameters;

  const params = {
    Key: {
      id,
    },
    TableName: patientsTable,
  };

  return db
    .get(params)
    .promise()
    .then((result) => {
      if (result.Item) {
        callback(null, response(200, result.Item));
      } else {
        callback(null, response(404, { error: 'Patient not found' }));
      }
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Update a patient data
module.exports.updatePatient = (event, context, callback) => {
  const { id } = event.pathParameters;
  const requestBody = JSON.parse(event.body);
  const {
    fullName,
    email,
    mobile,
    city,
    gender,
    appointmentId,
    appointmentDate,
    isOnline,
  } = requestBody;

  const param = {
    Key: {
      id,
    },
    TableName: patientsTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression:
      'SET fullName = :fullName, email = :email, mobile = :mobile, city = :city, gender = :gender, appointmentId = :appointmentId, appointmentDate = :appointmentDate, isOnline = :isOnline',
    ExpressionAttributeValues: {
      ':fullName': fullName,
      ':email': email,
      ':mobile': mobile,
      ':city': city,
      ':gender': gender,
      ':appointmentId': appointmentId,
      ':appointmentDate': appointmentDate,
      ':isOnline': isOnline,
    },
    ReturnValues: 'ALL_NEW',
  };
  console.log('Updating...');

  return db
    .update(param)
    .promise()
    .then((result) => {
      callback(null, response(200, result.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Delete a Patient
module.exports.deletePatient = (event, context, callback) => {
  const { id } = event.pathParameters;
  const params = {
    Key: {
      id,
    },
    TableName: patientsTable,
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Patient deleted successfully' }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
