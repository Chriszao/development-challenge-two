import React from 'react';

import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckBox,
} from '@material-ui/core';

export default function CheckBox(props) {
  const { name, label, value, onChange } = props;

  const convertToDefaultEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckBox
            name={name}
            color="primary"
            checked={value}
            onChange={e =>
              onChange(convertToDefaultEventParam(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
