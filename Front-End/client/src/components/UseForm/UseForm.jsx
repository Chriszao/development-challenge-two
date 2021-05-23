import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useStyles from './UseFormStyle';

export function UseForm(
  initialFieldValues,
  validateOnChange = false,
  validate,
) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export function Form(props) {
  const classes = useStyles();
  const { children, ...rest } = props;

  Form.propTypes = { children: PropTypes.element.isRequired };

  return (
    <form className={classes.root} {...rest}>
      {children}
    </form>
  );
}
