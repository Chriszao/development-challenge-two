import React, { useState } from 'react';

import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@material-ui/core';

import { Search } from '@material-ui/icons';

import PageHeader from '../../components/PageHeader/PageHeader';
import useTable from '../../components/useTable/useTable';

import PatientsForm from './PatientsForm';

import useStyles from './PatientStyle';
import { useFetch } from '../../hooks/useFetch';
import { Controls } from '../../components/controls/Controls';

const headCells = [
  { id: 'fullName', label: 'Nome do paciente' },
  { id: 'email', label: 'Email' },
  { id: 'mobile', label: 'Celular' },
  { id: 'appointmentId', label: 'Consulta agendada', disableSorting: true },
];

export default function Patients() {
  const classes = useStyles();
  const { data } = useFetch(
    'https://vu11j8c4kh.execute-api.sa-east-1.amazonaws.com/dev/patients',
  );
  const [filterFunction, setFilterFunction] = useState({
    function: items => {
      return items;
    },
  });

  const {
    TableContainer,
    TableHead,
    TablePagination,
    recordsAfterPagingAndSorting,
  } = useTable(data, headCells, filterFunction);

  if (!data) {
    return <p>Carregando</p>;
  }

  const handleSearch = e => {
    const { target } = e;
    setFilterFunction({
      function: items => {
        if (!target.value) {
          return items;
        }

        return items.filter(x =>
          x.fullName.toLowerCase().includes(target.value),
        );
      },
    });
  };

  return (
    <>
      <PageHeader
        title="New Patient"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <PatientsForm /> */}
        <Toolbar>
          <Controls.Input
            label="Pesquisar pacientes"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TableContainer>
          <TableHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.appointmentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <TablePagination />
      </Paper>
    </>
  );
}
