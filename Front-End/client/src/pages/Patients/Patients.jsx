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
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

import PageHeader from '../../components/PageHeader/PageHeader';
import useTable from '../../components/useTable/useTable';
import PopUp from '../../components/PopUp/PopUp';
import Notification from '../../components/Notification/Notification';

import PatientsForm from './PatientsForm';

import useStyles from './PatientStyle';
import { useFetch } from '../../hooks/useFetch';
import { Controls } from '../../components/controls/Controls';
import { createPatient } from '../../utils/CreatePatient';
import { getAppointmentCollection } from '../../utils/PatientService';
import { updatePatient } from '../../utils/UpdatePatient';
import { deletePatient } from '../../utils/DeletePatient';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';

const headCells = [
  { id: 'fullName', label: 'Nome do paciente' },
  { id: 'email', label: 'Email' },
  { id: 'mobile', label: 'Celular' },
  { id: 'appointmentId', label: 'Consulta agendada', disableSorting: true },
  { id: 'actions', label: 'Ações', disableSorting: true },
];

export default function Patients() {
  const classes = useStyles();

  const [dataForEdit, setDataForEdit] = useState(null);

  const { data } = useFetch(
    'https://vu11j8c4kh.execute-api.sa-east-1.amazonaws.com/dev/patients',
  );

  const [filterFunction, setFilterFunction] = useState({
    function: items => {
      return items;
    },
  });

  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
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

  function parseData(data) {
    const appointments = getAppointmentCollection();

    const { appointmentId } = data;
    const foundedAppointment = appointments.find(
      item => item.title === appointmentId,
    );

    return {
      ...data,
      appointmentId: foundedAppointment.id,
    };
  }

  const addOrEdit = (patient, resetForm) => {
    if (!patient.id) {
      createPatient(patient);
      setNotify({
        isOpen: true,
        message: 'Cadastrado com sucesso!',
        type: 'success',
      });
    } else {
      updatePatient(patient);
      setNotify({
        isOpen: true,
        message: 'Atualizado com sucesso!',
        type: 'success',
      });
    }
    resetForm();
    setDataForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = item => {
    setDataForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deletePatient(id);
    setNotify({
      isOpen: true,
      message: 'Registro excluído com sucesso!',
      type: 'error',
    });
  };

  return (
    <>
      <PageHeader
        title="Cadastro de pacientes"
        subTitle="Desafio MedCloud"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
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
          <Controls.Button
            text="Adicionar novo"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setDataForEdit(null);
            }}
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
                <TableCell>
                  <Controls.ActionButton color="primary">
                    <EditOutlinedIcon
                      fontSize="small"
                      onClick={() => {
                        const parsedItem = parseData(item);
                        openInPopup(parsedItem);
                      }}
                    />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Tem certeza que deseja excluir o registro ?',
                        subTitle: 'Não será possível refazer esta operação.',
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <TablePagination />
      </Paper>
      <PopUp
        title="Formulário de cadastro de pacientes"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PatientsForm dataForEdit={dataForEdit} addOrEdit={addOrEdit} />
      </PopUp>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
