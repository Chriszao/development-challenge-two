import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  TablePagination as MuiTablePagination,
  TableSortLabel,
} from '@material-ui/core';

import { useStyles } from './useTableStyle';
import { getAppointmentCollection } from '../../utils/PatientService';

function parseData(data) {
  const appointments = getAppointmentCollection();

  return data.map(item => ({
    ...item,
    appointmentId: appointments[item.appointmentId - 1].title,
  }));
}

export default function useTable(records, headCells, filterFunction) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TableContainer = ({ children }) => (
    <Table className={classes.table}>{children}</Table>
  );

  const TableHead = () => {
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };

    return (
      <MuiTableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </MuiTableHead>
    );
  };

  TableContainer.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((element, index) => [element, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(element => element[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    const parsedData = parseData(records);

    return stableSort(
      filterFunction.function(parsedData),
      getComparator(order, orderBy),
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const TablePagination = () => (
    <MuiTablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  return {
    TableContainer,
    TableHead,
    TablePagination,
    recordsAfterPagingAndSorting,
  };
}
