import {
  Box,
  Fab,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { AppMenu } from '../components/AppMenu';
import { UserIcon } from '../components/UserIcon';
import { ADD_MESSAGE, GET_CORRESPONDENCE, MESSAGES_SUBSCRIPTION } from '../graphQl/graphQL';
import { ScrollTop } from '../components/ScrollTop';
import { useStyles } from '../styles/useStyles';
import { ChatInput } from '../components/ChatInput';

export const ChatPage = (props) => {
  const classes = useStyles();
  const userName = localStorage.getItem('userName') || 'User';
  const [messages, setMessages] = useState([]);
  const [getMessages] = useLazyQuery(GET_CORRESPONDENCE,
    {
      fetchPolicy: 'network-only',
      onCompleted: ({ getAllMessages }) => {
        setMessages(getAllMessages);
      },
    });
  const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION,
    {
      onSubscriptionData: ({ subscriptionData: { data: newData } }) => {
        setMessages(
          (oldMessages) => {
            const newMessage = newData.messageAdded;
            return [...oldMessages, newMessage];
          },
        );
      },
    });

  const [addMessage] = useMutation(ADD_MESSAGE);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    console.log('new Message', data, loading);
  }, [data, loading]);

  return (
    <>
      <Box paddingBottom="50px">
        <AppMenu greeting={`Hello, ${userName}`}>
          <UserIcon />
        </AppMenu>
        <Toolbar id="back-to-top-anchor" />
        <List>
          {messages
            .map(
              ({ id, description }) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={id}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${description} id: ${id}`} />
                </ListItem>
              ),
            )}
        </List>
        {/* </Box> */}
      </Box>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <ChatInput sendMassage={addMessage} />
    </>
  );
};
