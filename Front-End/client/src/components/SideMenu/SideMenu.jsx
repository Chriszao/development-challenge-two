import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

// withStyles & makeStyles

const style = {
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#253053',
  },
  sideMenuSideMenu2: {
    maxWidth: '700px',
  },
};

const SideMenu = props => {
  const { classes } = props;

  SideMenu.propTypes = {
    classes: PropTypes.objectOf(PropTypes.object).isRequired,
  };

  return <div className={classes.sideMenu} />;
};

export default withStyles(style)(SideMenu);
