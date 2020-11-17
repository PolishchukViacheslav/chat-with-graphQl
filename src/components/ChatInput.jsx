import { Box, Input } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from '../styles/useStyles';

export const ChatInput = ({ sendMassage }) => {
  const [message, setMessage] = useState('');
  const classes = useStyles();
  const handleSendMessage = ({ keyCode }) => {
    if (keyCode === 13 && message !== '') {
      sendMassage({ variables: { description: message } });
      setMessage('');
    }
  };

  return (
    <Box className={classes.chatInputWrapper}>
      <Input
        autoComplete="true"
        placeholder="Start typing your message here"
        // error={isMailError}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyUp={handleSendMessage}
        type="text"
        className={classes.chatInput}
      />
    </Box>
  );
};
