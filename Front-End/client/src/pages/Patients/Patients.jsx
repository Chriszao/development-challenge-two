import React from 'react';

import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

import { Paper } from '@material-ui/core';
import PageHeader from '../../components/PageHeader/PageHeader';
import PatientsForm from './PatientsForm';
import useStyles from './PatientStyle';

export default function Patients() {
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="New Patient"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <PatientsForm />
      </Paper>
    </>
  );
}
