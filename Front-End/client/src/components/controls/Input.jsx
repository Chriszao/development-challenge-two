import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function Input(props) {
  const { name, label, error = null, onChange, value, ...rest } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.object).isRequired,
};
