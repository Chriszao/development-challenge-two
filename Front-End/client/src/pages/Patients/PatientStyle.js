import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
}));

export default useStyles;
