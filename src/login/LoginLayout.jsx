import React from 'react';
import { useMediaQuery, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import LogoImage from './LogoImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.main,
    width: '50%',
    overflow: 'hidden', 
    [theme.breakpoints.down('lg')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '0px',
    },
  },
  sidebarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  paper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 0, 0, 0),
    },
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '100%',
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        {!isLgScreen && (
          <img src="/main.png" alt="Sidebar Image" className={classes.sidebarImage} />
        )}
      </div>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          {children}
        </form>
      </Paper>
    </main>
  );
};

export default LoginLayout;
