import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import IssueList from './components/IssueList';
import IssueEdit from './components/IssueEdit';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/issues">Issue List</Link>
          {' | '}
          <Link to="/report">Report</Link>
          <hr />
          <Switch>
            <Route path="/issues" component={IssueList} />
            <Route path="/edit/:id" component={IssueEdit} />
            <Redirect from="/" to="/issues" />
          </Switch>
        </>
      </Router>
    );
  }
}