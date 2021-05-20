import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import { UseForm, Form } from '../../components/UseForm/UseForm';

import { Controls } from '../../components/controls/Controls';

import { getAppointmentCollection } from '../../utils/PatientService';

const genderItems = [
  { id: 'male', title: 'Masculino' },
  { id: 'female', title: 'Feminino' },
  { id: 'other', title: 'Outro' },
];

const initialFieldValues = {
  patientId: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  appointmentId: '',
  appointmentDate: new Date(),
  isOnline: false,
};

export default function PatientsForm(props) {
  const { addOrEdit, dataForEdit } = props;

  PatientsForm.propTypes = {
    addOrEdit: PropTypes.func.isRequired,
    dataForEdit: PropTypes.func.isRequired,
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('fullName' in fieldValues) {
      temp.fullName = fieldValues.fullName
        ? ''
        : 'O preenchimento deste campo é obrigatório.';
    }

    if ('email' in fieldValues) {
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'O Email não é valido';
    }

    if ('mobile' in fieldValues) {
      temp.mobile =
        fieldValues.mobile.length > 9
          ? ''
          : 'O campo deve ser preenchido com no mínimo 10 números. Ex: xxxxxxxxx';
    }

    if ('appointmentId' in fieldValues) {
      temp.appointmentId =
        fieldValues.appointmentId.length !== 0
          ? ''
          : 'O preenchimento deste campo é obrigatório.';
    }

    if ('city' in fieldValues) {
      temp.city = fieldValues.city
        ? ''
        : 'O preenchimento deste campo é obrigatório.';
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every(x => x === '');
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    UseForm(initialFieldValues, true, validate);

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (dataForEdit != null) {
      setValues({
        ...dataForEdit,
      });
    }
  }, [dataForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Nome Completo"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="mobile"
            label="Telefone"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name="city"
            label="Cidade"
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
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
            options={getAppointmentCollection()}
            error={errors.appointmentId}
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
            <Controls.Button
              onClick={resetForm}
              color="secondary"
              text="Limpar"
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
