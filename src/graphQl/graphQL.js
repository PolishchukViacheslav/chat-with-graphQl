import {
  ApolloClient, InMemoryCache, gql, createHttpLink, split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export const USER_LOGIN = gql`
  query($email: String!, $password:String!) {
    signIn(email: $email, password: $password) {
      token 
    }
  }
`;

export const ADD_USER = gql`
  mutation($email: String!, $password:String!, $login:String!) {
    registration(email: $email, password: $password, login: $login) {
      token
      user {
        login
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation($description: String!) {
    createMessage(description: $description) {
      id
    }
  }
`;

export const GET_CORRESPONDENCE = gql`
  query {
    getAllMessages {
      id
      description
      userId
      date
      user {
        id
        login
        email
      }
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    messageAdded {
      description
      id
    }
  }
`;

const wsLink = new WebSocketLink(new SubscriptionClient(
  'ws://localhost:3001/graphql',
  {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      const token = localStorage.getItem('token');
      return {
        'access-token': token ? `${token}` : '',
        headers: {
          'access-token': token ? `${token}` : '',
        },
      };
    },
  },
));

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'access-token': token ? `${token}` : '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
