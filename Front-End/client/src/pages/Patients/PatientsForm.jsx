import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { UseForm, Form } from '../../components/UseForm/UseForm';

const initialFieldValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  appointmentId: '',
  appointmentDate: new Date(),
  isOnline: false,
};

export default function PatientsForm() {
  const { values, setValues, handleInputChange } = UseForm(initialFieldValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Nome Completo"
            name="fullName"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            value={values.email}
          />
          {/* <TextField
            variant="outlined"
            label="Celular"
            name="mobile"
            value={values.mobile}
          /> */}
        </Grid>
        <Grid item xs={6}>
          <Form>
            <FormLabel>Gênero</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Masculino"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Feminino"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Outro"
              />
            </RadioGroup>
          </Form>
        </Grid>
      </Grid>
    </Form>
  );
}
