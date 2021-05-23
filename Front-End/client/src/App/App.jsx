import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import SideMenu from '../components/SideMenu/SideMenu';
import useStyles from './AppStyle';
import Header from '../components/Header/Header';
import Patients from '../pages/Patients/Patients';
import '../styles/global.css';
import theme from './AppTheme';

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />

        <Patients />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
