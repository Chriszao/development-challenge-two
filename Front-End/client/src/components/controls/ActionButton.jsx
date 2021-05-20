import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

export default function ActionButton(props) {
  const { color, children, onClick } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      minWidth: 0,
      margin: theme.spacing(0.5),
    },
    secondary: {
      backgroundColor: theme.palette.secondary.light,
      '& .MuiButton-label': {
        color: theme.palette.secondary.main,
      },
    },
    primary: {
      backgroundColor: theme.palette.primary.light,
      '& .MuiButton-label': {
        color: theme.palette.primary.main,
      },
    },
  }));

  const classes = useStyles();

  ActionButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}
