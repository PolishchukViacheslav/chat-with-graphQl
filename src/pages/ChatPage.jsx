/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useLazyQuery, useMutation, useQuery, useSubscription } from '@apollo/client';
import { AppMenu } from '../components/AppMenu';
import { UserIcon } from '../components/UserIcon';
import { ADD_MESSAGE, GET_CORRESPONDENCE, MESSAGES_SUBSCRIPTION } from '../graphQl/graphQL';
import { ScrollTop } from '../components/ScrollTop';
import { ChatInput } from '../components/ChatInput';

export const ChatPage = (props) => {
  const viewToScroll = useRef();
  // const classes = useStyles();
  const userName = localStorage.getItem('userName') || 'User';
  const [messages, setMessages] = useState([]);
  const [timeUTC] = useState(new Date().toISOString().slice(0, -5).concat('Z'));
  const { loading, error, data } = useQuery(GET_CORRESPONDENCE);
  const [getMessages, { data: { getAllMessages } }] = useLazyQuery(GET_CORRESPONDENCE,
  {
    fetchPolicy: 'network-only',
    onCompleted: ({ getAllMessages }) => {
      setMessages(getAllMessages);
    },
  }
  );

  const scrollToButton = () => {
    viewToScroll.current.lastChild.scrollIntoView();
  };

  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION,
    {
      variables: { date: timeUTC },
      onSubscriptionData: ({ subscriptionData: { data: messageAdded } }) => {
        setMessages(
          (oldMessages) => {
            const { messageAdded: newMessage } = messageAdded;
            return [...oldMessages, ...newMessage];
          },
        );
      },
    });
  console.log('>>>>>>>>>>>>', data, loading, error);

  const [addMessage] = useMutation(ADD_MESSAGE);

  useEffect(() => {
    console.log('>>>>>>>>>>>>', data);

    // setMessages(getAllMessages);
  }, []);

  useLayoutEffect(() => {
    if (viewToScroll.current.lastChild !== null) {
      scrollToButton({ behavior: 'smooth', block: 'center' });
    }
  }, [messages]);

  return (
    <>
      <Box paddingBottom="50px">
        <AppMenu greeting={`Hello, ${userName}`}>
          <UserIcon />
        </AppMenu>
        <Toolbar id="back-to-top-anchor" />
        <List ref={viewToScroll}>
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
