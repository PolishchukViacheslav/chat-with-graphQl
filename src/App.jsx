import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { LoginPage } from './pages/LoginPage';
import './App.css';
import { ChatPage } from './pages/ChatPage';
import { client } from './graphQl/graphQL';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/chatRoom" component={ChatPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
