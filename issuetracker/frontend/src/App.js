import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import IssueList from './Components/IssueList';
import IssueTable from './Components/IssueTable';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Issue Tracker</h1>

        <div className="section">
          <IssueTable />
        </div>

        <div className="section">
          <IssueList />
        </div>
      </div>
    </Router>
  );
}

export default App;