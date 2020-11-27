import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHelperText, Input } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import { USER_LOGIN } from '../graphQl/graphQL';

export const SignIn = () => {
  // eslint-disable-next-line no-control-regex
  const emailPatternRFC5322 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMailValid, setIsMailValid] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const history = useHistory('/chatRoom');
  const client = useApolloClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailValidation = () => {
    if (emailPatternRFC5322.test(email) && email.length > 1) {
      setIsMailValid(true);
      return;
    }

    setIsMailValid(false);
  };

  const handleEmailChanges = (event) => {
    setEmail(event.target.value);
    emailValidation();
    setIsButtonDisabled(!isMailValid);
  };

  const handleLogin = () => {
    client.query({
      query: USER_LOGIN,
      variables: {
        email,
        password,
      },
    }).then(({ data: { signIn: { user, token } } }) => {
      console.log('>>>>>>>', user);
      localStorage.setItem('userName', user.login);
      localStorage.setItem('token', token);
      setOpen(false);
      history.push('/chatRoom');
    });
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to this chat, please enter your email address here.
          </DialogContentText>
          <Input
            autoComplete="true"
            autoFocus
            placeholder="Enter email"
            error={!isMailValid}
            value={email}
            onChange={handleEmailChanges}
            type="email"

          />
          {!isMailValid
          // eslint-disable-next-line react/no-children-prop
          && <FormHelperText error children="Enter valid email" />}
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => (setPassword(event.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary" disabled={isButtonDisabled}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
