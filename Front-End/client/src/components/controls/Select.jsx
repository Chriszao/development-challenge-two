import React from 'react';

import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">Escolha</MenuItem>

        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.objectOf(PropTypes.object).isRequired,
};
