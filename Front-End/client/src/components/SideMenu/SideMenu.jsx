import React from 'react';
import useStyles from './SideMenuStyle';

const SideMenu = () => {
  const classes = useStyles();
  return <div className={classes.sideMenu} />;
};

export default SideMenu;
