import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHelperText, Input } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphQl/graphQL';
import { useStyles } from '../styles/useStyles';
import { calculateDisabling } from './features/functions';

export const SignUp = () => {
  // eslint-disable-next-line no-control-regex
  const emailPatternRFC5322 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMailValid, setIsMailValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isNameError, setIsNameError] = useState(false);
  const [isMailError, setIsMailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const history = useHistory('/chatRoom');

  const [addUser, { error }] = useMutation(ADD_USER, {
    onCompleted: ({ registration: { token: payload } }) => {
      localStorage.setItem('newUser', payload.token);
      setName('');
      setEmail('');
      setPassword('');
      setOpen(false);
      history.push('/chatRoom');
    },
    onError: () => (undefined),
  });

  const [graphError, setGraphError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (error) {
      setGraphError(error.message);
    }
  }, [error]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailValidation = (mailData) => (emailPatternRFC5322.test(mailData) && mailData.length > 1);

  const passwordValidation = (length) => (length >= 8);

  const nameValidation = (userName) => (userName.length > 0);

  const handleEmailChanges = ({ target }) => {
    const isValid = emailValidation(target.value);
    setIsMailValid(isValid);
    setEmail(target.value);
    setIsMailError(!isValid);
    setIsButtonDisabled(calculateDisabling(isNameValid, isValid, isPasswordValid));
  };

  const handleNameChanges = ({ target }) => {
    const isValid = nameValidation(target.value);
    setIsNameValid(isValid);
    setName(target.value);
    setIsNameError(!isValid);
    setIsButtonDisabled(calculateDisabling(isValid, isMailValid, isPasswordValid));
  };

  const handlePasswordChanges = async ({ target }) => {
    const isValid = passwordValidation(target.value.length);
    setIsPasswordValid(isValid);
    setPassword(target.value);
    setIsPasswordError(!isValid);
    setIsButtonDisabled(calculateDisabling(isNameValid, isMailValid, isValid));
  };

  const handleLogin = () => {
    addUser({
      variables: {
        user: {
          login: name,
          email,
          password,
        },
      },
    });
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        SignUp
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To signUp to this chat, please enter your Nick,Email address, password here.
          </DialogContentText>
          {graphError && (
          <DialogContentText color="error">
            {graphError}
          </DialogContentText>
          )}
          <Input
            autoFocus
            placeholder="Enter Name"
            error={isNameError}
            value={name}
            onChange={handleNameChanges}
            type="text"
            className={classes.input}
          />
          {isNameError
          // eslint-disable-next-line react/no-children-prop
          && <FormHelperText error children="Enter Name " />}
          <Input
            autoComplete
            placeholder="Enter E-mail"
            error={isMailError}
            value={email}
            onChange={handleEmailChanges}
            type="email"
            className={classes.input}

          />
          {isMailError
          // eslint-disable-next-line react/no-children-prop
          && <FormHelperText error children="Enter valid email" />}
          <TextField
            error={isPasswordError}
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChanges}
            helperText={isPasswordError ? 'You can use digits and characters min 8' : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary" disabled={isButtonDisabled}>
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
