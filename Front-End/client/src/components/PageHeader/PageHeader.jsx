import React from 'react';
import PropTypes from 'prop-types';

import { Card, Paper, Typography } from '@material-ui/core';

import useStyles from './PageHeaderStyle';

export default function PageHeader(props) {
  const { title, subTitle, icon } = props;
  const classes = useStyles();

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div>
          <Typography
            variant="h6"
            component="div"
            className={classes.pageTitle}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            className={classes.pageTitle}
          >
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
