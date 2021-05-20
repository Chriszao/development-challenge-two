import React from 'react';

import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';

import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import useStyles from './ConfirmDialogStyle';

import { Controls } from '../controls/Controls';

export default function ConfirmDialog(props) {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;

  ConfirmDialog.propTypes = {
    confirmDialog: PropTypes.bool.isRequired,
    setConfirmDialog: PropTypes.func.isRequired,
  };

  return (
    <Dialog classes={{ paper: classes.dialog }} open={confirmDialog.isOpen}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disabledRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="secondary"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
