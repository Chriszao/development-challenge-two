import React from 'react';

import { Grid } from '@material-ui/core';

import { UseForm, Form } from '../../components/UseForm/UseForm';

import Controls from '../../components/controls/Controls';

import * as PatientsService from '../../Services/PatientService';

const genderItems = [
  { id: 'male', title: 'Masculino' },
  { id: 'female', title: 'Feminino' },
  { id: 'other', title: 'Outro' },
];

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
  const { values, handleInputChange } = UseForm(initialFieldValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Nome Completo"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="mobile"
            label="Telefone"
            value={values.mobile}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="city"
            label="Cidade"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gênero"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="appointmentId"
            label="Especialidade"
            value={values.appointmentId}
            onChange={handleInputChange}
            options={PatientsService.getAppointmentCollection()}
          />
          <Controls.DatePicker
            name="appointmentDate"
            label="Data da consulta"
            value={values.appointmentDate}
            onChange={handleInputChange}
          />
          <Controls.CheckBox
            name="isOnline"
            label="Deseja realizar a consulta online ?"
            value={values.isOnline}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type="submit" text="Cadastrar" />
            <Controls.Button color="secondary" text="Limpar" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
