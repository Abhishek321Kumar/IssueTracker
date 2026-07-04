import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import IssueList from './Components/IssueList';

function App() {
  return (
    <Router>
      <IssueList />
    </Router>
  );
}

export default App;