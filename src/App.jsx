import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AppMenu } from './components/AppMenu';

function App() {
  return (
    <Router>
      <AppMenu />
    </Router>
  );
}

export default App;
