import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  useScrollTrigger,
  Zoom,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import { loremIpsum } from 'lorem-ipsum';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AppMenu } from '../components/AppMenu';
import { UserIcon } from '../components/UserIcon';
import { ADD_MESSAGE, GET_CORRESPONDENCE } from '../graphQl/graphQL';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export const ChatPage = (props) => {
  const [messages, setMessages] = useState('');
  const [getMessages, { loading, data }] = useLazyQuery(GET_CORRESPONDENCE, { fetchPolicy: 'network-only', onCompleted: (data) => {console.log('after fetch', data);} });

  const [addMessage] = useMutation(ADD_MESSAGE, {
    onCompleted: () => {
      console.log('onComplete');
      getMessages(); },
  });
  console.log('sadf');
  // useEffect(() => {
  //   getMessages();
  // });

  return (
    <button
      type="button"
      onClick={() => {
        console.log('onClick');
        addMessage({ variables: { description: 'Slava pobeditilu' } });
      }}
    >
      add message
    </button>
    // <Box>
    //   <AppMenu greeting="Hello, User">
    //     <UserIcon />
    //   </AppMenu>
    //   <Box my={1} height="110vh" overflow="scroll">
    //     <Toolbar id="back-to-top-anchor" />
    //     <List>
    //       {[...new Array(102)]
    //         .map(
    //           (item, index) => (
    //             // eslint-disable-next-line react/no-array-index-key
    //             <ListItem key={index}>
    //               <ListItemIcon>
    //                 <SendIcon />
    //               </ListItemIcon>
    //               <ListItemText primary={loremIpsum()} />
    //             </ListItem>
    //           ),
    //         )}
    //     </List>
    //   </Box>
    //   <ScrollTop {...props}>
    //     <Fab color="secondary" size="small" aria-label="scroll back to top">
    //       <KeyboardArrowUpIcon />
    //     </Fab>
    //   </ScrollTop>
    // </Box>
  );
};
