import React from 'react';

import PropTypes from 'prop-types';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefaultEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd/MM/yyy"
        name={name}
        value={value}
        onChange={date => onChange(convertToDefaultEventParam(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.objectOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
