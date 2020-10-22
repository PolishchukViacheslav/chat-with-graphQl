import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import './App.css';
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/chatRoom" component={ChatPage} />
      </Switch>
    </Router>
  );
}

export default App;
