import {
  ApolloClient, InMemoryCache, gql, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
      [`access-token`]: token ? `${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
