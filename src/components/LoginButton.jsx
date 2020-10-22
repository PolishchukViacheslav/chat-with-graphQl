import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const LoginButton = () => {
  const history = useHistory();
  const loginHandler = () => {
    history.push('/chatRoom');
  };

  return (
    <Button color="inherit" onClick={loginHandler}>Login</Button>
  );
};
