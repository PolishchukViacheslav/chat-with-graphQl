import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const USER_LOGIN = gql`
  query($user: UserLogin!) {
    signIn(user: $user) {
      token {
        token
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation($user: UserInput!) {
    registration(user: $user) {
      token {
        token
      }
    }
  }
`;

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});
