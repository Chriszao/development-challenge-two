import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import useStyles from './PopUpStyle';
import { Controls } from '../controls/Controls';

export default function PopUp(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  PopUp.propTypes = {
    title: PropTypes.string.isRequired,
    openPopup: PropTypes.bool.isRequired,
    setOpenPopup: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children} </DialogContent>
    </Dialog>
  );
}
