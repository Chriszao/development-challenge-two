import React from 'react';

import ProTypes from 'prop-types';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useStyles from './NotificationStyle';

export default function Notification(props) {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  Notification.propTypes = {
    notify: ProTypes.string.isRequired,
    setNotify: ProTypes.func.isRequired,
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
