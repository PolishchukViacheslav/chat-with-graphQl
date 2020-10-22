import React from 'react';
import {
  AppBar, Button, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../styles/useStyles';

export const AppMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  const loginHandler = () => {
    console.log('tyt');
    history.push('/chatRoom');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Welcome
        </Typography>
        <Button color="inherit" onClick={loginHandler}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};
