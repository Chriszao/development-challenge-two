const express = require('express');
const patientsRouter = require('./http/routes/patients.routes');

const app = express();

app.use(express.json());
app.use(patientsRouter);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server's running on port ${port}`));
