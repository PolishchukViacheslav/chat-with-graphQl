import React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../styles/useStyles';

export const AppMenu = ({ children, greeting }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {greeting}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};
