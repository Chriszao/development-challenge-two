import React from 'react';

import PropTypes from 'prop-types';

import { Button as MuiButton, makeStyles } from '@material-ui/core';

export default function Button(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(0.5),
    },
    label: {
      textTransform: 'none',
    },
  }));

  const { text, size, color, variant, onClick, ...rest } = props;
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...rest}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  rest: PropTypes.objectOf(PropTypes.object).isRequired,
};
