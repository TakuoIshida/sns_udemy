import React from 'react';
// import React, { userReducer } from 'react';
// import { withCookies } from 'react-cookie';
// import axios from "axios";
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    span: {
    　display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'teal',
    },
    spanError: {
    　display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'fuchsia',
      marginTop: 10,
    }
  }));

const Login = () => {
    const classes = useStyles()
    return (
        <div className={classes.avatar}>
            here is navbar
        </div>
    )
}

export default Login
