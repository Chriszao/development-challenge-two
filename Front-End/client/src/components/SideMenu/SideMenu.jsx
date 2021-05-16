import React from 'react';
import useStyle from './SideMenu';

const SideMenu = () => {
  const classes = useStyle();
  return <div className={classes.sideMenu} />;
};

export default SideMenu;
