import { useState } from 'react';
import PropTypes from 'prop-types';

import useStyles from './UseFormStyle';

export function UseForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
  };
}

export function Form({ children }) {
  const classes = useStyles();

  return <form className={classes.root}>{children}</form>;
}

Form.propTypes = { children: PropTypes.node.isRequired };
