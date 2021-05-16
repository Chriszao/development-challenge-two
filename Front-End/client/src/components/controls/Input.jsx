import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function Input(props) {
  const { name, label, onChange, value } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
